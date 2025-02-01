package db

import (
	"context"
	"fmt"
	

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// ConnectToDB connects to MongoDB and returns the client.
func ConnectToDB() (*mongo.Client, error) {
	URI := "mongodb+srv://bhargavyarlagadda2003:5qVcz30NkQRjMw9A@cluster0.87b4y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
	if URI == "" {
		return nil, fmt.Errorf("MongoDB URI not found")
	}

	serverAPI := options.ServerAPI(options.ServerAPIVersion1)
	opts := options.Client().ApplyURI(URI).SetServerAPIOptions(serverAPI)

	// Corrected MongoDB connection
	client, err := mongo.Connect(context.TODO(), opts)
	if err != nil {
		return nil, fmt.Errorf("Error connecting to MongoDB: %v", err)
	}

	// Ping the database
	var result bson.M
	if err := client.Database("admin").RunCommand(context.TODO(), bson.D{{Key: "ping", Value: 1}}).Decode(&result); err != nil {
		return nil, fmt.Errorf("Error pinging MongoDB: %v", err)
	}

	fmt.Println("Pinged your deployment. You successfully connected to MongoDB!")
	return client, nil
}
