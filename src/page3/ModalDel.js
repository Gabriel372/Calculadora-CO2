import style from './ModalDel.module.css'
import { useState,useEffect } from 'react'

function ModalDel(props) {
const [Show,setShow] = useState(false) 

useEffect(() => {
    setShow(props.ModInterruptDel.ModalActive)
},[props.ModInterruptDel] )

const clickYes = () => {
    setShow(false) ;
    props.ReceiveDelMod(false,false) 
}

const clickNot = () => {
    setShow(false); 
    props.ReceiveDelMod(false,true) 
}

return <div className={`${Show ? style.modalOn : style.modalOff}`}>
 <div className={style.squareDel}> 
 <h4 className={style.h4ModDel}>Deseja deletar esse cliente ?</h4>   
 <button  className={style.btnNot} onClick={clickYes}>Não</button>
 <button  className={style.btnYes} onClick={clickNot}>Sim</button>
 </div>  
</div>

}

export default ModalDel
