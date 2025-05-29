import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ClientView from './pages/ClientView';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/client" element={<ClientView />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;