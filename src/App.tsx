import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import AppContent from './AppContent';
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <AppContent />
          <Toaster />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;