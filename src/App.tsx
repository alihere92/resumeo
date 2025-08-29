import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ResumeBuilder from "./pages/ResumeBuilder";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";
import AIContentPage from "./pages/features/AIContentPage";
import TemplatesPage from "./pages/features/TemplatesPage";
import PDFExportPage from "./pages/features/PDFExportPage";
import PreviewPage from "./pages/features/PreviewPage";
import ATSOptimizationPage from "./pages/features/ATSOptimizationPage";
import FormatsPage from "./pages/features/FormatsPage";
import CoverLettersPage from "./pages/features/CoverLettersPage";
import JobMatchingPage from "./pages/features/JobMatchingPage";
import SmartFormattingPage from "./pages/features/SmartFormattingPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route 
              path="/home" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/resume-builder" 
              element={
                <ProtectedRoute>
                  <ResumeBuilder />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/features/ai-content" 
              element={
                <ProtectedRoute>
                  <AIContentPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/features/templates" 
              element={
                <ProtectedRoute>
                  <TemplatesPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/features/pdf-export" 
              element={
                <ProtectedRoute>
                  <PDFExportPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/features/preview" 
              element={
                <ProtectedRoute>
                  <PreviewPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/features/ats-optimization" 
              element={
                <ProtectedRoute>
                  <ATSOptimizationPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/features/formats" 
              element={
                <ProtectedRoute>
                  <FormatsPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/features/cover-letters" 
              element={
                <ProtectedRoute>
                  <CoverLettersPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/features/job-matching" 
              element={
                <ProtectedRoute>
                  <JobMatchingPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/features/smart-formatting" 
              element={
                <ProtectedRoute>
                  <SmartFormattingPage />
                </ProtectedRoute>
              } 
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
