import { LoaderFunctionArgs, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { db } from '~/utils/db.server'

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const joke = await db.joke.findUnique({
    where: { id: params.jokeId }
  })

  if(!joke) {
    throw new Error("Joke not found")
  }

  return json({ joke })
}

export default function SingleJoke() {
  const { joke } = useLoaderData<typeof loader>()

  return (
    <div>
      <p>Here's your hilarious joke:</p>
      <p>
        {joke.content}
      </p>
      <Link to=".">"{joke.name}" Permalink</Link>
    </div>
  )
}
