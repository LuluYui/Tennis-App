import { httpsCallable } from "firebase/functions";
import { View } from "./Themed";
import { auth, functions } from "@/firebase/authentication"

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
export function edit_score(gameID: string, data: Object) : Promise<any> {
    const edit_gameScores = httpsCallable(functions, 'edit_gameScores');
    console.log('call : ', data)
    return edit_gameScores(data)
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