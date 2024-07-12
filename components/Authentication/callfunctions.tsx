import { functions } from '@/firebase/authentication'
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