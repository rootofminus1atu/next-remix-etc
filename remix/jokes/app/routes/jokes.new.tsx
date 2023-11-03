import { ActionFunctionArgs } from '@remix-run/node'
import { Form } from '@remix-run/react'
import React from 'react'
import { redirect } from 'react-router'
import { db } from '~/utils/db.server'

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const formData = await request.formData()
  
  // insert validation
  const { name, content } = Object.fromEntries(formData)
  // validation 
  
  const joke = await db.joke.create({
    data: {
      name: name as string,
      content: content as string
    }
  })

  return redirect(`/jokes/${joke.id}`)
}

export default function JokesForm() {
  return (
    <div>
      <p>Add your own hilarious joke</p>
      <Form method="post">
        <div>
          <label>
            Name: <input type="text" name="name" />
          </label>
        </div>
        <div>
          <label>
            Content: <textarea name="content" />
          </label>
        </div>
        <div>
          <button type="submit" className="button">
            Add
          </button>
        </div>
      </Form>
    </div>
  )
}
