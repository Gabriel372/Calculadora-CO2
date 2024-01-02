import { useEffect,useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import style from './Carousel.module.css'
import ModEditImg from './ModEditImg'
import DownLdImg from './DownLdImg'

const Carousel = () => {
  const [BoxImg, setBoxImg] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => { slider.slickNext(); }, 4000);
return () => clearInterval(interval);
  }, [BoxImg]);

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

  return (<div>
    <Slider ref={(c) => (slider = c)} {...settings} className={style.container}>
      {BoxImg.map((imageUrl, index) => (
        <div key={index}>
          <img src={imageUrl} alt={`Imagem ${index + 1}`} className={style.imgCarousel} />
        </div>
      ))}

    </Slider>
    <ModEditImg setBoxImg={setBoxImg} BoxImg={BoxImg} />
<DownLdImg setBoxImg={setBoxImg}/>
    </div>
  
  );
};

export default Carousel;
