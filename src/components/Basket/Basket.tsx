import React, {FC} from 'react';
import styles from "./Basket.module.scss";
import {Button, Typography} from "antd";
import {ArrowRightOutlined, CloseOutlined} from "@ant-design/icons";
import BasketItem from "./BasketItem/BasketItem";
import {CardType} from "../Cards/Card/Card";

const {Title, Text} = Typography;

type BasketPropsType = {
    items: CardType[]
    isOpen: boolean
    closeBasket: () => void
    deleteCard: (itemID: string) => void
}

export const Basket: FC<BasketPropsType> = ({isOpen, closeBasket, items = [], deleteCard}) => {

    const sideBarClass = `${styles.aside} ${isOpen ? styles.open : ''}`

    return (
        <>
            {isOpen && <div onClick={closeBasket} className={styles.overlay}></div>}
            <aside className={sideBarClass}>
                <div className={styles.top}>
                    <Title level={3} style={{marginBottom: 30}}>Корзина</Title>
                    <Button onClick={closeBasket} icon={<CloseOutlined/>}></Button>
                </div>
                <div className={styles.list} style={{flex: 1}}>
                    {items.map(item => <BasketItem key={item.itemID} {...item} deleteCard={deleteCard}/>)}
                </div>
                <div className={styles.bottom}>
                    <div style={{display: 'flex', alignItems: 'flex-end'}}>
                        <Text>Итого:</Text>
                        <Text style={{
                            flex: 'auto',
                            borderBottom: '1px dashed #DFDFDF',
                            padding: '0 5px',
                            margin: '0 5px'
                        }}></Text>
                        <Text strong>21 498 руб.</Text>
                    </div>
                    <div style={{display: 'flex', alignItems: 'flex-end'}}>
                        <Text>Налог 5%:</Text>
                        <Text style={{
                            flex: 'auto',
                            borderBottom: '1px dashed #DFDFDF',
                            padding: '0 5px',
                            margin: '0 5px'
                        }}></Text>
                        <Text strong>1074 руб.</Text>
                    </div>
                    <Button icon={<ArrowRightOutlined/>}>Оформить заказ</Button>
                </div>
            </aside>
        </>
    );
};

