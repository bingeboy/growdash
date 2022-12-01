//route for grow

import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData} from "@remix-run/react";
import type { Grow } from "@prisma/client";

import { db } from "~/utils/db.server";

type LoaderData = { grow: Grow};

export const loader: LoaderFunction = async({params}) => {
 const grow = await db.grow.findUnique({
    where: { id: params.growId },
 })
 if (!grow) {
    throw new Error("Grow not found");  
 }
 const data: LoaderData = { grow };
 return json(data);
}

export default function GrowRoute() {
    const data = useLoaderData<LoaderData>();
    const grow = data.grow;

    return (
        <div>
            <h3>{grow.title}</h3>
            <p>Cultivar: {grow.strain}</p>
            <p>Days: {grow.expectedDays}</p>
            <p>Start Date: {grow.startDate}</p>
            <p>End Date: {grow.endDate}</p>
            <p>Descrption: {grow.description}</p>
            <em>created {grow.createdAt}</em>
        </div>
    );
}