Great — this is exactly what you need if you're teaching GitHub Actions. Let’s **break down a real YAML workflow line by line**, in a way your students will actually understand.

---

# 🧩 Full Example (Dev → SIT → UAT → Prod)

We’ll use this as the reference:

```yaml
name: Full CI/CD Pipeline

on:
  push:
    branches: [ "main" ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Build
        run: echo "Building application..."

      - name: Test
        run: echo "Running tests..."

  deploy-dev:
    needs: build
    runs-on: ubuntu-latest
    environment: dev
    steps:
      - name: Deploy to DEV
        run: echo "Deploying to DEV"

  deploy-sit:
    needs: deploy-dev
    runs-on: ubuntu-latest
    environment: sit
    steps:
      - name: Deploy to SIT
        run: echo "Deploying to SIT"

  deploy-uat:
    needs: deploy-sit
    runs-on: ubuntu-latest
    environment: uat
    steps:
      - name: Deploy to UAT
        run: echo "Deploying to UAT"

  deploy-prod:
    needs: deploy-uat
    runs-on: ubuntu-latest
    environment: prod
    steps:
      - name: Deploy to PROD
        run: echo "Deploying to PRODUCTION"
```

---

# 🔍 1. `name`

```yaml
name: Full CI/CD Pipeline
```

👉 This is just the **workflow name** shown in GitHub UI.

* You can name it anything
* Helps identify the pipeline

---

# ⚡ 2. `on` (Trigger)

```yaml
on:
  push:
    branches: [ "main" ]
```

👉 This defines **WHEN the workflow runs**

### Meaning:

* Run pipeline when:

  * Code is **pushed**
  * To branch **main**

---

### Other examples (good to mention in class):

```yaml
on:
  pull_request:
    branches: [ "main" ]
```

👉 Runs on PR instead of push

---

# 🧱 3. `jobs` (Main Structure)

```yaml
jobs:
```

👉 A workflow contains **multiple jobs**

Each job:

* Runs on a machine
* Can run **parallel OR sequential**

---

# 🏗️ 4. First Job: `build`

```yaml
build:
```

👉 Job name (you define it)

---

## 🔹 `runs-on`

```yaml
runs-on: ubuntu-latest
```

👉 This means:

* Use a **Linux virtual machine**

Other options:

* `windows-latest`
* `macos-latest`

---

## 🔹 `steps`

```yaml
steps:
```

👉 A job is made of **steps executed in order**

---

## 🔹 Step 1: Checkout Code

```yaml
- name: Checkout code
  uses: actions/checkout@v4
```

👉 VERY IMPORTANT

* Downloads your repository code into the runner
* Without this → no code available

---

## 🔹 Step 2: Build

```yaml
- name: Build
  run: echo "Building application..."
```

👉 `run` executes a **shell command**

Real example:

```yaml
run: npm install
```

---

## 🔹 Step 3: Test

```yaml
- name: Test
  run: echo "Running tests..."
```

👉 Replace with real tests:

```yaml
run: npm test
```

---

# 🔁 5. Job Dependency (`needs`)

```yaml
needs: build
```

👉 This is CRITICAL

It means:

* This job runs **ONLY AFTER build is successful**

---

# 🚀 6. Deploy to Dev

```yaml
deploy-dev:
  needs: build
```

👉 Flow:

* Build → then Dev deployment

---

## 🔹 Environment

```yaml
environment: dev
```

👉 Connects to:

* Environment in GitHub settings
* Secrets for dev
* Tracking deployments

---

## 🔹 Step

```yaml
run: echo "Deploying to DEV"
```

👉 Replace with real deployment:

Example:

```yaml
run: scp files to dev-server
```

---

# 🔁 7. SIT Stage

```yaml
deploy-sit:
  needs: deploy-dev
```

👉 Means:

* SIT runs **after DEV**

---

# 🔁 8. UAT Stage

```yaml
deploy-uat:
  needs: deploy-sit
```

👉 Means:

* UAT runs after SIT

---

# 🔐 9. Production (IMPORTANT)

```yaml
deploy-prod:
  needs: deploy-uat
  environment: prod
```

👉 This is where **manual approval happens**

If configured in GitHub:

* Workflow will **pause here**
* Wait for approval

---

# 🔁 10. Full Flow Understanding

```text
build
  ↓
deploy-dev
  ↓
deploy-sit
  ↓
deploy-uat
  ↓
deploy-prod (manual approval)
```

---

# 🧠 11. Key Keywords Summary

| Keyword       | Meaning                |
| ------------- | ---------------------- |
| `name`        | Workflow name          |
| `on`          | Trigger                |
| `jobs`        | All tasks              |
| `runs-on`     | Machine type           |
| `steps`       | Commands inside job    |
| `uses`        | Prebuilt action        |
| `run`         | Shell command          |
| `needs`       | Job dependency         |
| `environment` | Deployment environment |

---

# 🔥 12. Real-Life Upgrade Example

Instead of:

```yaml
run: echo "Deploying"
```

You might use:

```yaml
- name: Deploy via SSH
  run: |
    ssh user@server "cd app && git pull && npm install && pm2 restart app"
```

---

# 🎯 How to Explain to Students Simply

You can say:

> “This YAML file is a pipeline.
> It tells GitHub:
>
> * When to run (`on`)
> * What to do (`jobs`)
> * In what order (`needs`)
> * Where to deploy (`environment`)”

---

If you want next, I can:

* Add **real deployment (AWS / Docker / server)**
* Show **how to use secrets securely**
* Or give you a **practice lab for students**
