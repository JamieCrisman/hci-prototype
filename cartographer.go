package main

import (
	"fmt"
	"net/http"
	"github.com/gorilla/mux"
	"log"
	"html/template"
	"github.com/unrolled/render"
	"github.com/apexskier/httpauth"
	"regexp"
	"strings"
	//"gopkg.in/mgo.v2"
	//"gopkg.in/mgo.v2/bson"
)

type Map struct{
	r *render.Render
}

var(
	Renderer Map
	auth httpauth.Authorizer
)

func CartographerSetup(){
	var roles = make(map[string]httpauth.Role, 2)
	roles["user"] = 2
	roles["admin"] = 4
	auth, _ = httpauth.NewAuthorizer(GetAuthBackend(), []byte("XokaLongestVoyage"), "admin", roles)

	Renderer.r = render.New(render.Options{
        Directory: "templates",
        Layout: "",
        Extensions: []string{".tmpl"},
        Funcs: []template.FuncMap{},
        Delims: render.Delims{"{{%", "%}}"},
        Charset: "UTF-8",
        IndentJSON: true,
        HTMLContentType: "text/html",
        IsDevelopment: false,
        UnEscapeHTML: true,
    })
}

func HomeHandler(w http.ResponseWriter, req *http.Request){
	result := GetAllEntries()
    Renderer.r.HTML(w, http.StatusOK, "home", map[string]interface{}{"title": "Longest Voyage: Home", "content": "Hello!", "entries": result})
}

func PageHandler(w http.ResponseWriter, req *http.Request){
    fmt.Fprint(w, "Something")
}

func EntryHandler(w http.ResponseWriter, r *http.Request) {
	//db = GetDB(

	entry := cleanCheck(mux.Vars(r)["entry"])
	aux1 := cleanCheck(mux.Vars(r)["aux1"])
	aux2 := cleanCheck(mux.Vars(r)["aux2"])

	//db.find(bson.M{"Slug": entry})
	log.Println("about to get entry")
	result := GetEntry(entry)
	
	//because I don't have anything using this yet
	if(aux1 == ""){
		aux1 = "okay"
	}
	if(aux2 == ""){
		aux2 = "also okay"
	}
	if result.Name == "" {
		//todo make this goto a 404 page
		http.Redirect(w, r, "/", http.StatusFound)
	}

	Renderer.r.HTML(w, http.StatusOK, "simpleEntry", map[string]interface{}{"title": result.Name, "content": template.HTML(result.Content)})
	//w.Write([]byte(fmt.Sprintf("Hello %s! aux1: %s aux2: %s", result.Name, aux1, aux2)))
}

func AdminHandler(w http.ResponseWriter, r *http.Request){
	if err := auth.Authorize(w, r, true); err != nil {
		fmt.Println(err)
		http.Redirect(w, r, "/login", http.StatusSeeOther)
		return
	}
	Renderer.r.HTML(w, http.StatusOK, "simpleEntry", map[string]interface{}{"title": "AdminPage", "content": "Xoka Ciel"})
}

func LoginHandler(w http.ResponseWriter, r *http.Request){
	Renderer.r.HTML(w, http.StatusOK, "login", map[string]interface{}{"title": "Login", "content": "Login"})
}
func PostLoginHandler(w http.ResponseWriter, r *http.Request){
	login(w,r)
}


func login(rw http.ResponseWriter, req *http.Request) {
    username := req.PostFormValue("username")
    password := req.PostFormValue("password")
    if err := auth.Login(rw, req, username, password, "/"); err != nil && err.Error() == "already authenticated" {
        http.Redirect(rw, req, "/admin", http.StatusSeeOther)
    } else if err != nil {
        fmt.Println(err)
        http.Redirect(rw, req, "/login", http.StatusSeeOther)
    }
}

func LogoutHandler(w http.ResponseWriter, r *http.Request){
	if err := auth.Logout(w, r); err != nil {
		fmt.Println(err)
		// this shouldn't happen
		return
	}
	http.Redirect(w, r, "/", http.StatusSeeOther)
}

func cleanCheck(s string) string {
	reg, err := regexp.Compile("[^A-Za-z0-9_:+-]+")
	if err != nil {
		panic(err)
	}
	return strings.ToLower(reg.ReplaceAllString(s, ""));
}