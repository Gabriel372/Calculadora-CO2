import style from './SearchPrjctClntMnth.module.css'
import { useState,useEffect } from 'react'
import NavbarLoged from '../page3/NavbarLoged'
import GeneratePdf from './GeneratePdf'
import ClientDetail from '../page3/ClientDetail'

function SearchPrjctClntMnth() {
const [BoxAllClient,setBoxAllClient] = useState([]) 
const [BoxAllEmition,setBoxAllEmition] = useState([]) 
const [Boxclient,setBoxclient] = useState([]) 
const [BoxClientRegistData,setBoxClientRegistData] = useState([]) 
const [BoxClientJsx,setBoxClientJsx] = useState([]) 
const [BoxClEmpty,setBoxClEmpty] = useState(false)
const [Project,setProject] = useState('')
const admStorage = JSON.parse(sessionStorage.getItem('admStorage'))
const [Month,setMonth] = useState('')
const [Year,setYear] = useState('')

useEffect(() => {
GetListAllClient();GetAllEmition();
},[BoxClientRegistData] )

function clickSearch() { 
   if (Project && Month && Year) {setBoxClientJsx([]);  GetListForProjectMonthYear(); }  
   else {setBoxClEmpty(false) ;setTimeout(() => {alert('Preencha o formulário')  },50)  } }

   function GetListForProjectMonthYear() {
    fetch(`http://191.252.38.35:8080/api/consumoMensal/listarPorProjetoEMesEAno?email=${admStorage.email}&senha=${admStorage.senha}&ano=${Year}&mes=${Month}`,{
   method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(Project) })
    .then((response) => response.json())
    .then((data) => {
  if (data.length > 0) {setBoxClEmpty(false); setBoxclient(data);FilterClient() }
  else { setBoxclient([]) ; setBoxClEmpty(true) ;}
  })
    .catch((error) => { console.log('erro', error);  });  }

    function FilterClient() {
      let BoxclientFiltred = BoxAllClient.filter((allClient) => {
      return  Boxclient.find((client) =>
         client.cpf === allClient.cpf && client.nome === allClient.nome ); });
     setBoxClientRegistData(BoxclientFiltred);GroupedClientEmit()  }

   function GroupedClientEmit() {
    let grouped = BoxClientRegistData.map((client) => {
      let emissoes = BoxAllEmition.filter((emission) => emission.nome === client.nome && emission.cpf === client.cpf);
      let groupedEmissoes = emissoes.reduce((acc, curr) => {
        if (!acc[curr.tipoEmissao]) {
          acc[curr.tipoEmissao] = [];
        }
        acc[curr.tipoEmissao].push({ ...curr, gasto: curr.gasto });
        return acc;
      }, {});
  
      ['agua', 'energiaeletrica', 'residuos'].forEach((tipoEmissao) => {
        if (groupedEmissoes[tipoEmissao]) {
          groupedEmissoes[tipoEmissao].sort((a, b) => {
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
    setBoxClientJsx(grouped);
  }

   function GetListAllClient() {
  fetch('http://191.252.38.35:8080/api/clientes/listar',{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(admStorage) })
    .then((response) => response.json())
    .then((data) => {setBoxAllClient(data);FilterClient() })  
    .catch((error) => console.log(error)) }

    function GetAllEmition() {
    fetch('http://191.252.38.35:8080/api/emissoes/listar',{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(admStorage) })
      .then((response) => response.json())
      .then((data) =>  {setBoxAllEmition(data);  GroupedClientEmit();
      } )
      .catch((error) => { console.log('erro', error);  }); }

function ChangeSearch(e) {setProject(e.target.value) }
function changeSelYear(e) { setYear(e.target.value) ; }
function changeSelMonth(e) { setMonth(e.target.value) ;}

return <div>
<NavbarLoged/> 
<div className={style.container}>

<div className={style.divTitleAllPrjct}>
    <h2 className={style.H2SearchPCM}>Filtro por projeto clientes cadastrados no mês</h2>
    {Boxclient.length > 0 && <GeneratePdf />}
    </div>

<div className={style.divInpSrchPrtcj}>

<p className={style.pSelSrchPrjct}>Selecione o ano:
<select className={style.SelProjctClientMonth} onChange={changeSelYear} placeholder='selecioneee' value={Year}>
<option value=''></option>
  {Array.from({ length: 31 }, (_, i) => i + 2023).map(num => (
    <option className={style.selEmYear}  key={num} value={num}>{num}</option>
  ))}
</select>
</p>

<p className={style.pSelSrchPrjct}>Selecione o mês:
<select className={style.SelProjctClientMonth} onChange={changeSelMonth} value={Month}>
<option value=''></option>
  {['1', '2', '3', '4', '5', '6', '7', '8', '9',
   '10', '11', '12'].map((mes, index) => (
    <option key={index} value={index + 1}>{mes}</option>
  ))}
</select>
</p>

<input className={style.inpDigPrjct} type='text' onChange={ChangeSearch}  autoFocus value={Project} placeholder='Digite o projeto'/>    
</div>

<button  className={style.btnPrjctMon} onClick={clickSearch}>Buscar</button>  

{BoxClEmpty && <p>Nenhum cliente encontrado</p>}

{BoxClientJsx.length > 0 &&
  <ul className={style.ul} >
{BoxClientJsx.map(client => (<li key={client.id} className={style.li}> 
  <ClientDetail client={client}/>
</li>))}
</ul> }

</div>
</div>
}

export default SearchPrjctClntMnth