import style from './ModEditImg.module.css'
import { useState } from 'react'
import { FaPencilAlt } from "react-icons/fa";
import { AiOutlineClose } from 'react-icons/ai';
import UploadImg from './UploadImg'
import DeleteImg from './DeleteImg';

function ModEditImg({setBoxImg,BoxImg}) {
    const [InterruptModImg ,setInterruptModImg] = useState(false)

function toggleModal() {setInterruptModImg(!InterruptModImg); 

}
function CloseModal() {
setInterruptModImg(!InterruptModImg); 
    }


return <div className={style.container} >
 <div>
 <button  className={style.btnOpenModEditImg} onClick={toggleModal}><FaPencilAlt /></button>
 <span className={style.toolTipEdtImg}>Editar imagens</span>
 </div>

 <div className={`${InterruptModImg ? style.modalOn : style.modalOff}`}>

 <div className={style.squarEdit}> 

 <button  className={style.btnCloseModEditImg} onClick={CloseModal}><AiOutlineClose/></button>

 <UploadImg setBoxImg={setBoxImg} BoxImg={BoxImg} /> 
<DeleteImg setBoxImg={setBoxImg} BoxImg={BoxImg}/>


    </div>   
 </div>
</div>

}

export default ModEditImg 