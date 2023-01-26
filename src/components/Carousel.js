// Direct React component imports
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react/swiper-react.js';
// Styles must use direct files imports
import 'swiper/swiper.scss'; // core Swiper

import { ReactComponent as CarouselLeft } from '../assets/carousel_left.svg';
import { ReactComponent as CarouselRight } from '../assets/carousel_right.svg';

function CarouselNav() {
    const swiper = useSwiper();

    return (
        <section>
            <button onClick={() => swiper.slidePrev()}>
                <CarouselLeft />
            </button>
            <button onClick={() => swiper.slideNext()}>
                <CarouselRight />
            </button>
        </section>
    )
}

export default function Carousel() {
    return (
        <Swiper
            spaceBetween={0}
            slidesPerView={1}
            loop={true}
        >
            <SwiperSlide>
                <picture>
                    <img
                        src='/images/cycle_mobile_1.png' 
                        alt='Virtuous Cycle Step 1: For IDOL NFT Owners, 7.5% commission on Idol NFT sales paid to $VIRTUE Stakers'
                    />
                </picture>
            </SwiperSlide>
            <SwiperSlide>
                <picture>
                    <img
                        src='/images/cycle_mobile_2.png' 
                        alt='Virtuous Cycle Step 2: For $VIRTUE Stakers, stETH is bonded into IDOL Treasury to obtain $VIRTUE'
                    />
                </picture>
            </SwiperSlide>
            <SwiperSlide>
                <picture>
                    <img
                        src='/images/cycle_mobile_3.png' 
                        alt='Virtuous Cycle Step 3: For the IDOL Treasury, IDOL Treasury pays stETH rewards to IDOL NFT Owners'
                    />
                </picture>
            </SwiperSlide>

            <CarouselNav />
        </Swiper>
    );
};
  