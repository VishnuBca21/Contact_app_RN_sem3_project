import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

export default function Top({title,icon,color, onPress}) {
  return (
    <View style={styles.top}>
      <TouchableOpacity style={styles.iconContainer} onPress={()=>onPress()}>
        <Icon style={styles.icon} name={icon} color={color} />
      </TouchableOpacity>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    top: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: "40px",
        width: "100%",
        position: "absolute",
        top: 0,
        textAlign: "center",
        backgroundColor: "#4679ee",
      },
      iconContainer: {
        position: "absolute",
        left: 10,
      },
      icon:{
        fontSize: "1.5rem",
      },
      text: {
        fontSize: "1rem",
        fontWeight: "bold",
        color: "#fff",
      },
})