import type { ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Outlet, useActionData, Form, useParams } from "@remix-run/react";


import { db } from "~/utils/db.server";
import { requireUserId } from "~/utils/session.server";

const badRequest = (data: ActionData) => json(data, { status: 400 });

type ActionData = {
    fieldErrors?: {
        createdAt: string;
        phRes: string | undefined;
    };
    fields?: {
        createdAt: string;
        phRes: string;
    };
};


export const action: ActionFunction = async({ request, params }) => {
    console.log(params, '=------------ params')
    //grow must have userId
    const userId = await requireUserId(request);
    const form  = await request.formData();


    // Water Temp: NOT IMPLEMENTED IN MODEL
    // Substrate Moisture: NOT IMPLEMENTED IN MODEL
    // Leaf surface temp not implemented in model

    let createdAt = new Date().toISOString();
    let phRes = form.get("phRes");
    let phSub = form.get("phSub");
    let phRun= form.get("phRun");
    let ecRes = form.get("ecRes");
    let ecSub = form.get("ecSub");
    let ecRun = form.get("ecRun");
    let roomTemp = form.get("roomTemp");
    let substrateTemp = form.get("substrateTemp")
    let humidity = form.get("humidity")
    let vpd = form.get("vpd")
    let dli = form.get("dli")
    let par = form.get("par")
    let co2 = form.get("co2")
    let hoursOfLight = form.get("hoursOfLight")
    let note = form.get("note")
 
    const fields = { 
        createdAt, 
        phRes, 
        phRun, 
        phSub, 
        ecRes, 
        ecSub, 
        ecRun, 
        roomTemp, 
        substrateTemp, 
        humidity, 
        vpd, 
        dli, 
        par, 
        co2, 
        hoursOfLight, 
        note
    }

    // if (Object.values(fieldErrors).some(Boolean)) {
    //   return badRequest({ fieldErrors, fields });
    // }

    //TODO this needs to check the id of the grow. Could be used from the params of the address bar instead of making a request... idk
    const entry = await db.entry.create({
        data: { ...fields, entryId: params.growId }, // params.growId is really all thats needed
      });

      return redirect(`/grow/`);
}



export default function GrowEntryRoute() {


    return (
        <div>
            <h3>Create Entry</h3>
            {/* TODO make entry form here */}
            <Form method="post">

                    ph Values:

                            <label>Res Ph</label>
                            <input type="number" name="phRes" step="0.1"/>

                            <label>pH Substrate</label>
                            <input type="number" name="phSub" className="fpp" />

                            <label>ph Runoff</label>
                            <input type="number" name="phRun" className="foo" />

                    EC Values:

                    <label>EC Res</label>
                    <input type="number" name="ecRes" placeholder="EC Value"/>

                    <label htmlFor="EC Subtrate">EC Substrate</label> 
                    <input type="number" name="ecSub" placeholder="EC Value"/>

                    <label>EC Runoff</label> 
                    <input type="number" name="ecRun" placeholder="EC Value"/>       

                    Temperature:

                    <label>Room Temp</label> 
                    <input type="number" name="roomTemp" placeholder=" "/> 

                    <label>Water Temp</label> 
                    <input type="number" name="waterTemp" placeholder=" "/> 

                    <label>Substrate Temp</label> 
                    <input type="number" name="substrateTemp" placeholder=" "/>

                    <label>Humidity</label>
                    <input type="number" name="humidity" />
                    <label>VPD</label>
                    <input type="text" name="vpd" />
                    <label>DLI</label>
                    <input type="text" name="dli" />
                    <label>Par</label>
                    <input type="text" name="par" />

                    <label>Co2</label>
                    <input type="number" name="co2" placeholder="Enter PMM" />

                    <label>Daylight Hours</label>
                    <input type="number" name="hoursOfLight" placeholder="Hours of light the plants are currently getting" />

                    <label>Note</label>
                    <textarea name="note" className="foo"></textarea>
                    <button type="submit" className="text-xs leading-5 font-semibold bg-slate-400/10 rounded-full py-1 px-3 flex items-center space-x-2 hover:bg-slate-400/20 dark:highlight-white/5">
                        Submit
                    </button>
                    </Form>

        </div>
    );
    
}