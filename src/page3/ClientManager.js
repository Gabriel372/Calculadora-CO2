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

function ClientManager() {
const [Boxclient,setBoxclient] = useState([]) 
const [Boxemition,setBoxemition] = useState([]) 
const [Boxclientemit,setBoxclientemit] = useState([]) 
const [Found,setFound] = useState('') 
const [Notfound,SetNotfound] = useState('') 
const [Changeinp,setChangeinp] = useState('') 
const [ModInterruptDel,setModInterruptDel] = useState({ ModalActive: '', Delete: '' }) 
const [ModInterruptEdit,setModInterruptEdit] = useState(false) 
const [ModInterruptEMit,setModInterruptEMit] = useState(false) 
const [Clientdel,setClientdel] = useState('') 
const [Clientedit,setClientedit] = useState('') 
const [ClientEmt,setClientEmt] = useState('') 
const [ClViewEmt,setClViewEmt] = useState('') 
const [MdIntrruptViewEMt,setMdIntrruptViewEMt] = useState(false) 
const [DelEmtOfClient,setDelEmtOfClient] = useState('') 
const admStorage = JSON.parse(sessionStorage.getItem('admStorage'))


useEffect(() => {

// fetch(`http://191.252.38.35:8080/api/emissoes/c3a46260-45ac-45ec-a4cd-78a7ac1b77e1`,{
//   method:"DELETE", })
//   .then((response) => {
//   if (!response.ok) {
//   throw new Error(`Erro ao excluir emissao: ${response.status}`); }
//   return response.json(); })
//   .then((data) => {
//   console.log(data);  })
//   .catch((error) => console.log(error)); 
// })

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

},[Boxclientemit,Boxemition])

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
    return { ...client, emissoes: groupedEmissoes };
  });
  setBoxclientemit(grouped); };

const clickSearch = () => { 

    console.log('cx de emissoes',Boxemition);
    console.log('cx de cliente com emissoes',Boxclientemit);
 if (Changeinp) {
    const cpfFiltred = Boxclientemit.filter((client) => client.cpf === Changeinp);
    const projectFiltred = Boxclientemit.filter((client) => client.projeto === Changeinp);  
    console.log(projectFiltred);

if (cpfFiltred.length > 0) { setFound([...cpfFiltred]);  }    
else if (projectFiltred.length > 0 ) { setFound([...projectFiltred]);}
else if (Found.length === 0 ) { SetNotfound('Nenhum cliente encontrado');  }
 }  
}

const Digiting = (e) => {setChangeinp(e.target.value); setFound('') ; SetNotfound('') }

const clickDelete = (client) => {
  console.log(client);
 setClientdel(client)   
 setModInterruptDel({ ModalActive: true, Delete: false}) }

const ReceiveDelMod = (boolean,yn) => { 
    setModInterruptDel({ModalActive:boolean,Delete:yn})
if (yn === true && Clientdel){
  console.log(Clientdel);
DeletingClient(Clientdel); setFound([]) } }

const DeletingClient = (client) => { 
  setDelEmtOfClient(client)  
        console.log(client);
        fetch(`http://191.252.38.35:8080/api/clientes/${client.id}`,{
        method:"DELETE", })
        .then((response) => {
        if (!response.ok) {
        throw new Error(`Erro ao excluir cliente: ${response.status}`); }
        return response.json(); })
        .then((data) => {
        console.log(data);  })
        .catch((error) => console.log(error));  }

const clickEdit = (client) => {setClientedit(client) ;setModInterruptEdit(true);}   
const clickEmition = (client) => {setClientEmt(client);setModInterruptEMit(true);  }   
const clickViewEmt = (client) => {setClViewEmt(client);setMdIntrruptViewEMt(true);}   

return <div >
<ModalDel ModInterruptDel={ModInterruptDel} ReceiveDelMod={ReceiveDelMod} />
<ModalEdit  ModInterruptEdit={ModInterruptEdit} setModInterruptEdit={setModInterruptEdit} Clientedit={Clientedit} clickSearch={clickSearch} />
<ModInsertEmt ModInterruptEMit={ModInterruptEMit} setModInterruptEMit={setModInterruptEMit} ClientEmt={ClientEmt} Found={Found} setFound={setFound}/>
{ClViewEmt && <ModViewEmit MdIntrruptViewEMt={MdIntrruptViewEMt} setMdIntrruptViewEMt={setMdIntrruptViewEMt} ClViewEmt={ClViewEmt} />}
<EmtDel DelEmtOfClient={DelEmtOfClient} setDelEmtOfClient={setDelEmtOfClient} />
<NavbarLoged/>    
<div className={style.container}>

    <h2>Clientes cadastrados</h2>
    <h3>Busca por cpf ou projeto</h3>
  
{Boxclientemit.length === 0 ?<div>
 <Spinner/><p className={style.Ploading}>Carregando dados...</p></div>:'' }    
<div><input className={style.cpfInput} type='text' onChange={Digiting}  autoFocus value={Changeinp}/>    
<button onClick={clickSearch}>Buscar</button></div> 

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

