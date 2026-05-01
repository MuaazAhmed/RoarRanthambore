package handlers

import (
	"context"
	"net/http"
	"ranthambhore-booking-app/backend/db"
	"ranthambhore-booking-app/backend/models"

	"github.com/gin-gonic/gin"
)

// CreateContactMessage handles POST /api/contact – public endpoint
func CreateContactMessage(c *gin.Context) {
	var msg models.ContactMessage
	if err := c.BindJSON(&msg); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if msg.Name == "" || msg.Email == "" || msg.Message == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "name, email and message are required"})
		return
	}

	var id int
	err := db.DB.QueryRow(context.Background(),
		"INSERT INTO contact_messages (name, email, message) VALUES ($1, $2, $3) RETURNING id",
		msg.Name, msg.Email, msg.Message,
	).Scan(&id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save message: " + err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Message received", "id": id})
}

// GetContactMessages handles GET /api/contact – admin only
func GetContactMessages(c *gin.Context) {
	rows, err := db.DB.Query(context.Background(),
		"SELECT id, name, email, message, is_read, created_at FROM contact_messages ORDER BY id DESC")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()

	messages := make([]models.ContactMessage, 0)
	for rows.Next() {
		var m models.ContactMessage
		if err := rows.Scan(&m.ID, &m.Name, &m.Email, &m.Message, &m.IsRead, &m.CreatedAt); err != nil {
			continue
		}
		messages = append(messages, m)
	}

	c.JSON(http.StatusOK, messages)
}

// MarkContactMessageRead handles PUT /api/contact/:id/read – admin only
func MarkContactMessageRead(c *gin.Context) {
	id := c.Param("id")
	_, err := db.DB.Exec(context.Background(),
		"UPDATE contact_messages SET is_read=TRUE WHERE id=$1", id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Marked as read"})
}

// DeleteContactMessage handles DELETE /api/contact/:id – admin only
func DeleteContactMessage(c *gin.Context) {
	id := c.Param("id")
	_, err := db.DB.Exec(context.Background(),
		"DELETE FROM contact_messages WHERE id=$1", id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.Status(http.StatusNoContent)
}
