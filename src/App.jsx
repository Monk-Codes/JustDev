import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Blog from "./pages/blog/Blog";
import AllBlogs from "./pages/allBlogs/AllBlogs";
import NoPage from "./pages/nopage/NoPage";
import BlogInfo from "./pages/blogInfo/BlogInfo";
import AdminLogin from "./pages/admin/adminLogin/AdminLogin";
import AdminSignup from "./pages/admin/adminSignup/AdminSignup";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import CreateBlog from "./pages/admin/createBlog/CreateBlog";
import MyState from "./context/data/MyState";
import EditBlog from "./pages/editBlog/EditBlog";
import { Toaster } from "react-hot-toast";

function App() {
 return (
  <MyState>
   <Router>
    <Routes>
     <Route path="/" element={<Home />} />
     <Route path="/blog" element={<Blog />} />
     <Route path="/allblogs" element={<AllBlogs />} />
     <Route path="/bloginfo/:id" element={<BlogInfo />} />
     <Route path="/editblog/:id" element={<EditBlog />} />
     <Route path="/adminlogin" element={<AdminLogin />} />
     <Route path="/adminsignup" element={<AdminSignup />} />
     <Route
      path="/dashboard"
      element={
       <ProtectedRoute>
        <Dashboard />
       </ProtectedRoute>
      }
     />
     <Route
      path="/createblog"
      element={
       <ProtectedRoute>
        <CreateBlog />
       </ProtectedRoute>
      }
     />
     <Route path="/*" element={<NoPage />} />
    </Routes>
    <Toaster />
   </Router>
  </MyState>
 );
}

export default App;

export const ProtectedRoute = ({ children }) => {
 const user = JSON.parse(localStorage.getItem("user"));
 if (user) {
  return children;
 } else {
  return <Navigate to={"/adminlogin"} />;
 }
};
