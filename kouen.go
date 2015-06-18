package main

import (
    "github.com/codegangsta/negroni"
    "github.com/gorilla/mux"
    "github.com/unrolled/secure"
    "kouen/scribe"
    "kouen/cartographer"
//	"github.com/gin-gonic/gin";
//	"github.com/gin-gonic/gin/binding";
//	"log"
//	"fmt"
    //"os"
    //"io"
    //"net/http"
    //"strings"
//    "encoding/json"
)



var Contains = func(list []string, elem string) bool { 
        for _, t := range list { if t == elem { return true } } 
        return false 
} 

func main() {
    scribe.ScribeSetup()
    cartographer.CartographerSetup()
    defer scribe.ScribeShutdown()
    
    mx := mux.NewRouter()
    mx.HandleFunc("/", cartographer.HomeHandler)
    mx.HandleFunc("/admin", cartographer.AdminHandler)
    mx.HandleFunc("/admin/entry/{entry}/edit", cartographer.AdminEntryIndex).Methods("GET")
    mx.HandleFunc("/admin/entry/{entry}/edit", cartographer.AdminEditIndex).Methods("POST")
    mx.HandleFunc("/admin/entry/{entry}/edit", cartographer.AdminDeleteIndex).Methods("DELETE")
    mx.HandleFunc("/admin/entry/{entry}/new", cartographer.AdminNewCommit).Methods("GET")
    mx.HandleFunc("/admin/entry/{entry}/new", cartographer.AdminCreateCommit).Methods("POST")
    mx.HandleFunc("/admin/entry/new", cartographer.AdminNewEntry).Methods("GET")
    mx.HandleFunc("/admin/entry/new", cartographer.AdminCreateEntry).Methods("POST")
    mx.HandleFunc("/api/entry/{entry}", cartographer.AdminAPIGetEntry).Methods("GET")
    mx.HandleFunc("/login", cartographer.LoginHandler).Methods("GET")
    mx.HandleFunc("/login", cartographer.PostLoginHandler).Methods("POST")
    mx.HandleFunc("/logout", cartographer.LogoutHandler)
    mx.HandleFunc("/{entry}", cartographer.EntryHandler)
    mx.HandleFunc("/{entry}/{aux1}", cartographer.EntryHandler)
    mx.HandleFunc("/{entry}/{aux1}/{aux2}", cartographer.EntryHandler)

    secureMiddleware := secure.New(secure.Options{
        FrameDeny: true,
        IsDevelopment: true,
    })

    n := negroni.Classic()
    n.Use(negroni.HandlerFunc(secureMiddleware.HandlerFuncWithNext))
    n.UseHandler(mx)
    n.Run(":8080")

}