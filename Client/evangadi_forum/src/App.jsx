import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./utils/auth";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Question from "./pages/Question";
import Ask from "./pages/Ask";
import "./index.css";
import AuthPage from "./pages/AuthPage";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from "./pages/Forgotpassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<ProtectedRoute />}>
              <Route index element={<Home />} />
              <Route path="question/:questionid" element={<Question />} />
              <Route path="ask" element={<Ask />} />
            </Route>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
          </Routes>
        </main>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;
