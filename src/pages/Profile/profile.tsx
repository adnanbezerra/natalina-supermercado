import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./profile.css";

interface User {
    id: string;
    email: string;
    nome: string;
    cpf: string;
    profileImage: string;
}

const Profile: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [user, setUser] = useState<User>({
        id: "1",
        email: "brunorafael@unifacisa.com",
        nome: "Bruno Rafael",
        cpf: "123.456.789-00",
        profileImage: "",
    });

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (typeof e.target?.result === "string") {
                    setUser({ ...user, profileImage: e.target.result });
                }
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, email: event.target.value });
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, nome: event.target.value });
    };

    const handleCPFChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, cpf: event.target.value });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        toast.success("Atualizado com sucesso!");
    };

    return (
        <div className="profile-wrapper">
            <div className="profile-container">
                <h1>Editar Perfil</h1>
                <form onSubmit={handleSubmit}>
                    <div className="profile-image-container">
                        <img
                            src={user.profileImage || "/default-profile.png"}
                            alt="Profile"
                        />
                        <label className="upload-button">
                            Alterar Foto
                            <input
                                type="file"
                                accept="image/png, image/jpeg"
                                onChange={handleImageChange}
                            />
                        </label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={user.email}
                            onChange={handleEmailChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Nome:</label>
                        <input
                            type="text"
                            id="name"
                            value={user.nome}
                            onChange={handleNameChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cpf">CPF:</label>
                        <input
                            type="text"
                            id="cpf"
                            value={user.cpf}
                            onChange={handleCPFChange}
                        />
                    </div>
                    <button type="submit">Confirmar Alteração</button>
                </form>
            </div>
        </div>
    );
};

export default Profile;
