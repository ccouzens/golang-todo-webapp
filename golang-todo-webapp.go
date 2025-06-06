package main

import "fmt"

type App struct {
	Todos []Todo
}

type Todo struct {
	Id        string
	Text      string
	Completed bool
}

func main() {
	var app = App{Todos: []Todo{
		{Id: "265f5f64-42d2-11f0-b515-5acc179b5fff", Text: "Get to the airport", Completed: false},
		{Id: "8b63cc6a-42d2-11f0-80b2-5acc179b5fff", Text: "Buy lunch", Completed: true},
		{Id: "f5cbe95c-42d2-11f0-85e3-5acc179b5fff", Text: "Pack European travel adapter", Completed: false},
	}}
	fmt.Println(app)
}
