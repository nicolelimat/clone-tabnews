import { Client } from "pg"; // o módulo do pg abstrai essa conexão desta forma

async function query(queryObject) {
  // declarada como async pra poder utilizar o await
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  }); // comando síncrono que instantaneamente objeto paradão pronto pra ser conectado no banco
  await client.connect(); // comando assíncrono, precisa esperar (await), e pra esperar precisa declarar a func como async
  const result = await client.query(queryObject);
  await client.end(); // encerrar a conexão pra ela não ficar pendurada
  return result;
}

export default {
  query: query,
};
