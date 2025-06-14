/**
 * Header component for Evangadi Forum
 * Production Summary: Displays navigation bar with logo, welcome message, and dynamic login/logout links.
 */
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/auth";
import logoB from "../../Image/logoBlack.png";
import "../Header/Header.css";

const Header = () => {
	const { isAuthenticated, user, logout } = useAuth();
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate("/auth?tab=login");
	};
	// console.log(user.firstname);

	return (
		<nav className="header">
			<div className="header-container">
				<Link className="header-logo" to="/">
					<img src={logoB} alt="logo" style={{ width: "200px" }} />
				</Link>
				<ul className="header-nav">
					{!isAuthenticated ? (
						<>
							<li>
								<Link className="header-nav-link" to="/">
									Home
								</Link>
							</li>
							<li>
								<Link className="header-nav-link" to="/about">
									How it Works
								</Link>
							</li>
							<li>
								<Link
									className="header-nav-link header-signin"
									to="/auth?tab=login"
								>
									SIGN IN
								</Link>
							</li>
						</>
					) : (
						<>
							<li>
								<Link className="header-nav-link" to="/">
									Home
								</Link>
							</li>
							<li>
								<Link className="header-nav-link" to="/about">
									How it Works
								</Link>
							</li>
							<li>
								<button
									className="header-nav-link header-logout"
									onClick={handleLogout}
								>
									LogOut
									{/* <span>{user}</span> */}
								</button>
								{/* {user} */}
							</li>
						</>
					)}
				</ul>
			</div>
		</nav>
	);
};

export default Header;
