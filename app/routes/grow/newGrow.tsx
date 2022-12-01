//New Grow Route
import type { ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useActionData } from "@remix-run/react";

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
    let expectedDays =  form.get("expectedDays");

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
        <form method="post">
            <label>Grow Name
                <input type="text" name="title" />
            </label>
            <label>Expected Days
                <input type="number" name="expectedDays" />
            </label>
            <label >Start Date
                <input type="datetime-local"  name="startDate"/>
            </label>
            <label>End Date
                <input type="datetime-local" name="endDate"/>
            </label>
            <label>Strain
                <input type="text" name="strain" />
            </label>
            <label>Description of Grow
                <input type="text" name="description" />
            </label>
            <button type="submit" className="button">
                Submit
            </button>
        </form>
    );
}