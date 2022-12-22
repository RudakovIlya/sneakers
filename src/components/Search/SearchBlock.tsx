import React from 'react';
import styles from "./Search.module.scss";
import {Input, Typography} from "antd";

const {Title} = Typography;
const {Search} = Input;

export const SearchBlock = () => {
    return (
        <div className={styles.search}>
            <Title level={3}>Все кроссовки</Title>
            <Search placeholder="Поиск..." allowClear style={{width: 250}}/>
        </div>
    );
};