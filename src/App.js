
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import PasswordReset from "./components/passwordreset/PasswordReset";
import Register from "./components/register/Register";
import { Routes, Route } from "react-router-dom";
import CreateTask from "./components/task/CreateTask";
import NavBar from "./components/navabar/NavBar";
import ViewUpdate from "./components/task/ViewUpdate";

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route exact path="/" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/passwordreset" element={<PasswordReset/>}/>
        <Route exact path="/home" element={<Home/>}/>
        <Route exact path="/task/create" element={<CreateTask/>}/>
        <Route exact path="/tasks/:id" element={<ViewUpdate/>}/>
      </Routes>
    </div>
  );
}

export default App;

