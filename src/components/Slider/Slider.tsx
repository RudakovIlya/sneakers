import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
const Slider = () => {
    return (

        <Splide aria-label="My Favorite Images">
            <SplideSlide>
                <img src="https://avatars.mds.yandex.net/i?id=0eaa142d7202ac9bbd26ac279e7ae159_l-4898876-images-thumbs&n=27&h=384&w=480" alt=""/>

            </SplideSlide>
            <SplideSlide>
                <img src="https://avatars.mds.yandex.net/i?id=0eaa142d7202ac9bbd26ac279e7ae159_l-4898876-images-thumbs&n=27&h=384&w=480" alt=""/>
            </SplideSlide>
        </Splide>
    );
};

export default Slider;