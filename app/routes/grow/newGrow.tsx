//New Grow Route
import type { ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Outlet, useActionData } from "@remix-run/react";

import { db } from "~/utils/db.server";
import { requireUserId } from "~/utils/session.server";
// import { Grow } from "@prisma/client"


export function validateGrowName(title: string) {
    if(title < 3) {
        return "Grow Title must be at least 3 characters long";
    }
}

export function validateGrowDescription(description: string) {
    if(description < 3) {
        return "Grow Title must be at least 3 characters long";
    }
}

type ActionData = {
    formError?: string;
    fieldErrors?: {
      string: string | undefined;
      description: string | undefined;
    };
    fields?: {
      name: string;
      content: string;
    };
  };
  
const badRequest = (data: ActionData) => json(data, { status: 400 });

export const action: ActionFunction = async({ request }) => {
    //grow must have userId
    const userId = await requireUserId(request);
    const form  = await request.formData();

    //date used from form for record
    let title = form.get("title");
    let description = form.get("description");
    let startDate = new Date(form.get("startDate"));
    let endDate = new Date(form.get("endDate"));
    let strain = form.get("strain");
    let expectedDays =  parseInt(form.get("expectedDays"));

    //startDate = startDate.toISOString()) || null;
    //check input
    if (
        typeof title !== "string" ||
        typeof description !== "string" ||
        typeof strain !== "string"
      ) {
        throw new Error(`Form not submitted correctly.`);
      }

    const fieldErrors = {
        title: validateGrowName(title),
        description: validateGrowDescription(description),
    };

    const fields = { title, description, startDate, endDate, strain, expectedDays }

    if (Object.values(fieldErrors).some(Boolean)) {
      return badRequest({ fieldErrors, fields });
    }

    const grow = await db.grow.create({
        data: { ...fields, growerId: userId },
      });

      return redirect(`/grow/${grow.id}`);
}

export default  function NewGrowRoute() {
    return (
        <div>
            <Outlet />
         <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900">
             Track a new Grow
         </h1>
         <form method="post">
            <div className="flex items-center justify-center bg-white p-8">
                <div className="mx-auto w-full max-w-xs">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Grow Name</label>
                            <div className="relative mt-1 rounded-md shadow-sm">
                                <input type="text" name="title" placeholder="Enter Grow Name" className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                            </div>
                    </div>
                 </div>
                 <div className="mx-auto w-full max-w-xs">
                    <div>
                        <label  className="block text-sm font-medium text-gray-700">Expected Days</label>
                        <div className="relative mt-1 rounded-md shadow-sm">
                            <input type="number" name="expectedDays"  className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                        </div>
                    </div>
                </div>
                <div className="mx-auto w-full max-w-xs">
                    <div>   
                        <label  className="block text-sm font-medium text-gray-700">Start Date</label>
                        <div className="relative mt-1 rounded-md shadow-sm">
                            <input type="datetime-local"  name="startDate"  className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                        </div>
                    </div>
                 </div>
                 <div className="mx-auto w-full max-w-xs">
                    <div>            
                        <label  className="block text-sm font-medium text-gray-700">End Date</label>
                        <div className="relative mt-1 rounded-md shadow-sm">
                            <input type="datetime-local" name="endDate"  className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                         </div>
                    </div>
                 </div>
                 <div className="mx-auto w-full max-w-xs">
                    <div>            
                        <label className="block text-sm font-medium text-gray-700">Cultivar (strain)</label>
                        <div className="relative mt-1 rounded-md shadow-sm">
                            <input type="text" name="strain"  placeholder="Cultivar Name" className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                        </div>
                    </div>
                 </div>
                 <div className="mx-auto w-full max-w-xs">
                    <div>             
                        <label className="block text-sm font-medium text-gray-700">Description of Grow</label>
                        <div className="relative mt-1 rounded-md shadow-sm">
                            <textarea placeholder="Add a description" name="description" className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"  />
                        </div>
                    </div>
                 </div>
             <button type="submit" className="text-xs leading-5 font-semibold bg-slate-400/10 rounded-full py-1 px-3 flex items-center space-x-2 hover:bg-slate-400/20 dark:highlight-white/5">
                 Submit
             </button>
             </div>
         </form>
        </div>
    );
}