import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import AppContent from './AppContent';
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppContent />
          <Toaster />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;