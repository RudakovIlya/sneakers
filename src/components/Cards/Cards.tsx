import {Row} from "antd";
import {CardItem, CardType} from "./Card/Card";
import React, {FC} from "react";

type CardsType = {
    items: CardType[]
    addToCard: (item:CardType) => void
}

const Cards: FC<CardsType> = ({items, addToCard}) => {

    const cardsItem = items.map(card => {
        return (
            items.length ? <CardItem key={card.itemID} card={card} addToCard={addToCard}/> : ''
        )
    })

    return (
        <Row wrap gutter={[32, 40]}>
            {cardsItem}
        </Row>
    );
};

export default Cards;