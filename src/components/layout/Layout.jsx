import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { Analytics } from "@vercel/analytics/react";
function Layout({ children }) {
 return (
  <div>
   {/* Navbar  */}
   <Navbar />

   {/* main Content  */}
   <div className="content min-h-dvh ">
    {children}
    <Analytics />
   </div>

   {/* Footer  */}
   <Footer />
  </div>
 );
}

export default Layout;
