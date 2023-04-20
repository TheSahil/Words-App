import { Text, View } from "react-native";
import { Input, Button, ListItem } from "@rneui/themed";
import { v4 as uuidv4 } from "uuid";

export default function Results(props) {
  // console.log(props.data);
  return (
    <ListItem>
      {props.data.map((d) => {
        return (
          <Text>{d.word}</Text>
        );
      })}
    </ListItem>
  );
}
