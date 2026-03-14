import { Toaster } from "@/components/ui/sonner";
import {
  Link,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { FileStack, Truck } from "lucide-react";
import FormPage from "./pages/FormPage";
import RecordsPage from "./pages/RecordsPage";

function RootLayout() {
  return (
    <div className="min-h-screen bg-[#e8edf2] flex flex-col">
      {/* Nav */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src="/assets/uploads/IMG-20250909-WA0012-1-1.jpg"
              alt="INDTRANS logo"
              style={{ height: 36, width: "auto", objectFit: "contain" }}
            />
            <span className="font-bold text-lg text-gray-800 tracking-tight">
              Indtrans
            </span>
            <span className="text-xs text-gray-500 font-medium hidden sm:inline">
              Freight Solutions
            </span>
          </div>
          <nav className="flex items-center gap-1">
            <Link
              to="/"
              data-ocid="nav.form.link"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors hover:bg-gray-100 [&.active]:bg-[#1a3a5c] [&.active]:text-white text-gray-700"
            >
              <Truck className="w-4 h-4" />
              New Note
            </Link>
            <Link
              to="/records"
              data-ocid="nav.records.link"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors hover:bg-gray-100 [&.active]:bg-[#1a3a5c] [&.active]:text-white text-gray-700"
            >
              <FileStack className="w-4 h-4" />
              Records
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-gray-200 py-4 text-center text-xs text-gray-400">
        &copy; {new Date().getFullYear()}. Built with ❤️ using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-gray-600 transition-colors"
        >
          caffeine.ai
        </a>
      </footer>

      <Toaster position="top-right" richColors />
    </div>
  );
}

const rootRoute = createRootRoute({ component: RootLayout });
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: FormPage,
});
const recordsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/records",
  component: RecordsPage,
});

const routeTree = rootRoute.addChildren([indexRoute, recordsRoute]);
const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
