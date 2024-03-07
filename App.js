import {
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

export default function App() {
  const [text, setText] = useState("");
  const socket = io("http://localhost:4000");
  useEffect(() => {
    // Event listener for connection
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    // Event listener for 'msg' event
    socket.on("text", (msg) => {
      console.log("Received message from server:", msg);
    });

    // Clean up
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSend = () => {
    console.log(text);
    socket.emit("text", text);
    setText("");
  };

  socket.on("msg", (res) => {
    console.log("Res: ", res);
  });

  return (
    <SafeAreaView style={styles.container}>
      <Texts texts={text_msgs} />
      <SafeAreaView style={styles.form}>
        <TextInput
          value={text}
          style={styles.input}
          onChangeText={(newText) => setText(newText)}
          placeholder="Send a message"
        />
        <Pressable style={styles.send} onPress={handleSend}>
          <Text style={styles.send_text}>Send</Text>
        </Pressable>
      </SafeAreaView>
    </SafeAreaView>
  );
}

const Texts = ({ texts }) => (
  <SafeAreaView style={styles.texts}>
    {texts.map((value, key) =>
      value.type === "me" ? (
        <SafeAreaView key={key} style={styles.me}>
          <Text style={styles.me_text}>{value.text}</Text>
        </SafeAreaView>
      ) : (
        <SafeAreaView key={key} style={styles.them}>
          <Text style={styles.them_text}>{value.text}</Text>
        </SafeAreaView>
      ),
    )}
  </SafeAreaView>
);

const text_msgs = [
  { type: "them", text: "Hello there!" },
  { type: "me", text: "Hi!" },
  { type: "me", text: "How are you?" },
  { type: "them", text: "Very well, thank you." },
  { type: "them", text: "And you?" },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#ddd",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 40,
  },
  form: {
    flexDirection: "row",
  },
  send: {
    width: 40,
    marginLeft: 10,
    marginTop: 13,
    height: 30,
    borderRadius: 10,
    backgroundColor: "#4287f5",
  },
  send_text: {
    marginTop: 6,
    marginLeft: 3,
    color: "#fff",
  },
  texts: {
    width: 380,
  },
  them: {
    overflow: "hidden",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  them_text: {
    backgroundColor: "#aaa",
    padding: 10,
    color: "#fff",
    margin: 5,
  },
  me: {
    overflow: "hidden",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  me_text: {
    color: "#fff",
    padding: 10,
    margin: 5,
    backgroundColor: "#1446eb",
  },
  input: {
    marginTop: 10,
    backgroundColor: "#eee",
    width: 300,
    padding: 10,
    borderRadius: 10,
  },
});
