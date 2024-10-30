import { useParams } from "react-router-dom";
import { IUserInfo } from "../../interfaces/user";
import { useEffect, useState } from "react";
import "./index.css";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { fetchUser } from "../../services/user/fetch-user";
import { saveUser } from "../../services/user/save-user";
import { toast } from 'react-toastify';

export default function ManageUser() {
    // TODO: Editar, remover, visualizar detalhes ao clicar
    // em um usuário específico (em uma página só é possível fazer tudo isso)
    // ADNAN TELA

    const { id } = useParams<{ id: string }>();
    const [userInfo, setUserInfo] = useState<IUserInfo | undefined>(undefined);
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    useEffect(() => {
        fetchUser(Number(id)).then((data) => {
            setUserInfo(data);
        });
    }, []);

    if (!userInfo) {
        return (
            <div className="flex full-size bg-green column">
                <h1>Usuário não encontrado</h1>
            </div>
        );
    }

    function submitForm(e: any) {
        e.preventDefault();

        if (!userInfo) {
            toast.error("Usuário não encontrado");
            return;
        }

        if (newPassword !== "" && newPassword !== confirmPassword) {
            toast.error("As senhas não coincidem");
            return;
        }

        saveUser(userInfo);
        toast.success("Usuário salvo com sucesso!");
    }

    return (
        <div className="flex full-size column bg-green">
            <h1>Editar perfil</h1>
            <h2 className="margin-bottom">
                Administre aqui as informações de usuário dos funcionários
            </h2>
            <form action="" className="snow-white">
                <Input
                    value={userInfo.name}
                    label={"Nome"}
                    onChange={(e: any) =>
                        setUserInfo({ ...userInfo, name: e.target.value })
                    }
                />
                <Input
                    value={userInfo.email}
                    label={"Email"}
                    onChange={(e: any) =>
                        setUserInfo({ ...userInfo, email: e.target.value })
                    }
                />
                <Input
                    value={userInfo.CPF}
                    label={"CPF"}
                    onChange={(e: any) =>
                        setUserInfo({ ...userInfo, CPF: e.target.value })
                    }
                />
                <Input
                    value={userInfo.role}
                    label={"Cargo"}
                    onChange={(e: any) =>
                        setUserInfo({ ...userInfo, role: e.target.value })
                    }
                />
                <Input
                    value={newPassword}
                    label={"Modificar senha"}
                    placeholder="Digite a nova senha"
                    type="password"
                    onChange={(e: any) => setNewPassword(e.target.value)}
                />
                <Input
                    value={confirmPassword}
                    label={"Confirme a senha"}
                    placeholder="Confirme a nova senha"
                    type="password"
                    onChange={(e: any) => setConfirmPassword(e.target.value)}
                    className="mb-15"
                />
                <Button type="submit" onClick={submitForm}>
                    Salvar
                </Button>
            </form>
        </div>
    );
}
