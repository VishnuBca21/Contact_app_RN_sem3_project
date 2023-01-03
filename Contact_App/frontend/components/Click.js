import { Text, TouchableOpacity } from 'react-native';

export default function Click({buttonStyle, text, textStyle, onPress}) {
  return (
    <TouchableOpacity style={{...buttonStyle}} onPress={()=>onPress()}>
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  );
}