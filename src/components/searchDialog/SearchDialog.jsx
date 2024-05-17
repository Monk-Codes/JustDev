import { Fragment, useContext, useState } from "react";
import { Dialog, DialogBody, Input } from "@material-tailwind/react";
import myContext from "../../context/data/myContext";
import { AiOutlineSearch } from "react-icons/ai";
import "../variables.css";
import { useNavigate } from "react-router-dom";

export default function SearchDialog() {
 const [open, setOpen] = useState(false);

 const handleOpen = () => setOpen(!open);

 const context = useContext(myContext);
 const { mode, searchkey, setSearchkey, getAllBlog } = context;
 const navigate = useNavigate();
 return (
  <Fragment>
   {/* Search Icon  */}
   <div onClick={handleOpen} className="cursor-pointer">
    <AiOutlineSearch size={20} color="white" />
   </div>
   {/* Dialog  */}
   <Dialog className=" relative  w-[18em]" open={open} handler={handleOpen} style={{ background: mode === "light" ? "var(--dialog-color)" : "var(--dialog-color)", color: mode === "dark" ? "white" : "black" }}>
    {/* Dialog Body  */}
    <DialogBody>
     <div className="flex w-full  justify-center">
      {/* Input  */}
      <Input
       color="white"
       type="search"
       label="Type here..."
       value={searchkey}
       onChange={(e) => setSearchkey(e.target.value)}
       className=" bg-[#2C3A47]"
       name="searchkey"
       containerProps={{
        className: "min-w-[208px]",
       }}
      />
     </div>

     {/* Blog Card  */}
     <div className="flex flex-wrap justify-center  sm:mx-auto cursor-pointer ">
      {getAllBlog
       .filter((obj) => obj.blogs.title.toLowerCase().includes(searchkey.toLowerCase()))
       .map((item, index) => {
        const { thumbnail, date, id } = item;
        return (
         <div className="p-2 sm:w-1/4 w-full" key={index}>
          <div className=" container mx-auto px-4 bg-gray-200 p-2 rounded-2xl " onClick={() => navigate(`/bloginfo/${item.id}`)}>
           {/* Blog Thumbnail  */}
           <img className="w-20 h-20 mb-2 rounded-lg" src={thumbnail} alt="thumbnail" />

           {/* Blog Date  */}
           <p className="w-40 text-sm">{date}</p>

           {/* Blog Title  */}
           <h1>{item.blogs.title}</h1>
          </div>
         </div>
        );
       })}
     </div>

     {/* Heading  */}
     <div className=" text-center text-sm">
      <h1 className=" text-gray-400 ">Powered By MonkCodes</h1>
     </div>
    </DialogBody>
   </Dialog>
  </Fragment>
 );
}
