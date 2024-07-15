import { httpsCallable } from "firebase/functions";
import { View } from "./Themed";
import { auth, functions } from "@/firebase/authentication"

export function callfunction() : Promise<any> {
    const user = auth.currentUser;
    const token = user?.getIdToken()
    console.log(functions)

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