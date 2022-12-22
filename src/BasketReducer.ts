import {CardType} from "./components/Cards/Card/Card";
import {v1} from "uuid";

export const BasketReducer = (state: CardType[] = [], action: AllActionsType): CardType[] => {
    switch (action.type) {
        case "ADD-ITEM-IN-BASKET":
            return [...state, {...action.payload.item, itemID: v1()}]
        case "REMOVE-ITEM":
            return state.filter(stateItem => stateItem.itemID !== action.payload.itemID);
        default:
            return []
    }
}

export type AllActionsType = ReturnType<typeof addItemInBasket> | ReturnType<typeof removeItemFromBasket>

export const addItemInBasket = (item: CardType) => {
    return {
        type: 'ADD-ITEM-IN-BASKET',
        payload: {
            item
        }
    } as const
}

export const removeItemFromBasket = (itemID: string) => {
    return {
        type: 'REMOVE-ITEM',
        payload: {
            itemID
        }
    } as const
}