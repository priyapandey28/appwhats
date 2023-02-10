import firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyDAL1XU4eJZQbMCPF8dXm5SKTnSDiWffAU",
  authDomain: "whatsapp-clone-e395e.firebaseapp.com",
  projectId: "whatsapp-clone-e395e",
  storageBucket: "whatsapp-clone-e395e.appspot.com",
  messagingSenderId: "394052127444",
  appId: "1:394052127444:web:965701b94ebf0b49bd8941"
  };

  const app =firebase.initializeApp(firebaseConfig)

  const auth =firebase.auth();

  const db =app.firestore();

  const googleProvider = new firebase.auth.GoogleAuthProvider();

  export { auth , googleProvider}

  export default db;
