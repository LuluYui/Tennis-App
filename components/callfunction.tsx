import { httpsCallable } from "firebase/functions";
import { auth, functions } from "@/firebase/authentication"
import { Alert } from "react-native";

export function callStats() : Promise<any> {
    const user = auth.currentUser;
    const token = user?.getIdToken()

    const callStats = httpsCallable(functions, 'callStats');
    return callStats()
        .then((result) => {
          // Read result of the Cloud Function.
          /** @type {any} */
          const data: any = result.data;
          return data
        })
        .catch((error) => {
            // Getting the Error details.
            const code = error.code;
            const message = error.message;
            const details = error.details;
            // ...
          });
  }

// Call the scoresa result from set_scores
export function callScores() : Promise<any> {
    const callScores = httpsCallable(functions, 'callScores');
    return callScores()
        .then((result) => {
          // Read result of the Cloud Function.
          /** @type {any} */
          const data: any = result.data;
          return data
        })
        .catch((error) => {
            // Getting the Error details.
            const code = error.code;
            const message = error.message;
            const details = error.details;
            // ...
          });
}

// EDIT : edit set_scores 
export function edit_score(data: any) : Promise<any> {
    const edit_gameScores = httpsCallable(functions, 'edit_gameScores');
    return edit_gameScores(data)
        .then((result) => {
          // Read result of the Cloud Function.
          /** @type {any} */
          const data: any = result.data;
          console.log('success')
          console.log(result)
          return data
        })
        .catch((error) => {
            // Getting the Error details.
            const code = error.code;
            const message = error.message;
            const details = error.details;

            // ...
            Alert.alert(message)
          });
}

// ADD : add set_scores for details 
export function add_gameScore(data: Object) : Promise<any> {
    const add_gameScores = httpsCallable(functions, 'add_gameScores');
    
    return add_gameScores(data)
        .then((result: any) => {
          // Read result of the Cloud Function.
          /** @type {any} */
          const data: any = result.data;
          return data
        })
        .catch((error) => {
            // Getting the Error details.
            const code = error.code;
            const message = error.message;
            const details = error.details;
            // ...
          });
}