import React, { ReactNode, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';

export interface TextButtonProps { 
    style?: StyleProp<TextStyle>, 
    children: ReactNode,
    onTextButtonPress?: () => void,
}

const handlePress = () => {
    // Handle the logic for forgot password here
    console.log('Forgot Password clicked!');
};

const TextButton: React.FC<TextButtonProps>= ({ 
    style, 
    children,
    onTextButtonPress = handlePress,
    }) => {
  const [opacity, setOpacity] = useState(1);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onTextButtonPress}
        onPressIn={() => setOpacity(0.5)}
        onPressOut={() => setOpacity(1)}
        style={[styles.button, { opacity }]}
      >
        <Text style={[styles.buttonText, style]}>{children}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  button: {
    width: '100%'
  },
  buttonText: {
    fontSize: 12,
  },
});

export default TextButton;