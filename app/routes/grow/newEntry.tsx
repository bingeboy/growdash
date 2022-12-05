//TODO add a route for entering a jounral entries
export default function GrowEntryRoute() {

    // {entry.title}
    // Date Added: {entry.createdAt}
    // Res Ph: {entry.phRes}
    // pH Substrate: {entry.phSub}
    // pH Runoff: {entry.phRun}
    // ec Res: {entry.ecRes}
    // ec Substrate: {entry.ecSub}
    // ec Runoff: {entry.ecRun}
    // Room Temp: {entry.roomTemp}
    // Water Temp: NOT IMPLEMENTED IN MODEL
    // Substrate Moisture: NOT IMPLEMENTED IN MODEL
    // Substrate Temp: {entry.substrateTemp}
    // Humidity: {entry.humidity}
    // VPD: {entry.vpd}
    // DLI: {entry.dli}
    // Par: {entry.par}
    // CO2: {entry.co2}
    // Daylight Hrs: {entry.hoursOfLight}
    // Note: {entry.note}

    return (
        <div>
            <h3>Create New Entry</h3>
            {/* TODO make entry form here */}


            {/* {entry.title this might just be a date thing} */}
                    {/* createdAt hidden */}
                    ph Values:

                            <label>Res Ph</label>
                            <input type="number"value="phRes" />

                            <label>pH Substrate</label>
                            <input type="" value="phSub" className="" />

                            <label>ph Runoff</label>
                            <input type="" value="phRun" className="" />

                    EC Values:
                    <label>EC Res</label>
                    <input type="" value="ecRes" placeholder="EC Value"/>

                    <label htmlFor="EC Subtrate">EC Substrate</label> 
                    <input type="" value="ecSub" placeholder="EC Value"/>

                    <label>EC Runoff</label> 
                    <input type="" value="ecRun" placeholder="EC Value"/>       

                    Temperature:

                    <label>Room Temp</label> 
                    <input type="" value="roomTemp" placeholder=" "/> 

                    <label>Water Temp</label> 
                    <input type="" value="waterTemp" placeholder=" "/> 

                    <label>Substrate Temp</label> 
                    <input type="" value="substrateTemp" placeholder=" "/>

                    TODO Leaf Surface Temp 
                         Substrate Moisture: NOT IMPLEMENTED IN MODEL

                            Humidity: {entry.humidity}
                            VPD: {entry.vpd}
                            DLI: {entry.dli}
                            Par: {entry.par}
                            CO2: {entry.co2}
                            Daylight Hrs: {entry.hoursOfLight}

                    <label>Note</label>
                    <textarea value="note" className=""></textarea>

        </div>
    );
    
}