import style from './LoginPage.module.css'
import Navbar from './Navbar';
import { useState,useContext,useEffect } from 'react';
import { useNavigate } from "react-router-dom";
// import React, { useContext } from 'react';
import { ApiContext } from '../context/ApiContext'
import Spinner from './Spinner';

function LoginPage() {
const [EmailLog,setEmailLog] = useState('')   
const [PasswordLog,setPasswordLog] = useState('') 
const [Boxadmin,setBoxadmin] = useState([]) 
const navigate = useNavigate();
const { setAdmincontext } = useContext(ApiContext);
const [Interrupterspin,setInterrupterspin] = useState(false) 

// const { Admincontext,setAdmincontext } = useContext(ApiContext);
useEffect(() => {
    const Adm = {email:"marcos@gmail.com",senha:"1234567",nome:"Marcos Philippe"}
    fetch("http://191.252.38.35:8080/api/administradores/listar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body:JSON.stringify(Adm) })
      .then((response) => {if (!response.ok) {throw new Error('Erro na solicitação da API'); }
      return response.json(); })
      .then((data) => {setBoxadmin(data)})
      .catch((error) => {console.error('Falha ao receber administradores:', error);
      }); }, []);

//   usando o JSON de administradores.

// const AdmLogin = { email: "marcos@gmail.com",
// senha: "1234567",
// nome: "Marcos Philippe" }

// "email": "marcos7@gmail.com",
//         "senha": "1234567",
//         "nome": "Marcos Philippe"
//resposta ok do sev > {timestamp: '2023-10-12T19:18:09.982+00:00', status: 400, error: 'Bad Request', path: '/api/clientes/lista'}

const accessClick = () => {
    if (EmailLog && PasswordLog) {
      const AdmLogin = { email: EmailLog, senha: PasswordLog, nome: "a" };
  
      const admisOk = Boxadmin.find(
        (admin) => admin.email === EmailLog && admin.senha === PasswordLog
      );
  
      if (admisOk) {
        setInterrupterspin(true)
        fetch("http://191.252.38.35:8080/api/administradores/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(AdmLogin),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Erro na solicitação: ${response.statusText}`);
            }
            return response.json();
          })
          .then((data) => {
            navigate('/ClientRegisterPage', { state: { admLoged: data } });
          })
          .catch((error) => {
            console.log('Erro de login admin:', error);
            alert('Erro ao fazer login. Verifique seus dados e tente novamente.');
          });
      } else {
        alert('Email ou senha incorretos');
      }
    } else {
      alert('Digite email e senha');
    }
  };
  
const changeEmail = (e) =>{
if (e.target.value) {
setEmailLog(e.target.value) }
else if (e.target.value === ''){setEmailLog('')} }

const changePassword = (e) => {
if (e.target.value) {
setPasswordLog(e.target.value) }
else if (e.target.value === '') { setPasswordLog('')} }

return <div> 
    <Navbar/>
<div className={style.container}>
    
    <h2>Login do administrador</h2>
<div className={style.squareLogin}>
<h3>Bem vindo!</h3>
<input className={style.input} autoFocus type="email" placeholder='Digite seu email' onChange={changeEmail} value={EmailLog}/>
<input className={style.input} type="password" placeholder='Digite sua senha' onChange={changePassword} value={PasswordLog}/>
<button className={style.btnAcces}type='button' onClick={accessClick}>Entrar</button>
{/* <button className={style.btnRegister} type='button' onClick={registerClick}>Criar uma conta</button> */}
</div>
{Interrupterspin && <Spinner/>}
</div>
</div>
}

export default LoginPage 
