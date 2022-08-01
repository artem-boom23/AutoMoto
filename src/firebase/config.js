import { initializeApp } from "firebase/app";

import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from "firebase/firestore";

import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
} from "firebase/auth";




// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAXcrgViz27hDvd1zYuU1sPbB_KbScNAWk",
    authDomain: "cars-de0c1.firebaseapp.com",
    projectId: "cars-de0c1",
    storageBucket: "cars-de0c1.appspot.com",
    messagingSenderId: "870903689706",
    appId: "1:870903689706:web:63a2b28a1cb17891bac293"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
    try {
        // Запрос на заполнение данных в модальном окне Google. Res - обьект в результате логина
        const res = await signInWithPopup(auth, googleProvider);
        console.log("Res: ", res);
        // Вытаскиваем User из результата
        const user = res.user;
        // Ищем User в таблице Filebase users
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        // Из запроса получаем пользователя
        const docs = await getDocs(q);
        // Если пользователь не нашелся, тогда его нужно создать и выполнить метод addDoc
        if (docs.docs.length === 0) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
            });
        }
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};



// Initialize Firebase
initializeApp(firebaseConfig);

//export const db = getFirestore();

export {
    auth,
    db,
    getFirestore,
    signInWithGoogle,
};
