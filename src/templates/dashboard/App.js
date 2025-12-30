import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Header from "./components/Header.jsx";

function App() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
