import React, { useState, useEffect } from "react";
import MyContext from "./myContext";
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";

function MyState(props) {
 const [mode, setMode] = useState("light");
 const toggleMode = () => {
  if (mode === "light") {
   setMode("dark");
   document.body.style.backgroundColor = "rgb(17, 24, 39)";
  } else {
   setMode("light");
   document.body.style.backgroundColor = "white";
  }
 };
 const [searchkey, setSearchkey] = useState("");
 const [loading, setloading] = useState(false);
 const [getAllBlog, setGetAllBlog] = useState([]);

 function getAllBlogs() {
  setloading(true);
  try {
   const q = query(collection(fireDB, "BLOGS"), orderBy("time"));
   const data = onSnapshot(q, (QuerySnapshot) => {
    let blogArray = [];
    QuerySnapshot.forEach((doc) => {
     blogArray.push({ ...doc.data(), id: doc.id });
    });

    setGetAllBlog(blogArray);
    setloading(false);
   });
   return () => data;
  } catch (error) {
   console.log(error);
   setloading(false);
  }
 }

 useEffect(() => {
  getAllBlogs();
 }, []);
 // Blog Delete Function
 const deleteBlog = async (id) => {
  try {
   await deleteDoc(doc(fireDB, "BLOGS", id));
   getAllBlogs();
   toast.success("Blog deleted successfully");
  } catch (error) {
   console.log(error);
  }
 };
 //
 return (
  <MyContext.Provider
   value={{
    mode,
    toggleMode,
    searchkey,
    setSearchkey,
    loading,
    setloading,
    getAllBlog,
    deleteBlog,
   }}
  >
   {props.children}
  </MyContext.Provider>
 );
}

export default MyState;
