import React, { useEffect, useState } from "react";
// import SignIn from "./SignIn";
import Dashboard from "./Dashboard";
import { auth, provider } from "./Config";
import { signInWithPopup } from "firebase/auth";

function App() {
  const [email, setEmail] = useState("");
  const [picture, setPicture] = useState("");
  const [userName, setUserName] = useState("");

  const fullPageStyle = {
    minWidth: '100vw',  // 100% of the viewport width
    // height: '100vh', // 100% of the viewport height
    minHeight: '100vh', // Ensures the component is at least the height of the viewport
  };

  const handleClick = () => {
    signInWithPopup(auth, provider).then((data) => {
      setEmail(data.user.email);
      setPicture(data.user.photoURL);
      setUserName(data.user.displayName);

      localStorage.setItem("email", data.user.email);
    });
  };

  useEffect(() => {
    // Load email from localStorage
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  return (
    <>
      {email ? (
        <Dashboard userPhoto={picture} userName={userName} userEmail={email} fullPageStyle={fullPageStyle}/>
      ) : (
        <div className="container w-full h-full bg-white flex items-center justify-center flex-col mx-auto">
          <div className="bg-white flex items-center justify-center flex-col">
            <img src="./imgs/person-2.png" alt="person" />

            <button
              className="bg-blue text-white mt-2 py-2 px-4 rounded-sm w-32"
              onClick={handleClick}
            >
              Log In
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
