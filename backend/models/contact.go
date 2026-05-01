package models

import "time"

type ContactMessage struct {
	ID        int       `json:"id"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	Message   string    `json:"message"`
	CreatedAt time.Time `json:"created_at"`
	IsRead    bool      `json:"is_read"`
}
