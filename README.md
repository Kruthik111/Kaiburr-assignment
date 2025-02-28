# Kaiburr Task Management Application

This project is a **Task Management System** consisting of a **backend API** built with **Spring Boot & MongoDB** and a **frontend UI** built using **React 19, TypeScript, and Ant Design**.

## 📁 Project Structure

```
kaiburr-task-manager/
│── webUi/          # Frontend (React 19 + TypeScript + Ant Design)
│── kaiburrbackend/ # Backend (Spring Boot + MongoDB)
```

---

## 🚀 Backend Setup (Spring Boot + MongoDB)

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name/kaiburrbackend
```

### **2️⃣ Install Dependencies**
```sh
mvn clean install
```

### **3️⃣ Configure MongoDB**
Ensure MongoDB is running locally or provide the correct connection string in `application.properties`:
```properties
spring.data.mongodb.uri=mongodb://localhost:27017/taskdb
```

### **4️⃣ Run the Backend**
```sh
mvn spring-boot:run
```
Your backend should now be running at **`http://localhost:8080`**.

---

## 🎨 Frontend Setup (React 19 + TypeScript + Ant Design)

### **1️⃣ Navigate to Frontend Folder**
```sh
cd ../webUi
```

### **2️⃣ Install Dependencies**
```sh
npm install
```

### **3️⃣ Run the Frontend**
```sh
npm run dev
```
Your frontend should now be running at **`http://localhost:5173`**.

---

## 📌 API Endpoints

### **Task API**
| Method | Endpoint             | Description               |
|--------|----------------------|---------------------------|
| `GET`  | `/tasks`            | Get all tasks             |
| `PUT`  | `/tasks`            | Create a new task         |
| `DELETE` | `/tasks/{id}`     | Delete a task by ID       |
| `GET`  | `/tasks/search?name={query}` | Search tasks by name |

---

## 📸 Screenshots

### **1️⃣ Task Creation**
![Task creation validation for null field](https://github.com/user-attachments/assets/7dbd7b6d-6fd0-449a-b290-4ef025939253)
![Task creation succesfull](https://github.com/user-attachments/assets/7d9c7c3c-5107-491b-be30-4caed51b82f6)



### **2️⃣ View Tasks**

![View Tasks](https://github.com/user-attachments/assets/a5c9d624-eae5-46ea-863c-77a1ecc49c40)

### **3️⃣ search Tasks**

![Search tasks](https://github.com/user-attachments/assets/dfd5538b-053d-4756-95d4-54c6066600f7)

---

## 💡 Features
- **Create, View, Search, and Delete Tasks**
- **User-friendly UI using Ant Design**
- **TypeScript support for type safety**
- **Spring Boot REST API with MongoDB**
- **Modern React 19 with Vite**

---

## 🛠️ Technologies Used
### **Backend**
- Java + Spring Boot
- MongoDB
- Maven

### **Frontend**
- React 19 + TypeScript
- Ant Design
- Vite

---

## 🤝 Contributing
Feel free to submit a PR or open an issue! 🚀

---

## 📜 License
This project is **© 2025 Kaiburr LLC.** All rights reserved.

