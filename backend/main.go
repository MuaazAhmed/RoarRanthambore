package main

import (
	"ranthambhore-booking-app/backend/db"
	"ranthambhore-booking-app/backend/handlers"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	// Add CORS middleware FIRST
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:8000", "http://localhost:3000", "http://192.168.1.5:8000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	db.InitDB() // Initialize database connection

	// Register routes on the SAME router
	router.POST("/bookings", handlers.CreateBooking)
	router.GET("/bookings", handlers.GetBookings)
	router.GET("/bookings/:id", handlers.GetBooking)
	router.PUT("/bookings/:id", handlers.UpdateBooking)
	router.DELETE("/bookings/:id", handlers.DeleteBooking)
	router.POST("/admin/login", handlers.AdminLogin)
	router.POST("/admin/register", handlers.AdminRegister)

	router.Run(":8080") // Run on port 8080
}
