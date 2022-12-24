import React from 'react';
import {Splide, SplideSlide} from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import adidas from './adidas.svg'
import kermit from './kermit.png'
import {Button, Typography} from 'antd';
import styles from './Slider.module.scss'

const {Title} = Typography

const Slider = () => {
    const sliders = Array.from(Array(5)).map((slide, index) => {
        return (
            <SplideSlide className={styles.splide} key={index}>
                <div className={styles.slide}>
                    <div className={styles.left}>
                        <div className={styles.logo}>
                            <img src={adidas} alt="adidas"/>
                        </div>
                        <div className={styles.buy}>
                            <Title className={styles.title} level={2}>
                                <span>STAN SMITH,</span> FOREVER
                            </Title>
                            <Button>Купить</Button>
                        </div>
                    </div>
                    <div className={styles.kermit}>
                        <img src={kermit} alt="kermit"/>
                    </div>
                </div>
            </SplideSlide>
        )
    })
    return (
        <section style={{paddingTop: 45}}>
            <Splide
                options={{
                    gap: '1rem',
                }}
                aria-label="My Favorite Images">
                {sliders}
            </Splide>
        </section>
    );
};

export default Slider;