import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Input, Button } from '@rneui/themed';
import { useState } from "react";
import Results from "./Results";
import axios from "axios";

const url = "https://mern.sghauri.com/words?rel_syn=";

var initSyn = [{ word: "home", score: { $numberInt: "7685" } }];

export default function App() {
  const [word, setWord] = useState("");
  const [synonyms, setSynonyms] = useState(initSyn);
  const [error,setError] = useState(-1);

  const getSynonyms = () => {
    const full_URL = url + word.toLowerCase();
    console.log(full_URL);

    axios
      .get(full_URL)
      .then((response) => {
        console.log(response.data);
        if(response.data.status === "true"){
          setError(1);
          setSynonyms(response.data.data);
        }else if(response.data.status === "false"){
          setError(0);
        }
      })
      .catch((error) => console.log(error));
  };

  const wordChangeHandler = (e) =>{
    if(e.target.value.length > 0){
      
    }
    setWord(e.target.value);
  }

  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter the word here"
        onChangeText={wordChangeHandler}
        value={word}
      ></Input>
      <StatusBar style="auto" />
      <Button onPress={getSynonyms} title="Get Synonyms" />
      {error > 0 && <Results data={synonyms} />}
      {error === 0 && <Text>No synonyms found!</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    minWidth: 300,
  },
  Button: {
    backgroundColor: "#2596be",
    background: "#2596be",
  },
});
