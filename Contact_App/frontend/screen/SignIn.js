import React, { useState, useContext } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import Click from "../components/Click";
import TextBox from "../components/TextBox";
import { create } from "apisauce";
import Top from "../components/Top";
import Loading from "../components/Loading";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "./UserContaxt";

export default function SignIn() {
  const nav = useNavigation();
  const userContext = useContext(UserContext);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const changeUserName = (e) => {
    setUserName(e.target.value);
  };
  const changePassword = (e) => {
    setPassword(e.target.value);
  };
  const output = async () => {
    setLoading(true);
    const api = create({
      baseURL: "http://localhost:2000/api/user",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    let result = await api.post(
      "/login",
      `userName=${userName}&password=${password}`
    );
    setTimeout(() => setLoading(false), 1000);
    if (result.data.token != undefined) {
      setData(result.data.token);
      console.log(data);
      userContext.user.push(result.data)
      console.log(userContext.user)
      nav.navigate("Contact")
    } else {
      setMessage(result.data.message);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <View style={styles.container}>
      <Top title="Sign In" />
      {loading ? (
        <View style={styles.loading}>
          <Loading />
        </View>
      ) : (
        <>
          <View style={styles.main}>
            <Text style={styles.head}>Letz Start</Text>
            <TextBox
              placeholder="Username"
              text="Username"
              onChange={changeUserName}
              value={userName}
            />
            <TextBox
              placeholder="Password"
              text="Password"
              secure={true}
              onChange={changePassword}
              value={password}
            />
            <Text style={styles.err}>{message}</Text>
          </View>
          <View style={styles.clickContainer}>
            <Click
              buttonStyle={styles.button}
              textStyle={styles.text}
              text={loading ? "Please wait..." : "Sign in"}
              onPress={output}
            />
            <Text onPress={()=>nav.navigate("Register")}>New to LetzConnect? Create New Account</Text>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loading:{
    flex:1,
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    width:"100%"
  },
  main: {
    flex: 0.5,
    width: "90%",
    alignItems: "center",
    marginBottom: "1rem",
  },
  head: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#807edd",
    marginHorizontal: ".5rem",
    marginBottom: "1rem",
  },
  clickContainer: {
    width: "90%",
    marginBottom: "1rem",
    bottom: 0,
    textAlign: "center",
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4679ee",
    width: "100%",
    height: 40,
    marginBottom: "1rem",
  },
  text: {
    fontSize: "1rem",
    fontWeight: "bold",
    color: "#fff",
  },
  err: {
    color: "red",
    margin: "1rem",
    fontSize: "1rem",
    fontWeight: "bold",
  },
});
