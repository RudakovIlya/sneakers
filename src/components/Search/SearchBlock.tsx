import React, {ChangeEvent, FC} from 'react';
import styles from "./Search.module.scss";
import {Input, Typography} from "antd";

const {Title} = Typography;
const {Search} = Input;

type SearchBlockPropsType = {
    search: string
    setSearch: (search: string) => void
}

export const SearchBlock: FC<SearchBlockPropsType> = ({setSearch, search}) => {

    const onChangeSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.currentTarget.value)
    }

    return (
        <div className={styles.search}>
            <Title level={3}>{search ? `Поиск по запросу: "${search}"` : 'Все кроссовки'}</Title>
            <Search value={search} onChange={onChangeSearchValue} placeholder="Поиск..." allowClear style={{width: 250}}/>
        </div>
    );
};