package models

type Booking struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	Email       string `json:"email"`
	Date        string `json:"date"`
	Zone        string `json:"zone"`
	Whatsapp    string `json:"whatsapp"`
	Nationality string `json:"nationality"`
	Shift       string `json:"shift"`
	Vehicle     string `json:"vehicle"`
	NumPeople   int    `json:"num_people"`
	Status      string `json:"status"`
}
