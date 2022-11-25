//index route for /grow

import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, Link, useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";
import { Grow } from "@prisma/client"
// import stylesUrl from "../styles/grow.css";

export let links: LinksFunction = () =>{
    return [
        {
            rel: "stylesheet",
            href: "stylesUrl"
        }
    ]
}

type LoaderData = {grows: Array<Grow>}
export const loader: LoaderFunction = async() => {
    const data: LoaderData = {
        grows: await db.grow.findMany(),
      };

    return json(data);
}


export default function GrowIndexRoute() {
    let data = useLoaderData()
    return (
        <div>
            <h3>Grow</h3>
            <ul>
                {data.grows.map(grow => (
                    <li key={grow.id}>
                        <Link to={grow.id}>
                            {grow.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
    
}