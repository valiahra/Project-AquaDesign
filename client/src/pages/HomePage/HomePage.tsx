import styles from './HomePage.module.css';
import { Link } from 'react-router-dom';
import {
  UnorderedList,
  ListItem,
  Image,
} from '@chakra-ui/react';
import Slider from 'react-slick';
import { useEffect, useRef, useState } from 'react';
import { CheckIcon } from '@chakra-ui/icons';

export default function HomePage() {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (sliderRef.current) {
        sliderRef.current.slickNext();
      }
    }, 12250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <img
          src="https://astral-aquadesign.ru/i/footer/logo-aad.svg?2"
          alt="Лого"
        />
        <h1>Проектирование, строительство и реконструкция фонтанов</h1>
      </div>
      <div className={styles.sliderWrapper}>
        {currentSlide !== 0 && (
          <div className={styles.textLink}>
            <UnorderedList>
              <ListItem>
                <Link to="/ourWorks">Готовые объекты</Link>
              </ListItem>
              <ListItem>
                <Link to="/projects">Проекты фонтанов</Link>
              </ListItem>
              <ListItem>
                <Link to="/constructor">Подбор фонтанов</Link>
              </ListItem>
              <ListItem>
                <Link to="/order">Как заказать</Link>
              </ListItem>
            </UnorderedList>
          </div>
        )}
        <div className={styles.photos}>
          <Slider ref={sliderRef} className="slider" {...settings}>
            <div className={styles.slide}>
              <video
                autoPlay
                loop
                muted
                controls
                src="/cat video.mp4"
                className={styles.video}
              />
            </div>
            <div className={styles.slide}>
              <div className={styles.slideText}>
                <h3>Астрал Аквадизайн:</h3>
                <ul className={styles.featuresList}>
                  <li>
                    <CheckIcon /> качество
                  </li>
                  <li>
                    <CheckIcon /> надежность
                  </li>
                  <li>
                    <CheckIcon /> профессионализм
                  </li>
                </ul>
              </div>
              <Image src="/chicago.jpg" alt="Your photo" borderRadius="lg" />
            </div>
            <div className={styles.slide}>
              <h3 className={styles.highlightedText}>
                Более 20 лет на рынке России
              </h3>
              <Image src="/fonn1.jpg" alt="Your photo" borderRadius="lg" />
            </div>
            <div className={styles.slide}>
              <div className={styles.slideTextLeft}>
                <h3 style={{ color: "white" }}>
                  Свыше <span className={styles.highlightedNumber}>400</span>{" "}
                  реализованных проектов
                </h3>
                <h3 style={{ color: "white" }}>
                  География: более{" "}
                  <span className={styles.highlightedNumber}>100</span> городов
                </h3>
              </div>
              <Image src="/fonn.jpg" alt="Your photo" borderRadius="lg" />
            </div>
            {/* <div className={styles.slide}>
              <h3 className={styles.slideText}>География: более 100 городов</h3>
              <Image src="/fountain-otradnyj-12.jpg" alt="Your photo" borderRadius="lg" />
            </div> */}
          </Slider>
        </div>
      </div>
    </div>
  );
}