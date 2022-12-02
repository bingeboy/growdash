import type { LinksFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <nav className="bg-gray-800">
        <div>GrowDash Logo Here</div>
        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-end">
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <Link to="/login" className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">Login</Link>
              <Link to="/login" className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">Signup</Link>
            </div>
          </div>
        </div>
      </nav>
      
      
      <h1 className="text-4xl font-bold tracking-tight sm:text-center sm:text-6xl">Welcome to Growdash</h1>
      <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-center">The tooling needed to enhance your grows.</p>
      <div>Hero Image goes here</div>
    </div>
  );
}
