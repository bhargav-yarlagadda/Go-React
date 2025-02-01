package main

import (
	"github.com/bhargav-yarlagadda/react-go/handlers"
	"github.com/gofiber/fiber/v2"
)

func main() {

	app := fiber.New()
	app.Get("/",handlers.GetAllTasks)
	app.Post("/new-task",handlers.InsertTask)


	app.Listen(":8080")
}