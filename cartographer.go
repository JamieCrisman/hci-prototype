package main

import (
	"fmt"
	"net/http"
	"github.com/gorilla/mux"
	"log"
	"html/template"
	"github.com/unrolled/render"
	//"gopkg.in/mgo.v2"
	//"gopkg.in/mgo.v2/bson"
)

type Map struct{
	r *render.Render
}

var(
	Renderer Map
)

func CartographerSetup(){
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

	entry := mux.Vars(r)["entry"]
	aux1 := mux.Vars(r)["aux1"]
	aux2 := mux.Vars(r)["aux2"]

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