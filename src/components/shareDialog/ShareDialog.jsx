import { Fragment, useContext, useState } from "react";
import "../variables.css";
import { Dialog, DialogBody } from "@material-tailwind/react";
import myContext from "../../context/data/myContext";
import { AiOutlineShareAlt, AiFillLinkedin, AiFillTwitterSquare, AiFillCopy, AiFillFacebook } from "react-icons/ai";
import toast from "react-hot-toast";

export default function ShareDialogBox() {
 const [open, setOpen] = useState(false);

 const handleOpen = () => setOpen(!open);

 const context = useContext(myContext);
 const { mode } = context;

 const iconStyle = {
  color: mode === "dark" ? "white" : "white",
  transition: "transform 0.3s",
 };
 const copyToClipboard = () => {
  navigator.clipboard.writeText(window.location.href);
  toast.success("Copied to clipboard");
 };

 const currentUrl = window.location.href;

 const socialLinks = [
  { icon: <AiFillCopy size={35} style={iconStyle} />, url: "", label: "Copy URL", onclick: copyToClipboard },
  { icon: <AiFillLinkedin size={35} style={iconStyle} />, url: `https://www.linkedin.com/shareArticle?mini=true&url=${currentUrl}`, label: "LinkedIn" },
  { icon: <AiFillTwitterSquare size={35} style={iconStyle} />, url: `https://www.instagram.com/?url=${encodeURIComponent(currentUrl)}`, label: "Twitter" },
  { icon: <AiFillFacebook size={35} style={iconStyle} />, url: `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`, label: "Facebook" },
 ];

 return (
  <Fragment>
   <div className="ml-auto cursor-pointer">
    <AiOutlineShareAlt onClick={handleOpen} style={{ color: mode === "dark" ? "white" : "white" }} size={20} />
   </div>
   <Dialog
    className="relative right-[1em] w-[25em] md:right-0 md:w-0 lg:right-0 lg:w-0"
    open={open}
    handler={handleOpen}
    style={{
     background: "var(--dialog-color)",
     color: mode === "dark" ? "white" : "black",
    }}
   >
    <DialogBody>
     <div className="flex justify-center flex-wrap sm:mx-auto sm:mb-2 -mx-2 mt-4 mb-2">
      <div className="flex gap-3">
       {socialLinks.map((link, index) => (
        <div key={index} className="transition-transform hover:scale-110">
         <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          onclick={(e) => {
           e.preventDefault();
           if (link.onclick) {
            link.onclick();
           }
          }}
         >
          {link.icon}
         </a>
        </div>
       ))}
      </div>
     </div>
     <div className="text-center">
      <h1 className="text-gray-600">Powered By MonkCodes</h1>
     </div>
    </DialogBody>
   </Dialog>
  </Fragment>
 );
}
