import { LoaderFunctionArgs } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import { Drink, DrinkResponse } from "~/drinkTypes";

export async function loader({ params }: LoaderFunctionArgs) {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${params.id}`
  const res = await fetch(url)

  return await res.json()
}

export default function DrinkPage() {
  const { drinks } = useLoaderData<DrinkResponse>()
  // hi
  console.log(drinks)
  const drink: Drink = drinks[0]

  return (
    <div className='min-h-screen p-10'>
      <img 
        src={drink.strDrinkThumb} 
        alt={drink.strDrink}
        className='h-[40vh] object-cover w-full rounded-lg'
      />
      <h1 className='text-4xl font-bold text-center pt-5'>{drink.strDrink}</h1>
      <div className='flex gap-x-10 mt-10'>
        <div className='w-1/2 font-medium'>
          <h2 className='text-2xl font-semibold'>Instructions:</h2>
          <p>{drink.strInstructions}</p>
          <p className='mt-5'>other props here</p>
        </div>

        <div className='w-1/2'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
