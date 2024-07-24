import { functions } from '@/firebase/authentication.web'
import { httpsCallable } from 'firebase/functions'

export default function callfunctions() {
    const callStats = httpsCallable(functions, 'callStats');
    callStats()
        .then((data) => {
            console.log(data)
    })
    const sayHello = httpsCallable(functions, 'sayHello');
    sayHello()
    .then((data) => {

    });
}