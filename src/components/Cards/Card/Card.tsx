import {FC, useState} from 'react'
import styles from './Card.module.scss'
import {Image, Button, Col, Typography, Card,} from 'antd';
import {PlusOutlined, HeartOutlined, CheckOutlined,} from "@ant-design/icons";
import {mainStyles} from "../../../styles/styles";

const {Title, Text} = Typography;

export type CardType = {
    title: string
    imageURL: string
    price: number,
    itemID: string
}

type CardPropsType = {
    card: CardType
    addToCard: (item: CardType) => void
}

export const CardItem: FC<CardPropsType> = (props) => {
    const {addToCard, card} = props;

    const [isAdded, setIsAdded] = useState<boolean>(true);

    const changeButton = () => {
        setIsAdded(!isAdded);
        isAdded && addToCard({...card});
    };

    return (
        <Col style={{minWidth: 250}} flex="1 1 25%">
            <Card
                className={styles.card}
                hoverable
                cover={<Image
                    src={card.imageURL}
                />}
            >
                <div className={styles.top}>
                    <Title style={mainStyles.text} level={5}>{card.title}</Title>
                    <Button icon={<HeartOutlined/>}></Button>
                </div>
                <div className={styles.info}>
                    <div>
                        <Text>Цена:</Text>
                        <Text style={{display: 'block'}} strong>{card.price}руб.</Text>
                    </div>
                    <Button style={{border: !isAdded ? '1px solid #76ff03' : ''}} onClick={changeButton}
                            icon={isAdded ? <PlusOutlined style={{fontSize: 18}}/> :
                                <CheckOutlined style={{color: '#76ff03', fontSize: 18}}/>}></Button>
                </div>

            </Card>
        </Col>
    );
};
