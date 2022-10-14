import Nav from 'react-bootstrap/Nav';

function NavBar() {
    return (
        <Nav variant="pills" defaultActiveKey="/">
            <Nav.Item>
                <Nav.Link href="/">Dashboard</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/budgets">Budgets</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/input">Input</Nav.Link>
            </Nav.Item>
        </Nav>
    );
}

export default NavBar;