import {FC, useEffect, useState} from 'react';
import styles from './App.module.scss'
import axios from "axios";
import {Layout} from 'antd';
import HeaderPage from "./components/Header/HeaderPage";
import MainContent from "./components/MainContent/MainContent";
import {Basket} from "./components/Basket/Basket";
import {CardType} from "./components/Cards/Card/Card";

type ItemsType = {
    mainItems: CardType[]
    basketItems: CardType[]
    favoriteItems: CardType[]
}

export const App: FC = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [state, setState] = useState<ItemsType>({
        mainItems: [],
        basketItems: [],
        favoriteItems: [],
    })

    useEffect(() => {
        // получение карточек товара на главном экране
        axios.get('https://63a418429704d18da09de416.mockapi.io/items')
            .then(response => {
                setState((prevState) => ({...prevState, mainItems: [...response.data]}))
            })
        // получение карточек товара для корзины
        axios.get('https://63a418429704d18da09de416.mockapi.io/basket')
            .then(response => {
                setState((prevState) => ({...prevState, basketItems: [...response.data]}))
            })
        axios.get('https://63a418429704d18da09de416.mockapi.io/favorites')
            .then(response => {
                setState((prevState) => ({...prevState, favoriteItems: [...response.data]}))
            })
    }, [])

    const onClickCart = () => {
        setIsOpen(true)
    }

    const closeBasket = () => {
        setIsOpen(false)
    }

    const addToCard = (item: CardType) => {
        const duplicateItem = state.basketItems.find(elem => elem.id === item.id);
        if (!duplicateItem) {
            axios.post('https://63a418429704d18da09de416.mockapi.io/basket', item);
            setState((prevState) => ({...prevState, basketItems: [...prevState.basketItems, item]}))
        }
    }

    const deleteCard = (itemID: string) => {
        axios.delete(`https://63a418429704d18da09de416.mockapi.io/basket/${itemID}`);
        setState((prevState) => ({...prevState, basketItems: prevState.basketItems.filter(item => item.id !== itemID)}))
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

    return (
        <Layout className={styles.layout}>
            <HeaderPage onClickCart={onClickCart}/>
            <Basket isOpen={isOpen} closeBasket={closeBasket} items={state.basketItems} deleteCard={deleteCard}/>
            <MainContent
                items={state.mainItems}
                addToCard={addToCard}
                onAddToFavorites={onAddToFavorites}
                favorites={state.favoriteItems}
            />
        </Layout>
    )
}
