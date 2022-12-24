import React, {FC} from 'react';
import styles from "./Header.module.scss";
import sneakers from "../../assets/sneakers.svg";
import {HeartOutlined, ShoppingCartOutlined, UserOutlined} from "@ant-design/icons";
import {Button, Layout, Typography} from "antd";
import {styleForHeader, styleForIcon} from "./style/style";

const {Header} = Layout;
const {Title, Text} = Typography;

type HeaderPagePropsType = {
    onClickCart: () => void
}

const HeaderPage:FC<HeaderPagePropsType> = ({onClickCart}) => {

    return (
        <Header className={styles.header} style={styleForHeader}>
            <div className={styles.item}>
                <img src={sneakers} alt="sneakers-logo"/>
                <div>
                    <Title style={{marginBottom: 5, fontSize: 20}} level={3}>REACT SNEAKERS</Title>
                    <Text style={{color: ' #9D9D9D'}}>Магазин лучших кроссовок</Text>
                </div>
            </div>
            <ul className={styles.user}>
                <li>
                    <Button style={{border: 'none'}} onClick={onClickCart}
                            icon={<ShoppingCartOutlined style={styleForIcon}/>}></Button>
                    <Text style={{marginLeft: 10}}>1205 руб.</Text>
                </li>
                <li>
                    <HeartOutlined style={styleForIcon}/>
                </li>
                <li>
                    <UserOutlined style={styleForIcon}/>
                </li>
            </ul>
        </Header>
    );
};

export default HeaderPage;