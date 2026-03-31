package db

import (
	"context"
	"fmt"
	"log"

	"github.com/jackc/pgx/v4/pgxpool"
)

var DB *pgxpool.Pool

func InitDB() {
	connString := "postgres://postgres:1397@localhost:5432/ranthambhore_db?sslmode=disable"
	config, err := pgxpool.ParseConfig(connString)
	if err != nil {
		log.Fatal("Unable to parse config:", err)
	}

	DB, err = pgxpool.ConnectConfig(context.Background(), config)
	if err != nil {
		log.Fatal("Unable to connect to database:", err)
	}
	fmt.Println("Connected to DB")

	// Ensure admins table exists
	_, err = DB.Exec(context.Background(), `
		CREATE TABLE IF NOT EXISTS admins (
			id SERIAL PRIMARY KEY,
			username TEXT UNIQUE NOT NULL,
			password_hash TEXT NOT NULL
		);
	`)
	if err != nil {
		log.Fatal("Failed to ensure admins table:", err)
	}

	// Ensure bookings table exists and has all columns
	_, err = DB.Exec(context.Background(), `
		CREATE TABLE IF NOT EXISTS bookings (
			id SERIAL PRIMARY KEY,
			name TEXT,
			email TEXT,
			date TEXT,
			zone TEXT
		);
	`)
	if err != nil {
		log.Fatal("Failed to ensure bookings table:", err)
	}

	// Add new columns if they do not exist
	alterQueries := []string{
		"ALTER TABLE bookings ADD COLUMN IF NOT EXISTS whatsapp TEXT;",
		"ALTER TABLE bookings ADD COLUMN IF NOT EXISTS nationality TEXT;",
		"ALTER TABLE bookings ADD COLUMN IF NOT EXISTS shift TEXT;",
		"ALTER TABLE bookings ADD COLUMN IF NOT EXISTS vehicle TEXT;",
		"ALTER TABLE bookings ADD COLUMN IF NOT EXISTS num_people INT;",
		"ALTER TABLE bookings ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'Fresh';",
	}

	for _, query := range alterQueries {
		_, err = DB.Exec(context.Background(), query)
		if err != nil {
			log.Println("Note: Could not run alter query (might be already existing or syntax issue depending on PG version):", err)
		}
	}

	// Cleanup empty statuses to 'Fresh'
	_, err = DB.Exec(context.Background(), "UPDATE bookings SET status='Fresh' WHERE status IS NULL OR status='';")
	if err != nil {
		log.Println("Note: Could not cleanup statuses:", err)
	}
}
