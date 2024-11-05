import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./index.css";
export default function ForgotPassword() {
    const navigation = useNavigate();

    let [email, setEmail] = useState({ value: "", dirty: false });
    let [password, setPassword] = useState({ value: "", dirty: false });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const handleErrorEmail = () => {
        if (!email.value && email.dirty) {
            return <label className="error">Campo obrigatório</label>;
        } else if (!emailRegex.test(email.value) && email.dirty) {
            return <label className="error">Email inválido</label>;
        } else {
            return <label className="error"></label>;
        }
    };

    const handleErrorSend = (e: any) => {
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
            navigation("home");
        }
    };

    return (
        <div id="loginContainer">
            <form>
                <h3>Esqueceu sua senha?</h3>
                <p>Preencha com seus dados:</p>
                <label htmlFor="Email">Insira aqui o seu e-mail:</label>
                <input
                    value={email.value}
                    onChange={(event) =>
                        setEmail({ value: event.target.value, dirty: true })
                    }
                    name="Email"
                    id="Email"
                />
                {handleErrorEmail()}

                <a onClick={() => navigation("/forgot-password")}>
                    Lembrou sua senha?
                </a>

                <button onClick={(e) => handleErrorSend(e)}>Enviar e-mail de recuperação</button>
            </form>
        </div>
    );
}
