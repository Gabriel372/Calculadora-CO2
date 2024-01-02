import style from './UploadImg.module.css'
import { storage } from "./FireBase";//mediador do armazenamento
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useState } from 'react'

function UploadImg({setBoxImg,BoxImg}) {
    const [imgURL, setImgURL] = useState("");
    const [ImgUploading, setImgUploading] = useState(false);
    const [progressPorcent, setPorgessPorcent] = useState(0);    

    const handleSubmit = (event) => {

        event.preventDefault();
        setImgUploading(true)
        const file = event.target[0]?.files[0];
        if (!file) {alert('Insira imagem') ;return }

        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
              setPorgessPorcent(progress);
            },
            (error) => {
              alert(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setImgURL(downloadURL);
setBoxImg([...BoxImg,downloadURL]); setImgUploading(false);
setTimeout(()=>{setImgURL('')},7000)
              });
            }
          ); 

    }


return  <div >
    <h3 className={style.H3UploadImg}>Inserir ou deletar imagens no carrocel</h3>
      <header >
        <form onSubmit={handleSubmit}> 
          <input type="file" className={style.inputUpload}/>
          <button className={style.btnUpload}>Inserir</button>
        </form>
        {!imgURL && ImgUploading ? <p>{progressPorcent}%</p> : ''}

{imgURL &&  <span className={style.spanUploadImg}>Inserida com sucesso!</span> }

      </header>
    </div>  

}

export default UploadImg

