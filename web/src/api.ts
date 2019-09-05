// @ts-ignore
const BASE_URL = process.env.API_URL;

export type ThingId = string | number;

export type Thing = {
  _id: ThingId;
  name: string;
};

async function apiRequest(
  path: string,
  method: 'POST' | 'GET' | 'PUT' | 'DELETE',
  data?: any
) {
  let options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  if (data) {
    // @ts-ignore
    options = { ...options, body: JSON.stringify(data) };
  }
  return fetch(`${BASE_URL}/${path}`, options)
    .then(res => res.json())
    .then(res => res.result);
}

export async function getThings(): Promise<Array<Thing>> {
  return apiRequest('things', 'GET');
}

export async function deleteThing(id: ThingId): Promise<void> {
  return apiRequest(`things/${id}`, 'DELETE');
}

export async function createThing(): Promise<Thing> {
  return apiRequest('things', 'POST');
}
