
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminRoute from "@/components/AdminRoute";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Properties from "./pages/Properties";
import PropertyDetails from "./pages/PropertyDetails";
import PropertySubmit from "./pages/PropertySubmit";
import AdminProperties from "./pages/AdminProperties";
import OwnerRentals from "./pages/OwnerRentals";
import MyBookings from "./pages/MyBookings";
import MySubmissions from "./pages/MySubmissions";
import Requests from "./pages/Requests";
import FurnishRequest from "./pages/FurnishRequest";
import AdminFurnishRequests from "./pages/AdminFurnishRequests";
import Payment from "./pages/Payment";
import NotFound from "./pages/NotFound";

// Create a client
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="/properties/:id" element={<PropertyDetails />} />
              <Route path="/submit-property" element={<ProtectedRoute><PropertySubmit /></ProtectedRoute>} />
              <Route path="/admin/properties" element={<AdminRoute><AdminProperties /></AdminRoute>} />
              <Route path="/admin/furnish-requests" element={<AdminRoute><AdminFurnishRequests /></AdminRoute>} />
              <Route path="/my-rentals" element={<ProtectedRoute><OwnerRentals /></ProtectedRoute>} />
              <Route path="/my-bookings" element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />
              <Route path="/my-submissions" element={<ProtectedRoute><MySubmissions /></ProtectedRoute>} />
              <Route path="/requests" element={<ProtectedRoute><Requests /></ProtectedRoute>} />
              <Route path="/furnish-your-home" element={<FurnishRequest />} />
              <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
