import { router, Stack } from 'expo-router';
import { Text, View } from '@/components/Themed';

import { useSession } from './ctx';
import React, {useEffect} from 'react';

import { TextInput } from 'react-native';
import LoginScreen from "@/components/Authentication/LoginScreen";
import SocialButton from "@/components/Authentication/components/social-button/SocialButton";
import emailValidator from "@/components/Authentication/helpers/emailValidator";
import passwordValidator from "@/components/Authentication/helpers/passwordValidator";
import TextButton from '@/components/Authentication/components/text-button/textbutton';
import { app, auth, db } from '@/firebase/authentication'
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';

export default function SignIn() {
  // const { signIn } = useSession();

  const [email, setEmail] = React.useState('test@test.com');
  const [password, setPassword] = React.useState('123456');
  const [repassword, setRepassword] = React.useState('');

  const emailTextInputProps = {
          style: {
            maxWidth: 768,
          },
        };

  const redirectRegisterPage = () => {
    router.push('/registration');
  }

  // useEffect(() => {
  //   console.log(password + ' ' + username)
  // });
  
  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user)
        console.log('signed in successfully')
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }
  
  const checkAuth = () => {
    if (auth) {
      
      onAuthStateChanged(auth, (user) => {
        console.log(user)
        
        if (user) {
          console.log('User is signed in:', user);
        } else {
          console.log('No user is signed in.');
        }
      });
    }
  }

  return (

    <View style={{ flex: 1 }} >
        <LoginScreen
          logoImageSource={require('@/assets/images/logo-example.png')}
          onLoginPress={() => {
            signIn();
            checkAuth();
            // router.replace('/')
          }}
          onSignupPress={redirectRegisterPage}
          onEmailChange={setEmail}
          loginButtonText={'Login'}
          disableDivider
          disableRepassword
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
          > 
          </LoginScreen>
      </View>

  );
}