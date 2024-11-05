// TODO: Criar a tela de listar todos os produtos
// caso o usuário não esteja logado, redirecionar para a tela de login

import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import './layoutStyle.css';

const index = () => {
    let loggedUser = { name: "Maria" };
    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">Natalina Supermercado</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#features">
                            Gerenciamento de Produtos
                        </Nav.Link>
                        <Nav.Link href="#pricing">Usuários</Nav.Link>
                    </Nav>
                    <Nav className="ms-auto"> 
                        <NavDropdown
                            title={loggedUser.name}
                            id="collapsible-nav-dropdown"
                        >
                            <NavDropdown.Item href="#">Perfil</NavDropdown.Item>
                            <NavDropdown.Item href="">
                                Configurações
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="login">
                                Sair
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );    
};

export default index;