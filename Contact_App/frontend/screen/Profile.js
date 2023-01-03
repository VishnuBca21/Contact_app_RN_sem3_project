import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  Image,
  FlatList
} from "react-native";
import Detail from "../components/Deatail";
import Top from "../components/Top";
import { create } from "apisauce";
import Loading from "../components/Loading";
import Click from "../components/Click";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "./UserContaxt";

export default function Profile() {
  const nav = useNavigation();
  const userContext  = useContext(UserContext)
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  
  const output = async () => {
    setLoading(true);
    let token = userContext.user[0].token;
    const api = create({
      baseURL: "http://localhost:2000/api/user",
      headers: { "x-auth-token": token },
    });
    let result = await api.get("/getuser");
    setTimeout(() => setLoading(false), 1000);
    setData(result.data);
  };

  useEffect(() => {
    output();
  }, []);

  const back = ()=>{
    nav.navigate("Contact")
  }

  const goEditProfile = ()=>{
    nav.navigate("EditProfile")
  }
  
  return (
    <View style={styles.container}>
      <Top title="Profile" icon="arrowleft" color={"#fff"} onPress={back}/>
      {loading ? (
        <View style={styles.loading}>
          <Loading />
        </View>
      ) : (
        <View style={styles.main}>
            <Image
              source={require("../assets/profile.gif")}
              style={styles.image}
            />
          <FlatList
            data={data}
            keyExtractor={(user) => user._id.toString()}
            renderItem={({ item }) => (
              <Detail
                heading={"USER DEATAILS"}
                value1={item.userName}
                value2={item.email}
                value3={item.phone}
              />
            )}
          />
          <View style={styles.clickContainer}>
            <Click
              buttonStyle={styles.button}
              textStyle={styles.text}
              text="EDIT"
              onPress={goEditProfile}
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
    marginTop: "4rem",
    flex: 1,
    width: "100%",
  },
  image: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    alignSelf: "center",
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
});
