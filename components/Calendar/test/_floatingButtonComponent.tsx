import React from 'react';
import { Pressable, View, StyleSheet, Text } from 'react-native';
import { Link } from 'expo-router';
      // Define what happens when the button is pressed
      // 1. Pop up box for inputing new gameScore 
      // 2. input type checking 
      // 3. trigger new add_gameScore fetch call 
      // 4. retrieve successful alert messages or media 

const FloatingButton = () => {
    
    return (
        <Link href="/add_gameScore_screen" asChild>
            <Pressable style={styles.button} >
                <Text style={styles.buttonText}>+</Text>
            </Pressable>
        </Link>
    );
};

const styles = StyleSheet.create({
    button: {
      position: 'absolute',
      bottom: 20, // Adjust as needed
      right: 25,  // Adjust as needed
      width: 60,
      height: 60,
      borderRadius: 30, // To make it circular
      backgroundColor: '#87CFFF', // Change color as needed
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5, // For Android shadow
      shadowColor: 'black', // For iOS shadow
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
    },
    buttonText: {
        color: '#FFF', // Text color
        fontSize: 24,   // Text size
    },
});

export default FloatingButton;