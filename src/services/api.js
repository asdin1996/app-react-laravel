import API_CONFIG from "../config/apiConfig";
import { getToken } from "../utils/auth";

export async function getBooks() {
  return apiFetch("/books");
}

export async function getBookById(id) {
  return apiFetch(`/books/${id}`);
}

export async function updateBook(id, data) {
  return apiFetch(`/books/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}


export async function deleteBooks(id) {
  return apiFetch(`/books/${id}`, {
    method: "DELETE",
  });
}
export async function getContacts(page=1,per_page=10) {
  return  apiFetch(`/contacts?page=${page}&per_page=${per_page}`);
}


async function apiFetch(url, options = {}, requireAuth = true) {
  try {
    const headers = {
      "Accept": "application/json",
      ...(options.headers || {}),
    };

    if (requireAuth) {
      const token = getToken();
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(
      `${API_CONFIG.BASE_URL}${url}`,
      {
        ...options,
        headers,
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(errText || "API Error");
    }

    const data = await response.json();


    return data;
  } catch (error) {
    throw error;
  }
}



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
