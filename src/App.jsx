import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const Home = React.lazy(() => import('./pages/home'));
const Personal = React.lazy(() => import('./pages/personal'));
const Layout = React.lazy(() => import('./layout'));
const NotFound = React.lazy(() => import('./pages/not-found'));
const Login = React.lazy(() => import('./pages/login'));

// import Home from "./pages/home";
// import Personal from "./pages/personal";
// import Layout from "./layout";
// import NotFound from "./pages/not-found";
// import Login from "./pages/login";


function App() {
  const isAuthenticated = true;

  return (
    <Router basename="/">
      <Suspense fallback={null}>
        <Routes>
          <Route path="/login">
            <Route
              index
              element={isAuthenticated ? <Navigate to="/" /> : <Login />}
            />
            {/* <Route path="reset-password" element={<ResetPassword />} /> */}
          </Route>

          <Route
            path="/"
            element={isAuthenticated ? <Layout /> : <Navigate to="/login" />}
          >
            <Route index element={<Home />} />;
            <Route path="personal" element={<Personal />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
