import { useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import style from './Carousel.module.css'
import rj from '../images/rjImg.jpg'
import sp from '../images/spImg.jpg'
import angra from '../images/angraImg.webp'

const Carousel = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      slider.slickNext();
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false, // Desativar autoplay porque estamos controlando manualmente
    arrows: false, // Remover setas de navegação
 
};

  let slider;

  return (
    <Slider ref={(c) => (slider = c)} {...settings} className={style.container}>
      <div >
        <img src={sp} alt="Imagem 1"className={style.imgCarousel}/>
      </div>
      <div>
        <img src={angra} alt="Imagem 2" className={style.imgCarousel}/>
      </div>
      <div>
        <img src={sp}alt="Imagem 3" className={style.imgCarousel}  />
      </div>
    </Slider>
  );
};

export default Carousel;
