import { Client } from "pg"; // o módulo do pg abstrai essa conexão desta forma

// declarada como async pra poder utilizar o await
async function query(queryObject) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    // ssl: condição ? valor_se_verdadeiro : valor_se_falso
    ssl: process.env.NODE_ENV === "development" ? false : true, // propriedade que garante o uso de uma conexão segura
  }); // comando síncrono que instantaneamente objeto paradão pronto pra ser conectado no banco

  console.log("Credenciais do Postgres:", {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  });

  try {
    await client.connect(); // comando assíncrono, precisa esperar (await), e pra esperar precisa declarar a func como async
    const result = await client.query(queryObject);
    return result;
  } catch (error) {
    console.error(error);
    throw error; // lançando o erro, não só seu log
  } finally {
    await client.end();
  }
}

export default {
  query: query,
};
