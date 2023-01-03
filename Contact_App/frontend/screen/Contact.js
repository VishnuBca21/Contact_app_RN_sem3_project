import React, { useEffect, useState, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { create } from "apisauce";
import Top from "../components/Top";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import EntypoIcons from "react-native-vector-icons/Entypo";
import ContactList from "../components/ContactList";
import Loading from "../components/Loading";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "./UserContaxt";


export default function Contact() {
  const nav = useNavigation();
  const userContext = useContext(UserContext);

  const [data, setData] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  let token = userContext.user[0].token;

  const output = async () => {
    setLoading(true);
    const api = create({
      baseURL: "http://localhost:2000/api/contact",
      headers: { "x-auth-token": token },
    });
    let result = await api.get("/getcontact");
    setTimeout(() => setLoading(false), 1000);
    if (result.data.length == 0) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
      setData(result.data);
    }
  };

  useEffect(() => {
    output();
  }, []);

  const deleteContact = async (id) => {
    alert("Do You want to delete contact")
    const api = create({
      baseURL: "http://localhost:2000/api/contact",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "x-auth-token": token,
      },
    });
    let result = await api.post("/deletecontact", `_id=${id}`);
    setMessage(result.data.message);
    setTimeout(() => setMessage(""), 4000);
    output();
  };

  const editContact = (contactId)=>{
    userContext.user.push({contactId})
    nav.navigate("EditContact")
  } 

  const logout = ()=>{
    userContext.user = []
    nav.navigate("SignIn")
  }

  return (
    <View style={styles.container}>
      <Top title="Contact" icon="logout" color={"#fff"} onPress={logout}/>
      <TouchableOpacity onPress={() => nav.navigate("Profile")}>
        <EvilIcons style={styles.icon} name="user" color="#fff" />
      </TouchableOpacity>
      {loading ? (
        <View style={styles.loading}>
          <Loading />
        </View>
      ) : (
        <View style={styles.main}>
          {isEmpty ? (
            <View style={styles.loading}>
              <Image
                source={require("../assets/empty.gif")}
                style={{ width: "100%", height: "50%" }}
              />
              <Text style={[styles.text, { color: "#e65500" }]}>
                Contact is empty
              </Text>
            </View>
          ) : (
            <FlatList
              data={data}
              keyExtractor={(contact) => contact._id.toString()}
              renderItem={({ item }) => (
                <ContactList
                  name={item.name}
                  email={item.email}
                  place={item.place}
                  phone={item.phone}
                  id={item._id}

                  deleteContact={deleteContact}
                  editContact = {editContact}
                />
              )}
              ItemSeparatorComponent={() => (
                <View style={{ width: "100%", height: 10 }} />
              )}
            />
          )}
          {message != "" ? (
            <View style={styles.messageContainer}>
              <Text style={styles.message}>{message}</Text>
            </View>
          ) : (
            <></>
          )}
          <TouchableOpacity
            style={styles.add}
            onPress={() => nav.navigate("CreateContact")}
          >
            <EntypoIcons size={40} name="plus" color="#4679ee" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  icon: {
    position: "absolute",
    right: 15,
    fontSize: "2.5rem",
  },
  main: {
    marginTop: "2.5rem",
    flex: 1,
    width: "100%",
  },
  text: {
    fontSize: "1rem",
    fontWeight: "bold",
    color: "#fff",
  },
  messageContainer: {
    alignSelf: "center",
    position: "fixed",
    borderRadius: "50px",
    bottom: 70,
    backgroundColor: "#4679ee",
  },
  message: {
    color: "#fff",
    margin: "1rem",
    fontSize: "1rem",
    fontWeight: "bold",
    alignSelf: "center",
  },
  add: {
    right: 25,
    bottom: 70,
    position: "fixed",
    justifyContent: "center",
    alignItems: "center",
    width: "50px",
    height: "50px",
    borderRadius: "100px",
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
