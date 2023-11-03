import {
  Form,
  Link,
  Links,
  LiveReload,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useNavigation,
  useSubmit
} from "@remix-run/react";
import { useEffect, useState } from "react";
import { json, redirect } from '@remix-run/node'
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";

import { createEmptyContact, getContacts } from "./data";

import appStylesHref from "./app.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStylesHref },
];



export const loader = async ({
  request
}: LoaderFunctionArgs) => {
  const url = new URL(request.url)
  const q = url.searchParams.get("q")
  const contacts = await getContacts(q)
  return json({ contacts, q })
}

export const action = async () => {
  const contact = await createEmptyContact()
  return redirect(`/contacts/${contact.id}/edit`)
}

export default function App() {
  const { contacts, q } = useLoaderData<typeof loader>()
  const navigation = useNavigation()
  const [query, setQuery] = useState(q || "")
  const submit = useSubmit()  // LIVE SEARCH SO COOL

  useEffect(() => {
    setQuery(q || "")
  }, [q])

  const searching = 
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q")

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div id="sidebar">
          <h1>Remix Contacts</h1>
          <div>
            <Form 
              id="search-form" 
              role="search"
              onChange={(e) => {
                const isFirstSearch = q === null
                submit(e.currentTarget, {
                  replace: !isFirstSearch
                })
              }}
            >
              <input
                id="q"
                name="q"
                onChange={(e) => setQuery(e.currentTarget.value)}
                value={query}
                className={searching ? "loading": ""}
                aria-label="Search contacts"
                placeholder="Search"
                type="search"
              />
              <div 
                id="search-spinner" 
                aria-hidden 
                hidden={!searching} 
              />
            </Form>
            <Form method="post">
              <button type="submit">New</button>
            </Form>
          </div>
          <nav>
            {contacts.length ? (
              <ul>
                {contacts.map((contact) => (
                  <li key={contact.id}>
                    <NavLink 
                      to={`contacts/${contact.id}`}
                      className={({ isActive, isPending }) =>
                        isActive
                          ? "active"
                          : isPending
                          ? "pending"
                          : ""
                      }
                    >
                      {contact.first || contact.last ? (
                        <>
                          {contact.first} {contact.last}
                        </>
                      ) : (
                        <i>No Name</i>
                      )}{" "}
                      {contact.favorite ? (
                        <span>★</span>
                      ) : null}
                    </NavLink>
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                <i>No contacts</i>
              </p>
            )}
          </nav>
        </div>

        <div 
          className={
            navigation.state === "loading" && !searching 
              ? "loading" 
              : ""
          }
          id="detail"
        >
          <Outlet />
        </div>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
