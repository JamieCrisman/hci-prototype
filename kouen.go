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
    route.CartographerSetup()
    defer scribe.ScribeShutdown()

    mx := mux.NewRouter()
    mx.HandleFunc("/", route.HomeHandler)
    mx.HandleFunc("/admin", route.AdminHandler)
    
    mx.HandleFunc("/api/entry/{entry}", route.AdminAPIGetEntry).Methods("GET")
    mx.HandleFunc("/api/entry/{entry}/{commit}", route.AdminAPIGetCommit).Methods("GET")

    mx.HandleFunc("/admin/entry/new", route.AdminNewEntry).Methods("GET")
    mx.HandleFunc("/admin/entry/new", route.AdminCreateEntry).Methods("POST")
    
    mx.HandleFunc("/admin/entry/{entry}/edit", route.AdminEntryIndex).Methods("GET")
    mx.HandleFunc("/admin/entry/{entry}/edit", route.AdminEditIndex).Methods("POST")
    mx.HandleFunc("/admin/entry/{entry}/edit", route.AdminDeleteIndex).Methods("DELETE")

    mx.HandleFunc("/admin/entry/{entry}/new", route.AdminNewCommit).Methods("GET")
    mx.HandleFunc("/admin/entry/{entry}/new", route.AdminCreateCommit).Methods("POST")
    mx.HandleFunc("/admin/entry/{entry}/{commit}/edit", route.AdminEntryCommit).Methods("GET")
    mx.HandleFunc("/admin/entry/{entry}/{commit}/edit", route.AdminEditCommit).Methods("POST")
    mx.HandleFunc("/admin/entry/{entry}/{commit}/edit", route.AdminDeleteCommit).Methods("DELETE")
    
    mx.HandleFunc("/login", route.LoginHandler).Methods("GET")
    mx.HandleFunc("/login", route.PostLoginHandler).Methods("POST")
    mx.HandleFunc("/logout", route.LogoutHandler)
    mx.HandleFunc("/{entry}", route.EntryHandler)
    mx.HandleFunc("/{entry}/{aux1}", route.EntryHandler)
    mx.HandleFunc("/{entry}/{aux1}/{aux2}", route.EntryHandler)

    secureMiddleware := secure.New(secure.Options{
        FrameDeny: true,
        IsDevelopment: true,
    })

    n := negroni.Classic()
    n.Use(negroni.HandlerFunc(secureMiddleware.HandlerFuncWithNext))
    n.UseHandler(mx)
    n.Run(":8080")

}