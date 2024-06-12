import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { collection, deleteDoc, doc, onSnapshot, query, orderBy } from "firebase/firestore";
import { fireDB } from "../../../firebase/FirebaseConfig";
import Layout from "../../../components/layout/Layout";
import myContext from "../../../context/data/myContext";
import "../../../components/variables.css";

function Dashboard() {
 const [loading, setLoading] = useState(false);
 const context = useContext(myContext);
 const { mode } = context;
 const navigate = useNavigate();
 const [getAllBlog, setGetAllBlog] = useState([]);

 const logout = () => {
  localStorage.clear("admin");
  navigate("/");
 };

 useEffect(() => {
  setLoading(true);
  const q = query(collection(fireDB, "BLOGS"), orderBy("time", "desc"));
  const unsubscribe = onSnapshot(q, (snapshot) => {
   const blogsArray = [];
   snapshot.forEach((doc) => {
    blogsArray.push({ id: doc.id, ...doc.data() });
   });
   setGetAllBlog(blogsArray);
   setLoading(false);
  });

  return () => unsubscribe();
 }, []);

 const deleteBlog = async (id) => {
  try {
   await deleteDoc(doc(fireDB, "BLOGS", id));
  } catch (error) {
   console.log(error);
  }
 };

 return (
  <Layout>
   <div className="py-10">
    <div className="flex flex-wrap justify-start items-center lg:justify-center gap-2 lg:gap-10 px-4 lg:px-0 mb-8">
     <div className="left">
      <img className="w-40 h-40 object-cover rounded-full border-2 border-orange-900 p-1" src={"https://i.ibb.co/BsP2tfh/admin.gif"} alt="profile" />
     </div>
     <div className="right">
      <h1 className="font-bold text-2xl mb-2" style={{ color: mode === "dark" ? "white" : "black" }}>
       Monk Codes
      </h1>
      <h2 style={{ color: mode === "dark" ? "white" : "black" }} className="font-semibold">
       Software Developer
      </h2>
      <h2 style={{ color: mode === "dark" ? "white" : "black" }} className="font-semibold">
       monkcodesdev@gmail.com
      </h2>
      <h2 style={{ color: mode === "dark" ? "white" : "black" }} className="font-semibold">
       <span>Total Blog : </span> {getAllBlog.length}
      </h2>
      <div className="flex gap-2 mt-2">
       <Link to={"/createblog"}>
        <div className="mb-2">
         <Button
          style={{
           background: mode === "dark" ? "var(--btn-d-color)" : "var(--btn-color)",
           color: mode === "dark" ? "black" : "white",
          }}
          className="px-8 py-2"
         >
          Create Blog
         </Button>
        </div>
       </Link>
       <div className="mb-2">
        <Button
         onClick={logout}
         style={{
          background: mode === "dark" ? "var(--btn-d-color)" : "var(--btn-color)",
          color: mode === "dark" ? "black" : "white",
         }}
         className="px-8 py-2"
        >
         Logout
        </Button>
       </div>
      </div>
     </div>
    </div>

    {/* Line */}
    <hr className={`border-2 ${mode === "dark" ? "border-gray-300" : "border-gray-400"}`} />

    {/* Table */}
    <div className="">
     <div className="container mx-auto px-4 max-w-5xl my-5">
      <div className="relative overflow-x-auto shadow-md sm:rounded-xl">
       <table className="w-full border-2 border-white shadow-md text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
         style={{
          background: mode === "dark" ? "white" : "var(--btn-color)",
         }}
         className="text-sm"
        >
         <tr>
          <th style={{ color: mode === "dark" ? "var(--btn-color)" : "white" }} scope="col" className="px-1 py-3">
           S.No
          </th>
          <th style={{ color: mode === "dark" ? "var(--btn-color)" : "white" }} scope="col" className="px-1 py-3">
           Thumbnail
          </th>
          <th style={{ color: mode === "dark" ? "var(--btn-color)" : "white" }} scope="col" className="px-1 py-3">
           Title
          </th>
          <th style={{ color: mode === "dark" ? "var(--btn-color)" : "white" }} scope="col" className="px-1 py-3">
           Category
          </th>
          <th style={{ color: mode === "dark" ? "var(--btn-color)" : "white" }} scope="col" className="px-1 py-3">
           Date
          </th>
          <th style={{ color: mode === "dark" ? "var(--btn-color)" : "white" }} scope="col" className="px-1 py-3">
           Edit
          </th>
          <th style={{ color: mode === "dark" ? "var(--btn-color)" : "white" }} scope="col" className="px-1 py-3">
           Delete
          </th>
         </tr>
        </thead>
        {getAllBlog.length > 0 ? (
         <>
          {getAllBlog.map((item, index) => {
           const { thumbnail, date, id } = item;
           return (
            <tbody key={index}>
             <tr className="border-b-2" style={{ background: mode === "dark" ? "var(--btn-color)" : "white" }}>
              <td style={{ color: mode === "dark" ? "white" : "black" }} className="px-1 py-4">
               {index + 1}.
              </td>
              <th style={{ color: mode === "dark" ? "white" : "black" }} scope="row" className="px-1 py-4 font-medium">
               <img className="w-16 h-16 rounded-lg" src={thumbnail} alt="thumbnail" />
              </th>
              <td style={{ color: mode === "dark" ? "white" : "black" }} className="px-1 py-4">
               {item?.blogs?.title}
              </td>
              <td style={{ color: mode === "dark" ? "white" : "black" }} className="px-1 py-4">
               {item?.blogs?.category}
              </td>
              <td style={{ color: mode === "dark" ? "white" : "black" }} className="px-1 py-4">
               {date}
              </td>
              <td onClick={() => navigate(`/editblog/${id}`)} style={{ color: mode === "dark" ? "white" : "black" }} className="px-1 py-4">
               <button className="px-2 py-1 rounded-full text-white font-bold bg-orange-900">Edit</button>
              </td>
              <td onClick={() => deleteBlog(id)} style={{ color: mode === "dark" ? "white" : "black" }} className="px-1 py-4">
               <button className="px-2 py-1 rounded-full text-white font-bold bg-orange-900">Delete</button>
              </td>
             </tr>
            </tbody>
           );
          })}
         </>
        ) : (
         <p className="py-2">No Blogs</p>
        )}
       </table>
      </div>
     </div>
    </div>
   </div>
  </Layout>
 );
}

export default Dashboard;
