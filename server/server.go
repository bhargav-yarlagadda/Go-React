package main

import (
	"github.com/bhargav-yarlagadda/react-go/handlers"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"

)

func main() {

	app := fiber.New()
	app.Use(cors.New(cors.Config{
        AllowOrigins: "http://localhost:5173", // Allow frontend origin
        AllowMethods: "GET,POST,PUT,DELETE",
        AllowHeaders: "Origin, Content-Type, Accept",
    }))
	app.Get("/",handlers.GetAllTasks)
	app.Post("/task",handlers.InsertTask)
	app.Get("task",handlers.FindTaskById)
	app.Delete("/task",handlers.DeleteTaskById)
	app.Put("/task",handlers.UpdateTaskById)
	app.Listen(":8080")
	
}