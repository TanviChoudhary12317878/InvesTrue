import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TickerProvider } from "@/context/TickerContext";
import Home from "@/pages/Home";
import AnalysisPage from "@/pages/Analysis";

/**
 * App.tsx — The root component.
 * 
 * - BrowserRouter: provides client-side routing (replaces Next.js file-based routing)
 * - TickerProvider: shares the current stock analysis data across all components
 * - Routes: maps URL paths to page components
 */
export default function App() {
  return (
    <BrowserRouter>
      <TickerProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analyze/:ticker" element={<AnalysisPage />} />
        </Routes>
      </TickerProvider>
    </BrowserRouter>
  );
}
