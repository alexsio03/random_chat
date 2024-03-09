import {
	StyleSheet,
	Text,
	SafeAreaView,
	TextInput,
	Pressable,
} from "react-native";
import React, { useState } from "react";
import uuid from "react-native-uuid";

export default function App() {
	const [text, setText] = useState("");
	const [messages, setMessages] = useState(text_msgs);
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
        console.log(event.data)
				let message = JSON.parse(event.data);
				if (message.id == id) {
					text_msgs.push({ type: "me", text: message.text });
				} else {
					text_msgs.push({ type: "them", text: message.text });
				}
				let new_msgs = [...text_msgs];
				setMessages(new_msgs);
			}
		});
	}, []);

	const handleSend = () => {
		console.log(text);
		socket.send(JSON.stringify({ text: text, id: id }));
		setText("");
	};

	return (
		<SafeAreaView style={styles.container}>
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
