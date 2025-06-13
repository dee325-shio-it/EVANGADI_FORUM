// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   Navigate,
// } from "react-router-dom";
// import { AuthProvider } from "./utils/auth";
// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import Home from "./pages/Home";
// import Question from "./pages/Question";
// import Ask from "./pages/Ask";
// import "./index.css";
// import AuthPage from "./pages/AuthPage";
// import ProtectedRoute from "./components/ProtectedRoute";

// function App() {
//   return (
//     <Router>
//       <AuthProvider>
//         <Header />
//         <main>
//           <Routes>
//             <Route path="/" element={<ProtectedRoute />}>
//               <Route index element={<Home />} />
//               <Route path="question/:questionid" element={<Question />} />
//               <Route path="ask" element={<Ask />} />
//             </Route>
//             <Route path="/auth" element={<AuthPage />} />
//           </Routes>
//         </main>
//         <Footer />
//       </AuthProvider>
//     </Router>
//   );
// }

// export default App;


import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { AuthProvider } from "./utils/auth";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Question from "./pages/Question";
import Ask from "./pages/Ask";
import AuthPage from "./pages/AuthPage";
import ProtectedRoute from "./components/ProtectedRoute";

function AppWrapper() {
  return (
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  );
}

function App() {
  const location = useLocation();

  // Paths to hide footer from
  const hideFooterPaths = ["/ask", "/", "/question"];

  // Check if current path matches /ask, / or starts with /question/
  const shouldHideFooter =
    location.pathname === "/ask" ||
    location.pathname === "/" ||
    location.pathname.startsWith("/question/");

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<ProtectedRoute />}>
            <Route index element={<Home />} />
            <Route path="question/:questionid" element={<Question />} />
            <Route path="ask" element={<Ask />} />
          </Route>
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </main>
      {!shouldHideFooter && <Footer />}
    </>
  );
}

export default AppWrapper;
