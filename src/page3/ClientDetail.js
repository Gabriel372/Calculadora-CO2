// import style from './ClientDetail.module.css'
// import Modal from './Modal';
// // import { useState,useEffect } from 'react'
// // import Modal from './Modal'
// // import NavbarLoged from '../page3/NavbarLoged';
// // import Dropdown from '../page3/Dropdown'
function ClientDetail(props) {
    
    const Convert = (any) => { const [year, month, day] = any.split('-');
    const DateConverted = `${day}/${month}/${year}`; return DateConverted; }
    
    return (<div>
    <p>Cpf: {props.client.cpf}</p><p> Nome: {props.client.nome}</p><p>Projeto: {props.client.projeto}</p>
    <p>Data de cadastro: {Convert(props.client.data)}</p>
    <p>Email: {props.client.email}</p>
    <p>Endereço: {props.client.endereco}</p>
    <p>Habitantes: {props.client.habitantes}</p>
    <p>Código do cliente/energia: {props.client.matriculaDeEnergia}</p>
    <p>Código do cliente/gás: {props.client.matriculaDeGas}</p>
    <p>Telefone: {props.client.telefone}</p>
    <p>Titular de água cpf: {props.client.titularAguaCpf}</p>
    <p>Titular de energia cpf: {props.client.titularEnergiaCpf}</p>
    <p>Titular de gás cpf: {props.client.titularGasCpf}</p>

<div>
    <h4>Emissões</h4>
<p>Ano: {props.client.emissoes.agua.ano}</p>
<p>Tipo de Emissao: Água</p>
<p>Mês:{props.client.emissoes.agua.mes}</p>
<p>Gasto:{props.client.emissoes.agua.consumo}</p>

<p>Tipo de Emissao: Energia elétrica</p>
<p>Mês:{props.client.emissoes.energiaeletrica.mes}</p>
<p>Gasto:{props.client.emissoes.energiaeletrica.consumo}</p>

<p>Tipo de Emissao: Resíduos</p>
<p>Mês:{props.client.emissoes.residuos.mes}</p>
<p>Gasto:{props.client.emissoes.residuos.consumo}</p>
</div>



    </div>)

    }
    
    export default ClientDetail