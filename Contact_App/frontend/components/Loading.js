import React from 'react';
import { Image } from 'react-native';

export default function Loading(){
    return(
        <Image
          source={require("../assets/loading.gif")}
          style={{ width: "100%", height: "50%", alignSelf:"center" }}
        />
    )
}