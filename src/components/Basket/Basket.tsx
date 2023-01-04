import React, {FC} from 'react';
import styles from "./Basket.module.scss";
import {Button, Typography} from "antd";
import {ArrowLeftOutlined, ArrowRightOutlined, CloseOutlined} from "@ant-design/icons";
import BasketItem from "./BasketItem/BasketItem";
import {CardType} from "../Cards/Card/Card";
import empty from '../../assets/empty.svg'

const {Title, Text} = Typography;

type BasketPropsType = {
    items: CardType[]
    isOpen: boolean
    closeBasket: () => void
    deleteCard: (itemID: string) => void
}

export const Basket: FC<BasketPropsType> = ({isOpen, closeBasket, items, deleteCard}) => {

    const sideBarClass = `${styles.aside} ${isOpen ? styles.open : ''}`

    const resultItemsSum = items.reduce((accum, item) => (accum + item.price) * item.quantity, 0);

    const sale = resultItemsSum * 0.05;

    const basketItems = items.map(item => <BasketItem key={item.id} {...item} deleteCard={deleteCard}/>)

    return (
        <>
            {isOpen && <div onClick={closeBasket} className={styles.overlay}></div>}
            <aside className={sideBarClass}>
                <div className={styles.top}>
                    <Title level={3} style={{marginBottom: 30}}>Корзина</Title>
                    <Button onClick={closeBasket} icon={<CloseOutlined/>}></Button>
                </div>
                <div className={!basketItems.length ? styles.list : ''} style={{flex: 1,}}>
                    {
                        basketItems.length ? basketItems : <div className={styles.empty} style={{textAlign: 'center'}}>
                            <img width={'70%'} src={empty} alt="empty"/>
                            <div className={styles.text}>
                                <Title level={4}>Корзина пустая</Title>
                                <Text>Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</Text>
                                <Button onClick={closeBasket} icon={<ArrowLeftOutlined/>}>Вернуться назад</Button>
                            </div>
                        </div>

                    }
                </div>
                {!!basketItems.length && <div className={styles.bottom}>
                    <div style={{display: 'flex', alignItems: 'flex-end'}}>
                        <Text>Итого:</Text>
                        <Text style={{
                            flex: 'auto',
                            borderBottom: '1px dashed #DFDFDF',
                            padding: '0 5px',
                            margin: '0 5px'
                        }}></Text>
                        <Text strong>{resultItemsSum} руб.</Text>
                    </div>
                    <div style={{display: 'flex', alignItems: 'flex-end'}}>
                        <Text>Налог 5%:</Text>
                        <Text style={{
                            flex: 'auto',
                            borderBottom: '1px dashed #DFDFDF',
                            padding: '0 5px',
                            margin: '0 5px'
                        }}></Text>
                        <Text strong>{sale.toFixed(2)} руб.</Text>
                    </div>
                    <Button icon={<ArrowRightOutlined/>}>Оформить заказ</Button>
                </div>}
            </aside>
        </>
    );
};

