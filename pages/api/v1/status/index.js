// informar qual função desse arquivo tem a responsabilidade de retornar o status da página
function status(request, response) {
  // o next.js injeta esses dois objetos
  // o metodo .send("string") não assume qual tipo de teclado foi utilizado (charset)
  // .json({chave : "valor:"}) serializado
  response.status(200).json({ chave: "mandando vibrações positivas" }); // fazendo o endpoint responder com algo
}

export default status;
