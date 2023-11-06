import style from './ClientManager.module.css'
import { useState,useEffect,useContext } from 'react'
import { ApiContext } from '../context/ApiContext'
import Modal from './Modal'
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
const [Interruptmod,setInterruptmod] = useState({ ModalActive: '', Delete: '' }) //valor digitado no input
const [Clientdel,setClientdel] = useState('') 
const { Admincontext } = useContext(ApiContext);



useEffect(() => {

    const AdmTeste = {email:"marcos@gmail.com",senha:"1234567",nome:"Marcos Philippe"}
    fetch('http://191.252.38.35:8080/api/clientes/listar',{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(AdmTeste) })
    .then((response) => response.json())
    .then((data) => setBoxclient(data) )  //armazenar clientes em box
    .catch((error) => console.log(error))
//EMISSOES
// const AdmJson = {email:"marcos@gmail.com",senha:"1234567",nome:"Marcos Philippe"}


fetch('http://191.252.38.35:8080/api/emissoes/listar',{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify(AdmTeste) })
.then((response) => response.json())
.then((data) =>  {setBoxemition(data);GroupedClientEmit();} )
.catch((error) => { console.log('erro', error);  });


},[Boxclientemit])

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



//DELETAREMISSOES

// Boxemition.forEach((emission) => {
// fetch(`http://191.252.38.35:8080/api/emissoes/${emission.id}`,{
// method:"DELETE",
// headers:{"Content-Type":"application/json"},
// body:JSON.stringify(AdmJson) })
// .then((response) => response.json())
// .then((data) => {setBoxemition(data.content); 

// })
// .catch((error) => { console.log('erro', error);  });})
// console.log(Boxemition);
// console.log(Boxclientemit);










// useEffect(() => {
//   const fetchData = async () => {
//     const AdmTeste = {email:"marcos@gmail.com",senha:"1234567",nome:"Marcos Philippe"}
//     fetch('http://191.252.38.35:8080/api/clientes/lista',{
//     method:"POST",
//     headers:{"Content-Type":"application/json"},
//     body:JSON.stringify(AdmTeste) })
//     .then((response) => response.json())
//     .then((data) => setBoxclient(data) )  //armazenar clientes em box
//     .catch((error) => console.log(error))
// //EMISSOES
// const AdmJson = {email:"marcos@gmail.com",senha:"1234567",nome:"Marcos Philippe"}
// fetch('http://191.252.38.35:8080/api/emissoes/lista',{
// method:"POST",
// headers:{"Content-Type":"application/json"},
// body:JSON.stringify(AdmJson) })
// .then((response) => response.json())
// .then((data) => {setBoxemition(data); })
// .catch((error) => { console.log('erro', error);  });
// // console.log(Boxemition);
// GroupedClientEmit()
//   };

//   fetchData();
// }, []);

    
const clickSearch = () => { 
  console.log(Found);
    console.log(Admincontext);
    console.log('cx de clientes',Boxclient);
    console.log('cx de emissoes',Boxemition);
    console.log('cx de cliente com emissoes',Boxclientemit);

 if (Changeinp) {
  //box client emit
    const cpfFiltred = Boxclientemit.filter((client) => client.cpf === Changeinp);
    // const nameFiltred = Boxclient.filter((client) => client.nome === Changeinp); 
    const projectFiltred = Boxclientemit.filter((client) => client.projeto === Changeinp); 
      //box client 
      // const cpfFiltred2 = Boxclient.filter((client) => client.cpf === Changeinp);
      // // const nameFiltred = Boxclient.filter((client) => client.nome === Changeinp); 
      // const projectFiltred2 = Boxclient.filter((client) => client.projeto === Changeinp); 
if (cpfFiltred.length > 0) { setFound([...cpfFiltred]);  }    
// else if (nameFiltred.length > 0 ) { setFound([...nameFiltred]);  }
else if (projectFiltred.length > 0 ) { setFound([...projectFiltred]);  }
// if (cpfFiltred2.length > 0) { setFound([...cpfFiltred2]);  }    
// else if (nameFiltred.length > 0 ) { setFound([...nameFiltred]);  }
// else if (projectFiltred2.length > 0 ) { setFound([...projectFiltred2]);  }
else if (Found.length === 0 ) { SetNotfound('Nenhum cliente encontrado');  }
 }  
//  setChangeinp('') 
 console.log(Found);
}

const Digiting = (e) => {setChangeinp(e.target.value); setFound('') ; SetNotfound('') }
// const Convert = (any) => { const [year, month, day] = any.split('-');
// const DateConverted = `${day}/${month}/${year}`; return DateConverted; }
const clickDelete = (client) => {

  console.log(client);
 setClientdel(client)   
 setInterruptmod({ ModalActive: true, Delete: false}) }//ativa modal

const ReceiveModal = (boolean,yn) => { 
    setInterruptmod({ModalActive:boolean,Delete:yn})
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
        console.log(data);
        // console.log(client);
        // setBoxclient(prevClients => prevClients.filter(cl => cl.id !== client.id));
        // setBoxclientemit(prevClients => prevClients.filter(cl => cl.id !== client.id));
        // setFound(prevClients => prevClients.filter(cl => cl.id !== client.id));


       /* setFound(prevState => prevState.filter(c => c.id !== Clientdel.id)); */})
        .catch((error) => console.log(error));  }
//EMISSOES
//AJUNTAR CADA EMISSAO A CADA CLIENTE




  // const GroupedClientEmit = () => {
  //   const grouped = Boxclient.map((client) => {
  //     const emissoes = Boxemition.filter((emission) => emission.nome === client.nome);
  //     const groupedEmissoes = emissoes.reduce((acc, curr) => {
  //       acc[curr.tipoEmissao] = { ...curr };
  //       delete acc[curr.tipoEmissao].nome; // Remova a propriedade nome, se necessário
  //       return acc;
  //     }, {});
  //     return { ...client, emissoes: groupedEmissoes };
  //   });
  
  //   setBoxclientemit(grouped);
  // };




return <div >
<Modal Interruptmod={Interruptmod} ReceiveModal={ReceiveModal} />
<NavbarLoged/>    
<div className={style.container}>

    <h2>Clientes cadastrados</h2>
    <h3>Busca por cpf ou projeto</h3>
  
{Boxclientemit.length === 0 ?<div><Spinner/><p className={style.Ploading}>Carregando dados...</p></div>:    
<div><input className={style.cpfInput} type='text' onChange={Digiting}  autoFocus value={Changeinp}/>    
<button onClick={clickSearch}>Buscar</button> </div> }

{/* {Boxclientemit.length === 0 ? <p>carregando dados...</p> : '' } */}


{/* <ClientShow Found={Found} Boxclient={Boxclient} Interruptmod={Interruptmod} Modal={Modal}/> */}

{Boxclientemit.length > 0 && Found.length > 0 ?
  <ul className={style.ul} >
{Found.map(client => (<li key={client.id} className={style.li}> 
<ClientDetail client={client}/>
<div className={style.divBtn}>

<button className={style.btnRemove} onClick={ ()=> clickDelete(client)}>Deletar</button>
<button  className={style.btnInsert} onClick={clickSearch}>Editar</button>
</div>
</li>))}
</ul>  : <p>{Notfound}</p> }

{/* {Boxclient.length > 0 && Found.length > 0 &&
<ul className={style.ul} >
{Found.map(client => (<li key={client.id} className={style.li}> 
<ClientDetail client={client}/>

<div className={style.divBtn}>
<button className={style.btnRemove} onClick={ ()=> clickDelete(client)}>Deletar</button>
<button  className={style.btnInsert} onClick={clickSearch}>Editar</button>
</div>
</li>))}
</ul> 
// :<p>{Notfound}</p> 
} */}
</div>
{/* {Found.length > 0 && Boxclient.length > 0 ?} */}

{/* <hr/> */}
{/* {Boxclientemit.length > 0 ?
(<h4>Emissões</h4>
<p>Ano: {client.emissoes ? client.emissoes.agua.ano : ''}</p>
<p>Tipo de Emissao: Água</p>
<p>Mês:{client.emissoes ? client.emissoes.agua.mes : ''}</p>
<p>Gasto:{client.emissoes ? client.emissoes.agua.gasto : ''}</p>

<p>Tipo de Emissao: Energia elétrica</p>
<p>Mês:{client.emissoes ? client.emissoes.energiaeletrica.mes : ''}</p>
<p>Gasto:{client.emissoes ? client.emissoes.energiaeletrica.gasto : ''}</p>

<p>Tipo de Emissao: Resíduos</p>
<p>Mês:{client.emissoes ? client.emissoes.residuos.mes : ''}</p>
<p>Gasto:{client.emissoes ? client.emissoes.residuos.gasto : ''}</p>)
: ''
} */}
</div>
}

export default ClientManager

