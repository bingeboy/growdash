import type { MetaFunction } from "@remix-run/node";
import {
  Links,
  Link,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import styles from "./styles/app.css"

export function links() {
  return [
    { rel: "stylesheet", href: styles },
    // { rel: "stylesheet", href: "//rsms.me/inter/inter.css"}
  ]
}

import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getUser } from "~/utils/session.server";

type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>;
}

export const loader: LoaderFunction = async({request}) => {
  const user = await getUser(request);
  
  const data: LoaderData = {
      user,
  };

  return json(data);
}


export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  const data = useLoaderData<LoaderData>();
  return (
    <html lang="en" className="h-full bg-gray-100">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
      <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
        <div>GrowDash Logo Here</div>
        <nav className="bg-gray-800">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-end">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
              
              {data.user ? (
                   <div className="user-info">
                     <span>{`Logged in as ${data.user.username}`}</span>
                     <form action="/logout" method="post">
                       <button type="submit" className="button">
                         Logout
                       </button>
                     </form>
                   </div>
                ) : (
                  <div className="user-info">
                    <Link to="/login" className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">Login</Link>
                    <Link to="/login/register" className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">Signup</Link>
                  </div>
                )}

              </div>
            </div>
          </div>
        </nav>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        </div>
      </body>
    </html>
  );
}
