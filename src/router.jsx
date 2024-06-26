import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Roles from "./pages/admin/roles";

const Home = React.lazy(() => import('./pages/home'));
const Layout = React.lazy(() => import('./layout'));
const NotFound = React.lazy(() => import('./pages/not-found'));
const Login = React.lazy(() => import('./pages/login'));
const Users = React.lazy(() => import('./pages/admin/users'));
const ManagerSubjects = React.lazy(() => import('./pages/manager/subjects'));
const ManagerTeachers = React.lazy(() => import('./pages/manager/teachers'));
const ManagerStudents = React.lazy(() => import('./pages/manager/students'));
const ManagerGroups = React.lazy(() => import('./pages/manager/groups'));
const GroupStudents = React.lazy(() => import('./pages/manager/group-students'));
const TeacherQuestions = React.lazy(() => import('./pages/teacher/questions'));
const TeacherTests = React.lazy(() => import('./pages/teacher/tests'));
const TeacherTestQuestions = React.lazy(() => import('./pages/teacher/test-questions'));
const TeacherTestStudents = React.lazy(() => import('./pages/teacher/test-students'));

const MainRouter = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  return (
    <Router basename="/">
      <Suspense fallback={null}>
        <Routes>
          {/* auth routes */}
          <Route path="/login">
            <Route
              index
              element={isAuthenticated ? <Navigate to="/" /> : <Login />}
            />
          </Route>

          {/* middleware for auth and layout */}
          <Route
            path="/"
            element={isAuthenticated ? <Layout /> : <Navigate to="/login" />}
          >

            {/* admin routes */}
            <Route index element={<Home />} />;
            <Route
              path="admin"
            >
              <Route path="users" element={<Users />} />
              <Route path="roles" element={<Roles />} />
            </Route>
            {/* end admin routes */}

            {/* manager routes */}


            <Route path="manager">
              <Route path="subjects" element={<ManagerSubjects />} />
              <Route path="teachers" element={<ManagerTeachers />} />
              <Route path="students" element={<ManagerStudents />} />
              <Route path="groups" element={<ManagerGroups />} />
              <Route path="groups/:id/students" element={<GroupStudents />} />
            </Route>
            {/* end manager routes */}

            <Route path="teacher">
              <Route path="questions" element={<TeacherQuestions />} />
              <Route path="tests" element={<TeacherTests />} />
              <Route path="tests/:id/questions" element={<TeacherTestQuestions />} />
              <Route path="tests/:id/students" element={<TeacherTestStudents />} />
            </Route>

            {/* not found */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  )
}

export default MainRouter;

