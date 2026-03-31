package handlers

import (
	"context"
	"net/http"
	"os"
	"ranthambhore-booking-app/backend/db"
	"ranthambhore-booking-app/backend/models"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
	"golang.org/x/crypto/bcrypt"
)

var jwtSecret = []byte("secret") // Use env var in prod

type Claims struct {
	Username string `json:"username"`
	jwt.RegisteredClaims
}

func AdminLogin(c *gin.Context) {
	var req struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}
	if err := c.BindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	var storedHash string
	err := db.DB.QueryRow(context.Background(), "SELECT password_hash FROM admins WHERE username=$1", req.Username).Scan(&storedHash)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}
	if bcrypt.CompareHashAndPassword([]byte(storedHash), []byte(req.Password)) != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	// Generate JWT
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, Claims{Username: req.Username})
	tokenString, _ := token.SignedString(jwtSecret)
	c.JSON(http.StatusOK, gin.H{"token": tokenString})
}

// AdminRegister registers a new admin. Requires a registration code via JSON `code`.
func AdminRegister(c *gin.Context) {
	var req struct {
		Username string `json:"username"`
		Password string `json:"password"`
		Code     string `json:"code"`
	}
	if err := c.BindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	regCode := os.Getenv("ADMIN_REG_CODE")
	if regCode == "" {
		regCode = "letmein"
	}
	if req.Code != regCode {
		c.JSON(http.StatusForbidden, gin.H{"error": "Invalid registration code"})
		return
	}

	// Limit admins to 5
	var count int
	err := db.DB.QueryRow(context.Background(), "SELECT COUNT(*) FROM admins").Scan(&count)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "DB error"})
		return
	}
	if count >= 5 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Admin limit reached"})
		return
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
		return
	}

	var id int
	err = db.DB.QueryRow(context.Background(), "INSERT INTO admins (username, password_hash) VALUES ($1, $2) RETURNING id", req.Username, string(hash)).Scan(&id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"id": id, "username": req.Username})
}

func CreateBooking(c *gin.Context) {
	var booking models.Booking
	if err := c.BindJSON(&booking); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	_, err := db.DB.Exec(context.Background(),
		"INSERT INTO bookings (name, email, date, zone, whatsapp, nationality, shift, vehicle, num_people, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
		booking.Name, booking.Email, booking.Date, booking.Zone, booking.Whatsapp, booking.Nationality, booking.Shift, booking.Vehicle, booking.NumPeople, "Fresh")

	if err != nil {
		// Log the actual error
		println("Database error:", err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create booking: " + err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Booking created successfully",
		"booking": booking,
	})
}

func GetBookings(c *gin.Context) {
	// Add JWT auth middleware in prod
	rows, err := db.DB.Query(context.Background(), "SELECT id, name, email, TO_CHAR(date, 'YYYY-MM-DD'), zone, whatsapp, nationality, shift, vehicle, num_people, status FROM bookings ORDER BY id DESC")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()
	var bookings []models.Booking
	for rows.Next() {
		var b models.Booking
		err := rows.Scan(&b.ID, &b.Name, &b.Email, &b.Date, &b.Zone, &b.Whatsapp, &b.Nationality, &b.Shift, &b.Vehicle, &b.NumPeople, &b.Status)
		if err != nil {
			println("Scan error in GetBookings:", err.Error())
			continue
		}
		bookings = append(bookings, b)
	}
	if err := rows.Err(); err != nil {
		println("Row iteration error:", err.Error())
	}
	c.JSON(http.StatusOK, bookings)
}

func GetBooking(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	var b models.Booking
	err := db.DB.QueryRow(context.Background(), "SELECT id, name, email, TO_CHAR(date, 'YYYY-MM-DD'), zone, whatsapp, nationality, shift, vehicle, num_people, status FROM bookings WHERE id=$1", id).Scan(&b.ID, &b.Name, &b.Email, &b.Date, &b.Zone, &b.Whatsapp, &b.Nationality, &b.Shift, &b.Vehicle, &b.NumPeople, &b.Status)
	if err != nil {
		println("Scan error in GetBooking:", err.Error())
		c.JSON(http.StatusNotFound, gin.H{"error": "Not found or scan error: " + err.Error()})
		return
	}
	c.JSON(http.StatusOK, b)
}

func UpdateBooking(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	var booking models.Booking
	if err := c.BindJSON(&booking); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	_, err := db.DB.Exec(context.Background(), "UPDATE bookings SET name=$1, email=$2, date=$3, zone=$4, whatsapp=$5, nationality=$6, shift=$7, vehicle=$8, num_people=$9, status=$10 WHERE id=$11", booking.Name, booking.Email, booking.Date, booking.Zone, booking.Whatsapp, booking.Nationality, booking.Shift, booking.Vehicle, booking.NumPeople, booking.Status, id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, booking)
}

func DeleteBooking(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	_, err := db.DB.Exec(context.Background(), "DELETE FROM bookings WHERE id=$1", id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.Status(http.StatusNoContent)
}
