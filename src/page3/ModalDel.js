import style from './ModalDel.module.css'
import { useState,useEffect } from 'react'

function ModalDel(props) {
const [Show,setShow] = useState(false) 
const admStorage = JSON.parse(sessionStorage.getItem('admStorage'))

useEffect(() => { setShow(props.ModInterruptDel) },[props.ModInterruptDel,props.Clientdel] )


function AllEmitionsDelete() { 
fetch(`http://191.252.38.35:8080/api/emissoes/deletarPorCpf?email=${admStorage.email}&senha=${admStorage.senha}`,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify(props.Clientdel.cpf) } )
.then((response) => { 
if (!response.ok) {
throw new Error(`Erro na solicitação: ${response.statusText}`); }
return response.json(); })
.then(() =>  { AllConsMonthDelete() })
.catch((error) => {AllConsMonthDelete() ; console.log(error) } ) }  

function AllConsMonthDelete() { 
  fetch(`http://191.252.38.35:8080/api/consumoMensal/deletarPorCpf?email=${admStorage.email}&senha=${admStorage.senha}`,{
  method:"POST",
  headers:{"Content-Type":"application/json"},
  body:JSON.stringify(props.Clientdel.cpf) } )
  .then((response) => { 
  if (!response.ok) {
  throw new Error(`Erro na solicitação: ${response.statusText}`); }
  return response.json(); })
  .then(() =>  { ClientDelete() })
  .catch((error) => {ClientDelete() ;console.log(error) })  }  

  function ClientDelete() { 
  fetch(`http://191.252.38.35:8080/api/clientes/${props.Clientdel.id}`,{
 method:"DELETE", })
  .then((response) => {
  if (!response.ok) {
  throw new Error(`Erro ao excluir cliente: ${response.status}`); }
  console.log(response);props.setClientdel({});props.setFound([]); props.setModInterruptDel(false);
 return response.json(); })
  // .then((data) => {console.log(data);  })
  .catch((error) => console.log(error));  }

return <div className={`${props.ModInterruptDel ? style.modalOn : style.modalOff}`}>
 <div className={style.squareDel}> 
 <h4 className={style.h4ModDel}>Deseja deletar esse cliente ?</h4>   
 <button  className={style.btnNot} onClick={()=>{props.setModInterruptDel(false)}}>Não</button>
 <button  className={style.btnYes} onClick={()=>{AllEmitionsDelete()}}>Sim</button>
 </div>  
</div>

}

export default ModalDel
