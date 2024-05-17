import React, { useState, useEffect } from "react";
import MyContext from "./myContext";
import { collection, deleteDoc, doc, getDoc, onSnapshot, orderBy, query, updateDoc } from "firebase/firestore";
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

 useEffect(() => {
  // Define a cleanup function
  let unsubscribe;
  // Fetch initial data
  const fetchData = async () => {
   setloading(true);
   try {
    const q = query(collection(fireDB, "BLOGS"), orderBy("time"));
    unsubscribe = onSnapshot(q, (QuerySnapshot) => {
     let blogArray = [];
     QuerySnapshot.forEach((doc) => {
      blogArray.push({ ...doc.data(), id: doc.id });
     });
     setGetAllBlog(blogArray);
     setloading(false);
    });
   } catch (error) {
    console.log(error);
    setloading(false);
   }
  };
  fetchData();
  // Cleanup subscription on unmount
  return () => {
   if (unsubscribe) {
    unsubscribe();
   }
  };
 }, []);

 // Blog Delete Function
 const deleteBlog = async (id) => {
  try {
   await deleteDoc(doc(fireDB, "BLOGS", id));
   toast.success("Blog deleted successfully");
  } catch (error) {
   console.log(error);
  }
 };

 // Blog Edit Function
 const editBlog = async (id, newTitle, newCategory) => {
  try {
   const blogRef = doc(fireDB, "BLOGS", id);
   const blogSnapshot = await getDoc(blogRef);
   if (blogSnapshot.exists()) {
    await updateDoc(blogRef, {
     title: newTitle,
     category: newCategory,
     time: Date.now(),
    });
    toast.success("Blog edited successfully");
   }
  } catch (error) {
   console.log(error);
  }
 };

 return (
  <MyContext.Provider
   value={{
    mode,
    toggleMode,
    searchkey,
    setSearchkey,
    loading,
    getAllBlog,
    editBlog,
    deleteBlog,
   }}
  >
   {props.children}
  </MyContext.Provider>
 );
}

export default MyState;
