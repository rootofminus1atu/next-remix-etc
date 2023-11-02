import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { Drink, DrinkResponse } from "~/drinkTypes";

export const meta: MetaFunction = () => {
  return [
    { title: "Remix Tutorial" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader({}: LoaderFunctionArgs) {
  const url = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=Cocktail_glass"
  const res = await fetch(url)

  return await res.json()
}



export default function Index() {
  const { drinks } = useLoaderData<DrinkResponse>()

  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="mb-10 md:mb-16">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-xl">
            Random Cocktails
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
          {drinks.map((drink) =>(
            <div 
              className="flex flex-col overflow-hidden rounded-lg border bg-white"
              key={drink.idDrink}
            >
              <Link 
                to={`drink/${drink.idDrink}/comments`}
                prefetch="intent"
                className="group relative block h-48 overflow-hidden bg-gray-100 md:h-64"
              >
                <img 
                  src={drink.strDrinkThumb} 
                  alt="drink" 
                  className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                />
              </Link>

              <div className="flex flex-1 flex-col p-4 sm:p-6">
                <h2 className="mb-2 text-lg font-semibold text-gray-800">
                  <Link 
                    to={`drink/${drink.idDrink}/comments`}
                    prefetch="intent"
                    className="transition duratio-100 hover:text-indigo-500 active:text-indigo-600"
                  >
                    {drink.strDrink}
                  </Link>
                </h2>
              </div>
            </div>

          ))}
        </div>

      </div>
    </div>
  );
}
