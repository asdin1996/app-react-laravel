import API_CONFIG from "../config/apiConfig";
import { getToken } from "../utils/auth";

export async function login(username, password) {
  const response = await fetch(`${API_CONFIG.BASE_URL}/login`, {
    method: "POST",
     headers: { "Content-Type": "application/json", "Accept": "application/json" },

    body: JSON.stringify(
      { email:username, 
        password: password 
      }
    )
  });

  if (!response.ok) {
    throw new Error("Credenciales inválidas");
  }

  return response.json();
}


export async function getBooks() {
  const token = getToken();

  const response = await fetch(`${API_CONFIG.BASE_URL}/books`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error("Error al obtener productos");
  }

  return response.json();
}

export async function getContacts(page=1,per_page=10) {
  const token = getToken();

  const response = await fetch(`${API_CONFIG.BASE_URL}/contacts?page=${page}&per_page=${per_page}`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error("Error al obtener productos");
  }

  return response.json();
}
