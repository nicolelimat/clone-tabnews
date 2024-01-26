// Componente React, uma função JS
function Home() {
  const headingStyle = {
    fontFamily: "sans-serif",
    fontSize: "24px",
  };

  return <h1 style={headingStyle}>Something may be happening here :&#41;</h1>;
}

// Sinalizando que a função Home será utilizada para renderizar a página
// Exportando a função para fora do arquivo
// Definindo o export PADRÃO, a partir dele, um componente vai chamar o outro, formando o layout e etc
export default Home;
