import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

// Critical pages loaded immediately
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";

// Lazy load authenticated and feature pages
const Home = lazy(() => import("./pages/Home"));
const ResumeBuilder = lazy(() => import("./pages/ResumeBuilder"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));

// Lazy load feature pages
const AIContentPage = lazy(() => import("./pages/features/AIContentPage"));
const TemplatesPage = lazy(() => import("./pages/features/TemplatesPage"));
const PDFExportPage = lazy(() => import("./pages/features/PDFExportPage"));
const PreviewPage = lazy(() => import("./pages/features/PreviewPage"));
const ATSOptimizationPage = lazy(() => import("./pages/features/ATSOptimizationPage"));
const FormatsPage = lazy(() => import("./pages/features/FormatsPage"));
const CoverLettersPage = lazy(() => import("./pages/features/CoverLettersPage"));
const JobMatchingPage = lazy(() => import("./pages/features/JobMatchingPage"));
const SmartFormattingPage = lazy(() => import("./pages/features/SmartFormattingPage"));

const queryClient = new QueryClient();

// Loading component for lazy routes
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

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
            <Route path="/forgot-password" element={
              <Suspense fallback={<LoadingFallback />}>
                <ForgotPassword />
              </Suspense>
            } />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route 
              path="/home" 
              element={
                <ProtectedRoute>
                  <Suspense fallback={<LoadingFallback />}>
                    <Home />
                  </Suspense>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/resume-builder" 
              element={
                <ProtectedRoute>
                  <Suspense fallback={<LoadingFallback />}>
                    <ResumeBuilder />
                  </Suspense>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/editor/:id" 
              element={
                <ProtectedRoute>
                  <Suspense fallback={<LoadingFallback />}>
                    <ResumeBuilder />
                  </Suspense>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/features/ai-content" 
              element={
                <ProtectedRoute>
                  <Suspense fallback={<LoadingFallback />}>
                    <AIContentPage />
                  </Suspense>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/features/templates" 
              element={
                <ProtectedRoute>
                  <Suspense fallback={<LoadingFallback />}>
                    <TemplatesPage />
                  </Suspense>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/features/pdf-export" 
              element={
                <ProtectedRoute>
                  <Suspense fallback={<LoadingFallback />}>
                    <PDFExportPage />
                  </Suspense>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/features/preview" 
              element={
                <ProtectedRoute>
                  <Suspense fallback={<LoadingFallback />}>
                    <PreviewPage />
                  </Suspense>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/features/ats-optimization" 
              element={
                <ProtectedRoute>
                  <Suspense fallback={<LoadingFallback />}>
                    <ATSOptimizationPage />
                  </Suspense>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/features/formats" 
              element={
                <ProtectedRoute>
                  <Suspense fallback={<LoadingFallback />}>
                    <FormatsPage />
                  </Suspense>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/features/cover-letters" 
              element={
                <ProtectedRoute>
                  <Suspense fallback={<LoadingFallback />}>
                    <CoverLettersPage />
                  </Suspense>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/features/job-matching" 
              element={
                <ProtectedRoute>
                  <Suspense fallback={<LoadingFallback />}>
                    <JobMatchingPage />
                  </Suspense>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/features/smart-formatting" 
              element={
                <ProtectedRoute>
                  <Suspense fallback={<LoadingFallback />}>
                    <SmartFormattingPage />
                  </Suspense>
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
