import { Button } from "@material-tailwind/react";
import React, { useContext } from "react";
import myContext from "../../context/data/myContext";
import "../variables.css";
import { useNavigate } from "react-router-dom";

function BlogPostCard() {
 const context = useContext(myContext);
 const { mode, getAllBlog } = context;
 const navigate = useNavigate();
 return (
  <div>
   <section className="text-gray-600 body-font">
    <div className="container px-5 py-10 mx-auto max-w-7xl ">
     {/* btn Content  */}
     <div className="flex flex-wrap justify-center -m-4 mb-5">
      {/* Card 1  */}
      {getAllBlog.length > 0 ? (
       <>
        {getAllBlog.map((item, index) => {
         const { thumbnail, id, date } = item;
         return (
          <div className="p-4 md:w-1/3" key={index}>
           <div
            style={{
             background: mode === "dark" ? "var(--btn-color)" : "white",
             borderBottom: mode === "dark" ? " 4px solid var(--btn-d-color)" : " 4px solid var(--btn-color)",
            }}
            className={`h-full shadow-lg  hover:-translate-y-1 cursor-pointer hover:shadow-gray-400
               ${mode === "dark" ? "shadow-gray-700" : "shadow-xl"} 
               rounded-xl overflow-hidden`}
           >
            {/* Blog Thumbnail  */}
            <img onClick={() => navigate(`/bloginfo/${id}`)} className=" w-full h-64" src={thumbnail} alt="blog" />

            {/* Top Items  */}
            <div className="p-6">
             {/* Blog Date  */}
             <h2
              className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"
              style={{
               color: mode === "dark" ? "var(--btn-d-color)" : " var(--btn-color)",
              }}
             >
              {date}
             </h2>

             {/* Blog Title  */}
             <h1
              className="title-font text-lg font-bold text-gray-900 mb-3"
              style={{
               color: mode === "dark" ? "var(--btn-d-color)" : " var(--btn-color)",
              }}
             >
              {item.blogs.title}
             </h1>

             {/* Blog Description  */}
             <p
              className="leading-relaxed mb-3"
              style={{
               color: mode === "dark" ? "var(--btn-d-color)" : " var(--btn-color)",
              }}
             >
              Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat.
             </p>
            </div>
           </div>
          </div>
         );
        })}
       </>
      ) : (
       <>
        <h1 className="text-xl font-bold"> Not Found</h1>
       </>
      )}
     </div>

     {/* See More Button  */}
     <div className="flex justify-center my-5">
      <Button
       style={{
        background: mode === "dark" ? "var(--btn-d-color)" : "var(--btn-color)",
        color: mode === "dark" ? "var(--btn-color)" : "var(--btn-d-color)",
       }}
      >
       See More
      </Button>
     </div>
    </div>
   </section>
  </div>
 );
}

export default BlogPostCard;
