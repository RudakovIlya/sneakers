import React, {FC} from 'react';
import {Button, Card, Col, Image, Row, Typography} from "antd";
import styles from "../Basket.module.scss";
import {mainStyles} from "../../../styles/styles";
import {CloseOutlined} from "@ant-design/icons";
import {CardType} from "../../Cards/Card/Card";

const {Title, Text} = Typography;

type BasketItemPropsType = {
    deleteCard: (itemID: string) => void
}

const BasketItem: FC<CardType & BasketItemPropsType> = ({id, title, imageURL, price, deleteCard}) => {

    const deleteCardCallback = () => {
        deleteCard(id)
    }

    return (
        <Row className={styles.row} gutter={[32, 40]}>
            <Col style={{paddingLeft: 0, paddingRight: 0}} flex="1 1 auto">
                <Card
                    className={`${styles.card} ${styles.basket}`}
                    bodyStyle={{padding: 0, display: 'flex', columnGap: 12, alignItems: 'center'}}
                    style={{borderRadius: 20, display: 'flex'}}
                    hoverable
                    cover={<Image
                        preview={false}
                        width={70}
                        height={70}
                        src={imageURL}
                    />}
                >
                    <div className={styles.top}>
                        <Title style={mainStyles.text} level={5}>{title}</Title>
                        <Text style={{display: 'block'}} strong>{price}</Text>
                    </div>
                    <Button onClick={deleteCardCallback} icon={<CloseOutlined/>}></Button>
                </Card>
            </Col>
        </Row>
    );
};

export default BasketItem;