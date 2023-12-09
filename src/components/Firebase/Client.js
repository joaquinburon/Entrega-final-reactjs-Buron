import {initializeApp} from "firebase/app"
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
    // Aca va el objeto que nos da Firebase:
    apiKey: "AIzaSyCeixZqLlMynggaLjn25oH4vv5EjGV8_G8",
    authDomain: "ecommerce-8584d.firebaseapp.com",
    projectId: "ecommerce-8584d",
    storageBucket: "ecommerce-8584d.appspot.com",
    messagingSenderId: "715909491566",
    appId: "1:715909491566:web:548c2ce6b08bb8d495ef7f",
    measurementId: "G-K269TRH9DP"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)