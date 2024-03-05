import { StyleSheet, Text, SafeAreaView, TextInput } from "react-native";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Texts
        texts={[
          { type: "me", text: "Hello there how are you!" },
          { type: "them", text: "Hi" },
        ]}
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
        <Text style={styles.them}>{value.text}</Text>
      ),
    )}
  </SafeAreaView>
);

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
    width: 380
  },
  them: {
    backgroundColor: "#aaa",
    padding: 10,
    color: "#fff",
    borderRadius: 30,
    margin: 5,
  },
  me: {
    borderRadius: 20,
    overflow: 'hidden'
  },
  me_text: {
    color: "#fff",
    padding: 10,
    margin: 5,
    backgroundColor: "#1446eb",
  },
  input: {
    backgroundColor: "#eee",
    width: 300,
    padding: 10,
    borderRadius: 10,
  },
});
