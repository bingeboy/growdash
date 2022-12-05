import type { LinksFunction } from "@remix-run/node";
import { Link, Outlet } from "@remix-run/react";

export default function Index() {
  return (
    <div>

      
      <Outlet />
      
      <h1 className="text-4xl font-bold tracking-tight sm:text-center sm:text-6xl">Welcome to Growdash</h1>
      <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-center">The tooling needed to enhance your grows.</p>
      <div>Hero Image goes here</div>
    </div>
  );
}
