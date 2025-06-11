/**
 * Authentication page for Evangadi Forum
 * Shows SignIn by default with custom styling
 */
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";
import "../index.css";

const AuthPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showSignUp, setShowSignUp] = useState(false);

  useEffect(() => {
    const tab = searchParams.get("tab");
    setShowSignUp(tab === "signup");
  }, [searchParams]);

  return (
    <div className="auth-page">
      <div className="auth-container">
        {showSignUp ? <SignUp /> : <SignIn />}
      </div>
    </div>
  );
};

export default AuthPage;
