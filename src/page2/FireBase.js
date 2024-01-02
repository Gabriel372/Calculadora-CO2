import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAfTpaVAv6DdR0b-L-BIOUggYtpmCStAA4",
  authDomain: "imagenscarrocelcalculadora.firebaseapp.com",
  projectId: "imagenscarrocelcalculadora",
  storageBucket: "imagenscarrocelcalculadora.appspot.com",
  messagingSenderId: "953935614677",
  appId: "1:953935614677:web:ba9ff0bf160ad2ba8b085c",
  measurementId: "G-V7LPYTRJ6Q"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);