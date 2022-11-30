import type { LinksFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Growdash</h1>
      <div>Hero Image goes here</div>
      <div>
      <Link to="/login">Login</Link> | Signup
      </div>
    </div>
  );
}
