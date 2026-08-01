import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from '../../features/home/components/Footer';

export default function MainLayout() {
  return (
    <div className="main-layout">
      <Header />
      
      <main className="main-content">
        <Outlet />
      </main>

      <Footer />

      <style>{`
        .main-layout {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        
        .main-content {
          flex: 1;
          padding-top: 80px; /* offset for fixed header */
        }
      `}</style>
    </div>
  );
}
