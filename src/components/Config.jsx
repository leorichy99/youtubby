import { useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA9j0MerZcIs2JCn_alzwMyYKaEGnFS-jc",
  authDomain: "project-1dc75.firebaseapp.com",
  projectId: "project-1dc75",
  storageBucket: "project-1dc75.appspot.com",
  messagingSenderId: "545829085829",
  appId: "1:545829085829:web:aec2afbb4bb700de51ffec",
  measurementId: "G-PQ39RLVSWL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const FirebaseComponent = () => {
  // If you need to perform any side effects after the component mounts,
  useEffect(() => {

    return () => {
      // Example: Remove an event listener, clean up resources, etc.
    };
  }, []);

  // Render your component JSX here
  return (
    <div>
      {/* Your component content */}
    </div>
  );
};

export { auth, provider };
export default FirebaseComponent;
