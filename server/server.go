package main

import (
	"github.com/bhargav-yarlagadda/react-go/handlers"
	"github.com/gofiber/fiber/v2"
)

func main() {

	app := fiber.New()
	app.Get("/",handlers.GetAllTasks)
	app.Post("/task",handlers.InsertTask)
	app.Get("task",handlers.FindTaskById)
	app.Delete("/task",handlers.DeleteTaskById)
	app.Listen(":8080")
}