import style from './StartPg.module.css'
import NavbarLoged from '../page3/NavbarLoged'
import Carousel from './Carousel'
import PizzaChart from './PizzaChart'


function StartPg() {
    
//carrocel 1100px x 500px ,desliza a cada 4s ,c/ 3 img

    return <div>
        <NavbarLoged/>
<div className={style.container}>
<Carousel/>

<PizzaChart/>


</div>


        
    </div>
}

export default StartPg
