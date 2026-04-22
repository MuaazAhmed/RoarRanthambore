package main

import (
	"os"
	"ranthambhore-booking-app/backend/db"
	"ranthambhore-booking-app/backend/handlers"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	// Get frontend URL from env or use localhost for dev
	allowedOrigin := os.Getenv("FRONTEND_URL")
	if allowedOrigin == "" {
		allowedOrigin = "http://localhost:3000"
	}

	// Add CORS middleware FIRST
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:8000", allowedOrigin, "http://192.168.1.5:8000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	db.InitDB() // Initialize database connection

	// Register routes on the SAME router
	router.POST("/api/bookings", handlers.CreateBooking)
	router.GET("/api/bookings", handlers.GetBookings)
	router.GET("/api/bookings/:id", handlers.GetBooking)
	router.PUT("/api/bookings/:id", handlers.UpdateBooking)
	router.DELETE("/api/bookings/:id", handlers.DeleteBooking)
	router.POST("/api/admin/login", handlers.AdminLogin)
	router.POST("/api/admin/register", handlers.AdminRegister)

	// Serve React static files
	router.Static("/static", "./build/static")
	router.StaticFile("/favicon.ico", "./build/favicon.ico")
	router.StaticFile("/manifest.json", "./build/manifest.json")
	router.StaticFile("/robots.txt", "./build/robots.txt")

	// Catch-all: serve index.html for any unmatched route (React Router support)
	router.NoRoute(func(c *gin.Context) {
		c.File("./build/index.html")
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	router.Run(":" + port) // Run on specified port
}
