import { functions } from '@/firebase/authentication'
import { httpsCallable } from 'firebase/functions'

export default function callfunctions() {
    const addMessage = httpsCallable(functions, 'addmessage');
    // addMessage.then(({ text: 'some message' }) => {
    //     return 

    // })
}