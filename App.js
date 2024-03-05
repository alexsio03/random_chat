import { StyleSheet, Text, SafeAreaView, TextInput } from "react-native";

export default function App() {
	return (
		<SafeAreaView style={styles.container}>
			<Texts
				texts={text_msgs}
			/>
			<TextInput style={styles.input} placeholder="Send a message" />
		</SafeAreaView>
	);
}

const Texts = ({ texts }) => (
	<SafeAreaView style={styles.texts}>
		{texts.map((value) =>
			value.type === "me" ? (
				<SafeAreaView style={styles.me}>
					<Text style={styles.me_text}>{value.text}</Text>
				</SafeAreaView>
			) : (
				<SafeAreaView style={styles.them}>
					<Text style={styles.them_text}>{value.text}</Text>
				</SafeAreaView>
			),
		)}
	</SafeAreaView>
);

const text_msgs = [
  {type: "them", text: "Hello there!"},
  {type: "me", text: "Hi!"},
  {type: "me", text: "How are you?"},
  {type: "them", text: "Very well, thank you."},
  {type: "them", text: "And you?"},
]

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		backgroundColor: "#ddd",
		alignItems: "center",
		justifyContent: "flex-end",
		paddingBottom: 40,
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
