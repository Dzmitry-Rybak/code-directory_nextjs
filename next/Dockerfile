# Используем официальный образ Node.js
FROM node:alpine

# Создаем директорию приложения в образе
WORKDIR /app

EXPOSE 3000

# Копируем package.json и package-lock.json в директорию приложения
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы приложения
COPY . .

# Собираем Next.js приложение
RUN npm run build

# Команда для запуска приложения при старте контейнера
CMD ["npm", "run", "start"]