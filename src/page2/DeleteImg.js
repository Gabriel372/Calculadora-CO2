import { ref,deleteObject,getStorage } from 'firebase/storage';
import style from './DeleteImg.module.css'
import { FaTrashAlt } from "react-icons/fa";

function DeleteImg({setBoxImg,BoxImg}) {

function ClickDelete(imgURL) {
const storage = getStorage();

    const desertRef = ref(storage,`${imgURL}`);

    deleteObject(desertRef).then(() => {
        DeleteImgInBox(imgURL);console.log('img excluida:',desertRef);
    }).catch((error) => {
        console.log('ERRO:',error);

    }); 
    
}

function DeleteImgInBox(imgURL) {
    let ImagesRemain = BoxImg.filter((img) => img !== imgURL);
    setBoxImg(ImagesRemain);
  }

return <div>
<div className={style.divImgDel}>
{BoxImg.map((imgURL,index)=>(
<div key={index} className={style.divEachImgdel}>

<img   src={imgURL} alt={`Imagem ${index + 1}`} className={style.imgDelete} />

<button onClick={()=> ClickDelete(imgURL)} className={style.btnDelImg}><FaTrashAlt />
</button>

</div>

))}
</div>

</div>

}

export default DeleteImg
