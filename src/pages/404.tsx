import React, { useEffect, useState, ChangeEvent } from "react";
import Link from 'next/link';
import DayrateWorkLogo from "@/static/images/logo_dayratework.png";

const Pagenotfound = () => {
  return (
    <>
    <div style={{"position":"fixed", "top":"50%", "bottom":"50%", "left":"25%", "right":"25%"}}>
      <div style={{"textAlign":"center"}}>
      <Link href="/">
              <img src={DayrateWorkLogo.src} alt={"Dayratework"} style={{"width": "500px", "margin": "0px auto"}} />
            </Link>
        <h1>Oops! Page not found.</h1>
        <p>The page you are looking for does not exist.</p>
        <Link href="/">
          <a>Go back to home page</a>
        </Link>
      </div>
      </div>
    </>
  );
};

export default Pagenotfound;
