import {CardType} from "../../../components/Cards/Card/Card";
import {AllCartActionsType} from "./actions";

export const cartReducer = (state: CardType[] = [], action: AllCartActionsType): CardType[] => {
    switch (action.type) {
        case "SET_CART_ITEMS": {
            return action.payload.cartItems;
        }
        case "ADD_ITEMS_TO_CART": {
            return [action.payload.item, ...state]
        }
        case "ADD_QUANTITY": {
            return state.map(stateItem => stateItem.id === action.payload.id ? {
                ...stateItem,
                quantity: stateItem.quantity + 1
            } : stateItem)
        }
        case "DELETE_FROM_CART": {
            return state.filter(stateItem => stateItem.id !== action.payload.id)
        }
        default: {
            return state
        }
    }
}