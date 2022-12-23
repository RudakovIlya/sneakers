import React, {FC, useEffect, useState} from 'react';
import './App.css';
import styles from './App.module.scss'
import {Layout} from 'antd';
import HeaderPage from "./components/Header/HeaderPage";
import MainContent from "./components/MainContent/MainContent";
import {Basket} from "./components/Basket/Basket";
import {CardType} from "./components/Cards/Card/Card";
import axios from "axios";

export const App: FC = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const [items, setItems] = useState<CardType[]>([]);

    const [itemsInBasket, setItemsInBasket] = useState<CardType[]>([]);

    useEffect(() => {
        axios.get('https://63a418429704d18da09de416.mockapi.io/items')
            .then(response => {
                setItems(response.data)
            })

        axios.get('https://63a418429704d18da09de416.mockapi.io/basket')
            .then(response => {
                setItemsInBasket(response.data)
            })
    }, [])

    const onClickCart = () => {
        setIsOpen(true)
    }

    const closeBasket = () => {
        setIsOpen(false)
    }

    const addToCard = (item: CardType) => {
        axios.post('https://63a418429704d18da09de416.mockapi.io/basket', item);
        const duplicateItem = itemsInBasket.find(elem => elem.id === item.id);
        if(!duplicateItem) {
            setItemsInBasket((prevState) => [...prevState, item])
        }
    }

    const deleteCard = (itemID: string) => {
        axios.delete(`https://63a418429704d18da09de416.mockapi.io/basket/${itemID}`);
        setItemsInBasket((prevState) => prevState.filter(item => item.id !== itemID))
    }

    return (
        <Layout className={styles.layout}>
            <HeaderPage onClickCart={onClickCart}/>
            <Basket isOpen={isOpen} closeBasket={closeBasket} items={itemsInBasket} deleteCard={deleteCard}/>
            <MainContent items={items} addToCard={addToCard}/>
        </Layout>
    )
}
