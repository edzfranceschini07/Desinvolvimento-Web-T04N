function Navigation() {
    return (
        <nav>
            <ul style={{ display: "flex", justifyContent: "center", gap: "20px", listStyle: "none" }}>
                <li><a href="#">Home</a></li>
                <li><a href="#">Sobre</a></li>
                <li><a href="#">Contato</a></li>
            </ul>
        </nav>
    );
}

export default Navigation;