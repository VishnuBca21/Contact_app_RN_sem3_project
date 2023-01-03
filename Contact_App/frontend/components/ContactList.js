import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Delete from "react-native-vector-icons/MaterialCommunityIcons";
import Edit from "react-native-vector-icons/MaterialIcons";

export default function ContactList({ name, email, place,phone, id, deleteContact, editContact }) {
  const [display, setDisplay] = useState(false);

  const view = () => {
    setDisplay(!display);
  };
  return (
    <TouchableOpacity style={styles.contactBox} onPress={view}>
      <EvilIcons size={50} name="user" color={"#4679ee"} />
      <View style={styles.separeator} />
      <View style={styles.container}>
        <View>
          <Text style={styles.text}>{name}</Text>
        </View>
        <View
          style={[
            styles.additional,
            display ? { display: "" } : { display: "none" },
          ]}
        >
          <View>
            <Text style={styles.subContent}>{phone}</Text>
            <Text style={styles.subContent}>{email}</Text>
            <Text style={styles.subContent}>{place}</Text>
          </View>
          <View>
            <TouchableOpacity style={styles.iconContainer} onPress={()=>deleteContact(id)}>
              <Delete
                style={[styles.subContent, { fontSize: "1rem" }]}
                name={"delete"}
                color="#e65500"
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconContainer} onPress={()=>{editContact(id)}}>
              <Edit
                style={[styles.subContent, { fontSize: "1rem" }]}
                name={"edit"}
                color="#4679ee"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  contactBox: {
    backgroundColor: "#e6e6e6",
    width: "100%",
    paddingHorizontal: "1rem",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: "1rem",
    fontWeight: "bold",
    color: "black",
    marginHorizontal: 20,
  },
  container: {
    width: "70%",
  },
  separeator: {
    marginLeft: "1rem",
    width: 1,
    height: "100%",
    backgroundColor: "#fff",
  },
  additional: {
    width: "100%",
    marginHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  subContent: {
    marginVertical: "0.5rem",
  },
  iconContainer: {
    marginVertical: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "25px",
    height: "25px",
    borderRadius: "25px",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
});
