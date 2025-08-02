import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Navigation } from "@/components/Navigation";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { WhatsAppPage } from "./pages/whatsapp";
import { FollowUpPage } from "./pages/follow-up";
import { DocsPage } from "./pages/docs";
import { AddVehiclePage } from "./pages/addvehicle";
import { MetricsPage } from "./pages/metrics";
import { VehicleDetailsPage } from "./pages/vehicle-details";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navigation />
          <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-6">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/whatsapp" element={<WhatsAppPage />} />
                <Route path="/follow-up" element={<FollowUpPage />} />
                <Route path="/docs" element={<DocsPage />} />
                <Route path="/addvehicle" element={<AddVehiclePage />} />
                <Route path="/metrics" element={<MetricsPage />} />
                <Route path="/vehicle/:id" element={<VehicleDetailsPage />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
