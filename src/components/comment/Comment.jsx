import { Button } from "@material-tailwind/react";
import React, { useContext } from "react";
import myContext from "../../context/data/myContext";
import "../variables.css";

function Comment({ addComment, commentText, setcommentText, allComment, fullName, setFullName }) {
 const context = useContext(myContext);
 const { mode } = context;
 return (
  <section className=" py-8 lg:py-16">
   <div className="max-w-2xl mx-auto px-4">
    <div className="flex justify-between items-center mb-3">
     <h2 className="text-lg lg:text-2xl font-bold" style={{ color: mode === "dark" ? "white" : "black" }}>
      Make Comment
     </h2>
    </div>
    {/* Comment Form  */}
    <form className="mb-6">
     {/* Full Name Input  */}
     <div
      className="py-2 px-4 mb-4 rounded-lg rounded-t-lg 
            shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] border border-gray-200"
      style={{
       background: mode === "dark" ? "var(--light-color)" : "var(--btn-d-color)",
      }}
     >
      <input
       type="text"
       placeholder="Enter Full Name"
       value={fullName}
       onChange={(e) => {
        setFullName(e.target.value);
       }}
       className="px-0 w-full text-sm border-0 focus:ring-0 focus:outline-none text-cyan-400  dark:placeholder-gray-400 "
       style={{
        background: mode === "dark" ? "var(--light-color)" : "var(--btn-d-color)",
       }}
      />
     </div>

     {/* Text Area  */}
     <div
      className="py-2 px-4 mb-4 rounded-lg rounded-t-lg 
          shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] border border-gray-200 "
      style={{
       background: mode === "dark" ? "var(--light-color)" : "var(--btn-d-color)",
      }}
     >
      <label htmlFor="comment" className="sr-only">
       Your comment
      </label>
      <textarea
       id="comment"
       rows={6}
       className="px-0 w-full text-sm border-0 focus:ring-0 focus:outline-none text-cyan-400 dark:placeholder-gray-400 "
       style={{ background: mode === "dark" ? "var(--light-color)" : "var(--btn-d-color)" }}
       placeholder="Write a comment..."
       value={commentText}
       onChange={(e) => {
        setcommentText(e.target.value);
       }}
       required
       defaultValue={""}
      />
     </div>
     {/* Button  */}
     <div className="">
      <Button
       onClick={addComment}
       style={{
        background: mode === "dark" ? "var(--btn-d-color)" : "var(--light-color)",
        color: mode === "dark" ? "var(--light-color)" : "var(--btn-d-color)",
       }}
      >
       Post comment
      </Button>
     </div>
    </form>

    {/* Bottom Item  */}
    <article className="p-6 mb-6 text-base rounded-2xl border border-y-2" style={{ background: mode === "dark" ? "var(--light-color)" : "var(--btn-d-color)" }}>
     {allComment.map((item, index) => {
      const { fullName, commentText, date } = item;
      return (
       <>
        <footer className="flex justify-between items-center mb-1 ">
         <div className="flex items-center my-2  py-1 rounded-sm ">
          <p className="inline-flex items-center text-md  " style={{ color: mode === "dark" ? "white" : "black" }}>
           {fullName} commented
          </p>
         </div>
        </footer>
        <p className="text-gray-500 dark:text-gray-400 text-sm" style={{ color: mode === "dark" ? "white" : "black" }}>
         {commentText}
        </p>
        <p className="text-sm mt-2 border-b-2 border-amber-600" style={{ color: mode === "dark" ? "white" : "black" }}>
         on {date}
        </p>
       </>
      );
     })}
    </article>
   </div>
  </section>
 );
}

export default Comment;
