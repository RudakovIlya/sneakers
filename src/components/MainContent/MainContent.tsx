import React, {FC} from 'react';
import styles from "./Main.module.scss";
import Slider from "../Slider/Slider";
import {SearchBlock} from "../Search/SearchBlock";
import Cards from "../Cards/Cards";
import {Layout} from "antd";
import {CardType} from "../Cards/Card/Card";


const {Content} = Layout;
type MainContentType = {
    items: CardType[]
    addToCard: (item: CardType) => void
}
const MainContent: FC<MainContentType> = ({items,addToCard}) => {

    return (
        <Content className={styles.content}>
            <Slider/>
            <SearchBlock/>
            <Cards items={items} addToCard={addToCard} />
        </Content>
    );
};

export default MainContent;