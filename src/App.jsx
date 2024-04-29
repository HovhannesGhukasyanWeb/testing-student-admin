import React, { Suspense } from "react";
import { useSelector } from "react-redux";
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

function App() {
  const { isAuthenticated } = useSelector((state) => state.user);
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
