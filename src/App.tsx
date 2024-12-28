import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layouts and Views
import { AdminLayout } from './layouts/AdminLayout';
import { ClientLayout } from './layouts/ClientLayout';
import { ContractorLayout } from './layouts/ContractorLayout';
import { RegisterView } from './views/auth/RegisterView';

export function App() {
  return (
    <Router>
      <Routes>
        {/* Landing/Register page */}
        <Route path="/" element={<RegisterView />} />

        {/* Admin Routes */}
        <Route path="/admin/*" element={<AdminLayout />} />
        
        {/* Client Routes */}
        <Route path="/client/*" element={<ClientLayout />} />
        
        {/* Contractor Routes */}
        <Route path="/contractor/*" element={<ContractorLayout />} />
      </Routes>
    </Router>
  );
}