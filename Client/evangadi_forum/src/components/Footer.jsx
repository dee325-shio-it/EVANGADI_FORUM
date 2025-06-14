/**
 * Footer component for Evangadi Forum
 * Production Summary: Displays site links and contact information in a multi-column layout.
 */
// import "../index.css";
import logoW from "./images/logoWhite.png";
import { FaFacebookF } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <img src={logoW} alt="logo" style={{ width: "150px" }} />
          <div className="socialLinks">
            <span><FaFacebookF/> </span>
            <span><AiFillInstagram/></span>
            <span><FaYoutube /></span>
          </div>
          
        </div>
        <div className="footer-section">
          <h3>Useful Link</h3>
          <p>How it works</p>
          <p>Terms of Service</p>
          <p>Privacy policy</p>
        </div>
        <div className="footer-section">
          <h3>Contact Info</h3>
          <p>Evangadi Networks</p>
          <p>support@evangadi.com</p>
          <p>+1-202-386-2702</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
