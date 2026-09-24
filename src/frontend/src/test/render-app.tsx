import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { render } from "@testing-library/react";
import type { ReactNode } from "react";

import { Layout } from "@/components/Layout";
import {
  CollectionPage,
  validateCollectionSearch,
} from "@/pages/CollectionPage";
import { ContactPage } from "@/pages/ContactPage";
import { DesignersPage } from "@/pages/DesignersPage";
import { ExperiencePage } from "@/pages/ExperiencePage";
import { HomePage } from "@/pages/HomePage";
import { SpecimenDetailPage } from "@/pages/SpecimenDetailPage";

/**
 * A test-only router mirroring App.tsx's route tree, but backed by an in-memory
 * history so a test can start at any route and assert navigation without a
 * browser. It is deliberately a copy rather than an import of App's router:
 * App.tsx creates its router at module scope with a browser history, which
 * cannot be pointed at an arbitrary initial URL.
 */
function buildTestRouter(initialPath: string) {
  const rootRoute = createRootRoute({
    component: () => (
      <Layout>
        <TestOutlet />
      </Layout>
    ),
  });

  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: HomePage,
  });

  const collectionRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/collection",
    validateSearch: validateCollectionSearch,
    component: CollectionPage,
  });

  const specimenDetailRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/collection/$specimenId",
    validateSearch: validateCollectionSearch,
    component: SpecimenDetailPage,
  });

  const experienceRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/experience",
    component: ExperiencePage,
  });

  const designersRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/designers",
    component: DesignersPage,
  });

  const contactRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/contact",
    component: ContactPage,
  });

  const routeTree = rootRoute.addChildren([
    indexRoute,
    collectionRoute,
    specimenDetailRoute,
    experienceRoute,
    designersRoute,
    contactRoute,
  ]);

  return createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: [initialPath] }),
  });
}

// `Outlet` is imported lazily to keep the route tree above readable.
import { Outlet } from "@tanstack/react-router";
function TestOutlet() {
  return <Outlet />;
}

export function renderApp(initialPath = "/") {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
  const router = buildTestRouter(initialPath);

  const result = render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );

  return { ...result, router };
}

export function renderWithProviders(ui: ReactNode) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  );
}
