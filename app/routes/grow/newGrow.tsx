//New Grow Route
import type { ActionFunction } from "@remix-run/node";

export const action: ActionFunction = () => {
    const grow = await db.grow.create({
        data: { 
            title,
            body, //change to description 
            startDate,
            endDate,
            //not added yet
            strain
         },
    });
}

export default  function NewGrowRoute() {
    return (
        <div>
            <label>Grow Name</label>
            <input type="text" name="growTitle" />
        
            <label >Start Date</label>
            <input type="text"  />
        
            <label>End Date</label>
            <input type="text" name="endDate"/>
        
            <label>Strain</label>
            <input type="text" name="strain" />
        
            <label>grow Description</label>
            <input type="text" name="growDescription" />
        </div>
    );
}