import { createBrowserRouter } from "react-router-dom";
import { PortfolioPage } from "./pages/PortfolioPage";
import { StudioPage } from "./pages/StudioPage";

export const appRoutes = [
  {
    path: "/",
    element: <PortfolioPage />
  },
  {
    path: "/studio",
    element: <StudioPage />
  }
];

export const router = createBrowserRouter(appRoutes);
