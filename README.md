# Random Chat App

This is a simple WebSocket chat app implemented in Go and React Native, using the Gorilla WebSocket library.

## Features

- Allows multiple chat rooms
- Handles multiple user connections simultaneously
- Simple JSON-based message format

## Setup

1. Clone this repository to your local machine:

```bash
git clone https://github.com/alexsio03/random_chat
```

2. Change directory
```bash
cd random_chat
```

3. In one terminal instance, run the server
```bash
cd random_chat/server
go mod tidy
go build
./server
```

4. In another terminal instance, run the expo app
```bash
npm run start
```

5. Open more emulators to handle multiple chatters

## License
This project is licensed under the MIT License.
