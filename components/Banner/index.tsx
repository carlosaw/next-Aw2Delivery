import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/css';

import styles from './styles.module.css';

export const Banner = () => {
  return (
    <div className={styles.container}>
      <Swiper
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className={styles.swiper}
      >
        <SwiperSlide className={styles.slide}>
          <div className={styles.slideImg}>1</div>
          {/* <img src="/tmp/banner1.png" alt="" /> */}
        </SwiperSlide>

        <SwiperSlide className={styles.slide}>
          <div className={styles.slideImg}>2</div>
          {/* <img src="/tmp/banner2.png" alt="" /> */}
        </SwiperSlide>
      </Swiper>
    </div>
  );
}