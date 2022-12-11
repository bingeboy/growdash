//route for grow

import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData} from "@remix-run/react";
import type { Grow, Entry } from "@prisma/client";

import { db } from "~/utils/db.server";

type LoaderData = { grow: Grow, entries: Entry};

export const loader: LoaderFunction = async({params}) => {
 const grow = await db.grow.findUnique({
    where: { id: params.growId },
 });
 if (!grow) {
    throw new Error("Grow not found");  
 }
 
 const entries = await db.entry.findMany({
    where: { entryId: grow.id}
 });
//TODO Add a check here to verify the grow.id matches the user.id to avoid seeing grows not by logged in user

 const data: LoaderData = { grow, entry: entries };

 return json(data);
}

export default function GrowRoute() {
    const data = useLoaderData<LoaderData>();
    const grow = data.grow;
    const entries = data.entry;
    console.log('entry: ', entries )

    return (
        <div>
            =========== start of growId template
            <Link to="./newEntry">Add daily entry</Link>
            <h3>{grow.title}</h3>
            
            <p>Cultivar: {grow.strain}</p>
            <p>Days: {grow.expectedDays}</p>
            <p>Start Date: {grow.startDate}</p>
            <p>End Date: {grow.endDate}</p>
            <p>Descrption: {grow.description}</p>
            <em>created {grow.createdAt}</em>

            <ul>
                {entries.map(entry => (
                    <li key={entry.id}>
                        <Link to={entry.id}>
                            {entry.title}
                            Date Added: {entry.createdAt}
                            Res Ph: {entry.phRes}
                            pH Substrate: {entry.phSub}
                            pH Runoff: {entry.phRun}
                            ec Res: {entry.ecRes}
                            ec Substrate: {entry.ecSub}
                            ec Runoff: {entry.ecRun}
                            Room Temp: {entry.roomTemp}
                            Water Temp: NOT IMPLEMENTED IN MODEL
                            Substrate Moisture: NOT IMPLEMENTED IN MODEL
                            Substrate Temp: {entry.substrateTemp}
                            Humidity: {entry.humidity}
                            VPD: {entry.vpd}
                            DLI: {entry.dli}
                            Par: {entry.par}
                            CO2: {entry.co2}
                            Daylight Hrs: {entry.hoursOfLight}
                            Note: {entry.note}
                        </Link>
                        
                    </li>
                ))}
            </ul>
        </div>
    );
}