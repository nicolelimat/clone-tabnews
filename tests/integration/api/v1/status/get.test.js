test("GET to /api/v1/status should return 200", async () => { // arrow é por padrão síncrona
  // fazendo uma requisição por dentro do teste
  // o fetch é um client http como qualquer outro, consegue fazer requests, receber responses e etc
  // necessário esperar que o fetch trace seu caminho
  const response = await fetch("http://localhost:3000/api/v1/status"); // função assíncrona para o await
  expect(response.status).toBe(200);
});
