import React from 'react';
import { ShoppingBag, Facebook, Twitter, Instagram, Code } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 text-gray-600 py-8 mt-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center mb-4">
              <ShoppingBag className="h-6 w-6 mr-2" />
              <span className="text-xl font-bold">Dokan Load</span>
            </div>
            <p className="text-sm">Your one-stop shop for premium digital downloads.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-900">About Us</a></li>
              <li><a href="#" className="hover:text-gray-900">Contact</a></li>
              <li><a href="#" className="hover:text-gray-900">FAQ</a></li>
              <li><a href="#" className="hover:text-gray-900">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-900">Software</a></li>
              <li><a href="#" className="hover:text-gray-900">Graphics</a></li>
              <li><a href="#" className="hover:text-gray-900">Audio</a></li>
              <li><a href="#" className="hover:text-gray-900">eBooks</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-sm mb-4">Stay updated with our latest offers and products.</p>
            <div className="flex">
              <input type="email" placeholder="Your email" className="px-3 py-2 border rounded-l-md w-full" />
              <Button type="submit" className="rounded-l-none">Subscribe</Button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm mb-4 md:mb-0">&copy; 2024 Dokan Load. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-gray-600"><Facebook size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-gray-600"><Twitter size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-gray-600"><Instagram size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-gray-600"><Code size={20} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;