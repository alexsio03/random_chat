package main

import (
	"github.com/gorilla/websocket"
)

type Room struct {
  clients map[*websocket.Conn]bool
}

func newRoom() *Room {
	return &Room{
		clients:    make(map[*websocket.Conn]bool),
	}
}
