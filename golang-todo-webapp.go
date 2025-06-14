package main

import (
	"fmt"
	"html/template"
	"log"
	"net/http"
)

type App struct {
	Todos  []Todo
	Server http.Server
}

type Todo struct {
	Id        string
	Text      string
	Completed bool
}

func main() {
	var serveMux = http.NewServeMux()
	var app = App{
		Todos: []Todo{
			{Id: "265f5f64-42d2-11f0-b515-5acc179b5fff", Text: "Get to the airport", Completed: false},
			{Id: "8b63cc6a-42d2-11f0-80b2-5acc179b5fff", Text: "Buy lunch", Completed: true},
			{Id: "f5cbe95c-42d2-11f0-85e3-5acc179b5fff", Text: "Pack European travel adapter", Completed: false},
		}, Server: http.Server{Addr: "127.0.0.01:8080", Handler: serveMux}}
	var templates, err = template.ParseFiles("index.go.html")
	if err != nil {
		panic(err)
	}
	fmt.Printf("%#v\n", &templates)
	serveMux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Add("Content-Type", "text/html")
		err := templates.ExecuteTemplate(w, "index.go.html", &app)
		if err != nil {
			http.Error(w, fmt.Sprintf("Template error %v", err), http.StatusInternalServerError)
		}
	})

	fmt.Printf("%#v\n", &app.Todos)
	log.Fatal(app.Server.ListenAndServe())
}
