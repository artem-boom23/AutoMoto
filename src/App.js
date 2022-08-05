import { AutoList } from "./components/AutoList";
import { AutoForm } from "./components/AutoForm";
import { MotoList } from "./componentsMoto/MotoList";
import { MotoForm } from "./componentsMoto/MotoForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Reset from "./componentLogin/Reset"
import Login from "./componentLogin/Login";
import Register from "./componentLogin/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="add" element={<AutoForm />} />
        <Route path="auto" element={<AutoList />}/>
        <Route path="edit/:id" element={<AutoForm />} />
        <Route path="moto" element={<MotoList/>}/>
        <Route path="addmoto" element={<MotoForm/>}/>
        <Route path="editmoto/:id" element={<MotoForm/>}/>
        <Route path="register" element={<Register />}/>
        <Route path="reset" element={<Reset />}/>
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
