import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Properties from './pages/Properties';
import PropertyDetails from './pages/PropertyDetails';
import Hostings from './pages/Hostings';
import HostingDetails from './pages/HostingDetails';
import AdvertiserProfile from './pages/AdvertiserProfile';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NewProperty from './pages/NewProperty';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/imoveis" element={<Properties />} />
      <Route path="/imovel/:id" element={<PropertyDetails />} />
      <Route path="/hospedagem" element={<Hostings />} />
      <Route path="/hospedagem/:id" element={<HostingDetails />} />
      <Route path="/anunciante/:id" element={<AdvertiserProfile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/novo-imovel" element={<NewProperty />} />
      <Route path="/sobre" element={<About />} />
      <Route path="/contato" element={<Contact />} />
    </Routes>
  );
}

export default App;
