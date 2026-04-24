import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Article from "./components/Article";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import "./App.css";

function App() {

    const post = {
        titulo: "Descobrindo as praias do Nordeste",
        data: "05 de março de 2026",
        conteudo1: "O Nordeste do Brasil é um dos destinos turísticos mais procurados do país.",
        conteudo2: "Entre os destinos mais visitados estão Jericoacoara, Porto de Galinhas e Maragogi."
    };

    return (
        <div className="app">

            <header>
                <Header />
                <Navigation />
            </header>

            <main>
                <Article
                    titulo={post.titulo}
                    data={post.data}
                    conteudo1={post.conteudo1}
                    conteudo2={post.conteudo2}
                />
            </main>

            <aside>
                <Sidebar />
            </aside>

            <footer>
                <Footer />
            </footer>

        </div>
    );
}

export default App;