import React from 'react';
import { useStorageState } from './useStorageState';
import { auth } from '@/firebase/authentication'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const AuthContext = React.createContext<{
  signIn: (email: string, password: string) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }
  return value;
}

export const checkAuth = () => {
  if (auth) {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('auth tokens', user.uid);
      } else {
        console.log('No user is signed in.');
      }
    });
  }
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');
  
  return (

    <AuthContext.Provider
      value={{
        signIn: (email: string, password: string) => {
          if(email && password) {

              signInWithEmailAndPassword(auth, email, password)
              .then((credentials) => {
                console.log('successfully loging user ', credentials.user.uid)
              })
              .catch(e=> {
                console.log(e)

              })
          }
       },
        signOut: () => {
          setSession(null);
          signOut(auth);
        },
        session,
        isLoading,
      }}>
      {props.children}
    </AuthContext.Provider>

  );

}
