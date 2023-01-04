import {combineReducers, compose, createStore} from "redux";
import {mainReducer} from "./reducers/mainReducer/mainReducer";
import {cartReducer} from "./reducers/cartReducer/cartReducer";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
    mainItems: mainReducer,
    cartItems: cartReducer
})

export const store = createStore(rootReducer, composeEnhancers());

export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatchType = typeof store.dispatch