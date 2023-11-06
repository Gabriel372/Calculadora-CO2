import style from './Modal.module.css'
import { useState,useEffect } from 'react'

function Modal(props) {
const [Show,setShow] = useState(false) //cx de clientes
// const { SenData } = props;

useEffect(() => {
    setShow(props.Interruptmod.ModalActive)
    // console.log(props.Interruptmod);
// console.log(Show);
    // props.OnReceive(Show);
},[props.Interruptmod] )

const clickYes = () => {
    setShow(false) ;//fexar modal
    props.ReceiveModal(false,false) //modal active ? , delete ? 
}

const clickNot = () => {
    setShow(false); 
    props.ReceiveModal(false,true) //modal active ? , delete ? DELETE FALSE E TRUE ESTA INVERTIDO
}


return <div className={`${Show ? style.modalOn : style.modalOff}`}>
 <div className={style.square}> 
 <h4>Deseja deletar esse cliente ?</h4>   
 <button  className={style.btnNot} onClick={clickYes}>Não</button>
 <button  className={style.btnYes} onClick={clickNot}>Sim</button>
 </div>  
</div>

}

export default Modal
