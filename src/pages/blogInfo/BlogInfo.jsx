import React, { useContext, useEffect, useState } from "react";
import myContext from "../../context/data/myContext";
import { useParams } from "react-router";
import { Timestamp, addDoc, collection, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import Layout from "../../components/layout/Layout";
import Loader from "../../components/loader/Loader";
import Comment from "../../components/comment/Comment";
import toast from "react-hot-toast";

function BlogInfo() {
 const context = useContext(myContext);
 const { mode, setloading, loading } = context;

 const params = useParams();
 const [getBlogs, setGetBlogs] = useState();

 useEffect(() => {
  const unsubscribe = onSnapshot(
   doc(fireDB, "BLOGS", params.id),
   (doc) => {
    if (doc.exists()) {
     setGetBlogs(doc.data());
     setloading(false);
    } else {
     console.log("Document does not exist");
     setloading(false);
    }
   },
   (error) => {
    console.log(error);
    setloading(false);
   }
  );

  window.scrollTo(0, 0);
  return () => unsubscribe(); // Cleanup subscription on unmount
 }, [params.id, setloading]);

 //* Create markup function
 function createMarkup(c) {
  return { __html: c };
 }

 ///comment section///
 const [fullName, setFullName] = useState("");
 const [commentText, setCommentText] = useState("");
 const addComment = async () => {
  const commentRef = collection(fireDB, "BLOGS/" + `${params.id}/` + "comment");
  try {
   await addDoc(commentRef, {
    fullName,
    commentText,
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-IN", {
     day: "2-digit",
     month: "short",
     year: "2-digit",
    }),
   });
   toast.success("Comment Add Successfully");
   setFullName("");
   setCommentText("");
  } catch (error) {
   console.log(error);
  }
 };

 //get comment//
 const [allComment, setAllComment] = useState([]);

 useEffect(() => {
  const q = query(collection(fireDB, "BLOGS/" + `${params.id}/` + "comment/"), orderBy("time", "desc"));
  const unsubscribe = onSnapshot(
   q,
   (QuerySnapshot) => {
    let productsArray = [];
    QuerySnapshot.forEach((doc) => {
     productsArray.push({ id: doc.id, ...doc.data() });
    });
    setAllComment(productsArray);
   },
   (error) => {
    console.log(error);
   }
  );

  return () => unsubscribe(); // Cleanup subscription on unmount
 }, [params.id]);

 return (
  <Layout>
   <section className="rounded-lg h-full overflow-hidden max-w-4xl mx-auto px-4 ">
    <div className="py-4 lg:py-8">
     {loading ? (
      <Loader />
     ) : (
      <div>
       {/* Thumbnail */}
       <img alt="content" className="mb-3 rounded-lg h-full w-full" src={getBlogs?.thumbnail} />
       {/* title And date */}
       <div className="flex justify-between items-center mb-3">
        <h1 style={{ color: mode === "dark" ? "white" : "black" }} className="text-xl md:text-2xl lg:text-2xl font-semibold">
         {getBlogs?.title}
        </h1>
        <p style={{ color: mode === "dark" ? "white" : "black" }}>{getBlogs?.date}</p>
       </div>
       <div className={`border-b mb-5 ${mode === "dark" ? "border-gray-600" : "border-gray-400"}`} />

       {/* blog Content */}
       <div className="content">
        <div
         className={`[&>h1]:text-[32px] [&>h1]:font-bold [&>h1]:mb-2.5
                        ${mode === "dark" ? "[&>h1]:text-[#ff4d4d]" : "[&>h1]:text-black"}

                        [&>h2]:text-[24px] [&>h2]:font-bold [&>h2]:mb-2.5
                        ${mode === "dark" ? "[&>h2]:text-white" : "[&>h2]:text-black"}

                        [&>h3]:text-[18.72px] [&>h3]:font-bold [&>h3]:mb-2.5
                        ${mode === "dark" ? "[&>h3]:text-white" : "[&>h3]:text-black"}

                        [&>h4]:text-[16px] [&>h4]:font-bold [&>h4]:mb-2.5
                        ${mode === "dark" ? "[&>h4]:text-white" : "[&>h4]:text-black"}

                        [&>h5]:text-[13.28px] [&>h5]:font-bold [&>h5]:mb-2.5
                        ${mode === "dark" ? "[&>h5]:text-white" : "[&>h5]:text-black"}

                        [&>h6]:text-[10px] [&>h6]:font-bold [&>h6]:mb-2.5
                        ${mode === "dark" ? "[&>h6]:text-white" : "[&>h6]:text-black"}

                        [&>p]:text-[16px] [&>p]:mb-1.5
                        ${mode === "dark" ? "[&>p]:text-[#7efff5]" : "[&>p]:text-black"}

                        [&>ul]:list-disc [&>ul]:mb-2
                        ${mode === "dark" ? "[&>ul]:text-white" : "[&>ul]:text-black"}

                        [&>ol]:list-decimal [&>li]:mb-10
                        ${mode === "dark" ? "[&>ol]:text-white" : "[&>ol]:text-black"}

                        [&>li]:list-decimal [&>ol]:mb-2
                        ${mode === "dark" ? "[&>ol]:text-white" : "[&>ol]:text-black"}

                        [&>img]:rounded-lg
                        `}
         dangerouslySetInnerHTML={createMarkup(getBlogs?.content)}
        ></div>
       </div>
      </div>
     )}
    </div>
    <Comment addComment={addComment} commentText={commentText} setcommentText={setCommentText} allComment={allComment} fullName={fullName} setFullName={setFullName} />
   </section>
  </Layout>
 );
}

export default BlogInfo;
