import {CardType} from "../../../components/Cards/Card/Card";

export const setCartItems = (cartItems: CardType[]) => {
    return {
        type: 'SET_CART_ITEMS',
        payload: {
            cartItems
        }
    } as const
}

export const addItemsToCartAC = (item: CardType) => {
    return {
        type: 'ADD_ITEMS_TO_CART',
        payload: {
            item
        }
    } as const
}

export const addQuantityAC = (id: string) => {
    return {
        type: 'ADD_QUANTITY',
        payload: {
            id
        }
    } as const
}

export const deleteFromCartAC = (id: string) => {
    return {
        type: 'DELETE_FROM_CART',
        payload: {
            id
        }
    } as const
}

export type AllCartActionsType =
    ReturnType<typeof setCartItems>
    | ReturnType<typeof addItemsToCartAC>
    | ReturnType<typeof addQuantityAC>
    | ReturnType<typeof deleteFromCartAC>