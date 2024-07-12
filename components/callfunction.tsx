import { httpsCallable } from "firebase/functions";
import { View } from "./Themed";
import { functions } from "@/firebase/authentication"

export function callfunction() : void {

    const callStats = httpsCallable(functions, 'callStats');
    callStats()
        .then((result) => {
          // Read result of the Cloud Function.
          /** @type {any} */
          const data: any = result.data;
          const sanitizedMessage = data.text;
          console.log(sanitizedMessage)
        })
        .catch((error) => {
            // Getting the Error details.
            const code = error.code;
            const message = error.message;
            const details = error.details;
            // ...
          });
    const sayHello = httpsCallable(functions, 'sayHello');
    sayHello()
    .then((data) => {

    }) 
    .catch((error) => {
            // Getting the Error details.
            const code = error.code;
            const message = error.message;
            const details = error.details;
            // ...
          });

  }


// 6592 ACO Record 1 
// 6593
// 6602 siu aco