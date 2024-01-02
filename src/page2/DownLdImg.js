import { useEffect } from 'react';
import { storage } from './FireBase';
import { ref, listAll, getDownloadURL } from 'firebase/storage';

function DownLdImg({setBoxImg}) {

useEffect(() => { fetchImageUrls()  }, []);

  function fetchImageUrls() {
    try {

      const storageRef = ref(storage, 'images');

      listAll(storageRef)
        .then((imageList) => {

          const urlPromises = imageList.items.map((item) => {
            return getDownloadURL(item);
          });
  
          return Promise.all(urlPromises);
        })
        .then((urls) => {
          setBoxImg(urls);
        })
        .catch((error) => {
          console.error('Erro ao obter URLs das imagens:', error);
        });
    } catch (error) {
      console.error('Erro geral ao obter URLs das imagens:', error);
    }
  }


return <div></div>

}

export default DownLdImg

