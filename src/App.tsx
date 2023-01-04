import {FC, useEffect, useState} from 'react';
import styles from './App.module.scss'
import axios from "axios";
import {Layout} from 'antd';
import HeaderPage from "./components/Header/HeaderPage";
import MainContent from "./components/MainContent/MainContent";
import {Basket} from "./components/Basket/Basket";
import {CardType} from "./components/Cards/Card/Card";
import {useAppDispatch, useAppSelector} from "./store/hooks/hooks";
import {setMainItemsAC} from "./store/reducers/mainReducer/actions";
import {addItemsToCartAC, addQuantityAC, deleteFromCartAC, setCartItems} from "./store/reducers/cartReducer/actions";

type ItemsType = {
    favoriteItems: CardType[]
}

export const App: FC = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [state, setState] = useState<ItemsType>({
        favoriteItems: [],
    })

    const dispatch = useAppDispatch();
    const stateS = useAppSelector(state => state)

    useEffect(() => {
        // получение карточек товара на главном экране
        axios.get('https://63a418429704d18da09de416.mockapi.io/items')
            .then(response => {
                dispatch(setMainItemsAC(response.data))
            })
        // получение карточек товара для корзины
        axios.get('https://63a418429704d18da09de416.mockapi.io/basket')
            .then(response => {
                dispatch(setCartItems(response.data))
            })
        axios.get('https://63a418429704d18da09de416.mockapi.io/favorites')
            .then(response => {
                setState((prevState) => ({...prevState, favoriteItems: [...response.data]}))
            })
    }, [dispatch])

    const onClickCart = () => {
        setIsOpen(true)
    }

    const closeBasket = () => {
        setIsOpen(false)
    }

    const addToCard = (item: CardType) => {
        try {
            const itemIndex = stateS.cartItems.findIndex(itemBasket => item.id === itemBasket.id);
            if (itemIndex < 0) {
                axios.post('https://63a418429704d18da09de416.mockapi.io/basket', item);
                dispatch(addItemsToCartAC(item))
            } else {
                axios.put(`https://63a418429704d18da09de416.mockapi.io/basket/${item.id}`);
                dispatch(addQuantityAC(item.id))
            }
        } catch (error) {
            alert(error)
        }
    }

    const deleteCard = (itemID: string) => {
        axios.delete(`https://63a418429704d18da09de416.mockapi.io/basket/${itemID}`);
        dispatch(deleteFromCartAC(itemID))
    }

    const onAddToFavorites = async (item: CardType) => {
        const duplicateItem = state.favoriteItems.find(elem => elem.id === item.id);
        try {
            if (duplicateItem) {
                axios.delete(`https://63a418429704d18da09de416.mockapi.io/favorites/${item.id}`,);
                setState((prevState) => ({
                    ...prevState,
                    favoriteItems: prevState.favoriteItems.filter(fav => fav.id !== item.id)
                }))
            } else {
                const {data} = await axios.post('https://63a418429704d18da09de416.mockapi.io/favorites', item);
                setState((prevState) => ({...prevState, favoriteItems: [...prevState.favoriteItems, data]}))
            }
        } catch (error) {
            alert('Не удалось добавить в закладки')
        }
    }

    const totalCost = stateS.cartItems.reduce((accum, item) => (accum + item.price) * item.quantity, 0)


    return (
        <Layout className={styles.layout}>
            <HeaderPage onClickCart={onClickCart} amountOrders={stateS.cartItems.length} totalCost={totalCost}/>
            <Basket isOpen={isOpen} closeBasket={closeBasket} items={stateS.cartItems} deleteCard={deleteCard}/>
            <MainContent
                items={stateS.mainItems}
                addToCard={addToCard}
                onAddToFavorites={onAddToFavorites}
                favorites={state.favoriteItems}
            />
        </Layout>
    )
}
