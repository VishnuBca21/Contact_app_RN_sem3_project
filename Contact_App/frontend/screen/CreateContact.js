import React, { useState, useContext } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import Click from "../components/Click";
import TextBox from "../components/TextBox";
import Top from "../components/Top";
import { create } from "apisauce";
import Loading from "../components/Loading";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "./UserContaxt";

export default function CreateContact() {
  const userContext = useContext(UserContext)
  const nav = useNavigation();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [place, setPlace] = useState("");
  const [data, setData] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const changeName = (e) => {
    setName(e.target.value);
  };
  const changeplace = (e) => {
    setPlace(e.target.value);
  };
  const changeEmail = (e) => {
    setEmail(e.target.value);
  };
  const changePhone = (e) => {
    setPhone(e.target.value);
  };

  const output = async () => {
    setLoading(true);
    let token = userContext.user[0].token;
    const api = create({
      baseURL: "http://localhost:2000/api/contact",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "x-auth-token": token
      },
    });
    let result = await api.post(
      "/createcontact",
      `name=${name}&phone=${phone}&email=${email}&place=${place}`
    );
    setTimeout(() => setLoading(false), 1000);

    if (result.data.success != undefined) {
      setData(result.data.success);
      setName("");
      setPhone("");
      setEmail("");
      setPlace("");
      setTimeout(() => setData(""), 3000);
    } else {
      setMessage(result.data.message);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const back = ()=>{
    nav.navigate("Contact")
  }

  return (
    <View style={styles.container}>
      <Top title="CREATE CONTACT" icon="arrowleft" color={"#fff"} onPress={back}/>
      {loading ? 
         <View style={styles.loading}>
         <Loading />
       </View>
       : (
        <>
          <View style={styles.main}>
            <Text style={styles.head}>Create Contact</Text>
            <TextBox
              placeholder="Name"
              text="Name"
              onChange={changeName}
              value={name}
            />
            <TextBox
              placeholder="Phone Number"
              text="Phone"
              onChange={changePhone}
              value={phone}
            />
            <TextBox
              placeholder="Email"
              text="Email ID"
              onChange={changeEmail}
              value={email}
            />
            <TextBox
              placeholder="Place"
              text="Place"
              onChange={changeplace}
              value={place}
            />
            <Text style={[styles.err, styles.message]}>{message}</Text>
            <Text style={[styles.success, styles.message]}>{data}</Text>
          </View>
          <View style={styles.clickContainer}>
            <Click
              buttonStyle={styles.button}
              textStyle={styles.text}
              text="SUBMIT"
              onPress={output}
            ></Click>
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
    flex: 0.8,
    width: "90%",
    alignItems: "center",
    marginBottom: "1rem",
  },
  head: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#807edd",
    margin: ".5rem",
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
  message: {
    margin: "1rem",
    fontSize: "1rem",
    fontWeight: "bold",
  },
  err: {
    color: "red",
  },
  success: {
    color: "green",
  },
});
