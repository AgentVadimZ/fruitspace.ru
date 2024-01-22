import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination, Controller} from "swiper";

import 'swiper/css/bundle';
import styles from "./Carousel.module.css"
import Link from "next/link";


export default function Carousel(props) {
    return (
        <Swiper modules={[Navigation, Pagination, Controller]}
                spaceBetween={50}
                navigation pagination={{clickable: true}}
                loop={true}
                className={styles.carouselBox}>
            {props.children.map((content, i)=>(
                <SwiperSlide key={i}>
                    {content}
                </SwiperSlide>
            ))}

        </Swiper>
    )
}



export function CarouselItem(props) {
    return (
        <Link href={props.link} legacyBehavior>
            <div className={styles.carouselItem}>
                <img src={props.image} alt="carousel"/>
                <div className={styles.textbox}>
                    <h3>{props.title}</h3>
                    <p>{props.text}</p>
                </div>
            </div>
        </Link>
    );
}