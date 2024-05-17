import React, { useContext, useEffect, useState } from "react";
import "../../components/variables.css";
import myContext from "../../context/data/myContext";
import Layout from "../../components/layout/Layout";
import { useNavigate } from "react-router-dom";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";

function AllBlogs() {
 const context = useContext(myContext);
 const { mode } = context;
 const navigate = useNavigate();

 const [allBlogs, setAllBlogs] = useState([]);

 useEffect(() => {
  window.scrollTo(0, 0);

  const q = query(collection(fireDB, "BLOGS"), orderBy("date", "desc"));
  const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
   let blogsArray = [];
   QuerySnapshot.forEach((doc) => {
    blogsArray.push({ id: doc.id, ...doc.data() });
   });
   setAllBlogs(blogsArray);
  });

  return () => unsubscribe(); // Cleanup subscription on unmount
 }, []);

 return (
  <Layout>
   <section className="text-gray-600 body-font">
    <div className="container px-5 py-10 mx-auto max-w-7xl">
     {/* Top Heading */}
     <div className="mb-5">
      <h1 className="text-center text-2xl font-bold" style={{ color: mode === "dark" ? "white" : "black" }}>
       All Blogs
      </h1>
     </div>
     {/* Main Content */}
     <div className="flex flex-wrap justify-center -m-4 mb-5">
      {/* Card 1 */}
      {allBlogs.length > 0 ? (
       <>
        {allBlogs.map((item, index) => {
         const { id, date, thumbnail } = item;
         return (
          <div className="p-4 md:w-1/3" key={index}>
           <div
            onClick={() => navigate(`/bloginfo/${id}`)}
            style={{
             background: mode === "dark" ? "var(--btn-color)" : "white",
             borderBottom: mode === "dark" ? "4px solid var(--btn-d-color)" : "4px solid var(--btn-color)",
            }}
            className={`h-full shadow-lg hover:-translate-y-1 cursor-pointer hover:shadow-gray-400
                                ${mode === "dark" ? "shadow-gray-700" : "shadow-xl"} 
                                rounded-xl overflow-hidden`}
           >
            {/* Blog Thumbnail */}
            <img className="w-full h-2/3" src={thumbnail} alt="blog" />

            {/* Top Items */}
            <div className="p-6">
             {/* Blog Date */}
             <h2
              className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"
              style={{
               color: mode === "dark" ? "var(--btn-d-color)" : "var(--btn-color)",
              }}
             >
              {date}
             </h2>

             {/* Blog Title */}
             <h1
              className="title-font text-lg font-bold text-gray-900 mb-3"
              style={{
               color: mode === "dark" ? "var(--btn-d-color)" : "var(--btn-color)",
              }}
             >
              {item.blogs.title}
             </h1>

             {/* Blog Description */}
             <p
              className="leading-relaxed mb-3"
              style={{
               color: mode === "dark" ? "var(--btn-d-color)" : "var(--btn-color)",
              }}
             >
              {item.blogs.category}
             </p>
            </div>
           </div>
          </div>
         );
        })}
       </>
      ) : (
       <h1>Not Found</h1>
      )}
     </div>
    </div>
   </section>
  </Layout>
 );
}

export default AllBlogs;
