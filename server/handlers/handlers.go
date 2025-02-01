package handlers

import (
	"net/http"
	"time"

	"github.com/bhargav-yarlagadda/react-go/db"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
)

func GetAllTasks(c *fiber.Ctx) error {
	// Connect to MongoDB
	client, err := db.ConnectToDB()
	if err != nil {
		return c.Status(http.StatusInternalServerError).SendString("Failed to connect to MongoDB: " + err.Error())
	}

	// Access the "tasks" collection
	collection := client.Database("db").Collection("tasks")

	// Find all documents (empty query - all documents)
	cursor, err := collection.Find(c.Context(), bson.M{})
	if err != nil {
		return c.Status(http.StatusInternalServerError).SendString("Error finding documents: " + err.Error())
	}
	defer cursor.Close(c.Context())

	// Define a slice to hold the users
	var tasks []bson.M

	// Use cursor to fetch all documents
	if err := cursor.All(c.Context(), &tasks); err != nil {
		return c.Status(http.StatusInternalServerError).SendString("Error decoding documents: " + err.Error())
	}

	// Return the users as JSON
	return c.Status(fiber.StatusOK).JSON(tasks)
}


func InsertTask(c *fiber.Ctx) error {
	// Define a struct for the task
	type Task struct {
		Name      string    `json:"name"`
		Desc      string    `json:"desc"`
		IsActive  bool      `json:"isActive"`
	}

	// Parse the incoming request body into the Task struct
	var task Task
	if err := c.BodyParser(&task); err != nil {
		return c.Status(http.StatusBadRequest).SendString("Failed to parse body: " + err.Error())
	}

	// Connect to MongoDB
	client, err := db.ConnectToDB()
	if err != nil {
		return c.Status(http.StatusInternalServerError).SendString("Failed to connect to MongoDB: " + err.Error())
	}

	// Access the "tasks" collection
	collection := client.Database("db").Collection("tasks")

	// Insert the document into the collection using bson.D
	_, err = collection.InsertOne(c.Context(), bson.D{
		{Key: "name", Value: task.Name},
		{Key: "desc", Value: task.Desc},
		{Key: "createdAt", Value: time.Now()},
		{Key: "isActive", Value: task.IsActive},
	})
	if err != nil {
		return c.Status(http.StatusInternalServerError).SendString("Error inserting document: " + err.Error())
	}

	// Return success message
	return c.Status(http.StatusOK).SendString("Task inserted successfully!")
}