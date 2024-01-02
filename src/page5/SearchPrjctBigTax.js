import NavbarLoged from '../page3/NavbarLoged'
import style from './SearchPrjctBigTax.module.css'
import { useState,useEffect } from 'react'
import GeneratePdf from './GeneratePdf'

function SearchPrjctBigTax() {
const [Boxclient,setBoxclient] = useState([])
const [BoxClEmpty,setBoxClEmpty] = useState(false) 
const [Project,setProject] = useState('') 
const admStorage = JSON.parse(sessionStorage.getItem('admStorage'))
const [Month1,setMonth1] = useState('')
const [Month2,setMonth2] = useState('')
const [Year1,setYear1] = useState('')
const [Year2,setYear2] = useState('')
// "consumoMensal/maiorTaxaDeReducaoPorProjeto", usa-se nesta ordem 
// "email", "senha", "ano1", "mes1", "ano2", "mes2" como parâmetro da requisição, 
// e recebe o projeto no corpo da requisição. Usa-se o método "POST".
//  O endpoint retorna os clientes com a maior taxa de redução total e benefício total no período e no projeto especificado.


const clickSearch = () => { 
if (Year1 && Year2 && Month1 && Month2 && Project) {
fetch(`http://191.252.38.35:8080/api/consumoMensal/maiorTaxaDeReducaoPorProjeto?email=${admStorage.email}&senha=${admStorage.senha}&ano1=${Year1}&mes1=${Month1}&ano2=${Year2}&mes2=${Month2}`,{
    method:"POST",
     headers:{"Content-Type":"application/json"},
     body:JSON.stringify(Project) })
     .then((response) => response.json())
     .then((data) => {
    if(data.length === 0){setBoxclient([]) ; setBoxClEmpty(true) ;console.log('cx de relatorio vazia',data);}
     else {console.log('relatorio recebido', data);setBoxClEmpty(false)
     setBoxclient(data);}}  )
     .catch((error) => { console.log('erro', error); setBoxclient([]) ; setBoxClEmpty(true) }); 
}  
else {setBoxClEmpty(false) ;setTimeout(() => {alert('Preencha o formulário')  },50)   }

}


const changeSelYear1 = (e) => { setYear1(e.target.value) ;}
const changeSelYear2 = (e) => { setYear2(e.target.value) ;}
const changeSelMonth1 = (e) => { setMonth1(e.target.value) ;}
const changeSelMonth2 = (e) => { setMonth2(e.target.value) ;}
const changeProjct = (e) => {setProject(e.target.value)}

const Convert = (any) => { const [year, month, day] = any.split('-');
const DateConverted = `${day}/${month}/${year}`; return DateConverted; }


return <div>
<NavbarLoged/> 
<div className={style.container}>

<div className={style.divTitleAllPrjct}>
    <h2 className={style.titH2}>Filtro por projeto a taxa de redução de consumo</h2>
    {Boxclient.length > 0 && <GeneratePdf />}
    </div>

<div className={style.divInpSrchPrtcj}>

<div className={style.divInpChild}>

<p className={style.pSelSrchPrjct}>Selecione o ano inicial:
<select className={style.selEmYear} onChange={changeSelYear1}  value={Year1}>
<option value=''></option>
  {Array.from({ length: 31 }, (_, i) => i + 2023).map(num => (
    <option className={style.selEmYear}  key={num} value={num}>{num}</option>
  ))}
</select>
</p>

<p className={style.pSelSrchPrjct}>Selecione o mês inicial:
<select className={style.selEmMonth} onChange={changeSelMonth1} value={Month1}>
<option value=''></option>
  {['1', '2', '3', '4', '5', '6', '7', '8', '9',
   '10', '11', '12'].map((mes, index) => (
    <option key={index} value={index + 1}>{mes}</option>
  ))}
</select>
</p>

</div>


<div className={style.divInpChild}>

<p className={style.pSelSrchPrjct}>Selecione o ano final:
<select className={style.selEmYear} onChange={changeSelYear2}  value={Year2}>
<option value=''></option>
  {Array.from({ length: 31 }, (_, i) => i + 2023).map(num => (
    <option className={style.selEmYear}  key={num} value={num}>{num}</option>
  ))}
</select>
</p>

<p className={style.pSelSrchPrjct}>Selecione o mês final:
<select className={style.selEmMonth} onChange={changeSelMonth2} value={Month2}>
<option value=''></option>
  {['1', '2', '3', '4', '5', '6', '7', '8', '9',
   '10', '11', '12'].map((mes, index) => (
    <option key={index} value={index + 1}>{mes}</option>
  ))}
</select>
</p>

</div>

</div>   

    <input className={style.cpfInput} type='text' onChange={changeProjct}  autoFocus value={Project} placeholder='Digite o projeto'/>    
<button onClick={clickSearch}>Buscar</button>

{BoxClEmpty && <p>Nenhum cliente encontrado</p>}


{/* {Boxclient.length > 0 && <h3>Projeto: {SelProject}</h3>} */}

{Boxclient.length > 0 &&
  <ul className={style.ul} >
{Boxclient.map(client => (<li key={client.id} className={style.li}> 
    <p>Taxa de redução: {Number(client.taxaDeReducao).toFixed(2)} %</p>
    <p>CPF: {client.cpf}</p>
    <p> Nome: {client.nome}</p>
    <p>Projeto: {client.projeto}</p>
    <p>Data de cadastro: {Convert(client.data)}</p>
    <p>Email: {client.email}</p>
    <p>Endereço: {client.endereco}</p>
    <p>Habitantes: {client.habitantes}</p>
    <p>Telefone: {client.telefone}</p>

    {/* <p>Código do cliente/água: {client.matriculaDeAgua}</p>
    <p>Código do cliente/energia: {client.matriculaDeEnergia}</p>
    <p>Código do cliente/gás: {client.matriculaDeGas}</p>
    <p>Titular de água cpf: {client.titularAguaCpf}</p>
    <p>Titular de energia cpf: {client.titularEnergiaCpf}</p>
    <p>Titular de gás cpf: {client.titularGasCpf}</p> */}
</li>))}
</ul> }



</div>
</div> 
}

export default SearchPrjctBigTax
