import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DSBlog from '../phanchinh/DSBlog';



const Blog: React.FC = () => {
  

    return (
        <div>
            <Header />
            <Navbar />
            <DSBlog />
           <Footer/>
        </div>
    );
};

export default Blog;
