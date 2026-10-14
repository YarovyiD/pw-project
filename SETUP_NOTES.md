# 🧪 QA Automation Project — Setup & Docker Notes

Персональна підказка по налаштуванню проєкту (Playwright + TypeScript + Docker)
на Windows через WSL2.

---

## 📋 Стек

- **ОС розробки:** Windows + WSL2 (Ubuntu)
- **Фреймворк:** Playwright + TypeScript
- **Версія Playwright:** 1.63.0
- **Контейнеризація:** Docker
- **CI/CD:** GitHub Actions (в процесі)

---

# 🏗️ Частина 1. Налаштування середовища (зроблено одноразово)

## 1.1 WSL2 + Ubuntu

### У PowerShell (від адміністратора):
- wsl --install
### Перезавантажити ПК

## 1.2 Docker Desktop
- Встановити Docker Desktop for Windows.
- Settings → General → увімкнути "Use the WSL 2 based engine".
- Settings → Resources → WSL Integration → увімкнути для Ubuntu.
- Перевірка (у терміналі Ubuntu): docker run hello-world

## 1.3 Права доступу Docker (якщо "permission denied")
sudo usermod -aG docker $USER
- далі в PowerShell: 
    wsl --shutdown, потім відкрити WSL заново
- groups -  має бути "docker" у списку

## 1.4 Node.js через nvm 
- curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
- source ~/.bashrc
- nvm install --lts
- nvm alias default 'lts/*'

### Перевірка (шляхи мають вести в /home/.../.nvm, НЕ в /mnt/c):
- which node
- which npm
- node -v
- npm -v

## 1.5 VS Code + WSL
- Встановити розширення WSL (Microsoft).
- Встановити Playwright Test for VSCode (обрати "Install in WSL").
- Відкриття проєкту: з терміналу Ubuntu → code .
- Перевірка: внизу зліва зелений WSL: Ubuntu.

# 🚀 Частина 2. Створення проєкту Playwright
## Сетап
- cd ~
- mkdir -p projects
- cd projects
- npm init playwright@latest pw-project
### Вибір: TypeScript | tests | GitHub Actions: No | Install browsers: Yes

- cd pw-project
- npx playwright test        # перевірка: тести проходять

# 🐳 Частина 3. Docker
## 3.1 Dockerfile (створюємо у корені проєкту)
### Версія ТОЧНО як @playwright/test у package.json!
- FROM mcr.microsoft.com/playwright:v1.63.0-jammy
- WORKDIR /app
### Спершу тільки package-файли (для кешування залежностей)
- COPY package*.json ./
- RUN npm ci
### Потім увесь інший код
- COPY . .
### Команда за замовчуванням при docker run
- CMD ["npx", "playwright", "test"]
## 3.2 .dockerignore (у корені проєкту)
- node_modules
- playwright-report
- test-results
- .git

#### Контролює, що НЕ потрапляє в образ при COPY . . node_modules не копіюємо — вони ставляться чисто через npm ci.

# ⚙️ Частина 4. Docker — команди (підказкиі)

#### ⚠️ Усі команди запускати з КОРЕНЯ проєкту (де лежить Dockerfile).  Перевірка: ls має показати Dockerfile, package.json, tests/
### Збірка образу
- docker build -t test-playwright .
#### Де: 
- -t test-playwright — ім'я (тег) образу
- . — контекст збірки (поточна папка)
- Робити заново після зміни файлів (кеш пришвидшує)
### Запуск тестів у контейнері
- docker run --rm test-playwright
- --rm — видалити контейнер після завершення
- run виконає CMD з Dockerfile (npx playwright test)
### Запуск + витягнути звіт на хост
- docker run --rm -v "$(pwd)/playwright-report:/app/playwright-report" test-playwright
 - -v "хост:контейнер" — прокинути папку (volume)
 - $(pwd) — повний шлях до поточної папки
- БЕЗ -v звіт зникне разом з контейнером!
### Переглянути звіт
- npx playwright show-report
# 🔍 Частина 5. Docker — контроль та діагностика
#### Список образів
- docker images
#### Список запущених контейнерів
- docker ps
#### Усі контейнери (включно зі зупиненими)
- docker ps -a
#### Заглянути всередину образу (що в /app)
- docker run --rm test-playwright ls -la /app
#### Запустити конкретний тест (перевизначення CMD)
- docker run --rm test-playwright npx playwright test tests/example.spec.ts
#### Видалити образ
- docker rmi test-playwright
#### Прибрати все зайве (образи/контейнери без використання)
- docker system prune
# Запуск середовища
### Запуск з  Windows (PowerShell/CMD):
- wsl               - запустити Ubuntu
- wsl -l -v        - список дистрибутивів
- wsl --shutdown

### Відкрити у VS Code
- cd ~/projects/pw-project
- code .
