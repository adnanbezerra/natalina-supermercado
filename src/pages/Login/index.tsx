import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Login.css";
import { loginUser } from "../../services/user/auth-user.ts"; 

export default function Login() {
    const navigate = useNavigate(); 
    const [email, setEmail] = useState({ value: "", dirty: false });
    const [password, setPassword] = useState({ value: "", dirty: false });
    const [errorMessage, setErrorMessage] = useState(""); 

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleErrorEmail = () => {
        if (!email.value && email.dirty) {
            return <label className="error">Campo obrigatório</label>;
        } else if (!emailRegex.test(email.value) && email.dirty) {
            return <label className="error">Email inválido</label>;
        } else {
            return null;
        }
    };

    const handleErrorPassword = () => {
        if (!password.value && password.dirty) {
            return <label className="error">Campo obrigatório</label>;
        } else {
            return null;
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault(); 
        
        let hasError = false;
        if (!email.value || !emailRegex.test(email.value)) {
            setEmail({ value: email.value, dirty: true });
            hasError = true;
        }

        if (!password.value) {
            setPassword({ value: password.value, dirty: true });
            hasError = true;
        }

        if (!hasError) {
            try {
                const response = await loginUser(email.value, password.value);

                if (response?.token) {                    
                    localStorage.setItem("token", response.token);

                    navigate("/products"); 
                } else {
                    setErrorMessage(response.message || "Erro desconhecido");
                }
            } catch (error) {
                setErrorMessage("Erro ao fazer login. Tente novamente.");
            }
        }
    };

    return (
        <div id="loginContainer">
            <form onSubmit={handleSubmit}> {/* Alterado para 'onSubmit' */}
                <h3>Login</h3>
                <p>Preencha com seus dados:</p>
                <label htmlFor="Email">Email:</label>
                <input
                    type="email"
                    value={email.value}
                    onChange={(event) =>
                        setEmail({ value: event.target.value, dirty: true })
                    }
                    name="Email"
                    id="Email"
                />
                {handleErrorEmail()}

                <label htmlFor="Senha">Senha:</label>
                <input
                    type="password"
                    value={password.value}
                    onChange={(event) =>
                        setPassword({ value: event.target.value, dirty: true })
                    }
                    name="Senha"
                    id="Senha"
                />
                {handleErrorPassword()}

                <a onClick={() => navigate('/forgot-password')}>Esqueceu sua senha?</a>

                {/* Exibindo erro se houver */}
                {errorMessage && <div className="error-message">{errorMessage}</div>}

                <button type="submit">Acessar</button> {/* Alterado para 'type="submit"' */}
            </form>
        </div>
    );
}
