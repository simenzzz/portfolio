import { render } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { appRoutes } from "../router";

export const renderRoute = (initialEntries: string[]) => {
  const router = createMemoryRouter(appRoutes, {
    initialEntries
  });

  return render(<RouterProvider router={router} />);
};
