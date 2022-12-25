import React, {FC} from 'react';
import {Empty, Row} from "antd";
import {CardItem, CardType} from "../Cards/Card/Card";

type FavoritesPropsType = {
    favorites: CardType[]
    addToCard: (item: CardType) => void
    onAddToFavorites: (item: CardType) => void
}

const Favorites: FC<FavoritesPropsType> = ({favorites, onAddToFavorites, addToCard}) => {

    const favoritesItems = favorites.map(fav => {
        return (
            <CardItem key={fav.id} favorite={true} card={fav} addToCard={addToCard}
                      onAddToFavorites={onAddToFavorites}/>
        )
    })

    return (
        <Row wrap gutter={[32, 40]}>
            {favoritesItems.length ? favoritesItems : <Empty/>}
        </Row>
    );
};

export default Favorites;