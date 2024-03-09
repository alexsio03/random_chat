package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

type textMsg struct {
  Text string   `json:"text"`
  Id   string   `json:"id"`
}

func main() {
	http.HandleFunc("/ws", wsHandler)
	fmt.Println("listening on port 4000")
	log.Fatal(http.ListenAndServe(":4000", nil))
}

func wsHandler(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}
	defer conn.Close()

	for {
		messageType, message, err := conn.ReadMessage()
		if err != nil {
			log.Println(err)
			return
		}

		textString := string(message)
		if textString[0] == '{' {
      text_msg := textMsg{}

			err = json.Unmarshal(message, &text_msg)
			if err != nil {
				fmt.Println(err)
			}

			fmt.Println(text_msg)

		} else {
			fmt.Println(textString)
		}

		err = conn.WriteMessage(messageType, message)
		if err != nil {
			log.Println(err)
			return
		}
	}
}
