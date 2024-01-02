import style from './ClientManager.module.css'
import { useState,useEffect } from 'react'
import ModalDel from './ModalDel'
import ModalEdit from './ModalEdit'
import NavbarLoged from '../page3/NavbarLoged';
import ClientDetail from './ClientDetail';
import Spinner from './Spinner';
import ModInsertEmt from './ModInsertEmt'
import ModViewEmit from './ModViewEmit'
import EmtDel from './EmtDel'
import GeneratePdf from '../page5/GeneratePdf'


function ClientManager() {
const [Boxclient,setBoxclient] = useState([]) 
const [Boxemition,setBoxemition] = useState([]) 
const [Boxclientemit,setBoxclientemit] = useState([]) 
const [Found,setFound] = useState([]) 
const [Notfound,SetNotfound] = useState('') 
const [Changeinp,setChangeinp] = useState('') 
const [ModInterruptDel,setModInterruptDel] = useState(false) 
const [ModInterruptEdit,setModInterruptEdit] = useState(false) 
const [ModInterruptEMit,setModInterruptEMit] = useState(false) 
const [Clientdel,setClientdel] = useState({}) 
const [Clientedit,setClientedit] = useState('') 
const [ClientEmt,setClientEmt] = useState('') 
const [ClViewEmt,setClViewEmt] = useState('') 
const [MdIntrruptViewEMt,setMdIntrruptViewEMt] = useState(false) 
const [DelEmtOfClient,setDelEmtOfClient] = useState('') 
const admStorage = JSON.parse(sessionStorage.getItem('admStorage'))
const msg = {loadData:'Carregando Dados...',loadFail:'Falha ao carregar dados',}
const [SpinIntrrpt,setSpinIntrrpt] = useState(false) 


useEffect(() => {

// fetch(`http://191.252.38.35:8080/api/emissoes/`,{
//   method:"DELETE", })
//   .then((response) => {
//   if (!response.ok) {
//   throw new Error(`Erro ao excluir emissao: ${response.status}`); }
//   return response.json(); })
//   .then((data) => {
//   console.log('CONSEGUI DELETAR!!!', data);  })
//   .catch((error) => console.log(error)); 

if (Boxclientemit.length === 0) {
  setSpinIntrrpt(true) ;
  setTimeout(() => {setSpinIntrrpt(false)  },2500) ;

}

fetch('http://191.252.38.35:8080/api/clientes/listar',{
  method:"POST",
  headers:{"Content-Type":"application/json"},
  body:JSON.stringify(admStorage) })
  .then((response) => response.json())
  .then((data) => setBoxclient(data) )  
  .catch((error) => console.log(error))
// const AdmJson = {email:"marcos@gmail.com",senha:"1234567",nome:"Marcos Philippe"}
fetch('http://191.252.38.35:8080/api/emissoes/listar',{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify(admStorage) })
.then((response) => response.json())
.then((data) =>  {setBoxemition(data);GroupedClientEmit();  
} )
.catch((error) => { console.log('erro', error);  }); 


},[Boxclientemit,Boxemition,Found])


const GroupedClientEmit = () => {
  const grouped = Boxclient.map((client) => {
    const emissoes = Boxemition.filter((emission) => emission.nome === client.nome);
    const groupedEmissoes = emissoes.reduce((acc, curr) => {
      if (!acc[curr.tipoEmissao]) {
        acc[curr.tipoEmissao] = [];
      }
      acc[curr.tipoEmissao].push({ ...curr, gasto: curr.gasto });
      return acc;
    }, {});

    ['agua', 'energiaeletrica', 'residuos'].forEach((tipoEmissao) => {
      if (groupedEmissoes[tipoEmissao]) {
        groupedEmissoes[tipoEmissao].sort((a, b) => {
          // Ordena por ano e mês em ordem decrescente
          if (a.ano !== b.ano) {
            return b.ano - a.ano;
          } else {
            return b.mes - a.mes;
          }
        });
      }
    });

    return { ...client, emissoes: groupedEmissoes };
  });
  setBoxclientemit(grouped);
};




const clickSearch = () => { 
//   Boxemition.forEach((emit) => { 
// fetch(`http://191.252.38.35:8080/api/clientes/7ace734b-f9d6-46f5-8658-781949fa4ecc`,{
//   method:"DELETE", })
//   .then((response) => {
//   if (!response.ok) {
//   throw new Error(`Erro ao excluir emissao: ${response.status}`); }
//   return response.json(); })
//   .then((data) => {
//   console.log('CONSEGUI DELETAR!!!', data);  })
//   .catch((error) => console.log(error)); 

// })
//======

 if (Changeinp) {
    let InpValueLower = Changeinp.toLowerCase()
    const cpfFiltred = Boxclientemit.filter((client) => client.cpf === InpValueLower);
    const projectFiltred = Boxclientemit.filter((client) => client.projeto === InpValueLower);  

if (cpfFiltred.length > 0) { setFound([...cpfFiltred]);  }    
else if (projectFiltred.length > 0 ) { setFound([...projectFiltred]);}
else if (Found.length === 0 ) { SetNotfound('Nenhum cliente encontrado');  }
 }  
else{alert('Preencha o formulário')}
}

const Digiting = (e) => {setChangeinp(e.target.value) ;setFound('') ; SetNotfound('') }

const clickDelete = (client) => {
 setClientdel(client)   
 setModInterruptDel(true) }


const clickEdit = (client) => {setClientedit(client) ;setModInterruptEdit(true);}   
const clickEmition = (client) => {setClientEmt(client);setModInterruptEMit(true);  }   
const clickViewEmt = (client) => {setClViewEmt(client);setMdIntrruptViewEMt(true);}   


return <div >
<ModalDel setModInterruptDel={setModInterruptDel} ModInterruptDel={ModInterruptDel} setClientdel={setClientdel} Clientdel={Clientdel} setFound={setFound}/>
<ModalEdit  ModInterruptEdit={ModInterruptEdit} setModInterruptEdit={setModInterruptEdit} Clientedit={Clientedit} clickSearch={clickSearch} />
<ModInsertEmt ModInterruptEMit={ModInterruptEMit} setModInterruptEMit={setModInterruptEMit} ClientEmt={ClientEmt} Found={Found} setFound={setFound}/>
{ClViewEmt && <ModViewEmit MdIntrruptViewEMt={MdIntrruptViewEMt} setMdIntrruptViewEMt={setMdIntrruptViewEMt} ClViewEmt={ClViewEmt} />}
<EmtDel DelEmtOfClient={DelEmtOfClient} setDelEmtOfClient={setDelEmtOfClient} />
<NavbarLoged/>    
<div className={style.container}>

<div className={style.divTitleAllPrjct}>
    <h2 className={style.titH2}>Filtro por cpf ou projeto clientes cadastrados</h2>
{Found.length > 0 && <GeneratePdf />}
</div>


{/* {Boxclientemit.length === 0 ?<div>
 <Spinner/><p className={style.Ploading}>{msg.loadData}</p></div>:'' }    
<div><input className={style.cpfInput} type='text' onChange={Digiting}  autoFocus value={Changeinp}/>    
<button onClick={clickSearch}>Buscar</button></div>  */}
<div className={style.spinnerP}>{SpinIntrrpt && <Spinner/>}
{/* <p className={style.Ploading}>{SpinIntrrpt ? msg.loadData : '' }</p>
<p className={style.Ploading}>{Boxclientemit.length ===  0 &&  !SpinIntrrpt ? msg.loadFail :''}</p> */}

<p className={style.Ploading}>
  {SpinIntrrpt ? msg.loadData : (Boxclientemit.length === 0 && !SpinIntrrpt ? msg.loadFail : '')}
</p>


{/* <p className={style.Ploading}>{Boxclientemit.length ===  0 &&  msg.loadData || Boxclientemit.length === 0 && !SpinIntrrpt && msg.loadFail  }</p> */}
</div>
 <input className={style.cpfInput} type='text' onChange={Digiting}  autoFocus value={Changeinp} placeholder='Digite o CPF ou o projeto'/>    
<button onClick={clickSearch}>Buscar</button>



{Boxclientemit.length > 0 && Found.length > 0 ?
  <ul className={style.ul} >
{Found.map(client => (<li key={client.id} className={style.li}> 
<ClientDetail client={client}/>
<div className={style.divBtn}>

<div className={style.divBtnCliMan}>

<div className={style.divBtnCol}>
<button className={style.btnRemove} onClick={ ()=> clickDelete(client)}>Deletar</button>
<button  className={style.btnEmit} onClick={()=> clickEmition(client)}>Inserir emissões</button>
</div> 

<div className={style.divBtnCol}>
<button  className={style.btnInsert} onClick={()=> clickEdit(client)}>Editar</button>
<button  className={style.btnViewEmit} onClick={()=> clickViewEmt(client)}>Visualisar emissões</button>
</div> 

</div>

</div>
</li>))}
</ul>  : <p>{Notfound}</p> }
</div>
</div>
}

export default ClientManager

