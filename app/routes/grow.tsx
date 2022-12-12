//index route for /grow

import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, Link, useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";
import { getUser } from "~/utils/session.server";
import { Grow } from "@prisma/client"
// import stylesUrl from "../styles/grow.css";

// export let links: LinksFunction = () =>{
//     return [
//         {
//             rel: "stylesheet",
//             href: "stylesUrl"
//         }
//     ]
// }

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
    return json(data);
}


export default function GrowIndexRoute() {
    const data = useLoaderData<LoaderData>();
    return (
        <div>

            <h3>Grows</h3>
            <Link to="./newgrow">Creat a new grow to track</Link>

            {data.grows.map(grow => (
            <div className="flex justify-center" key={grow.id}>
                <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
                    <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">{grow.title}</h5>
                    <p className="text-gray-700 text-base mb-4">
                        {grow.description}
                    </p>
                    <p>
                   Cultivar: {grow.strain}
                    </p>
                    <p>
                    Days: {grow.expectedDays}
                    </p>
                    <p>
                    Started On: {grow.startDate}
                    </p>
                    <p>
                        Ends On: {grow.endDate}
                    </p>
                    
                    <Link to={grow.id} className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                        Link
                    </Link>
                </div>
            </div>
            ))}
            <Outlet />
        </div>
    );
    
}