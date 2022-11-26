//New Grow Route
import { ActionFunction, redirect } from "@remix-run/node";
import { db } from "~/utils/db.server";

export const action: ActionFunction = async({ request }) => {
    const form  = await request.formData();

    //date used from form for record
    let title = form.get("title");
    let description = form.get("description");
    let startDate = form.get("startDate");
    let endDate = form.get("endDate");
    let strain = form.get("strain");

    const grow = await db.grow.create({
        data: { 
            title,
            description,
            startDate,
            endDate,
            strain
         },
    });

    return redirect(`/grow/${grow.id}`);
}

export default  function NewGrowRoute() {
    return (
        <form method="post">
            <label>Grow Name</label>
            <input type="text" name="title" />
        
            <label>Expected Days</label>
            <input type="number"></input>

            <label >Start Date</label>
            <input type="date"  />
        
            <label>End Date</label>
            <input type="date" name="endDate"/>
        
            <label>Strain</label>
            <input type="text" name="strain" />
        
            <label>grow Description</label>
            <input type="text" name="growDescription" />

            <button type="submit" className="button">
                Submit
            </button>
        </form>
    );
}