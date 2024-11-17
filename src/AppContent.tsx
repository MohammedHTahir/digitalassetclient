import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ShoppingBag, Search, Menu, X, ShoppingCart, User, LogOut } from 'lucide-react'
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Route, Routes, Link } from 'react-router-dom';
import DashboardPage from '@/components/DashboardPage';
import HomePage from '@/components/HomePage';
import ProductListing from '@/components/ProductListing';
import ProductDetail from '@/components/ProductDetail';
import UserProfile from '@/components/UserProfile';
import Footer from '@/components/Footer';
import Cart from '@/components/Cart';
import ProtectedRoute from '@/components/ProtectedRoute';
import { LoginForm, SignupForm } from '@/components/AuthForms';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

function AppContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { getCartCount } = useCart();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="py-4 px-6 md:px-12 flex items-center justify-between border-b">
        <div className="flex items-center">
          <ShoppingBag className="h-6 w-6 mr-2" />
          <Link to="/">
            <div>
              <span className="text-xl font-bold">Dokan Load</span>
              <span className="text-xs block text-muted-foreground">(Arabic for "Shop & Download")</span>
            </div>
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" asChild><Link to="/products">Products</Link></Button>
          <Button variant="ghost">Sell</Button>
          <Button variant="ghost">About</Button>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden md:block relative">
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8"
            />
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Avatar className="h-8 w-8">
                    {user.avatarUrl ? (
                      <img 
                        src={user.avatarUrl} 
                        alt={user.username || ''} 
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <AvatarFallback>
                        {user.username?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    )}
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="flex items-center">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout} className="flex items-center">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost">Log In</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Login to your account</DialogTitle>
                    <DialogDescription>
                      Enter your credentials to access your account
                    </DialogDescription>
                  </DialogHeader>
                  <LoginForm onClose={() => {}} />
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost">Sign Up</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create an account</DialogTitle>
                    <DialogDescription>
                      Join Dokan Load to start buying and selling digital assets
                    </DialogDescription>
                  </DialogHeader>
                  <SignupForm onClose={() => {}} />
                </DialogContent>
              </Dialog>
            </>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <Badge variant="destructive" className="absolute -top-2 -right-2">
                  {getCartCount()}
                </Badge>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Shopping Cart</SheetTitle>
                <SheetDescription>
                  Review your items and checkout
                </SheetDescription>
              </SheetHeader>
              <Cart />
            </SheetContent>
          </Sheet>
          <Button variant="outline" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </header>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-b">
          <nav className="flex flex-col p-4">
            <Link to="/products" className="py-2">Products</Link>
            <Link to="#" className="py-2">Sell</Link>
            <Link to="#" className="py-2">About</Link>
          </nav>
        </div>
      )}

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductListing />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          } />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default AppContent;