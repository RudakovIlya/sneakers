import {Empty, Row} from "antd";
import {CardItem, CardType} from "./Card/Card";
import React, {FC} from "react";

type CardsType = {
    items: CardType[]
    filter: string
    addToCard: (item: CardType) => void
    onAddToFavorites: (item: CardType) => void
}

const Cards: FC<CardsType> = ({items, addToCard, onAddToFavorites,filter}) => {

    const cardsItem = items.filter(card => card.title.toLowerCase().includes(filter.toLowerCase())).map(card => {
        return (
            items.length ? <CardItem key={card.id} card={card} addToCard={addToCard} onAddToFavorites={onAddToFavorites}/> : 'Error'
        )
    })

    return (
        <Row wrap gutter={[32, 40]}>
            {cardsItem.length ? cardsItem : <Empty/>}
        </Row>
    );
};

export default Cards;