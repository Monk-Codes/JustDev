import React, { useEffect } from "react";
import Layout from "../../components/layout/Layout";
import HeroSection from "../../components/heroSection/HeroSection";
import BlogPostCard from "../../components/blogCard/BlogCard";
import Loader from "../../components/loader/Loader";

function Home() {
 useEffect(() => {
  window.scrollTo(0, 0);
 }, []);
 return (
  <Layout>
   <HeroSection />
   <BlogPostCard />
   <Loader />
  </Layout>
 );
}

export default Home;
