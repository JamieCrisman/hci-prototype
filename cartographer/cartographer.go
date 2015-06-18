package cartographer

import (
  "kouen/scribe"
  "kouen/architect"
  "kouen/machinist"
	"fmt"
	"net/http"
	"github.com/gorilla/mux"
	"log"
	"html/template"
	"github.com/unrolled/render"
	"github.com/apexskier/httpauth"
	"regexp"
	"strings"
  "encoding/json"
  "io/ioutil"
	//"gopkg.in/mgo.v2"
	//"gopkg.in/mgo.v2/bson"
)

type Map struct{
	r *render.Render
}

var(
	Renderer Map
	auth httpauth.Authorizer
  templateDelims = []string{"{{%", "%}}"}
)

func CartographerSetup(){
	var roles = make(map[string]httpauth.Role, 2)
	roles["user"] = 2
	roles["admin"] = 4
	auth, _ = httpauth.NewAuthorizer(scribe.GetAuthBackend(), []byte("XokaLongestVoyage"), "admin", roles)

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
	result := scribe.GetAllEntries()
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

	var result []machinist.PageCommit
	//db.find(bson.M{"Slug": entry})
	log.Println("about to get entry")
	if(aux1 != "all"){
		result = *scribe.GetCommit(entry, aux1)
	}else{
		result = *scribe.GetAllCommits(entry)
	}
	
	if len(result) == 0 {
		//todo make this goto a 404 page
		log.Println("Redirecting!")
		http.Redirect(w, r, "/", http.StatusFound)
		return
	}
  if(aux2 == ""){
    aux2 = "TODO"
  }
	log.Println("Ready to show page")
	for key := range result{
		result[key].CompiledContent = architect.CompileContent(result[key].Content)
	}

	Renderer.r.HTML(w, http.StatusOK, "simpleEntry", map[string]interface{}{"title": result[0].Name, "commits": result})
	//w.Write([]byte(fmt.Sprintf("Hello %s! aux1: %s aux2: %s", result.Name, aux1, aux2)))
}

func AdminHandler(w http.ResponseWriter, r *http.Request){
	checkAuth(w,r)
	result := scribe.GetAllEntriesAdmin()
	Renderer.r.HTML(w, http.StatusOK, "adminIndices", map[string]interface{}{"title": "AdminPage", "entries": result})
}

func LoginHandler(w http.ResponseWriter, r *http.Request){
	Renderer.r.HTML(w, http.StatusOK, "login", map[string]interface{}{"title": "Login", "content": "Login"})
}
func PostLoginHandler(w http.ResponseWriter, r *http.Request){
	login(w,r)
}

func AdminEntryIndex(w http.ResponseWriter, r *http.Request){
	checkAuth(w, r)
	entryName := cleanCheck(mux.Vars(r)["entry"])
	entry := *scribe.GetCommitAdmin(entryName, "")
	commits := *scribe.GetAllCommitsAdmin(entryName)
  if(entry[0].Slug == ""){
    http.Redirect(w, r, "/admin", http.StatusBadRequest)
  }
	Renderer.r.HTML(w, http.StatusOK, "adminEntries", map[string]interface{}{"title": "AdminPage", "entry": entry, "commits": commits})
}
func AdminEditIndex(w http.ResponseWriter, r *http.Request){
  checkAuth(w, r)
  slug := cleanCheck(mux.Vars(r)["entry"])
  body, err := ioutil.ReadAll(r.Body)
  if err != nil {
    panic(err)
  }
  fmt.Println(string(body))
  var t machinist.EntryInput   
  err = json.Unmarshal(body, &t)
  if err != nil {
    panic(err)
  }
  t.Slug = slug
  err = scribe.UpdateEntry(&t)
  if err != nil{
    Renderer.r.JSON(w, http.StatusBadRequest, map[string]interface{}{"msg": err})
    return
  }

  Renderer.r.JSON(w, http.StatusOK, map[string]interface{}{"msg": "YAY!", "data": t})
}

func AdminDeleteIndex(w http.ResponseWriter, r *http.Request){
  checkAuth(w, r)
  slug := cleanCheck(mux.Vars(r)["entry"])
  err := scribe.DeleteEntry(slug)
  if err != nil{
    Renderer.r.JSON(w, http.StatusBadRequest, map[string]interface{}{"msg": err})
    return
  }

  Renderer.r.JSON(w, http.StatusOK, map[string]interface{}{"msg": "DELETED!"})
}

func AdminNewEntry(w http.ResponseWriter, r *http.Request){
  checkAuth(w, r)
  Renderer.r.HTML(w, http.StatusOK, "newEntry", map[string]interface{}{"title": "New Entry"})
}

func AdminCreateEntry(w http.ResponseWriter, r *http.Request){
  checkAuth(w, r)

  body, err := ioutil.ReadAll(r.Body)
  if err != nil {
    panic(err)
  }
  fmt.Println(string(body))
  var t machinist.EntryInput   
  err = json.Unmarshal(body, &t)
  if err != nil {
    panic(err)
  }
  //fmt.Println(t)

  err = scribe.CreateEntry(&t)
  if err != nil{
    Renderer.r.JSON(w, http.StatusBadRequest, map[string]interface{}{"msg": err})
    return
  }

  Renderer.r.JSON(w, http.StatusOK, map[string]interface{}{"msg": "YAY!", "data": t})
}

func AdminNewCommit(w http.ResponseWriter, r *http.Request){
  checkAuth(w, r)
  entryName := cleanCheck(mux.Vars(r)["entry"])
  ent := (*scribe.GetCommitAdmin(entryName, ""))[0]
  Renderer.r.HTML(w, http.StatusOK, "newCommit", map[string]interface{}{"title": "New Entry", "name": ent.Name})
}

func AdminAPIGetEntry(w http.ResponseWriter, r *http.Request){
  checkAuth(w, r)
  entryName := cleanCheck(mux.Vars(r)["entry"])
  ent := (*scribe.GetEntryAdmin(entryName))[0]
  Renderer.r.JSON(w, http.StatusOK, map[string]interface{}{"msg": "OK", "entry": ent})
}

func AdminCreateCommit(w http.ResponseWriter, r *http.Request){
  checkAuth(w, r)
  entryName := cleanCheck(mux.Vars(r)["entry"])
  body, err := ioutil.ReadAll(r.Body)
  if err != nil {
    panic(err)
  }
  fmt.Println(string(body))
  var t machinist.EntryInput   
  err = json.Unmarshal(body, &t)
  if err != nil {
    panic(err)
  }
  fmt.Println(t)
  t.Slug = entryName
  err = scribe.CreateCommit(&t)
  if err != nil{
    Renderer.r.JSON(w, http.StatusBadRequest, map[string]interface{}{"msg": err})
    return
  }

  Renderer.r.JSON(w, http.StatusOK, map[string]interface{}{"msg": "YAY!"})
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

func checkAuth(w http.ResponseWriter, r *http.Request){
	if err := auth.Authorize(w, r, true); err != nil {
		fmt.Println(err)
		http.Redirect(w, r, "/login", http.StatusSeeOther)
		return
	}
}