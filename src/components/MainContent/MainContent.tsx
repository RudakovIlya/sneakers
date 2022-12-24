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
    addToCard: (item: CardType) => void
    onAddToFavorites: (item: CardType) => void
}

const MainContent: FC<MainContentType> = ({items, addToCard, onAddToFavorites}) => {

    const [search, setSearch] = useState<string>('');

    return (
        <Content className={styles.content}>
            <Slider/>
            <SearchBlock search={search} setSearch={setSearch}/>
            <Routes>
                <Route path={'/'}
                       element={<Cards items={items} addToCard={addToCard} onAddToFavorites={onAddToFavorites}
                                       filter={search}/>}></Route>
                <Route path={'/favorites'}
                       element={<Favorites/>}/>
            </Routes>
        </Content>
    );
};

export default MainContent;