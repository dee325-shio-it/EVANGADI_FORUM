/**
//  * Footer component for Evangadi Forum
//  * Production Summary: Displays site links and contact information in a multi-column layout.
//  */

import logoW from "../../Image/logoWhite.png";
import { FaFacebookF } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";
import { FaLinkedin } from "react-icons/fa6";
import "./Footer.css";
const Footer = () => {
	return (
		<footer className="footer">
			<div className="footer-container">
				<div className="footer-section">
					<img src={logoW} alt="logo" style={{ width: "120px" }} />
					<div className="socialLinks">
						<a
							href="https://www.facebook.com/evangaditech"
							target="_blank"
							rel="noopener noreferrer"
						>
							<FaFacebookF />
						</a>
						<a
							href="https://www.instagram.com/evangaditech/#"
							target="_blank"
							rel="noopener noreferrer"
						>
							<AiFillInstagram />
						</a>
						<a
							href="https://www.youtube.com/evangaditech"
							target="_blank"
							rel="noopener noreferrer"
						>
							<FaYoutube />
						</a>
						<a
							href="https://www.linkedin.com/company/evangaditech"
							target="_blank"
							rel="noopener noreferrer"
						>
							<FaLinkedin />
						</a>
					</div>
				</div>
				<div className="footer-section">
					<h3>Useful Link</h3>
					<a href="/how-it-works">How it works</a>
					<a href="/terms">Terms of Service</a>
					<a href="/privacy">Privacy policy</a>
				</div>
				<div className="footer-section">
					<h3>Contact Info</h3>
					<p>Evangadi Networks</p>
					<a href="mailto:support@evangadi.com">support@evangadi.com</a>
					<a href="tel:+12023862702">+1-202-386-2702</a>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
