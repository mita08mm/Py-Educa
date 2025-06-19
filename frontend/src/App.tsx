import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import CursosPage from "./pages/CursosPage";
import "./App.css";
import CrearCursoPage from "./pages/CrearCursoPage";

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<CursosPage />} />
          <Route path="/cursos" element={<CursosPage />} />
          <Route path="/crear-curso" element={<CrearCursoPage />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
