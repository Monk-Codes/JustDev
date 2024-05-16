import { Typography } from "@material-tailwind/react";
import React, { useContext } from "react";
import myContext from "../../context/data/myContext";

function HeroSection() {
 const context = useContext(myContext);
 const { mode } = context;
 return (
  <section style={{ background: mode === "dark" ? "#FF9F66" : "#F9B872" }}>
   {/* Hero Section  */}
   <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
    {/* Main Content  */}
    <main>
     <div className="text-center">
      <div className="mb-2">
       {/* Image  */}
       <div className="flex justify-center">
        <img className="w-20 h-20" src={"https://i.ibb.co/GkkYdwr/blog.gif"} alt="" />
       </div>

       {/* Text  */}
       <h1 className=" text-3xl text-white font-bold">Just Dev</h1>
      </div>

      {/* Paragraph  */}
      <p style={{ color: mode === "dark" ? "#C63D2F" : "white" }} className="sm:text-3xl text-xl font-semibold sm:mx-auto ">
       Here are some blogs and tutorials contributed by Monk-Codes.
      </p>
     </div>
    </main>
   </div>
  </section>
 );
}

export default HeroSection;
