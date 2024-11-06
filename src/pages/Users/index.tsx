import React, { useEffect, useState } from 'react';
import './users.css';

interface IUser {
    id: number;
    name: string;
    email: string;
    role: string;
    cpf: string;
}

const UserManagement: React.FC = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editUserId, setEditUserId] = useState<number | null>(null);
    const [formData, setFormData] = useState<{ name: string; email: string; role: string; cpf: string }>({
        name: '',
        email: '',
        role: '',
        cpf: ''
    });

    useEffect(() => {
        const usersFromLocal = localStorage.getItem("users");

        if (!usersFromLocal || !JSON.parse(usersFromLocal).length) {
            const defaultUsers: IUser[] = [
                { id: 1, name: "Adnan Medeiros", email: "adnan@gmail.com", role: "Admin", cpf: "123.456.789-00" },
                { id: 2, name: "Caio Henrique", email: "caio@gmail.com", role: "Editor", cpf: "123.456.789-01" },
                { id: 3, name: "Gizele Gabriele", email: "gizele@gmail.com", role: "Viewer", cpf: "123.456.789-02" },
                { id: 4, name: "Natalia Galdino", email: "natalia@gmail.com", role: "Viewer", cpf: "123.456.789-03" },
                { id: 5, name: "Layla Kethlen", email: "layla@gmail.com", role: "Viewer", cpf: "123.456.789-04" },
            ];
            localStorage.setItem("users", JSON.stringify(defaultUsers));
            setUsers(defaultUsers);
        } else {
            setUsers(JSON.parse(usersFromLocal));
        }
    }, []);

    const handleFormSubmit = () => {
        if (!formData.name || !formData.email || !formData.role || !formData.cpf) return;

        if (isEditing && editUserId !== null) {
            const updatedUsers = users.map(user =>
                user.id === editUserId ? { ...user, ...formData } : user
            );
            setUsers(updatedUsers);
            localStorage.setItem("users", JSON.stringify(updatedUsers));
        } else {
            const newUser: IUser = {
                id: Date.now(),
                name: formData.name,
                email: formData.email,
                role: formData.role,
                cpf: formData.cpf,
            };
            const updatedUsers = [...users, newUser];
            setUsers(updatedUsers);
            localStorage.setItem("users", JSON.stringify(updatedUsers));
        }

        closeForm();
    };

    const openForm = () => {
        setShowForm(true);
        setIsEditing(false);
        setFormData({ name: '', email: '', role: '', cpf: '' });
    };
    const openEditForm = (user: IUser) => {
        setIsEditing(true);
        setEditUserId(user.id);
        setFormData({ name: user.name, email: user.email, role: user.role, cpf: user.cpf });
        setShowForm(true);
    };

    const closeForm = () => {
        setShowForm(false);
        setIsEditing(false);
        setFormData({ name: '', email: '', role: '', cpf: '' });
    };

    const removeUser = (id: number) => {
        const updatedUsers = users.filter(user => user.id !== id);
        setUsers(updatedUsers);
        localStorage.setItem("users", JSON.stringify(updatedUsers));
    };

    const UserCard: React.FC<{ user: IUser; onEdit: () => void; onRemove: () => void }> = ({ user, onEdit, onRemove }) => (
        <div className="user-card">
            <h3>{user.name}</h3>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Função:</strong> {user.role}</p>
            <p><strong>CPF:</strong> {user.cpf}</p>
            <div className="button-group">
                <button className="edit-button" onClick={onEdit}>Editar</button>
                <button className="remove-button" onClick={onRemove}>Remover</button>
            </div>
        </div>
    );

    return (
        <div className="user-management">
            <header>
                <button className="add-button" onClick={openForm}>Cadastrar novo Usuário</button>
            </header>

            {showForm && (
                <div className="form-container">
                    <h3>{isEditing ? "Editar" : "Adicionar Novo"}</h3>
                    <input
                        type="text"
                        placeholder="Nome"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Função"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="CPF"
                        value={formData.cpf}
                        onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                    />
                    <div className="button-group">
                        <button className="save-button" onClick={handleFormSubmit}>
                            {isEditing ? "Atualizar" : "Salvar Usuário"}
                        </button>
                        <button className="cancel-button" onClick={closeForm}>
                            Cancelar
                        </button>
                    </div>
                </div>
            )}

            <div className="user-cards">
                {users.map(user => (
                    <UserCard
                        key={user.id}
                        user={user}
                        onEdit={() => openEditForm(user)}
                        onRemove={() => removeUser(user.id)}
                    />
                ))}
            </div>
        </div>
    );
};
export default UserManagement;
