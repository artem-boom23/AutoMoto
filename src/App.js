import { AutoList } from "./components/AutoList";
import { AutoForm } from "./components/AutoForm";
import { MotoList } from "./componentsMoto/MotoList";
import { MotoForm } from "./componentsMoto/MotoForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route path="/" element={<AutoList />} />
        <Route path="add" element={<AutoForm />} />
        <Route path="edit/:id" element={<AutoForm />} />
        <Route path="moto" element={<MotoList/>}/>
        <Route path="addmoto" element={<MotoForm/>}/>
        <Route path="editmoto/:id" element={<MotoForm/>}/>
        <Route path="*" element={<h1>Not Found</h1>} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
