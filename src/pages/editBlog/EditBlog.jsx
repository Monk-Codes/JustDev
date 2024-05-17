import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { Button, Typography } from "@material-tailwind/react";
import { Editor } from "@tinymce/tinymce-react";
import "../../components/variables.css";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/data/myContext";
import toast from "react-hot-toast";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";

function EditBlog() {
 const context = useContext(myContext);
 const { mode, setloading } = context;
 const params = useParams();
 const navigate = useNavigate();
 const [text, settext] = useState("");
 const [blogs, setBlogs] = useState({
  title: "",
  category: "",
  content: "",
 });
 const updatePost = async () => {
  if (blogs.title === "" || blogs.category === "" || blogs.content === "") {
   toast.error("Please Fill All Fields");
  } else {
   const productRef = doc(fireDB, "BLOGS", params.id);
   try {
    await updateDoc(productRef, {
     title: blogs.title,
     category: blogs.category,
     content: blogs.content,
    });
    setBlogs({
     title: blogs.title,
     category: blogs.category,
     content: blogs.content,
    });
    navigate(`/bloginfo/${params.id}`);
    toast.success("Post Updated Successfully");
   } catch (error) {
    console.log(error);
    toast.error("Error updating post");
   }
  }
 };

 const getAllBlogs = async () => {
  setloading(true);
  try {
   const productRef = doc(fireDB, "BLOGS", params.id);
   const productTemp = await getDoc(productRef);
   if (productTemp.exists()) {
    const blogData = productTemp.data();
    setBlogs({
     title: blogData.title || "",
     category: blogData.category || "",
     content: blogData.content || "",
    });
   } else {
    console.log("Blog does not exist");
    toast.error("Blog does not exist");
   }
   setloading(false);
  } catch (error) {
   console.log(error);
   toast.error("Error fetching blog data");
   setloading(false);
  }
 };

 useEffect(() => {
  window.scrollTo(0, 0);
  getAllBlogs();
 }, []);

 function createMarkup(c) {
  return { __html: c };
 }

 return (
  <Layout>
   <div className="container mx-auto  ">
    <div
     className="p-16 "
     style={{
      background: mode === "dark" ? "#353b48" : "var(--btn-color)",
      borderBottom: mode === "dark" ? " 4px solid var(--btn-color)" : " 4px solid var(--btn-d-color)",
     }}
    >
     {/* Top Item  */}
     <div className="mb-2 flex justify-between">
      <div className="flex gap-3 items-center">
       {/* Dashboard Link  */}
       <Link to={"/dashboard"}>
        <BsFillArrowLeftCircleFill size={25} />
       </Link>
       {/* Text  */}
       <Typography
        variant="h4"
        style={{
         color: mode === "dark" ? "white" : "grey",
        }}
       >
        Edit Blog
       </Typography>
      </div>
     </div>
     {/* main Content  */}
     <div className="mb-3"></div>
     {/* Second Title Input */}
     <div className="mb-3">
      <input
       label="Enter your Title"
       className={`shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] w-full rounded-md p-1.5 
                 outline-none  ${mode === "dark" ? "placeholder-grey" : "placeholder-grey"}`}
       placeholder="Enter Your Title"
       style={{
        background: mode === "dark" ? "#dcdde1" : "var(--btn-d-color)",
       }}
       name="title"
       value={blogs.title}
       onChange={(e) => setBlogs({ ...blogs, title: e.target.value })}
      />
     </div>
     {/* Third Category Input  */}
     <div className="mb-3">
      <input
       label="Enter your Category"
       className={`shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] w-full rounded-md p-1.5 
                 outline-none ${mode === "dark" ? "placeholder-grey" : "placeholder-grey"}`}
       placeholder="Enter Your Category"
       style={{
        background: mode === "dark" ? "#dcdde1" : "var(--btn-d-color)",
       }}
       name="category"
       value={blogs.category}
       onChange={(e) => setBlogs({ ...blogs, category: e.target.value })}
      />
     </div>
     <Editor
      apiKey="qinlke3djdsd43mapzcspdyvg17zi4nk5dragnaggse6uyx8"
      onEditorChange={(newValue, editor) => {
       setBlogs({ ...blogs, content: newValue });
       settext(editor.getContent({ format: "text" }));
      }}
      onInit={(evt, editor) => {
       settext(editor.getContent({ format: "text" }));
      }}
      init={{
       plugins:
        "a11ychecker advcode advlist advtable anchor autocorrect autolink autoresize autosave casechange charmap checklist code codesample directionality editimage emoticons export footnotes formatpainter fullscreen help image importcss inlinecss insertdatetime link linkchecker lists media mediaembed mentions nonbreaking pagebreak pageembed permanentpen powerpaste preview quickbars save searchreplace table tableofcontents tinydrive tinymcespellchecker typography visualblocks visualchars wordcount",
       toolbar: "undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | " + "bullist numlist outdent indent | link image | print preview media fullscreen | " + "forecolor backcolor emoticons | help",
       menubar: "file edit insert",
       icons: "thin",
       ui_mode: "split",
       content_css: "writer",
       mobile: {
        menubar: true,
        toolbar: "undo bold italic styles",
       },
      }}
     />
     {/* Five Submit Button  */}
     <Button
      onClick={updatePost}
      className=" w-full mt-5"
      style={{
       background: mode === "dark" ? "var(--btn-color)" : "var(--btn-d-color)",
       color: mode === "dark" ? "var(--btn-d-color)" : "var(--btn-color)",
      }}
     >
      Update Post
     </Button>
     {/* Six Preview Section  */}
     <div className="">
      <h1 className=" text-center mb-3 text-2xl text-orange-200">Preview</h1>
      <div className="content text-orange-200">
       <div
        className={`[&> h1]:text-[32px] [&>h1]:font-bold  [&>h1]:mb-2.5
       ${mode === "dark" ? "[&>h1]:text-[#ff4d4d]" : "[&>h1]:text-grey"}
       [&>h2]:text-[24px] [&>h2]:font-bold [&>h2]:mb-2.5
       ${mode === "dark" ? "[&>h2]:text-white" : "[&>h2]:text-grey"}
       
       [&>h3]:text-[18.72] [&>h3]:font-bold [&>h3]:mb-2.5
       ${mode === "dark" ? "[&>h3]:text-white" : "[&>h3]:text-grey"}
       
       [&>h4]:text-[16px] [&>h4]:font-bold [&>h4]:mb-2.5
       ${mode === "dark" ? "[&>h4]:text-white" : "[&>h4]:text-grey"}

                        [&>h5]:text-[13.28px] [&>h5]:font-bold [&>h5]:mb-2.5
                        ${mode === "dark" ? "[&>h5]:text-white" : "[&>h5]:text-grey"}
                        
                        [&>h6]:text-[10px] [&>h6]:font-bold [&>h6]:mb-2.5
                        ${mode === "dark" ? "[&>h6]:text-white" : "[&>h6]:text-grey"}
                        
                        [&>p]:text-[16px] [&>p]:mb-1.5
                        ${mode === "dark" ? "[&>p]:text-white" : "[&>p]:text-grey"}

                        [&>ul]:list-disc [&>ul]:mb-2
                        ${mode === "dark" ? "[&>ul]:text-white" : "[&>ul]:text-grey"}

                        [&>ol]:list-decimal [&>li]:mb-10
                        ${mode === "dark" ? "[&>ol]:text-white" : "[&>ol]:text-grey"}
                        
                        [&>li]:list-decimal [&>ol]:mb-2
                        ${mode === "dark" ? "[&>ol]:text-white" : "[&>ol]:text-grey"}
                        
                        [&>img]:rounded-lg
                        `}
        dangerouslySetInnerHTML={createMarkup(blogs.content)}
       ></div>
      </div>
     </div>
    </div>
   </div>
  </Layout>
 );
}

export default EditBlog;
