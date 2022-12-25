import React, {FC, useState} from 'react';
import styles from "./Main.module.scss";
import Slider from "../Slider/Slider";
import {SearchBlock} from "../Search/SearchBlock";
import Cards from "../Cards/Cards";
import {Layout} from "antd";
import {CardType} from "../Cards/Card/Card";
import {Route, Routes} from 'react-router-dom';
import Favorites from "../Favorites/Favorites";

const {Content} = Layout;

type MainContentType = {
    items: CardType[]
    favorites: CardType[]
    addToCard: (item: CardType) => void
    onAddToFavorites: (item: CardType) => void
}

const MainContent: FC<MainContentType> = ({items, addToCard, onAddToFavorites, favorites}) => {

    const [search, setSearch] = useState<string>('');

    return (
        <Content className={styles.content}>
            <Routes>
                <Route path={'/'}
                       element={<>
                           <Slider/>
                           <SearchBlock search={search} setSearch={setSearch}/>
                           <Cards items={items} addToCard={addToCard} onAddToFavorites={onAddToFavorites}
                                  filter={search}/>
                       </>}></Route>
                <Route path={'/favorites'}
                       element={
                           <Favorites
                               favorites={favorites}
                               addToCard={addToCard}
                               onAddToFavorites={onAddToFavorites}
                           />
                       }/>
            </Routes>
        </Content>
    );
};

export default MainContent;