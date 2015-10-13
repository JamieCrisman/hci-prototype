package main

import (
    "github.com/codegangsta/negroni"
   // "github.com/gorilla/mux"
    "github.com/unrolled/secure"
)

func main() {
    secureMiddleware := secure.New(secure.Options{
        FrameDeny: true,
        IsDevelopment: true,
    })

    n := negroni.Classic()
    n.Use(negroni.HandlerFunc(secureMiddleware.HandlerFuncWithNext))
   // n.UseHandler(mx)
    n.Run(":8080")

}