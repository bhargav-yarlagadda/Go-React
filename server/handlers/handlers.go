	package handlers

	import (
		"net/http"
		"time"

		"github.com/bhargav-yarlagadda/react-go/db"
		"github.com/gofiber/fiber/v2"
		"go.mongodb.org/mongo-driver/bson"
		"go.mongodb.org/mongo-driver/bson/primitive"
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
		// Define a struct for the task with dueDate and priority fields
		type Task struct {
			Name     string `json:"name"`
			Desc     string `json:"desc"`
			IsActive bool   `json:"isActive"`
			DueDate  string `json:"dueDate"`  // DueDate as string, for custom parsing
			Priority string `json:"priority"` // Priority field
		}

		// Parse the incoming request body into the Task struct
		var task Task
		if err := c.BodyParser(&task); err != nil {
			return c.Status(http.StatusBadRequest).SendString("Failed to parse body: " + err.Error())
		}

		// Parse the dueDate using time.Parse
		dueDate, err := time.Parse("2006-01-02", task.DueDate)
		if err != nil {
			return c.Status(http.StatusBadRequest).SendString("Invalid due date format. Please use yyyy-mm-dd.")
		}

		// Validate priority field (optional, you can customize based on your needs)
		validPriorities := []string{"low", "normal", "high"}
		validPriority := false
		for _, p := range validPriorities {
			if task.Priority == p {
				validPriority = true
				break
			}
		}
		if !validPriority {
			return c.Status(http.StatusBadRequest).SendString("Invalid priority value. Valid values are: low, normal, high.")
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
			{Key: "updatedAt", Value: time.Now()},
			{Key: "isActive", Value: task.IsActive},
			{Key: "dueDate", Value: dueDate},        // Insert the parsed dueDate
			{Key: "priority", Value: task.Priority}, // Insert priority field
		})
		if err != nil {
			return c.Status(http.StatusInternalServerError).SendString("Error inserting document: " + err.Error())
		}

		// Return success message
		return c.Status(http.StatusOK).SendString("Task inserted successfully!")
	}

	func FindTaskById(c *fiber.Ctx) error {
		
	
		// Retrieve the dynamic id from the URL parameter
		taskId := c.Params("id")
		if taskId == "" {
			return c.Status(http.StatusBadRequest).SendString("Task ID is required")
		}
	
		// Convert string ID to ObjectID
		taskObjectID, err := primitive.ObjectIDFromHex(taskId)
		if err != nil {
			return c.Status(http.StatusBadRequest).SendString("Invalid ID format")
		}
	
		client, err := db.ConnectToDB()
		defer client.Disconnect(c.Context())
		if err != nil {
			return c.Status(http.StatusInternalServerError).SendString("Failed to connect to MongoDB: " + err.Error())
		}
	
		collection := client.Database("db").Collection("tasks")
		var result bson.M
		err = collection.FindOne(c.Context(), bson.M{"_id": taskObjectID}).Decode(&result)
		if err != nil {
			return c.Status(http.StatusInternalServerError).SendString("Error fetching task: " + err.Error())
		}
	
		// Return the result as JSON
		return c.Status(200).JSON(result)
	}
	

	func DeleteTaskById(c *fiber.Ctx) error {
		type Task struct {
			ID string `json:"id"`
		}
		var taskId Task
		err := c.BodyParser(&taskId)
		if err != nil {
			return c.Status(http.StatusBadRequest).SendString("Invalid body")
		}
		taskObjectID, err := primitive.ObjectIDFromHex(taskId.ID)
		if err != nil {
			return c.Status(http.StatusBadRequest).SendString("Invalid ID format")
		}

		client, err := db.ConnectToDB()
		defer client.Disconnect(c.Context())
		if err != nil {
			return c.Status(http.StatusInternalServerError).SendString("Failed to connect to MongoDB: " + err.Error())
		}

		collection := client.Database("db").Collection("tasks")
		result, err := collection.DeleteOne(c.Context(), bson.M{"_id": taskObjectID})
		if err != nil {
			return c.Status(http.StatusInternalServerError).SendString("Failed to delete task: " + err.Error())
		}

		// If no document was deleted (matched), return an appropriate message
		if result.DeletedCount == 0 {
			return c.Status(http.StatusNotFound).SendString("No task found with the given ID")
		}
		

		return c.Status(http.StatusOK).SendString("Task deleted successfully")

	}
	func UpdateTaskById(c *fiber.Ctx) error {
		type Task struct {
			ID        string `json:"id"`
			Name      string `json:"name"`
			Desc      string `json:"desc"`
			IsActive  bool   `json:"isActive"`
			DueDate   string `json:"dueDate"`  // DueDate as string, for custom parsing
			Priority  string `json:"priority"` // Priority field
			// Add other fields as required
		}

		var taskData Task
		err := c.BodyParser(&taskData)
		if err != nil {
			return c.Status(http.StatusBadRequest).SendString("Invalid body")
		}

		// Convert string ID to ObjectID
		taskObjectID, err := primitive.ObjectIDFromHex(taskData.ID)
		if err != nil {
			return c.Status(http.StatusBadRequest).SendString("Invalid ID format")

		}
		client, err := db.ConnectToDB()
		defer client.Disconnect(c.Context())
		if err != nil {
			return c.Status(http.StatusInternalServerError).SendString("Failed to connect to MongoDB: " + err.Error())
		}

		collection := client.Database("db").Collection("tasks")

		// Prepare the update data
		update := bson.M{
			"$set": bson.M{
				"name":       taskData.Name,
				"desc":       taskData.Desc,
				"isActive":   taskData.IsActive,
				"dueDate":    taskData.DueDate,
				"priority":   taskData.Priority,
				"updatedAt" : time.Now(),
			},
		}

		// Update the task by ID
		_, err = collection.UpdateOne(c.Context(), bson.M{"_id": taskObjectID}, update)
		if err != nil {
			return c.Status(http.StatusInternalServerError).SendString("Error updating task: " + err.Error())
		}

		// Return success response
		return c.Status(http.StatusOK).SendString("Task updated successfully")
	}
