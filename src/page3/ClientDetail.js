import style from './ClientDetail.module.css'

function ClientDetail(props) {

    const Convert = (any) => { const [year, month, day] = any.split('-');
    const DateConverted = `${day}/${month}/${year}`; return DateConverted; }

    return (<div className={style.clientCard}>
     <div>
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
    </div>   
<div className={style.emition}>
    <h4>Emissões</h4>
<div>
 {props.client.emissoes !== '' ? 
 <div>
<p>Ano: {props.client.emissoes.agua[props.client.emissoes.agua.length-1].ano}</p>
<p>Tipo de Emissao: Água</p>
<p>Mês: {props.client.emissoes.agua[props.client.emissoes.agua.length-1].mes}</p>
<p>Gasto: {props.client.emissoes.agua[props.client.emissoes.agua.length-1].gasto} m³</p>
<p className={style.pMbCliDet}>Gerou: {props.client.emissoes.agua[props.client.emissoes.agua.length-1].consumo} kg CO² e</p>

<p>Tipo de Emissao: Energia elétrica</p>
<p>Mês: {props.client.emissoes.energiaeletrica[props.client.emissoes.energiaeletrica.length-1].mes}</p>
<p>Gasto: {props.client.emissoes.energiaeletrica[props.client.emissoes.energiaeletrica.length-1].gasto} kwh</p>
<p className={style.pMbCliDet}>Gerou: {props.client.emissoes.energiaeletrica[props.client.emissoes.energiaeletrica.length-1].consumo} kg CO² e</p>

<p>Tipo de Emissao: Resíduos</p>
<p>Mês: {props.client.emissoes.residuos[props.client.emissoes.residuos.length-1].mes}</p>
<p>Emitiu: {props.client.emissoes.residuos[props.client.emissoes.residuos.length-1].gasto} kg</p>
<p>Gerou: {props.client.emissoes.residuos[props.client.emissoes.residuos.length-1].consumo} kg CO² e</p>
</div>
: '' }
 </div> 

 </div> 

</div> )

    }
    
    export default ClientDetail