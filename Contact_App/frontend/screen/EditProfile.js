import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import Top from "../components/Top";
import { create } from "apisauce";
import Loading from "../components/Loading";
import Click from "../components/Click";
import TextBox from "../components/TextBox";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "./UserContaxt";

export default function EditProfile() {
  const userContext = useContext(UserContext);
  const nav = useNavigation();

  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  
  let token = userContext.user[0].token;

  const output = async () => {
    setLoading(true);
    const api = create({
      baseURL: "http://localhost:2000/api/user",
      headers: { "x-auth-token": token },
    });
    let result = await api.get("/getuser");
    setTimeout(() => setLoading(false), 1000);
    setData(result.data);
    setUserName(result.data[0].userName);
    setEmail(result.data[0].email);
    setPhone(result.data[0].phone);
  };

  useEffect(() => {
    output();
  }, []);

  const changeUserName = (e) => {
    setUserName(e.target.value);
  };
  const changeEmail = (e) => {
    setEmail(e.target.value);
  };
  const changePhone = (e) => {
    setPhone(e.target.value);
  };

  const edit = async () => {
    setLoading(true);
    const api = create({
      baseURL: "http://localhost:2000/api/user",
      headers: {
        "x-auth-token": token,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    let result = await api.put(
      "/updateuser",
      `userName=${userName}&email=${email}&phone=${phone}`
    );
    setTimeout(() => setLoading(false), 1000);
    if (result.data.result != undefined) {
      setData(result.data.result);
      setSuccess("Updated Successfuly")
      setTimeout(() => setSuccess(""), 3000);
    } else {
      setMessage(result.data.message);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  
  const back = ()=>{
    nav.navigate("Profile")
  }

  return (
    <View style={styles.container}>
      <Top title="Edit Profile" icon="arrowleft" color={"#fff"} onPress={back}/>
      {loading ? (
        <View style={styles.loading}>
            <Loading />
        </View>
      ) : (
        <View style={styles.main}>
          <FlatList
            style={styles.flatList}
            data={data}
            keyExtractor={(user) => user._id.toString()}
            renderItem={({ item }) => {
              return (
                <>
                  <TextBox
                    text="Username"
                    value={userName}
                    onChange={changeUserName}
                  />
                  <TextBox text="Email" value={email} onChange={changeEmail} />
                  <TextBox
                    text="Phone Number"
                    value={phone}
                    onChange={changePhone}
                  />
                  <Text style={[styles.err, styles.message]}>{message}</Text>
                  <Text style={[styles.success, styles.message]}>{success}</Text>
                </>
              );
            }}
          />
          <View style={styles.clickContainer}>
            <Click
              buttonStyle={styles.button}
              textStyle={styles.text}
              text="SUBMIT"
              onPress={() => edit()}
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading:{
    flex:1,
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    width:"100%"
  },
  main: {
    marginTop: "3rem",
    flex: 1,
    width: "100%",
  },
  flatList:{
    marginTop: "3rem",
    width:"90%",
    alignSelf:"center"
  },
  text: {
    fontSize: "1rem",
    fontWeight: "bold",
  },
  clickContainer: {
    alignSelf: "center",
    width: "90%",
    marginBottom: "1rem",
    bottom: "25%",
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
    textAlign:"center"
  },
  err: {
    color: "red",
  },
  success:{
    color: "green",
  }
});
