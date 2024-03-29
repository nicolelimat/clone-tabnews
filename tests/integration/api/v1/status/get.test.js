test("GET to /api/v1/status should return 200", async () => {
  // arrow é por padrão síncrona
  // fazendo uma requisição por dentro do teste
  // o fetch é um client http como qualquer outro, consegue fazer requests, receber responses e etc
  // necessário esperar que o fetch trace seu caminho
  const response = await fetch("http://localhost:3000/api/v1/status"); // função assíncrona para o await
  expect(response.status).toBe(200);

  // certificando que o corpo da mensagem (response) está chegando
  const responseBody = await response.json(); // função assíncrona, então é necessário o await
  // expect(responseBody.updated_at).toBeDefined(); // toBeDefined só vê se a propriedade existe

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString(); // confirmando por parsing se o conteúdo é de fato uma data
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt); // contornando o "null" que retorna o início do timestamp

  expect(responseBody.dependencies.database.version).toEqual("16.1");
  expect(responseBody.dependencies.database.max_connections).toEqual(100);
  expect(responseBody.dependencies.database.opened_connections).toEqual(1);
});
