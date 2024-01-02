import style from './ClientDetail.module.css'

function ClientDetail(props) {

    const Convert = (any) => { const [year, month, day] = any.split('-');
    const DateConverted = `${day}/${month}/${year}`; return DateConverted; }

    return (<div className={style.clientCard}>
     <div className={style.clientInfo}>
    <p>CPF: {props.client.cpf}</p><p> Nome: {props.client.nome}</p><p>Projeto: {props.client.projeto}</p>
    <p>Data de cadastro: {Convert(props.client.data)}</p>
    <p>Email: {props.client.email}</p>
    <p>Endereço: {props.client.endereco}</p>
    <p>Habitantes: {props.client.habitantes}</p>
    <p>Código do cliente/água: {props.client.matriculaDeAgua}</p>
    <p>Código do cliente/energia: {props.client.matriculaDeEnergia}</p>
    <p>Código do cliente/gás: {props.client.matriculaDeGas}</p>
    <p>Telefone: {props.client.telefone}</p>
    <p>Titular de água cpf: {props.client.titularAguaCpf}</p>
    <p>Titular de energia cpf: {props.client.titularEnergiaCpf}</p>
    <p>Titular de gás cpf: {props.client.titularGasCpf}</p>
    </div>   
<div className={style.emition}>
    <h4 className={style.H4ClientDet}>Emissões</h4>
    
<div>

<div>
<h4 className={style.H4ClientDet}>Agua</h4>
<div className={style.dadEachEmit}>
{props.client.emissoes.agua.map(agua => (
<div className={style.divEachEmit} key={agua.id}>
<p className={style.pModText}>Ano: {agua.ano}</p>
<p className={style.pModText}>Mês: {agua.mes}</p>
<p className={style.pModText}>Gasto: {agua.gasto} m³</p>
<p className={style.pModText}>Gerou: {agua.consumo} kg CO² e</p>
{/* <button className={style.btnEditEmWater} onClick={ () => clickEditEmtWater(agua)}>Editar</button> */}
</div>))}
</div> 
</div>


<div>
<h4 className={style.H4ClientDet}>Energia elétrica</h4> 
<div className={style.dadEachEmit}>
{props.client.emissoes.energiaeletrica.map(energiaeletrica => (
<div className={style.divEachEmit} key={energiaeletrica.id}>
<p className={style.pModText}>Ano: {energiaeletrica.ano}</p>
<p className={style.pModText}>Mês: {energiaeletrica.mes}</p>
<p className={style.pModText}>Gasto: {energiaeletrica.gasto} kwh</p>
<p className={style.pModText}>Gerou: {energiaeletrica.consumo} kg CO² e</p>
{/* <button className={style.btnEditEmWater} onClick={ () => clickEditEmtEnergy(energiaeletrica)}>Editar</button> */}
</div>))}
</div> 

</div> 

<div>
<h4 className={style.H4ClientDet}>Resíduos</h4>  
<div className={style.dadEachEmit}>
{props.client.emissoes.residuos.map(residuos => (
<div className={style.divEachEmit} key={residuos.id}>
<p className={style.pModText}>Ano: {residuos.ano}</p>
<p className={style.pModText}>Mês: {residuos.mes}</p>
<p className={style.pModText}>Emitiu: {residuos.gasto} kg</p>
<p className={style.pModText}>Gerou: {residuos.consumo} kg CO² e</p>
{/* <button className={style.btnEditEmWater} onClick={ () => clickEdtEmtResd(residuos)}>Editar</button> */}
</div>))}
</div> 

</div> 

</div>

 </div> 

</div> )

    }
    
    export default ClientDetail