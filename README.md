# 📝 React Task Manager

A simple and responsive **Task Management App** built with **React**, **Redux Toolkit**, and **JSON Server**.
It allows users to perform full CRUD (Create, Read, Update, Delete) operations on tasks.

---

## 🚀 Features

* Add, edit, delete, and update task status
* Drag-and-drop task organization (using `@hello-pangea/dnd`)
* Persistent mock backend using `json-server`
* State management with Redux Toolkit
* Responsive UI with Tailwind CSS

---

## 🛠️ Tech Stack

* **Frontend:** React, Redux Toolkit, React Router DOM
* **Backend (Mock API):** JSON Server
* **Styling:** Tailwind CSS
* **Others:** Axios, Concurrently

---

## ⚙️ Installation & Setup

Clone the repository and install dependencies:

```bash
git clone https://github.com/shwetakumari125/react-task-manager.git
cd react-task-manager
npm install
```

---

### 🧩 Run the App Locally

Start both the frontend and backend servers together:

```bash
npm run dev
```

This will start:

* Frontend on: **[http://localhost:3000/](http://localhost:3000/)**
* JSON Server API on: **[http://localhost:3001/tasks](http://localhost:3001/tasks)**

---

### 🧠 Available Scripts

| Command             | Description                              |
| ------------------- | ---------------------------------------- |
| `npm start`         | Run React app only                       |
| `npm run start:api` | Start JSON Server (backend only)         |
| `npm run dev`       | Run both frontend + backend concurrently |
| `npm run build`     | Build the app for production             |
| `npm run deploy`    | Deploy to GitHub Pages (if configured)   |

---

## 📂 Folder Structure

```
react-task-manager/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── redux/
│   └── App.js
│
├── db.json
├── package.json
├── tailwind.config.js
└── README.md
```

---

## 💾 Backend (JSON Server)

`db.json` serves as the mock database.
Example structure:

```json
{
  "tasks": [
    { "id": 1, "title": "Learn React", "status": "Pending" },
    { "id": 2, "title": "Build Task Manager", "status": "Completed" }
  ]
}
```

---

## 📸 Screenshots (Optional)

You can add screenshots or a short demo GIF here to make your README stand out.

---

## 🙌 Author

**Shweta Kumari**
📧 [Your Email or LinkedIn URL]
🖇️ [GitHub Profile](https://github.com/shwetakumari125)
