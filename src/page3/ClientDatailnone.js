// import style from './ClientDetail.module.css'
// import Modal from './Modal';
// // import { useState,useEffect } from 'react'
// // import Modal from './Modal'
// // import NavbarLoged from '../page3/NavbarLoged';
// // import Dropdown from '../page3/Dropdown'
function ClientDetail(props) {

//     const Convert = (any) => { const [year, month, day] = any.split('-');
//     const DateConverted = `${day}/${month}/${year}`; return DateConverted; }
    
//     const clickDelete = (client) => {
//      props.setClientdel(client)   
//      props.setInterruptmod({ ModalActive: true, Delete: false}) }//ativa modal
    
//      const ReceiveModal = (boolean,yn) => { 
//        props.setInterruptmod({ModalActive:boolean,Delete:yn})
//     if (yn === true && props.Clientdel){
//     DeletingClient(props.Clientdel); props.setFound([]) } }//se cliente fo deletado limpa a busca


//     const DeletingClient = (client) => {   
//             console.log(client);
//             fetch(`http://191.252.38.35:8080/api/clientes/${client.id}`,{
//             method:"DELETE", })
//             .then((response) => {
//             if (!response.ok) {
//             throw new Error(`Erro ao excluir cliente: ${response.status}`); }
//             return response.json(); })
//             .then((data) => {
//             console.log(data);
//            /* setFound(prevState => prevState.filter(c => c.id !== Clientdel.id)); */})
//             .catch((error) => console.log(error));  }


const Convert = (any) => { const [year, month, day] = any.split('-');
const DateConverted = `${day}/${month}/${year}`; return DateConverted; }

return <div>
<p>Cpf: {client.cpf}</p><p> Nome: {client.nome}</p><p>Projeto: {client.projeto}</p>
<p>Data de cadastro: {Convert(client.data)}</p>
<p>Email: {client.email}</p>
<p>Endereço: {client.endereco}</p>
<p>Habitantes: {client.habitantes}</p>
<p>Código do cliente/energia: {client.matriculaDeEnergia}</p>
<p>Código do cliente/gás: {client.matriculaDeGas}</p>
<p>Telefone: {client.telefone}</p>
<p>Titular de água cpf: {client.titularAguaCpf}</p>
<p>Titular de energia cpf: {client.titularEnergiaCpf}</p>
<p>Titular de gás cpf: {client.titularGasCpf}</p>
</div>

// return <div >
//  {/* <Modal Interruptmod={Interruptmod} ReceiveModal={ReceiveModal} />   */}
// {props.Found.length > 0 && props.Boxclientemit.length > 0 &&
//   <ul className={style.ul} >
// {props.Found.map(client => (<li key={client.id} className={style.li}> 
// <p>Cpf: {client.cpf}</p><p> Nome: {client.nome}</p><p>Projeto: {client.projeto}</p>
// <p>Data de cadastro: {Convert(client.data)}</p>
// <p>Email: {client.email}</p>
// <p>Endereço: {client.endereco}</p>
// <p>Habitantes: {client.habitantes}</p>
// <p>Código do cliente/energia: {client.matriculaDeEnergia}</p>
// <p>Código do cliente/gás: {client.matriculaDeGas}</p>
// <p>Telefone: {client.telefone}</p>
// <p>Titular de água cpf: {client.titularAguaCpf}</p>
// <p>Titular de energia cpf: {client.titularEnergiaCpf}</p>
// <p>Titular de gás cpf: {client.titularGasCpf}</p>

// <div className={style.divBtn}>
// <button className={style.btnRemove} onClick={ ()=> clickDelete(client)}>Deletar</button>
// {/* <button  className={style.btnInsert} onClick={clickSearch}>Editar</button> */}
// </div>
// </li>))}
// </ul> }
// {/* 
// {Boxclient.length > 0 && Found.length > 0 &&
// <ul className={style.ul} >
// {Found.map(client => (<li key={client.id} className={style.li}> 
// <p>Cpf: {client.cpf}</p><p> Nome: {client.nome}</p><p>Projeto: {client.projeto}</p>
// <p>Data de cadastro: {Convert(client.data)}</p>
// <p>Email: {client.email}</p>
// <p>Endereço: {client.endereco}</p>
// <p>Habitantes: {client.habitantes}</p>
// <p>Código do cliente/energia: {client.matriculaDeEnergia}</p>
// <p>Código do cliente/gás: {client.matriculaDeGas}</p>
// <p>Telefone: {client.telefone}</p>
// <p>Titular de água cpf: {client.titularAguaCpf}</p>
// <p>Titular de energia cpf: {client.titularEnergiaCpf}</p>
// <p>Titular de gás cpf: {client.titularGasCpf}</p>

// <div className={style.divBtn}>
// <button className={style.btnRemove} onClick={ ()=> clickDelete(client)}>Deletar</button>
// <button  className={style.btnInsert} onClick={clickSearch}>Editar</button>
// </div>
// </li>))}
// </ul> 
// // :<p>{Notfound}</p> 
// } */}

// {/* {Found.length > 0 && Boxclient.length > 0 ?} */}








// {/* <hr/> */}
// {/* {Boxclientemit.length > 0 ?
// (<h4>Emissões</h4>
// <p>Ano: {client.emissoes ? client.emissoes.agua.ano : ''}</p>
// <p>Tipo de Emissao: Água</p>
// <p>Mês:{client.emissoes ? client.emissoes.agua.mes : ''}</p>
// <p>Gasto:{client.emissoes ? client.emissoes.agua.gasto : ''}</p>

// <p>Tipo de Emissao: Energia elétrica</p>
// <p>Mês:{client.emissoes ? client.emissoes.energiaeletrica.mes : ''}</p>
// <p>Gasto:{client.emissoes ? client.emissoes.energiaeletrica.gasto : ''}</p>

// <p>Tipo de Emissao: Resíduos</p>
// <p>Mês:{client.emissoes ? client.emissoes.residuos.mes : ''}</p>
// <p>Gasto:{client.emissoes ? client.emissoes.residuos.gasto : ''}</p>)
// : ''
// } */}

// {/* <Modal Interruptmod={Interruptmod} ReceiveModal={ReceiveModal} /> */}

// </div>
}

export default ClientDetail
