
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Login.css';
export default function Login() {
const navigation = useNavigate()
let [email, setEmail] = useState({value:'', dirty:false});
let [password, setPassword] = useState({value:'', dirty:false});
const handleErrorEmail = () =>{
  if(!email.value && email.dirty ){
    return (<label className= 'error'>Campo obrigatório</label>)

  }
}

const handleErrorPassword = () =>{ if(!password.value && password.dirty ){
  return (<label className = 'error'>Campo obrigatório</label>)

}
}

    return (
    
      <div id="loginContainer">
      <form>
        <h3>Login</h3>
        <p>Preencha com seus dados:</p>
        <label htmlFor="Email">Email:</label>
        <input value = {email.value} onChange = {(event) => setEmail ({value: event.target.value, dirty:true})}name="Email" id="Email" />
        {handleErrorEmail()}


        <label htmlFor="Senha">Senha:</label>
        <input  value = {password.value} onChange = {(event) => setPassword({value: event.target.value, dirty:true})} name="Senha" id="Senha" />
        {handleErrorPassword()}
       
        <a href="#">Esqueceu sua senha?
      
        </a>

        <button onClick={() => navigation('home')}>Acessar</button>
      </form>
    </div>

    
    );
}
