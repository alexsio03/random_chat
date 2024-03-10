package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"sync"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

type textMsg struct {
	Text string `json:"text"`
	Id   string `json:"id"`
	Username string `json:"username"`
}

type room struct {
	clients map[*websocket.Conn]bool
	sync.RWMutex
}

func newRoom() *room {
	return &room{
		clients: make(map[*websocket.Conn]bool),
	}
}

func (r *room) addClient(conn *websocket.Conn) {
	r.Lock()
	defer r.Unlock()
	r.clients[conn] = true
}

func (r *room) removeClient(conn *websocket.Conn) {
	r.Lock()
	defer r.Unlock()
	delete(r.clients, conn)
}

func (r *room) broadcast(msg []byte) {
	r.RLock()
	defer r.RUnlock()
	for conn := range r.clients {
		err := conn.WriteMessage(websocket.TextMessage, msg)
		if err != nil {
			log.Println("Error broadcasting message:", err)
			r.removeClient(conn)
			conn.Close()
		}
	}
}

func main() {
	room := newRoom()
	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		conn, err := upgrader.Upgrade(w, r, nil)
		if err != nil {
			log.Println("Error upgrading to WebSocket:", err)
			return
		}
		defer conn.Close()

		room.addClient(conn)

		for {
			_, message, err := conn.ReadMessage()
			if err != nil {
				log.Println("Error reading message:", err)
				room.removeClient(conn)
				return
			}

			textString := string(message)
			if textString[0] == '{' {
				textMsg := textMsg{}
				err = json.Unmarshal(message, &textMsg)
				if err != nil {
					log.Println("Error decoding JSON:", err)
					continue
				}
			}
			room.broadcast(message)
		}
	})

	fmt.Println("listening on port 4000")
	log.Fatal(http.ListenAndServe(":4000", nil))
}
