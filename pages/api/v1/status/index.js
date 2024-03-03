import database from "../../../../infra/database.js";

// informar qual função desse arquivo tem a responsabilidade de retornar o status da página
async function status(request, response) {
  const result = await database.query("SELECT 1 + 1 as sum;");
  console.log(result.rows);
  // o next.js injeta esses dois objetos
  // o metodo .send("string") não assume qual tipo de teclado foi utilizado (charset)
  // .json({chave : "valor:"}) serializado
  response.status(200).json({ chave: "mandando vibrações positivas" }); // fazendo o endpoint responder com algo
}

export default status;
