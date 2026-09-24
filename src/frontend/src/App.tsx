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
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
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

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
