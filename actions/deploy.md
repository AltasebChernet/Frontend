Perfect — now let’s turn your pipeline into a **REAL deployment** that you can demonstrate in your course.

I’ll show you **3 practical options** (used in real companies):

---

# 🚀 OPTION 1: Deploy to a Server using SSH (Simple + Real)

👉 Best for teaching beginners

---

## 🧩 Scenario

* You have a server (Ubuntu VM)
* App runs with Node.js
* You deploy using SSH

---

## 🔐 Step 1: Add Secrets in GitHub

Go to:

```
Settings → Secrets and variables → Actions
```

Add:

* `SERVER_HOST` → IP address
* `SERVER_USER` → ubuntu
* `SERVER_SSH_KEY` → private key

---

## 🧾 YAML Example (Real Deployment)

```yaml
name: Deploy via SSH

on:
  push:
    branches: [ "main" ]

jobs:
  deploy-dev:
    runs-on: ubuntu-latest
    environment: dev

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup SSH
        run: |
          mkdir -p ~/.ssh
          echo "${{ secrets.SERVER_SSH_KEY }}" > ~/.ssh/id_rsa
          chmod 600 ~/.ssh/id_rsa

      - name: Deploy to server
        run: |
          ssh -o StrictHostKeyChecking=no ${{ secrets.SERVER_USER }}@${{ secrets.SERVER_HOST }} << 'EOF'
            cd /var/www/app
            git pull origin main
            npm install
            pm2 restart app
          EOF
```

---

## 💡 What’s happening?

* Connects to your server
* Pulls latest code
* Installs dependencies
* Restarts app

---

# 🐳 OPTION 2: Docker Deployment (Industry Standard)

👉 Very important for your course

---

## 🧩 Step 1: Create Dockerfile

```dockerfile
FROM node:18

WORKDIR /app

COPY . .

RUN npm install

CMD ["npm", "start"]
```

---

## 🧾 YAML: Build & Push Docker Image

```yaml
name: Docker CI/CD

on:
  push:
    branches: [ "main" ]

jobs:
  docker:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Login to DockerHub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}

      - name: Build image
        run: docker build -t myapp:latest .

      - name: Tag image
        run: docker tag myapp:latest ${{ secrets.DOCKER_USERNAME }}/myapp:latest

      - name: Push image
        run: docker push ${{ secrets.DOCKER_USERNAME }}/myapp:latest
```

---

## 🚀 Deploy Docker on Server

```yaml
- name: Deploy Docker container
  run: |
    ssh user@server << 'EOF'
      docker pull username/myapp:latest
      docker stop app || true
      docker rm app || true
      docker run -d -p 80:3000 --name app username/myapp:latest
    EOF
```

---

# ☁️ OPTION 3: Deploy to AWS EC2 (Most Realistic)

👉 This is what many companies actually use

---

## 🧩 Requirements

* EC2 instance running
* Security group allows SSH (port 22)
* Node/Docker installed

---

## 🔐 Secrets

Add:

* `EC2_HOST`
* `EC2_USER`
* `EC2_KEY`

---

## 🧾 YAML Example (AWS EC2)

```yaml
name: Deploy to AWS EC2

on:
  push:
    branches: [ "main" ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: prod

    steps:
      - uses: actions/checkout@v4

      - name: Setup SSH
        run: |
          mkdir -p ~/.ssh
          echo "${{ secrets.EC2_KEY }}" > ~/.ssh/id_rsa
          chmod 600 ~/.ssh/id_rsa

      - name: Deploy to EC2
        run: |
          ssh -o StrictHostKeyChecking=no ${{ secrets.EC2_USER }}@${{ secrets.EC2_HOST }} << 'EOF'
            cd /home/ubuntu/app
            git pull origin main
            npm install
            pm2 restart app
          EOF
```

---

# 🔐 Add Manual Approval for Production

In GitHub:

👉 `Settings → Environments → prod`

* Add **Required reviewers**

Now:

* Deployment to EC2 **waits for approval**

---

# 🧠 How to Teach This Clearly

Explain like this:

> “CI builds the app
> CD deploys it
> We can deploy:
>
> * Directly to server (SSH)
> * Using Docker (modern way)
> * On cloud like AWS (real production)”

---

# ⚖️ Which One Should You Teach?

| Option  | Difficulty | Real Usage     |
| ------- | ---------- | -------------- |
| SSH     | Easy       | Small projects |
| Docker  | Medium     | Very common    |
| AWS EC2 | Medium     | Real companies |

---

# 🔥 Best Teaching Path

1. Start with **SSH deployment**
2. Move to **Docker**
3. Finish with **AWS**

---

# 🎯 Pro Tip

For your course demo:

* Use **one small Node app**
* Show full pipeline:

  * Build
  * Deploy Dev (auto)
  * Deploy Prod (manual approval)

---

If you want next, I can:

* Build a **complete project (Node + Docker + CI/CD)** you can demo live
* Or create a **step-by-step lab exercise for students**
