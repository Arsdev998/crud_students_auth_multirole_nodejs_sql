import { BrowserRouter,Routes,Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Dashboard from "./pages/Dashboard";
import StudentsList from "./pages/StudentsList";
import DetailSiswa from "./pages/DetailSiswa";
import FormAddTasks from "./components/formadd/FormAddTasks";
export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/studentslist" element={<StudentsList/>}/>
          <Route path="/studentslist/detail/:id" element={<DetailSiswa/>}/>
          <Route path="/studentslist/detail/add/:id" element={<FormAddTasks/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}
