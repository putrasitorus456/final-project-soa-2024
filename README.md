<p align="center">
  <h1 align="center">Final Project SOA 2024</h1>
  <p align="center">Putra Agung A.M. Sitorus - 21/474928/TK/52423</p>
</p>

## 🧑‍💻 How to Run this Project in Local
- Some Prequisites:
  - You need (Windows) Docker Dekstop for orchestration
  - (WSL) Redis server for cache
- Clone this project on your computer.

  ```bash
  https://github.com/putrasitorus456/final-project-soa-2024.git
   ```
## 💻 Starting a Redis Server

Open your Powershell as Administrator

Connect to your WSL (I'm using Ubuntu)

```bash
wsl -d Ubuntu
```

Activate Redis server

```bash
sudo service redis-server start
```

Validate server status is running

```bash
sudo service redis-server status
```

## 💻 If Using Docker for Orchestration

Open terminal and navigate to project root

Build docker-compose.yml

```bash
docker-compose up --build
```

Now you already run the entire project!


## 💻 But if You Wanted to Do It Separately for Each Service

### 💻 User-Service

Go to the User-Service project directory

```bash
cd user-service
```

Install dependencies

```bash
npm install
```

Start the server

```bash
npm start
```

### 💻 Product-Service

Go to the Product-Service project directory

```bash
cd product-service
```

Install dependencies

```bash
npm install
```

Start the server

```bash
npm start
```

### 💻 Cart-Service

Go to the Cart-Service project directory

```bash
cd cart-service
```

Install dependencies

```bash
npm install
```

Start the server

```bash
  npm start
```

### 💻 API-Gateway

Go to the Gateway project directory

```bash
cd gateway
```

Install dependencies

```bash
npm install
```

Start the server

```bash
npm start
```

### 🖼️ Frontend

Go to the Frontend project directory

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Start the server

```bash
npm start
```
