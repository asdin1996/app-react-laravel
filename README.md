# React-Laravel Book Management App

A **React front-end** with **Laravel back-end** application to manage books and contacts. Features include authentication, CRUD operations, server-side pagination, and internationalization (i18n).

---

## Table of Contents

* [Project Structure](#project-structure)
* [Technologies Used](#technologies-used)
* [Components](#components)
* [Services](#services)
* [Utils](#utils)
* [i18n (Internationalization)](#i18n-internationalization)

---

## Project Structure

```
project-root/
│
├─ public/
├─ src/
│  ├─ assets/                 # Images, logos
│  ├─ components/
│  │  ├─ layout/
│  │  │  ├─ Header.jsx
│  │  │  └─ Footer.jsx
│  │  ├─ pages/
│  │  │  ├─ Home.jsx
│  │  │  ├─ Books.jsx
│  │  │  ├─ BooksEdit.jsx
│  │  │  └─ Contacts.jsx
│  │  └─ signin/
│  │     └─ Login.jsx
│  ├─ services/
│  │  └─ api.js              # Handles API calls
│  ├─ utils/
│  │  ├─ auth.js              # Token management & auth helpers
│  │  └─ formatDate.js        # Date formatting
│  ├─ i18n/
│  │  ├─ i18n.js
│  │  └─ locales/
│  │     ├─ en/translation.json
│  │     └─ es/translation.json
│  ├─ config/
│  │  └─ apiConfig.js         # API URL config
│  ├─ App.jsx
│  └─ main.jsx
└─ package.json
```

---

## Technologies Used

* **Front-end:** React, React Router, React Query, Material UI, i18next
* **Back-end:** Laravel (API), Sanctum for authentication
* **State management:** React Query for server state
* **Other:** Fetch API for network requests, JSON Web Tokens (JWT)

---
## Components

### Layout

* **Header.jsx**
  Displays logo, navigation, current date, logout button, and language selector.
* **Footer.jsx**
  Displays footer information with copyright.

### Pages

* **Home.jsx** – Landing page after login
* **Books.jsx** – Displays book list with search, edit, and delete actions using Material UI DataGrid
* **BooksEdit.jsx** – Form to edit a single book, prefilled with existing data
* **Contacts.jsx** – Displays paginated list of contacts from the server
* **Login.jsx** – Login form with username, password, error messages, and redirects on success

---

## Services

All API calls are handled in `src/services/api.js`:

* `login(username, password)` – Authenticate user and return token
* `getBooks()` – Fetch all books
* `getBookById(id)` – Fetch book by ID
* `updateBook(id, bookData)` – Update book by ID
* `deleteBooks(id)` – Delete book by ID
* `getContacts(page, per_page)` – Fetch contacts with pagination

---

## Utils

* **auth.js** – Token management functions: `saveToken`, `getToken`, `removeToken`, `isLoggedIn`
* **formatDate.js** – `getCurrentDate()` returns formatted current date

---

## i18n (Internationalization)

* Uses **i18next** and **react-i18next**
* Languages: English (`en`) and Spanish (`es`)
* Translation files located in `src/i18n/locales`
