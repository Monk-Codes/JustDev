import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/FirebaseConfig";
import { Card, CardHeader, CardBody, Input, Button, Typography } from "@material-tailwind/react";
import myContext from "../../../context/data/myContext";
import "../../../components/variables.css";

export default function AdminLogin() {
 const context = useContext(myContext);
 const { mode } = context;
 const navigate = useNavigate();

 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const login = async () => {
  if (!email || !password) {
   return toast.error("Fill all required fields");
  }
  try {
   const result = await signInWithEmailAndPassword(auth, email, password);
   toast.success("Login Success");
   localStorage.setItem("admin", JSON.stringify(result));
   navigate("/dashboard");
  } catch (error) {
   toast.error("Login Failed");
   console.log(error);
  }
 };

 return (
  <div className="flex justify-center items-center h-screen">
   {/* Card  */}
   <Card
    className="w-full max-w-[24rem]"
    style={{
     background: mode === "dark" ? "var(--btn-color)" : "var(--btn-d-color)",
    }}
   >
    {/* CardHeader */}
    <CardHeader
     color="blue"
     floated={false}
     shadow={false}
     className="m-0 grid place-items-center rounded-b-none py-8 px-4 text-center"
     style={{
      background: mode === "dark" ? "var(--btn-d-color)" : "var(--btn-color)",
     }}
    >
     <div className="mb-4  border border-white/10 bg-white/10 p-2 text-white">
      <div className=" flex justify-center">
       {/* Image  */}
       <img src="src/assets/vlogger.gif" className="h-20 w-20" />
      </div>
     </div>

     {/* Top Heading  */}
     <Typography
      variant="h4"
      style={{
       color: mode === "dark" ? "var(--btn-color)" : "var(--btn-d-color)",
      }}
     >
      Admin Login
     </Typography>
    </CardHeader>

    {/* CardBody */}
    <CardBody>
     <form className=" flex flex-col gap-4">
      {/* First Input  */}
      <div>
       <Input type="email" label="Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      {/* Second Input  */}
      <div>
       <Input type="password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      {/* Login Button  */}
      <Button
       onClick={login}
       style={{
        background: mode === "dark" ? "var(--btn-d-color)" : "var(--btn-color)",
        color: mode === "dark" ? "var(--btn-color)" : "var(--btn-d-color)",
       }}
      >
       Login
      </Button>
     </form>
    </CardBody>
   </Card>
  </div>
 );
}
