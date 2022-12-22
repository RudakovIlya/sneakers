import React, {FC, useEffect, useReducer, useState} from 'react';
import './App.css';
import styles from './App.module.scss'
import {Layout} from 'antd';
import HeaderPage from "./components/Header/HeaderPage";
import MainContent from "./components/MainContent/MainContent";
import {Basket} from "./components/Basket/Basket";
import {CardType} from "./components/Cards/Card/Card";
import axios from "axios";
import {addItemInBasket, BasketReducer, removeItemFromBasket} from "./BasketReducer";

export const App: FC = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const [items, setItems] = useState<CardType[]>([]);

    const [itemsInBasket, dispatch] = useReducer(BasketReducer, []);

    useEffect(() => {
        axios.get('https://63a418429704d18da09de416.mockapi.io/items')
            .then(response => {
                setItems(response.data)
            })
    }, [])

    const onClickCart = () => {
        setIsOpen(true)
    }

    const closeBasket = () => {
        setIsOpen(false)
    }

    const addToCard = (item: CardType) => {
        dispatch(addItemInBasket(item))
    }

    const deleteCard = (itemID: string) => {
        dispatch(removeItemFromBasket(itemID))
    }

    return (
        <Layout className={styles.layout}>
            <HeaderPage onClickCart={onClickCart}/>
            <Basket isOpen={isOpen} closeBasket={closeBasket} items={itemsInBasket} deleteCard={deleteCard}/>
            <MainContent items={items} addToCard={addToCard}/>
        </Layout>
    )
}
