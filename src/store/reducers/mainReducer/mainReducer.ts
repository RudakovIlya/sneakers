import {AllMainItemsType} from "./actions";
import {CardType} from "../../../components/Cards/Card/Card";

export const mainReducer = (state: CardType[] = [], action: AllMainItemsType): CardType[] => {
    switch (action.type) {
        case "SET_MAIN_ITEMS": {
            return action.payload.items
        }
        default : {
            return state
        }
    }
};