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
    //"time"
//    "encoding/json"
)

type PageEntry struct {
	Name string
	Slug string
	Active bool
    Category string
    Content string
    LastUpdated int
    CreateDate int
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