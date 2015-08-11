package main

import (
    "github.com/codegangsta/negroni"
    "github.com/gorilla/mux"
    "github.com/unrolled/secure"
    "kouen/ciel"
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
    ciel.ScribeSetup()
    ciel.CartographerSetup()
    defer ciel.ScribeShutdown()

    mx := mux.NewRouter()
    mx.HandleFunc("/admin", ciel.AdminHandler)
    
    mx.HandleFunc("/api/entry", ciel.APIGetEntry).Methods("GET")
    mx.HandleFunc("/api/entry/{entry}", ciel.AdminAPIGetEntry).Methods("GET")
    mx.HandleFunc("/api/entry/{entry}/{commit}", ciel.AdminAPIGetCommit).Methods("GET")

    mx.HandleFunc("/admin/entry/new", ciel.AdminNewEntry).Methods("GET")
    mx.HandleFunc("/admin/entry/new", ciel.AdminCreateEntry).Methods("POST")
    
    mx.HandleFunc("/admin/entry/{entry}/edit", ciel.AdminEntryIndex).Methods("GET")
    mx.HandleFunc("/admin/entry/{entry}/edit", ciel.AdminEditIndex).Methods("POST")
    mx.HandleFunc("/admin/entry/{entry}/edit", ciel.AdminDeleteIndex).Methods("DELETE")

    mx.HandleFunc("/admin/entry/{entry}/new", ciel.AdminNewCommit).Methods("GET")
    mx.HandleFunc("/admin/entry/{entry}/new", ciel.AdminCreateCommit).Methods("POST")
    mx.HandleFunc("/admin/entry/{entry}/{commit}/edit", ciel.AdminEntryCommit).Methods("GET")
    mx.HandleFunc("/admin/entry/{entry}/{commit}/edit", ciel.AdminEditCommit).Methods("POST")
    mx.HandleFunc("/admin/entry/{entry}/{commit}/edit", ciel.AdminDeleteCommit).Methods("DELETE")
    
    mx.HandleFunc("/login", ciel.LoginHandler).Methods("GET")
    mx.HandleFunc("/login", ciel.PostLoginHandler).Methods("POST")
    mx.HandleFunc("/logout", ciel.LogoutHandler)

    secureMiddleware := secure.New(secure.Options{
        FrameDeny: true,
        IsDevelopment: true,
    })

    n := negroni.Classic()
    n.Use(negroni.HandlerFunc(secureMiddleware.HandlerFuncWithNext))
    n.UseHandler(mx)
    n.Run(":8080")

}