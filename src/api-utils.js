import request from 'superagent';

const URL = 'http://localhost:3000';

export async function createUser(email, password) {
  const response = await request.post(`${URL}/auth/signup`).send({
    email: email,
    password: password
  });
  return response.body;
}

export async function logInUser(email, password) {
  const response = await request.post(`${URL}/auth/signin`).send({
    email: email,
    password: password
  });
  return response.body;
}

export async function newSearch(query, token) {
  console.log(query);
  const response = await request
    .get(`${URL}/api/plants?search=${query}`)
    .set('Authorization', token);

  return response.body;
}

export async function addFavorite(plant, token) {
  const response = await request
    .post(`${URL}/api/favorites`)
    .set('Authorization', token)
    .send(plant);

  return response.body;
}

export async function getFavorites(token) {
  const response = await request
    .get(`${URL}/api/favorites`)
    .set('Authorization', token);

  return response.body;
}

export async function deleteFavorite(id, token) {
  const response = await request
    .delete(`${URL}/api/favorites/${id}`)
    .set('Authorization', token);

  return response.body;
}
