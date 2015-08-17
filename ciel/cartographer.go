package ciel

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
  "encoding/json"
  "io/ioutil"
  "strconv"
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

func APIGetEntry(w http.ResponseWriter, r *http.Request){
  params := SomeItem{}
  options := GetOptions{}
  params.Slug = cleanCheck(r.URL.Query().Get("entry"))
  params.CommitID = cleanCheck(r.URL.Query().Get("commit"))
  activeParam := cleanCheck(r.URL.Query().Get("active"))
  pageParam := cleanCheck(r.URL.Query().Get("page"))
  getAll := cleanCheck(r.URL.Query().Get("all"))
  if(getAll != "true") { //double negative vs having more common if as first branch
    options.All = false
  }else {
    options.All = true
  }
  if(!authorized(w, r)) { //force override if not authorized
    params.Active = true;
  } else if (authorized(w, r) && activeParam == "false") {
    params.Active = false;
  }//else we don't care what active is
  if(len(pageParam) == 0 || pageParam == "1") {
    options.Page = 1
  } else {
    options.Page, _ = strconv.Atoi(pageParam)
  }
  if(authorized(w, r) == true) {
    options.Admin = true
    log.Println("setting admin to true")
  } else {
    options.Admin = false
  }
  ent, err := GetCommit(params, options)
  if(err != nil) {
    Renderer.r.JSON(w, http.StatusBadRequest, map[string]interface{}{"msg": "Fail"})
    return
  }

  Renderer.r.JSON(w, http.StatusOK, map[string]interface{}{"msg": "OK", "data": ent})
}

func APIGetIndex(w http.ResponseWriter, r *http.Request){
  params := SomeItem{}
  options := GetOptions{}
  params.Slug = cleanCheck(r.URL.Query().Get("entry"))
  params.CommitID = cleanCheck(r.URL.Query().Get("commit"))
  activeParam := cleanCheck(r.URL.Query().Get("active"))
  getAll := cleanCheck(r.URL.Query().Get("all"))
  if(getAll != "false") { //double negative vs having more common if as first branch
    options.All = true
  }else {
    options.All = false
  }
  if(!authorized(w, r)) { //force override if not authorized
    params.Active = true;
  } else if (authorized(w, r) && activeParam == "false") {
    params.Active = false;
  }//else we don't care what active is
  if(authorized(w, r)) {
    options.Admin = true
  } else {
    options.Admin = false
  }
  ind, err := GetIndex(params, options)
  if(err != nil) {
    Renderer.r.JSON(w, http.StatusBadRequest, map[string]interface{}{"msg": "Fail"})
    return
  }

  Renderer.r.JSON(w, http.StatusOK, map[string]interface{}{"msg":"OK", "data": ind})
}


func AdminHandler(w http.ResponseWriter, r *http.Request){
	checkAuth(w,r)
	result := GetAllEntriesAdmin()
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
	entry := *GetCommitAdmin(entryName, "")
	commits := *GetAllCommitsAdmin(entryName)
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
  log.Println(string(body))
  var t EntryInput   
  err = json.Unmarshal(body, &t)
  if err != nil {
    panic(err)
  }
  t.Slug = slug
  err = UpdateEntry(&t)
  if err != nil{
    Renderer.r.JSON(w, http.StatusBadRequest, map[string]interface{}{"msg": err})
    return
  }

  Renderer.r.JSON(w, http.StatusOK, map[string]interface{}{"msg": "YAY!", "data": t})
}

func AdminDeleteIndex(w http.ResponseWriter, r *http.Request){
  checkAuth(w, r)
  slug := cleanCheck(mux.Vars(r)["entry"])
  err := DeleteEntry(slug)
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
  var t EntryInput   
  err = json.Unmarshal(body, &t)
  if err != nil {
    panic(err)
  }
  //fmt.Println(t)

  err = CreateEntry(&t)
  if err != nil{
    Renderer.r.JSON(w, http.StatusBadRequest, map[string]interface{}{"msg": err})
    return
  }

  Renderer.r.JSON(w, http.StatusOK, map[string]interface{}{"msg": "YAY!", "data": t})
}

func AdminEntryCommit(w http.ResponseWriter, r *http.Request){
  checkAuth(w, r)
  entryName := cleanCheck(mux.Vars(r)["entry"])
  commitName := cleanCheck(mux.Vars(r)["commit"])
  commit := *GetCommitAdmin(entryName, commitName)
  if(commit[0].Slug == ""){
    http.Redirect(w, r, "/admin", http.StatusBadRequest)
  }
  Renderer.r.HTML(w, http.StatusOK, "editCommit", map[string]interface{}{"title": "AdminPage", "name": commit[0].Name, "commit": commit})
}

func AdminEditCommit(w http.ResponseWriter, r *http.Request){
  checkAuth(w, r)
  slug := cleanCheck(mux.Vars(r)["entry"])
  commit := cleanCheck(mux.Vars(r)["commit"])
  body, err := ioutil.ReadAll(r.Body)
  if err != nil {
    panic(err)
  }
  log.Println(string(body))
  var t EntryInput
  err = json.Unmarshal(body, &t)
  if err != nil {
    panic(err)
  }
  t.Slug = slug
  t.CommitID = commit
  err = UpdateCommit(&t)
  if err != nil{
    Renderer.r.JSON(w, http.StatusBadRequest, map[string]interface{}{"msg": err})
    return
  }

  Renderer.r.JSON(w, http.StatusOK, map[string]interface{}{"msg": "YAY!", "commit": t})
}

func AdminDeleteCommit(w http.ResponseWriter, r *http.Request){
  checkAuth(w, r)
  //TODO:!!!!
  /*slug := cleanCheck(mux.Vars(r)["entry"])
  err := DeleteEntry(slug)
  if err != nil{
    Renderer.r.JSON(w, http.StatusBadRequest, map[string]interface{}{"msg": err})
    return
  }
*/
  Renderer.r.JSON(w, http.StatusOK, map[string]interface{}{"msg": "DELETED!"})
}


func AdminNewCommit(w http.ResponseWriter, r *http.Request){
  checkAuth(w, r)
  entryName := cleanCheck(mux.Vars(r)["entry"])
  ent := (*GetCommitAdmin(entryName, ""))[0]
  Renderer.r.HTML(w, http.StatusOK, "newCommit", map[string]interface{}{"title": "New Entry", "name": ent.Name})
}

func AdminAPIGetEntry(w http.ResponseWriter, r *http.Request){
  checkAuth(w, r)
  entryName := cleanCheck(mux.Vars(r)["entry"])
  ent := (*GetEntryAdmin(entryName))[0]
  Renderer.r.JSON(w, http.StatusOK, map[string]interface{}{"msg": "OK", "entry": ent})
}
func AdminAPIGetCommit(w http.ResponseWriter, r *http.Request){
  checkAuth(w, r)
  entryName := cleanCheck(mux.Vars(r)["entry"])
  commitName := cleanCheck(mux.Vars(r)["commit"])
  ent := (*GetCommitAdmin(entryName, commitName))[0]
  Renderer.r.JSON(w, http.StatusOK, map[string]interface{}{"msg": "OK", "commit": ent})
}

func AdminCreateCommit(w http.ResponseWriter, r *http.Request){
  checkAuth(w, r)
  entryName := cleanCheck(mux.Vars(r)["entry"])
  body, err := ioutil.ReadAll(r.Body)
  if err != nil {
    panic(err)
  }
  fmt.Println(string(body))
  var t EntryInput   
  err = json.Unmarshal(body, &t)
  if err != nil {
    panic(err)
  }
  fmt.Println(t)
  t.Slug = entryName
  err = CreateCommit(&t)
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
	if authorized(w, r) {
		http.Redirect(w, r, "/login", http.StatusSeeOther)
		return
	}
}

func authorized(w http.ResponseWriter, r *http.Request) bool{
  err := auth.Authorize(w, r, true)
  fmt.Println(err)
  return err == nil
}