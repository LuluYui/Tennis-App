import { Redirect, router, Stack } from 'expo-router';
import { Text, View } from '@/components/Themed';

import { useSession } from '../../components/Authentication/ctx';
import React, {useEffect} from 'react';

import { TextInput } from 'react-native';
import LoginScreen from "@/components/Authentication/LoginScreen";
import SocialButton from "@/components/Authentication/components/social-button/SocialButton";
import emailValidator from "@/components/Authentication/helpers/emailValidator";
import passwordValidator from "@/components/Authentication/helpers/passwordValidator";
import TextButton from '@/components/Authentication/components/text-button/textbutton';
import { app, auth, db } from '@/firebase/authentication'
import { onAuthStateChanged, signInWithEmailAndPassword, User } from 'firebase/auth';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { appColors } from '@/constants/Colors';

export default function SignIn() {
  const { signIn } = useSession();
  const [email, setEmail] = React.useState('test@test.com');
  const [password, setPassword] = React.useState('123456');
  const [repassword, setRepassword] = React.useState('');
  const [user, setUser] = React.useState<User>();
  const colorScheme = useColorScheme();
  const [darkColor, setDarkColor] = React.useState(Colors.dark.background);

  const redirectRegisterPage = () => {
    router.push('/registration');
  }

  useEffect(() => {
    if(user) {
      router.replace('/')
    }
  }, [user])

  return (
    <View style={{ flex: 1}} >
        <LoginScreen
          logoImageSource={require('@/assets/images/logo-example.png')}
          darkColor={`${darkColor}`}
          onLoginPress={() => {
            signIn(email, password);
            onAuthStateChanged(auth, (currentUser) => {
              if(currentUser) {
                setUser(currentUser);
              }
            });
          }}
          onSignupPress={redirectRegisterPage}
          onEmailChange={setEmail}
          loginButtonText={'Login'}
          disableDivider
          disableRepassword
          disableSocialButtons
          emailTextInputProps={{
            style: {
            }
          }}
          passwordTextInputProps={{
            style: {
            }
          }}
          loginButtonStyle={{
              maxWidth: 282,
          }}
          textInputChildren={
            <View style={{
                marginTop: 12, 
                alignSelf: 'center', 
                justifyContent:  'center',
                width: 282,
              }}
              darkColor={darkColor}
              >
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