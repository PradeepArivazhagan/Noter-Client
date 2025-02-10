import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Notes from "./Pages/Notes";
import ProtectedRoute from "./Utils/ProtectedRoute";
import PublicRoute from "./Utils/PublicRoute";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/notes" element={<Notes />}>
            <Route path="createNote" element={<Notes />} />
            <Route path="editNote/:id" element={<Notes />} />
            <Route path="deleteNote/:id" element={<Notes />} />
          </Route>
        </Route>
      </Routes>
      <Toaster position="bottom-right" reverseOrder={false}/>
    </BrowserRouter>
  );
};

export default App;
