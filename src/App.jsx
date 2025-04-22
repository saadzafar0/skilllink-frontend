//App.jsx
import AppRoutes from './routes';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import './App.css';
//import Register from './pages/Register';
//import Dashboard from './pages/Dashboard';
const App = () => {
  return (
    <>
    <div className="app-background">
      <Navbar />
      <AppRoutes />
      <Footer />
    </div>
    </>
  );
};

export default App;

