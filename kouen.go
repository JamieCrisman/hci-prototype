package main

import (
    "github.com/codegangsta/negroni"
    "github.com/gorilla/mux"
    "github.com/unrolled/secure"
//	"github.com/gin-gonic/gin";
//	"github.com/gin-gonic/gin/binding";
//	"log"
//	"fmt"
    //"os"
    //"io"
    //"net/http"
    //"strings"
    "time"
//    "encoding/json"
    "html/template"
)

type PageIndex struct {
    Name string
    Slug string
    Active bool
    Category string
    LastUpdated time.Time
    CreateDate time.Time
}

type PageCommit struct {
    Name string //matches index
	Title string //unique(able) to commit
	Slug string
    Content string
    CompiledContent template.HTML
    LastUpdated time.Time
    CreateDate time.Time
    Active bool
    CommitID string
}

var (
    templateDelims = []string{"{{%", "%}}"}
	IsDrop = true
    //templates *template.Template
)

var Contains = func(list []string, elem string) bool { 
        for _, t := range list { if t == elem { return true } } 
        return false 
} 

func main() {
    ScribeSetup()
    CartographerSetup()
    defer ScribeShutdown()

    mx := mux.NewRouter()
    mx.HandleFunc("/", HomeHandler)
    mx.HandleFunc("/admin", AdminHandler)
    mx.HandleFunc("/admin/entry/{entry}/edit", AdminEntryIndex).Methods("GET")
    mx.HandleFunc("/admin/entry/{entry}/edit", AdminEditIndex).Methods("POST")
    mx.HandleFunc("/admin/entry/{entry}/new", AdminNewCommit).Methods("GET")
    mx.HandleFunc("/admin/entry/{entry}/new", AdminCreateCommit).Methods("POST")
    mx.HandleFunc("/admin/entry/new", AdminNewEntry).Methods("GET")
    mx.HandleFunc("/admin/entry/new", AdminCreateEntry).Methods("POST")
    mx.HandleFunc("/api/entry/{entry}", AdminAPIGetEntry).Methods("GET")
    mx.HandleFunc("/login", LoginHandler).Methods("GET")
    mx.HandleFunc("/login", PostLoginHandler).Methods("POST")
    mx.HandleFunc("/logout", LogoutHandler)
    mx.HandleFunc("/{entry}", EntryHandler)
    mx.HandleFunc("/{entry}/{aux1}", EntryHandler)
    mx.HandleFunc("/{entry}/{aux1}/{aux2}", EntryHandler)

    secureMiddleware := secure.New(secure.Options{
        FrameDeny: true,
        IsDevelopment: true,
    })

    n := negroni.Classic()
    n.Use(negroni.HandlerFunc(secureMiddleware.HandlerFuncWithNext))
    n.UseHandler(mx)
    n.Run(":8080")

}