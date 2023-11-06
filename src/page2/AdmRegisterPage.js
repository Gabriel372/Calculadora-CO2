import style from './AdmRegisterPage.module.css'
import { useState } from 'react';
// import NavbarLoged from '../page3/Navbar';
// import { v4 as uuidv4 } from 'uuid';
// import LoginPage from '../page1/LoginPage';
import { useNavigate } from "react-router-dom";
import NavbarLoged from '../page3/NavbarLoged';

function AdmRegisterPage() {
const [Name,setName] = useState('')   
const [Email,setEmail] = useState('')   
const [Password,setPassword] = useState('')   
const navigate = useNavigate();
//{state:{admId:admin.id} }


const registerClick = () => {
if (Email && Password && Name) {
// const admin = {email:Email,password:Password,name:Name,id:uuidv4(),allclients:[]} 
const admin = {nome:Name,email:Email,senha:Password}
fetch("http://191.252.38.35:8080/api/administradores/41fa83a7-7841-44fc-9e40-d08a8d5de5a8",{
// fetch("http://localhost:5000/alladmins",{    
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify(admin) } )
.then((response) => { 
if (!response.ok) {
throw new Error(`Erro na solicitação: ${response.statusText}`);
}
return response.json();
})
.then((data) =>  {
// console.log("admin registrado c/ succes!", data);
navigate('/ClientRegisterPage',{ state: { adminId: data.id }}) 
})
.catch((error) => console.log('erro ao registrar admin',error))
//console.log(admRegister); 
setName('') ; setEmail('') ; setPassword('') } 
else {alert('Preencha os formularios') } 
}
    
const changeName = (e) =>{
e.target.value ? setName(e.target.value) : setName('')}
    
const changeEmail = (e) =>{
e.target.value ? setEmail(e.target.value) : setEmail('')}
    
const changePassword = (e) => {
e.target.value ? setPassword(e.target.value) : setPassword('')}

return <div> <NavbarLoged/> 
<div className={style.container}>
    <h2>Registre-se como administrador</h2>
<div className={style.squareLogin}>
{/* <h3>Bem vindo!</h3> */}
<input className={style.input} autoFocus type="text" placeholder='Preencha seu nome completo' onChange={changeName} value={Name}/>
<input className={style.input} type="email" placeholder='Preencha seu email' onChange={changeEmail} value={Email}/>
<input className={style.input} type="password" placeholder='Preencha sua senha' onChange={changePassword} value={Password}/>
<button type='button' onClick={registerClick}>Cadastrar</button>
</div>
</div>
</div>
}

export default AdmRegisterPage
