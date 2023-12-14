import style from './AdmRegisterPage.module.css'
import { useState } from 'react';
import NavbarLoged from '../page3/NavbarLoged';

function AdmRegisterPage() {
const [Name,setName] = useState('')   
const [Email,setEmail] = useState('')   
const [Password,setPassword] = useState('')   
const [InterruptMsg,setInterruptMsg] = useState(false)
const admStorage = JSON.parse(sessionStorage.getItem('admStorage'))

const registerClick = () => {
if (Email && Password && Name) {
const admin = {nome:Name,email:Email,senha:Password}
fetch(`http://191.252.38.35:8080/api/administradores/salvar?email=${admStorage.email}&senha=${admStorage.senha}`,{
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
setInterruptMsg(true);setTimeout(() => setInterruptMsg(false), 10000);
console.log('adm cadastrado',data);
})
.catch((error) => console.log('erro ao registrar admin',error))
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
    <h2>Cadastro do administrador</h2>
<div className={style.squareLogin}>
<input className={style.input} autoFocus type="text" placeholder='Preencha seu nome completo' onChange={changeName} value={Name}/>
<input className={style.input} type="email" placeholder='Preencha seu email' onChange={changeEmail} value={Email}/>
<input className={style.input} type="password" placeholder='Preencha sua senha' onChange={changePassword} value={Password}/>
<button type='button' onClick={registerClick}>Cadastrar</button>
<p className={InterruptMsg ? style.msgVisible : style.msgHidden}>Administrador cadastrado com successo !</p>
</div>
</div>
</div>
}

export default AdmRegisterPage
