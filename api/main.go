package main

import (
	"api_test/controller"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func main() {
	r := mux.NewRouter()

	c := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:5173"},
		AllowedMethods: []string{"GET", "POST", "PUT", "PATCH", "DELETE"},
		AllowedHeaders: []string{"Origin", "Content-Type", "Accept"},
	})

	handler := c.Handler(r)

	r.HandleFunc("/", HandleRoot)
	r.HandleFunc("/tasks", HandleTasks).Methods(http.MethodGet, http.MethodPost)
	r.HandleFunc("/tasks/{id}", HandleTasksById).Methods(http.MethodGet, http.MethodDelete, http.MethodPut, http.MethodPatch)
	log.Print("Server started on port 8080")
	log.Fatal(http.ListenAndServe(":8080", handler))
}

func HandleRoot(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Hello World"))
}

func HandleTasks(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		controller.GetAll(w, r)
	case http.MethodPost:
		controller.Create(w, r)
	}
}

func HandleTasksById(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		controller.GetById(w, r)
	case http.MethodDelete:
		controller.Delete(w, r)
	case http.MethodPut:
		controller.Edit(w, r)
	case http.MethodPatch:
		controller.Update(w, r)
	}
}
