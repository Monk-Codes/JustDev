import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Card, CardHeader, CardBody, Input, Button, Typography } from "@material-tailwind/react";
import myContext from "../../../context/data/myContext";
import { doc, getDoc } from "firebase/firestore";
import "../../../components/variables.css";
import { auth, fireDB } from "../../../firebase/FirebaseConfig";

export default function AdminLogin() {
 useEffect(() => {
  window.scrollTo(0, 0);
 }, []);

 const context = useContext(myContext);
 const { mode } = context;
 const navigate = useNavigate();

 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [userExists, setUserExists] = useState(true);

 const login = async () => {
  if (!email || !password) {
   return toast.error("Fill all required fields");
  }
  try {
   const result = await signInWithEmailAndPassword(auth, email, password);
   const user = result.user;
   const isExistingUser = await checkIfUserExists(user.uid);
   if (isExistingUser) {
    toast.success("Login Success");
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/");
   } else {
    setUserExists(false);
    toast.error("User doesn't exist. Please signup.");
   }
  } catch (error) {
   toast.error("Login Failed");
   console.log(error);
  }
 };

 const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
   const result = await signInWithPopup(auth, provider);
   const user = result.user;
   const isExistingUser = await checkIfUserExists(user.uid);

   if (isExistingUser) {
    toast.success("Login Success");
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/");
   } else {
    setUserExists(false);
    toast.error("User doesn't exist. Please signup.");
   }
  } catch (error) {
   toast.error("Login Failed");
   console.log(error);
  }
 };

 const checkIfUserExists = async (uid) => {
  const userDoc = await getDoc(doc(fireDB, "users", uid));
  return userDoc.exists();
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
      <div className=" flex justify-center">
       <img src={"https://i.ibb.co/nsFNY7Z/vlogger.gif"} className="h-20 w-20" />
      </div>
     </div>
     <Typography
      variant="h4"
      style={{
       color: mode === "dark" ? "var(--btn-color)" : "var(--btn-d-color)",
      }}
     >
      Admin Login
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
       onClick={login}
       style={{
        background: mode === "dark" ? "var(--btn-d-color)" : "var(--btn-color)",
        color: mode === "dark" ? "var(--btn-color)" : "var(--btn-d-color)",
       }}
      >
       Login
      </Button>
      <Button
       onClick={loginWithGoogle}
       style={{
        background: mode === "dark" ? "var(--btn-d-color)" : "var(--btn-color)",
        color: mode === "dark" ? "var(--btn-color)" : "var(--btn-d-color)",
       }}
      >
       Login with Google
      </Button>
      {!userExists && (
       <Button
        onClick={() => navigate("/usersignup")}
        style={{
         background: mode === "dark" ? "var(--btn-d-color)" : "var(--btn-color)",
         color: mode === "dark" ? "var(--btn-color)" : "var(--btn-d-color)",
        }}
       >
        Signup
       </Button>
      )}
     </form>
    </CardBody>
   </Card>
  </div>
 );
}
