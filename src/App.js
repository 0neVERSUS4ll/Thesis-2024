import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { userInputs, quizInputs, topologyQuizInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import Register from "./pages/register/Register";
import ListProduct from "./pages/listProduct/ListProduct";
import ListOrder from "./pages/listOrder/ListOrder";
import NewQuiz from "./pages/newQuiz/NewQuiz";
import ViewQuiz from "./pages/viewquiza/ViewQuiz";
import NewTopologyQuiz from "./pages/newTopologyQuiz/NewTopologyQuiz";
import ViewTopologyQuiz from "./pages/viewTopologyquizza/ViewTopologyQuiz";
import UpdateQuiz from "./pages/editQuiz/EditQuiz";
import UpdateTopologyQuiz from "./pages/editTopologyQuiz/EditTopologyQuiz";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const {currentUser} = useContext(AuthContext)

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="/">
            <Route
              index
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
            <Route path="users">
              <Route
                index
                element={
                  <RequireAuth>
                    <List />
                  </RequireAuth>
                }
              />
              <Route
                path=":userId"
                element={
                  <RequireAuth>
                    <Single />
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <New inputs={userInputs} title="Add New User" />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="quizes">
              <Route
                index
                element={
                  <RequireAuth>
                    <ListProduct />
                  </RequireAuth>
                }
              />
              <Route
                path="view/:quizId"
                element={
                  <RequireAuth>
                    <ViewQuiz />
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <NewQuiz inputs={quizInputs} title="Add New Quiz" />
                  </RequireAuth>
                }
              />
              <Route
                path="edit/:quizId"
                element={
                  <RequireAuth>
                    <UpdateQuiz inputs={quizInputs} title="Edit Quiz" />                    
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="topologyQuizes">
              <Route
                index
                element={
                  <RequireAuth>
                    <ListOrder />
                  </RequireAuth>                              
                }
              />
              <Route
                path=":quizId"
                element={
                  <RequireAuth>
                    <ViewTopologyQuiz />
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <NewTopologyQuiz inputs={topologyQuizInputs} title="Add New Order" />
                  </RequireAuth>
                }
              />
              <Route
                path="edit/:quizId"
                element={
                  <RequireAuth>
                    <UpdateTopologyQuiz inputs={topologyQuizInputs} title="Edit Order" />
                  </RequireAuth>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
