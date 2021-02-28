import React from "react";
import "./Footer.css";

function Footer() {
  let date = new Date().getUTCFullYear();
  return (
    <div className="footer">
      <div>
        <p className="footer__copyright">Denis © {date}</p>
      </div>
    </div>
  );
}

export default Footer;
