import style from './ClientManager.module.css'
import { useState,useEffect } from 'react'
// import { ApiContext } from '../context/ApiContext'
import ModalDel from './ModalDel'
import ModalEdit from './ModalEdit'
import NavbarLoged from '../page3/NavbarLoged';
import ClientDetail from './ClientDetail';
import Spinner from './Spinner';
// import Dropdown from '../page3/Dropdown'
function ClientManager() {
const [Boxclient,setBoxclient] = useState([]) //cx de clientes
const [Boxemition,setBoxemition] = useState([]) 
const [Boxclientemit,setBoxclientemit] = useState([]) 
const [Found,setFound] = useState('') //armazena filtrados
const [Notfound,SetNotfound] = useState('') //armazena filtrados
const [Changeinp,setChangeinp] = useState('') //valor digitado no input
const [ModInterruptDel,setModInterruptDel] = useState({ ModalActive: '', Delete: '' }) //valor digitado no input
const [ModInterruptEdit,setModInterruptEdit] = useState(false) //valor digitado no input
const [Clientdel,setClientdel] = useState('') 
const [Clientedit,setClientedit] = useState('') 

// const { Admincontext } = useContext(ApiContext);
const admStorage = JSON.parse(sessionStorage.getItem('admStorage'))


useEffect(() => {
    fetch('http://191.252.38.35:8080/api/clientes/listar',{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(admStorage) })
    .then((response) => response.json())
    .then((data) => setBoxclient(data) )  //armazenar clientes em box
    .catch((error) => console.log(error))
//EMISSOES
// const AdmJson = {email:"marcos@gmail.com",senha:"1234567",nome:"Marcos Philippe"}

fetch('http://191.252.38.35:8080/api/emissoes/listar',{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify(admStorage) })
.then((response) => response.json())
.then((data) =>  {setBoxemition(data);GroupedClientEmit();} )
.catch((error) => { console.log('erro', error);  });
},[Boxclientemit,Found])

const GroupedClientEmit = () => {
  const grouped = Boxclient.map((client) => {
  const emissoes = Boxemition.filter((emission) => emission.nome === client.nome);
  const groupedEmissoes = emissoes.reduce((acc, curr) => {
  acc[curr.tipoEmissao] = curr;
  return acc;
  }, {});
    return { ...client, emissoes: groupedEmissoes };
  });

  setBoxclientemit(grouped);
};
 
const clickSearch = () => { 
  console.log(Found);

  //   console.log(Admincontext);
  //   console.log('cx de clientes',Boxclient);
    console.log('cx de emissoes',Boxemition);
    console.log('cx de cliente com emissoes',Boxclientemit);

 if (Changeinp) {
  //box client emit
    const cpfFiltred = Boxclientemit.filter((client) => client.cpf === Changeinp);
    // const nameFiltred = Boxclient.filter((client) => client.nome === Changeinp); 
    const projectFiltred = Boxclientemit.filter((client) => client.projeto === Changeinp);  
if (cpfFiltred.length > 0) { setFound([...cpfFiltred]);  }    
// else if (nameFiltred.length > 0 ) { setFound([...nameFiltred]);  }
else if (projectFiltred.length > 0 ) { setFound([...projectFiltred]);  }
else if (Found.length === 0 ) { SetNotfound('Nenhum cliente encontrado');  }
 }  
//  setChangeinp('') 
}

const Digiting = (e) => {setChangeinp(e.target.value); setFound('') ; SetNotfound('') }

const clickDelete = (client) => {
 setClientdel(client)   
 setModInterruptDel({ ModalActive: true, Delete: false}) }//ativa modal

const ReceiveDelMod = (boolean,yn) => { 
    setModInterruptDel({ModalActive:boolean,Delete:yn})
if (yn === true && Clientdel){
  console.log(Clientdel);
DeletingClient(Clientdel); setFound([]) } }//se cliente fo deletado limpa a busca

const DeletingClient = (client) => {   
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

const clickEdit = (client) => {setClientedit(client) ;setModInterruptEdit(true)}   





return <div >
<ModalDel ModInterruptDel={ModInterruptDel} ReceiveDelMod={ReceiveDelMod} />
<ModalEdit  ModInterruptEdit={ModInterruptEdit} setModInterruptEdit={setModInterruptEdit} Clientedit={Clientedit} clickSearch={clickSearch}/>
<NavbarLoged/>    
<div className={style.container}>

    <h2>Clientes cadastrados</h2>
    <h3>Busca por cpf ou projeto</h3>
  
{Boxclientemit.length === 0 ?<div><Spinner/><p className={style.Ploading}>Carregando dados...</p></div>:    
<div><input className={style.cpfInput} type='text' onChange={Digiting}  autoFocus value={Changeinp}/>    
<button onClick={clickSearch}>Buscar</button> </div> }

{Boxclientemit.length > 0 && Found.length > 0 ?
  <ul className={style.ul} >
{Found.map(client => (<li key={client.id} className={style.li}> 
<ClientDetail client={client}/>
<div className={style.divBtn}>

<button className={style.btnRemove} onClick={ ()=> clickDelete(client)}>Deletar</button>
<button  className={style.btnInsert} onClick={()=> clickEdit(client)}>Editar</button>
</div>
</li>))}
</ul>  : <p>{Notfound}</p> }
</div>
</div>
}

export default ClientManager

