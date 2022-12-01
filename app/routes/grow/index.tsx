//index route for /grow

import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, Link, useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";
import { getUser } from "~/utils/session.server";
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

type LoaderData = {
    user: Awaited<ReturnType<typeof getUser>>;
    grows: Array<Grow>
}

export const loader: LoaderFunction = async({request}) => {
    const user = await getUser(request);
    const grows = await db.grow.findMany({
        where: {
            growerId: user.id
          },
    });

    const data: LoaderData = {
        grows,
        user,
    };
    console.log(data, "===============================")
    return json(data);
}


export default function GrowIndexRoute() {
    const data = useLoaderData<LoaderData>();
    return (
        <div>
         {data.user ? (
            <div className="user-info">
              <span>{`Hi ${data.user.username}`}</span>
              <form action="/logout" method="post">
                <button type="submit" className="button">
                  Logout
                </button>
              </form>
            </div>
          ) : (
            <Link to="/login">Login</Link>
          )}
            <h3>Grow</h3>
            <ul>
                {data.grows.map(grow => (
                    <li key={grow.id}>
                        <Link to={grow.id}>
                            {grow.title}
                        </Link>
                        {grow.strain}
                        {grow.expectedDays} Day Grow
                        X Days Left
                        {grow.details}
                        Started On: {grow.startDate}
                        Ends On: {grow.endDate}

                    </li>
                ))}
            </ul>
        </div>
    );
    
}