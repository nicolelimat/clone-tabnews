import database from "infra/database.js";

// informar qual função desse arquivo tem a responsabilidade de retornar o status da página
async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const databaseVersionResult = await database.query("SHOW server_version;"); // retorna o objeto inteiro, em rows
  const databaseVersionValue = databaseVersionResult.rows[0].server_version;

  // query sem parâmetro
  const databaseMaxConnectionsResult = await database.query(
    "SHOW max_connections;",
  );
  const databaseMaxConnectionsValue =
    databaseMaxConnectionsResult.rows[0].max_connections;

  const databaseName = process.env.POSTGRES_DB;

  // query com parâmetros dinâmicos
  const databaseOpenedConnectionsResult = await database.query(
    // objeto para a filtragem do node-postgres contra SQL Injection funcionar
    {
      text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;", // count(*) conta quantas rows tem e ::int faz a conversão pra int direto no banco
      values: [databaseName],
    },
  );

  const databaseOpenedConnectionsValue =
    databaseOpenedConnectionsResult.rows[0].count;

  // o next.js injeta esses dois objetos
  // o metodo .send("string") não assume qual tipo de teclado foi utilizado (charset)
  // .json({chave : "valor:"}) serializado
  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersionValue,
        max_connections: parseInt(databaseMaxConnectionsValue), // pq volta uma string
        opened_connections: databaseOpenedConnectionsValue,
      },
    },
  }); // fazendo o endpoint responder com algo
}

export default status;
