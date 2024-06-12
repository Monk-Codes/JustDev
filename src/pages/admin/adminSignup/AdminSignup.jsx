import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, fireDB } from "../../../firebase/FirebaseConfig";
import { Card, CardHeader, CardBody, Input, Button, Typography } from "@material-tailwind/react";
import myContext from "../../../context/data/myContext";
import "../../../components/variables.css";

export default function Signup() {
 const context = useContext(myContext);
 const { mode } = context;
 const navigate = useNavigate();

 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");

 // Check authentication state
 useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
   if (user) {
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/dashboard");
   } else {
    navigate("/adminlogin");
   }
  });

  // Cleanup subscription on unmount
  return () => unsubscribe();
 }, [navigate]);

 const signupWithEmail = async () => {
  if (!email || !password) {
   return toast.error("Fill all required fields");
  }
  try {
   const result = await createUserWithEmailAndPassword(auth, email, password);
   const user = result.user;

   // Check if the user already exists
   const userDoc = await getDoc(doc(fireDB, "users", user.uid));
   if (userDoc.exists()) {
    toast.error("User already exists. Please login.");
   } else {
    // Add user to Firestore
    await setDoc(doc(fireDB, "users", user.uid), {
     email: user.email,
     uid: user.uid,
     profileImage: user.photoURL || "",
    });
    toast.success("Signup Success");
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/dashboard");
   }
  } catch (error) {
   toast.error("Signup Failed");
   console.log(error);
  }
 };

 const signupWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
   const result = await signInWithPopup(auth, provider);
   const user = result.user;

   // Check if the user already exists
   const userDoc = await getDoc(doc(fireDB, "users", user.uid));
   if (userDoc.exists()) {
    toast.error("User already exists. Please login.");
   } else {
    // Add user to Firestore
    await setDoc(doc(fireDB, "users", user.uid), {
     email: user.email,
     uid: user.uid,
     profileImage: user.photoURL || "",
    });
    toast.success("Signup Success");
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/dashboard");
   }
  } catch (error) {
   toast.error("Signup Failed");
   console.log(error);
  }
 };

 return (
  <div className="flex justify-center items-center h-screen bg-yellow-200">
   <Card
    className="w-full max-w-[24rem]"
    style={{
     background: mode === "dark" ? "var(--btn-color)" : "var(--btn-d-color)",
    }}
   >
    <CardHeader
     color="blue"
     floated={false}
     shadow={false}
     className="m-0 grid place-items-center rounded-b-none py-8 px-4 text-center"
     style={{
      background: mode === "dark" ? "var(--btn-d-color)" : "var(--btn-color)",
     }}
    >
     <div className="mb-4 border border-white/10 bg-white/10 p-2 text-white">
      <div className="flex justify-center">
       <img src={"https://i.ibb.co/nsFNY7Z/vlogger.gif"} className="h-20 w-20" />
      </div>
     </div>
     <Typography
      variant="h4"
      style={{
       color: mode === "dark" ? "var(--btn-color)" : "var(--btn-d-color)",
      }}
     >
      Signup
     </Typography>
    </CardHeader>

    <CardBody>
     <form className="flex flex-col gap-4">
      <div>
       <Input type="email" label="Email" name="email" className="text-light-green-400" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
       <Input type="password" label="Password" className="text-light-green-400" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <Button
       onClick={signupWithEmail}
       style={{
        background: mode === "dark" ? "var(--btn-d-color)" : "var(--btn-color)",
        color: mode === "dark" ? "var(--btn-color)" : "var(--btn-d-color)",
       }}
      >
       Signup with Email
      </Button>
      <Button
       onClick={signupWithGoogle}
       style={{
        background: mode === "dark" ? "var(--btn-d-color)" : "var(--btn-color)",
        color: mode === "dark" ? "var(--btn-color)" : "var(--btn-d-color)",
       }}
      >
       Signup with Google
      </Button>
     </form>
    </CardBody>
   </Card>
  </div>
 );
}
