import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  NavLink,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="flex h-screen">
        <nav className="w-64 border-r bg-gray-50 p-4 h-full flex flex-col">
          <ul className="space-y-2 flex-1 overflow-y-auto">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block p-2 rounded-lg ${
                    isActive
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-200 text-gray-700"
                  }`
                }
              >
                Landing Page
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/draft"
                className={({ isActive }) =>
                  `block p-2 rounded-lg ${
                    isActive
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-200 text-gray-700"
                  }`
                }
              >
                Draft Editor
              </NavLink>
            </li>
          </ul>
        </nav>
        <main className="flex-1 overflow-y-auto h-full">{children}</main>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
