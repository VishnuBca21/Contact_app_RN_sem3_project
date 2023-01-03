
import { Text, View, StyleSheet,TextInput,TouchableOpacity, Image } from 'react-native';

export default function Detail({heading, value1, value2, value3}){

  return(
    <View style={styles.deatailContainer}>
        <View style={styles.head}>
          <Text style={[styles.text,{color:"#2c78e4"}]}>{heading}</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.deatail}>{value1}</Text>
          <Text style={styles.deatail}>{value2}</Text>
          <Text style={styles.deatail}>{value3}</Text>
        </View>
      </View>
  )
}

const styles= StyleSheet.create({
  deatailContainer:{
    display:"flex",
    justifyContent:"start",
    width:"90%",
    padding: '1rem',
    margin:"1rem",
    borderRadius:"10px",
    backgroundColor:"#f7f7fa"
  },
  text: {
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  head:{
    marginLeft: "1rem",
    marginBottom:".5rem"
  },
  body:{
    marginLeft: "1rem"
  },
  deatail:{
    fontSize: "1rem",
  }
})
