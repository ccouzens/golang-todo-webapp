package main

import (
	"fmt"
	"html/template"
	"log"
	"net/http"
)

type App struct {
	NextTodo string
	Todos    []Todo
}

type Todo struct {
	Id        string
	Text      string
	Completed bool
}

func main() {
	var serveMux = http.NewServeMux()
	var app = App{
		NextTodo: "4",
		Todos: []Todo{
			{Id: "1", Text: "Get to the airport", Completed: false},
			{Id: "2", Text: "Buy lunch", Completed: true},
			{Id: "3", Text: "Pack European travel adapter", Completed: false},
		}}
	var server = http.Server{Addr: "127.0.0.1:8080", Handler: serveMux}
	var templates, err = template.ParseFiles("index.go.html")
	if err != nil {
		panic(err)
	}
	serveMux.HandleFunc("/index.css", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "vite_version/todo-mvc-ssr/dist/client/assets/index-B27fdXS0.css")
	})
	serveMux.HandleFunc("/{$}", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Add("Content-Type", "text/html; charset=utf-8")
		w.Header().Add("Link", "text/html; charset=utf-8")
		err := templates.ExecuteTemplate(w, "index.go.html", &app)
		if err != nil {
			http.Error(w, fmt.Sprintf("Template error %v", err), http.StatusInternalServerError)
		}
	})

	fmt.Printf("%#v\n", &app.Todos)
	log.Fatal(server.ListenAndServe())
}
