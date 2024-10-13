import { router } from 'expo-router';
import { Text, View } from '@/components/Themed';
import React, {useEffect} from 'react';

import LoginScreen from "@/components/Authentication/LoginScreen";
import TextButton from '@/components/Authentication/components/text-button/textbutton';
import { createUserWithEmailAndPassword, validatePassword } from 'firebase/auth';

import { auth } from '@/firebase/authentication';
import Tooltip from '@/components/Authentication/components/tooltip/Tooltip';

export default function Registration() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [repassword, setRepassword] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [showTooltip, setShowToolTip] = React.useState<boolean>();

  const popSuggestions = (log: string) => {
    setShowToolTip(true);
    setMessage(log);
  }

  useEffect(() => {
    if (showTooltip) {
      setTimeout(() => {
        setShowToolTip(undefined);
        setMessage('')
      }, 3000)
    }
  }, [showTooltip])
  
  return (
    <View style={{ flex: 1 }} >
        <LoginScreen
          logoImageSource={require('@/assets/images/logo-example.png')}
          onLoginPress={() => {

            if (process.env.NODE_ENV === "development") {
            (password === repassword) ? 
                          createUserWithEmailAndPassword(auth, email, password)
                            .then((userCredentials) => {
                              const user = userCredentials.user;
                              popSuggestions(`sucessfully registered user with email : ${user.email}`);
                              setTimeout(() => {
                                router.back()
                              }, 3000)
                            })
                            .catch((error) => {
                              const errorCode = error.code;
                              const errorMessage = error.message;
                              console.log(errorCode);
                              console.log(errorMessage);
                            })
                 : popSuggestions('Confirm Password is incorrect') 
            } else {
            (password === repassword) ? 
                validatePassword(auth, password).then((result) => {
                  result.isValid ? 
                          createUserWithEmailAndPassword(auth, email, password)
                            .then((userCredentials) => {
                              const user = userCredentials.user;
                              popSuggestions(`sucessfully registered user with email : ${user.email}`);
                              setTimeout(() => {
                                router.back()
                              }, 3000)
                            })
                            .catch((error) => {
                              const errorCode = error.code;
                              const errorMessage = error.message;
                              console.log(errorCode);
                              console.log(errorMessage);
                            })
                            : popSuggestions('Password is too long or too short')
                }) : popSuggestions('Confirm Password is incorrect') 

            }
          }}
          onSignupPress={() => {}}
          onEmailChange={setEmail}
          loginButtonText={'Register'}
          disableSignup
          disableDivider
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
                      {(showTooltip ? 
                        <Tooltip style={{ marginTop: 150, alignSelf:'center'}}>
                          <Text style={{ fontSize: 16}}>
                            {message}
                          </Text>
                        </Tooltip>
                        : <View></View>
                      )
                      }                      
            </View>
          }
          onPasswordChange={setPassword}
          onRepasswordChange={setRepassword}
          > 
          </LoginScreen>
      </View>

  );
}