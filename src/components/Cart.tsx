import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2 } from 'lucide-react';

const Cart: React.FC = () => {
  const { cart, removeFromCart, clearCart, getCartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="p-4 text-center">
        <ShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-xl font-semibold">Your cart is empty</p>
        <p className="text-gray-500">Add some items to get started!</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      <ul className="divide-y divide-gray-200">
        {cart.map((item) => (
          <li key={item.id} className="py-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-500">
                ${item.price.toFixed(2)} x {item.quantity}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeFromCart(item.id)}
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex justify-between items-center">
        <p className="text-xl font-bold">Total: ${getCartTotal().toFixed(2)}</p>
        <div>
          <Button variant="outline" onClick={clearCart} className="mr-2">
            Clear Cart
          </Button>
          <Button>Checkout</Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;