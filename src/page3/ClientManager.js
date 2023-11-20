import style from './ClientManager.module.css'
import { useState,useEffect } from 'react'
// import { ApiContext } from '../context/ApiContext'
import ModalDel from './ModalDel'
import ModalEdit from './ModalEdit'
import NavbarLoged from '../page3/NavbarLoged';
import ClientDetail from './ClientDetail';
import Spinner from './Spinner';
import ModInsertEmt from './ModInsertEmt'
import ModViewEmit from './ModViewEmit'
import EmtDel from './EmtDel'

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
const [ModInterruptEMit,setModInterruptEMit] = useState(false) //valor digitado no input
const [Clientdel,setClientdel] = useState('') 
const [Clientedit,setClientedit] = useState('') 
const [ClientEmt,setClientEmt] = useState('') 
const [ClViewEmt,setClViewEmt] = useState('') 
const [MdIntrruptViewEMt,setMdIntrruptViewEMt] = useState(false) 
const [DelEmtOfClient,setDelEmtOfClient] = useState('') 


// const { Admincontext } = useContext(ApiContext);
const admStorage = JSON.parse(sessionStorage.getItem('admStorage'))

const ArtfClient = {
cpf:"22222111111",data: "2023-11-15",email:"simao@hotmail.com",
endereco: "rua y casa 12",habitantes: "4",id: "a75fb131-8914-48e6-ba81-07a37c0dfa69", 
matriculaDeAgua: "11111222222",matriculaDeEnergia: "11111222222",matriculaDeGas: "11111222222",
nome: "simao",projeto: "teste",telefone: "888889999",titularAguaCpf: "11111222222",
titularEnergiaCpf: "11111222222",titularGasCpf: "11111222222",
emissoes:{
  agua:{nome: "simao",id: "a75fb131-8914-48e6-ba81-07a37c0dfa69",consumo:'10',mes:'12',ano:'2023'  },
energiaeletrica:{nome: "simao",id: "a75fb131-8914-48e6-ba81-07a37c0dfa69",consumo:'10',mes:'12',ano:'2023' },
residuos:{nome: "simao",id: "a75fb131-8914-48e6-ba81-07a37c0dfa69",consumo:'10',mes:'12',ano:'2023' }
}
}

useEffect(() => {
//DELETAR 2 EMISSOES
// Boxclientemit.forEach(client => {
// fetch(`http://191.252.38.35:8080/api/emissoes/6a5a21aa-8c3e-4d25-8449-f5b7da67e691`,{
//   method:"DELETE", })
//   .then((response) => {
//   if (!response.ok) {
//   throw new Error(`Erro ao excluir emissao: ${response.status}`); }
//   return response.json(); })
//   .then((data) => {
//   console.log(data);  })
//   .catch((error) => console.log(error)); 
// })

///////////////////////////////////////////////////
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
.then((data) =>  {setBoxemition(data);GroupedClientEmit();  
} )
.catch((error) => { console.log('erro', error);  }); 

},[Boxclientemit,Boxemition])

// const updtClientEmt = () => {}

// const GroupedClientEmit = () => {

//   const grouped = Boxclient.map((client) => {
//   const emissoes = Boxemition.filter((emission) => emission.nome === client.nome);
//   const groupedEmissoes = emissoes.reduce((acc, curr) => {
//   acc[curr.tipoEmissao] = curr;
//   return acc;
//   }, {});
//     return { ...client, emissoes: groupedEmissoes };
//   });

//   setBoxclientemit(grouped);

// };

const GroupedClientEmit = () => {
  const grouped = Boxclient.map((client) => {
    const emissoes = Boxemition.filter((emission) => emission.nome === client.nome);
    const groupedEmissoes = emissoes.reduce((acc, curr) => {
      // Adiciona a propriedade "gasto" à propriedade "emissoes"
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
  // setBoxclientemit(ArtfClient)
  // console.log(Boxclientemit);
// setFound([ArtfClient])

//   console.log(Admincontext);
  //   console.log('cx de clientes',Boxclient);
    console.log('cx de emissoes',Boxemition);
    console.log('cx de cliente com emissoes',Boxclientemit);

 if (Changeinp) {
  //box client emit
    const cpfFiltred = Boxclientemit.filter((client) => client.cpf === Changeinp);
    // const nameFiltred = Boxclient.filter((client) => client.nome === Changeinp); 
    const projectFiltred = Boxclientemit.filter((client) => client.projeto === Changeinp);  
    console.log(projectFiltred);

if (cpfFiltred.length > 0) { setFound([...cpfFiltred]);  }    
// else if (nameFiltred.length > 0 ) { setFound([...nameFiltred]);  }
else if (projectFiltred.length > 0 ) { setFound([...projectFiltred]);}
else if (Found.length === 0 ) { SetNotfound('Nenhum cliente encontrado');  }
 }  
//  setChangeinp('') 
}

const Digiting = (e) => {setChangeinp(e.target.value); setFound('') ; SetNotfound('') }

const clickDelete = (client) => {
  console.log(client);
 setClientdel(client)   
 setModInterruptDel({ ModalActive: true, Delete: false}) }//ativa modal

const ReceiveDelMod = (boolean,yn) => { 
    setModInterruptDel({ModalActive:boolean,Delete:yn})
if (yn === true && Clientdel){
  console.log(Clientdel);
DeletingClient(Clientdel); setFound([]) } }//se cliente fo deletado limpa a busca

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

const clickEdit = (client) => {setClientedit(client) ;setModInterruptEdit(true)}   
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

