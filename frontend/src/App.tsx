import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import CursosPage from "./pages/CursosPage";
import "./App.css";
import CrearCursoPage from "./pages/CrearCursoPage";
import CursoDetallePage from "./pages/CursoDetallePage";
import ModuloDetallePage from "./pages/ModuloDetallePage";
import ContenidoPage from "./pages/ContenidoPage";
import EvaluacionDetallePage from "./pages/EvaluacionDetallePage";
import CodeSandboxPage from "./pages/CodeSandboxPage";

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<CursosPage />} />
          <Route path="/cursos" element={<CursosPage />} />
          <Route path="/crear-curso" element={<CrearCursoPage />} />
          <Route path="/curso/:id" element={<CursoDetallePage />} />
          <Route path="/modulo/:moduloId" element={<ModuloDetallePage />} />
          <Route path="/contenido/:subseccionId" element={<ContenidoPage />} />
          <Route
            path="/evaluacion/:evaluacionId"
            element={<EvaluacionDetallePage />}
          />
          <Route path="/sandbox" element={<CodeSandboxPage />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
