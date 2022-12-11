import type { ActionFunction, LinksFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useActionData, Link, useSearchParams } from "@remix-run/react";

import { db } from "~/utils/db.server";
import {
    register,
    createUserSession,
    } from "~/utils/session.server";

//validation
function validateUsername(username: unknown) {
    if (typeof username !== "string" || username.length < 3) {
      return `Usernames must be at least 3 characters long`;
    }
  }
  
function validatePassword(password: unknown) {
    if (typeof password !== "string" || password.length < 6) {
        return `Passwords must be at least 6 characters long`;
    }
}

function validateEmail(email: unknown) {
  if (!email) {
    return "Email is Required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Invalid emaill address";
  }
}

function validateUrl(url: any) {
    console.log(url);
    let urls = ["/grow", "/",];  //TODO add domain here once there is a domain
    if (urls.includes(url)) {
      return url;
    }
    return "../grow";
}
 
type ActionData = {
  formError?: string;
  fieldErrors?: {
    username: string | undefined;
    password: string | undefined;
    email: string | undefined;
  };
  fields?: {
      username: string;
      password: string;
      email: string;
    };
};

const badRequest = (data: ActionData) => json(data, { status: 400 });

export const action: ActionFunction = async ({ request }) => {
    const form = await request.formData();
    const username = form.get("username");
    const password = form.get("password");
    const email = form.get("email");

    const redirectTo = validateUrl(
      form.get("redirectTo") || "/grows"
    );
    if (
      typeof username !== "string" ||
      typeof password !== "string" ||
      typeof email !== "string" ||
      typeof redirectTo !== "string"
    ) {
      return badRequest({
        formError: `Form not submitted correctly.`,
      });
    }
  
    const fields = {
      username,
      email,
      password,
    };
    
    const fieldErrors = {
      username: validateUsername(username),
      email: validateEmail(email),
      password: validatePassword(password),
    };

    if (Object.values(fieldErrors).some(Boolean)) {
      return badRequest({ fieldErrors, fields });
    }

  

        const userExists = await db.user.findFirst({
          where: { username },
        });
        if (userExists) {
          return badRequest({
            fields,
            formError: `User with username ${username} already exists`,
          });
        }
        const emailExists =  await db.user.findFirst({
          where: { email },
        });

        if (emailExists) {
          return badRequest({
            fields,
            formError: `User with email ${email} already exists`,
          });
        }

        const user = await register({ username, password, email});
        if (!user) {
          return badRequest({
            fields,
            formError: `Something went wrong trying to create a new user.`,
          });
        }
        return createUserSession(user.id, redirectTo);
}

//login
export default function Login() {
    const actionData = useActionData<ActionData>();
    const [searchParams] = useSearchParams();
    return (
      <div className="container relative mx-auto mt-16 grid w-full max-w-container grid-cols-1 px-4 xl:mt-4">
        <div className="content" data-light="">
          <h1 className="mt-4 text-3xl font-extrabold tracking-[-0.04em] text-black sm:text-5xl sm:leading-[3.5rem]">Register</h1>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
            et dolore magna aliqua. Felis eget velit aliquet sagittis.
          </p>
          <form method="post">
            <input
              type="hidden"
              name="redirectTo"
              value={
                searchParams.get("redirectTo") ?? undefined
              }
            />
            <div>
              <label htmlFor="username-input">Username</label>
              <input type="text" id="username-input" name="username"
                defaultValue={actionData?.fields?.username}
                aria-invalid={Boolean(
                  actionData?.fieldErrors?.username
                )}
                aria-errormessage={
                  actionData?.fieldErrors?.username
                    ? "username-error"
                    : undefined
                }
              />
              {actionData?.fieldErrors?.username ? (
                <p className="form-validation-error" role="alert" id="username-error">
                  {actionData.fieldErrors.username}
                </p>
              ) : null}
            </div>

            {/* ////////////////////////////////////////////// email input */}
            <div>
              <label htmlFor="email-input">email</label>
              <input
                id="email-input"
                name="email"
                defaultValue={actionData?.fields?.email}
                type="email"
                aria-invalid={
                  Boolean(
                    actionData?.fieldErrors?.email
                  ) || undefined
                }
                aria-errormessage={
                  actionData?.fieldErrors?.email
                    ? "password-error"
                    : undefined
                }
              />
              {actionData?.fieldErrors?.email ? (
                <p
                  className="form-validation-error"
                  role="alert"
                  id="password-error"
                >
                  {actionData.fieldErrors.email}
                </p>
              ) : null}
            </div>

            <div>
              <label htmlFor="password-input">Password</label>
              <input
                id="password-input"
                name="password"
                defaultValue={actionData?.fields?.password}
                type="password"
                aria-invalid={
                  Boolean(
                    actionData?.fieldErrors?.password
                  ) || undefined
                }
                aria-errormessage={
                  actionData?.fieldErrors?.password
                    ? "password-error"
                    : undefined
                }
              />
              {actionData?.fieldErrors?.password ? (
                <p
                  className="form-validation-error"
                  role="alert"
                  id="password-error"
                >
                  {actionData.fieldErrors.password}
                </p>
              ) : null}
            </div>



            {/* //////////////////////////////////// form error */}
            <div id="form-error-message">
              {actionData?.formError ? (
                <p
                  className="form-validation-error"
                  role="alert"
                >
                  {actionData.formError}
                </p>
              ) : null}
            </div>
            <button type="submit" className="button bg-sky-500 hover:bg-sky-700 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
  