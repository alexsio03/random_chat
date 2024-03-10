import {
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
  Pressable,
  Modal,
} from "react-native";
import React, { useState } from "react";
import uuid from "react-native-uuid";

export default function App() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState(text_msgs);
  const [username, setUsername] = useState("");
  const [visible, setVisible] = useState(true);
  const id = React.useRef(uuid.v4()).current;
  var socket = React.useRef(new WebSocket("ws://localhost:4000/ws")).current;

  React.useEffect(() => {
    socket.addEventListener("open", (event) => {
      socket.send("User connected: " + id);
    });

    socket.addEventListener("message", (event) => {
      if (event.data[0] != "{") {
        console.log(event.data);
      } else {
        console.log(event.data);
        let message = JSON.parse(event.data);
        if (message.id == id) {
          text_msgs.push({ type: "me", text: message.text });
        } else {
          text_msgs.push({
            type: "them",
            text: message.text,
            username: message.username,
          });
        }
        let new_msgs = [...text_msgs];
        setMessages(new_msgs);
      }
    });
  }, []);

  const handleSend = () => {
    console.log(text);
    socket.send(JSON.stringify({ text: text, id: id, username: username }));
    setText("");
  };

  const handleModal = () => {
    setVisible(false);
    setUsername(text);
    setText("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Modal visible={visible}>
        <SafeAreaView style={styles.modal_back}>
          <SafeAreaView style={styles.modal}>
            <Text>Enter username: </Text>
            <SafeAreaView style={styles.form}>
              <TextInput
                value={text}
                style={styles.input}
                onChangeText={(newText) => setText(newText)}
                placeholder="Username"
              ></TextInput>
              <Pressable style={styles.send} onPress={handleModal}>
                <Text style={styles.send_text}>></Text>
              </Pressable>
            </SafeAreaView>
          </SafeAreaView>
        </SafeAreaView>
      </Modal>
      <Texts texts={messages} />
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
          <SafeAreaView style={styles.me_text_bubble}>
            <Text style={styles.me_text}>{value.text}</Text>
          </SafeAreaView>
        </SafeAreaView>
      ) : (
        <SafeAreaView key={key} style={styles.them}>
          <SafeAreaView style={styles.them_bubble}>
            <Text style={styles.username}>{value.username}</Text>
            <SafeAreaView style={styles.them_text_bubble}>
              <Text style={styles.them_text}>{value.text}</Text>
            </SafeAreaView>
          </SafeAreaView>
        </SafeAreaView>
      ),
    )}
  </SafeAreaView>
);

const text_msgs = [];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#ddd",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 40,
  },
  modal_back: {
    backgroundColor: "#aaa",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "white",
    width: "60%",
    height: "12%",
    borderRadius: 20,
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
    alignItems: "center",
    justifyContent: "center",
  },
  send_text: {
    color: "#fff",
  },
  texts: {
    width: 380,
  },
  them_text_bubble: {
    borderRadius: 10,
    backgroundColor: "#aaa",
    margin: 3,
  },
  them: {
    overflow: "hidden",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  them_bubble: {
    flexDirection: "column",
  },
  username: {
    fontSize: 10,
    color: "gray",
    marginLeft: 5,
  },
  them_text: {
    padding: 5,
    color: "#fff",
    margin: 5,
  },
  me_text_bubble: {
    borderRadius: 10,
    backgroundColor: "#1446eb",
    margin: 3,
  },
  me: {
    overflow: "hidden",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  me_text: {
    color: "#fff",
    padding: 5,
    margin: 5,
  },
  input: {
    marginTop: 10,
    backgroundColor: "#eee",
    width: "70%",
    padding: 10,
    borderRadius: 10,
  },
});
