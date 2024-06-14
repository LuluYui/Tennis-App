import { router, Stack } from 'expo-router';
import { Text, View } from '@/components/Themed';

import { useSession } from '../../components/Authentication/ctx';
import React, {useEffect} from 'react';

import { TextInput } from 'react-native';
import LoginScreen from "@/components/Authentication/LoginScreen";
import SocialButton from "@/components/Authentication/components/social-button/SocialButton";
import emailValidator from "@/components/Authentication/helpers/emailValidator";
import passwordValidator from "@/components/Authentication/helpers/passwordValidator";
import TextButton from '@/components/Authentication/components/text-button/textbutton';

export default function Registration() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [repassword, setRepassword] = React.useState('');
  console.log('re : ', repassword)
  console.log('password : ', password)

  return (

    <View style={{ flex: 1 }} >
        <LoginScreen
          logoImageSource={require('@/assets/images/logo-example.png')}
          onLoginPress={() => {}}
          onSignupPress={() => {}}
          onEmailChange={setEmail}
          loginButtonText={'Register'}
          disableSignup
          disableDivider
          disableSocialButtons
          emailTextInputProps={{
            style: {
              maxWidth: 282,
            }
          }}
          passwordTextInputProps={{
            style: {
              maxWidth: 282,
            }
          }}
          loginButtonStyle={{
              maxWidth: 282,
          }}
          // set forget password page 
          textInputChildren={
            <View style={{
                marginTop: 12, 
                backgroundColor: 'inherit',
                alignSelf: 'center', 
                justifyContent:  'center',
                width: 282,
              }}>
                  <TextButton 
                    style={{
                      alignSelf: 'flex-end',
                      color: "#acabb0",
                    }}>
                      Forget Password? </TextButton>
            </View>
          }
          onPasswordChange={setPassword}
          onRepasswordChange={setRepassword}
          > 
          </LoginScreen>
      </View>

  );
}