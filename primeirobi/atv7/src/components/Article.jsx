function Article(props) {
    return (
        <article>
            <h2>{props.titulo}</h2>

            <p>Data: {props.data}</p>

            <p>{props.conteudo1}</p>
            <p>{props.conteudo2}</p>

            <img src="/img.jpg" alt="Praia" style={{ width: "100%", borderRadius: "8px" }} />
        </article>
    );
}

export default Article;