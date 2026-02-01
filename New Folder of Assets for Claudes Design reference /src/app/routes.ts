import { createBrowserRouter } from "react-router";
import { LandingPage } from "@/app/pages/LandingPage";
import { OverviewPage } from "@/app/pages/OverviewPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/overview",
    Component: OverviewPage,
  },
]);
