import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import "./layoutStyle.css";
import { BsList } from "react-icons/bs";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
// import { useDrawer } from "../../contexts/drawer-context";

const index = ({ children }: { children: ReactNode }) => {
    let loggedUser = { name: "Maria" };
    const navigate = useNavigate();

    // const { setOpenDrawer, openDrawer } = useDrawer();

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
                <Container>
                    <div
                        // onClick={setOpenDrawer({
                        //     ...openDrawer,
                        //     ["left"]: true,
                        // })}
                        className="drawer-button"
                    >
                        <BsList />
                    </div>
                    <Navbar.Brand onClick={() => navigate("/products")}>
                        Natalina Supermercado
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link onClick={() => navigate("/products")}>
                                Gerenciamento de Produtos
                            </Nav.Link>
                            <Nav.Link onClick={() => navigate("/users")}>Usuários</Nav.Link>
                        </Nav>
                        <Nav className="ms-auto">
                            <NavDropdown
                                title={loggedUser.name}
                                id="collapsible-nav-dropdown"
                            >
                                <NavDropdown.Item onClick={() => navigate("/profile")}>
                                    Perfil
                                </NavDropdown.Item>
                                <NavDropdown.Item onClick={() => navigate("/products")}>
                                    Configurações
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={() => navigate("/")}>
                                    Sair
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {children}
            <footer className="footer">
                <Container>
                    <p>
                        &copy; Natalina Supermercados. Todos os direitos
                        reservados
                    </p>
                </Container>
            </footer>
        </div>
    );
};

export default index;
