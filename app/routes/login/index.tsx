import type { ActionFunction, LinksFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useActionData, Link, useSearchParams, Form } from "@remix-run/react";

import {
    login,
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

function validateUrl(url: any) {
    console.log(url);
    let urls = ["/grow", "/",];  //TODO add domain here once there is a domain
    if (urls.includes(url)) {
      return url;
    }
    return "/grow";
}
 
type ActionData = {
  formError?: string;
  fieldErrors?: {
    username: string | undefined;
    password: string | undefined;
  };
  fields?: {
    loginType: string;
      username: string;
      password: string;
    };
};

const badRequest = (data: ActionData) => json(data, { status: 400 });

export const action: ActionFunction = async ({ request }) => {
    const form = await request.formData();
    const username = form.get("username");
    const password = form.get("password");

    const redirectTo = validateUrl(
      form.get("redirectTo") || "/grow"
    );
    if (
      typeof username !== "string" ||
      typeof password !== "string" ||
      typeof redirectTo !== "string"
    ) {
      return badRequest({
        formError: `Form not submitted correctly.`,
      });
    }
  
    const fields = { username, password };
    
    const fieldErrors = {
      username: validateUsername(username),
      password: validatePassword(password),
    };

    if (Object.values(fieldErrors).some(Boolean))
      return badRequest({ fieldErrors, fields });
  
        // login to get the user
        const user = await login({ username, password });

        if (!user) {
          return badRequest({
            fields,
            formError: `Username/Password combination is incorrect`,
          });
        }
 
      return createUserSession(user.id, redirectTo);
  };

//login
export default function Login() {
    const actionData = useActionData<ActionData>();
    const [searchParams] = useSearchParams();
    return (
      <div className="container">
        <div className="content" data-light="">
          <h1>Login</h1>
          <Form method="post">
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
            <button type="submit" className="button">
              Submit
            </button>
          </Form>
        </div>
        <div className="links">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/grow">Grow</Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
  