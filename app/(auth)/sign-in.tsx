import { router, Stack } from 'expo-router';
import { Text, View } from '@/components/Themed';

import { useSession } from './ctx';
import React from 'react';

import { TextInput } from 'react-native';
import LoginScreen from "@/components/Authentication/LoginScreen";
import SocialButton from "@/components/Authentication/components/social-button/SocialButton";
import emailValidator from "@/components/Authentication/helpers/emailValidator";
import passwordValidator from "@/components/Authentication/helpers/passwordValidator";

export default function SignIn() {
  // const { signIn } = useSession();

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [repassword, setRePassword] = React.useState('');

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

      <LoginScreen
        logoImageSource={require('@/assets/images/logo-example.png')}
        onLoginPress={() => {}}
        onSignupPress={() => {}}
        onEmailChange={setUsername}
        loginButtonText={'Create an account'}
        disableSignup
        textInputChildren={
          <View style={{marginTop: 16}}>
            <TextInput
              placeholder="Re-Password"
              secureTextEntry
              onChangeText={setRePassword}
            />
          </View>
        }
        onPasswordChange={setPassword}
      />

    </View>
  );
}