import type { MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import styles from "./styles/app.css"

export function links() {
  return [
    { rel: "stylesheet", href: styles },
    // { rel: "stylesheet", href: "//rsms.me/inter/inter.css"}
  ]
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang="en" className="h-full bg-gray-100">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
      <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
        <div>GrowDash Logo Here</div>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        </div>
      </body>
    </html>
  );
}
