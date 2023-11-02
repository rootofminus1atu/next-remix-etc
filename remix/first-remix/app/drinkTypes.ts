export interface Drink {
    strDrink: string
    idDrink: string
    strDrinkThumb: string
    strInstructions: string
}

export interface DrinkResponse {
    drinks: Drink[]
}