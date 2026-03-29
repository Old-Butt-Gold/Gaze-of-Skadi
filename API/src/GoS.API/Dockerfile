# 1. Этап сборки фронтенда (React/Vite)
FROM node:22-alpine AS frontend-build
WORKDIR /app/frontend
# Копируем package.json и устанавливаем зависимости
COPY ["gos-client/package.json", "gos-client/package-lock.json*", "./"]
RUN npm install
# Копируем исходники фронтенда и собираем
COPY ["gos-client/", "."]
RUN npm run build

# 2. Базовый образ для .NET
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS base
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*
USER $APP_UID
WORKDIR /app
EXPOSE 43190

# 3. Этап сборки бэкенда (.NET)
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
# Копируем проекты
COPY ["API/src/GoS.API/GoS.API.csproj", "API/src/GoS.API/"]
COPY ["API/src/GoS.Domain/GoS.Domain.csproj", "API/src/GoS.Domain/"]
COPY ["API/src/GoS.Application/GoS.Application.csproj", "API/src/GoS.Application/"]
COPY ["API/src/Infrastructure/GoS.Infrastructure.OptionsProvider/GoS.Infrastructure.OptionsProvider.csproj", "API/src/Infrastructure/GoS.Infrastructure.OptionsProvider/"]
COPY ["API/src/Infrastructure/GoS.Infrastructure.OpenDotaRequester/GoS.Infrastructure.OpenDotaRequester.csproj", "API/src/Infrastructure/GoS.Infrastructure.OpenDotaRequester/"]
COPY ["API/src/Infrastructure/GoS.Infrastructure.ResourceManager/GoS.Infrastructure.ResourceManager.csproj", "API/src/Infrastructure/GoS.Infrastructure.ResourceManager/"]
COPY ["API/src/Infrastructure/GoS.Infrastructure.Steam/GoS.Infrastructure.Steam.csproj", "API/src/Infrastructure/GoS.Infrastructure.Steam/"]
COPY ["API/src/Infrastructure/GoS.Infrastructure.StratzRequester/GoS.Infrastructure.StratzRequester.csproj", "API/src/Infrastructure/GoS.Infrastructure.StratzRequester/"]
RUN dotnet restore "API/src/GoS.API/GoS.API.csproj"
# Копируем все остальное
COPY ["API/", "API/"]
WORKDIR "/src/API/src/GoS.API"
RUN dotnet build "./GoS.API.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./GoS.API.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false


# 4. Финальный образ (Объединяем Бэкенд и Фронтенд)
FROM base AS final
WORKDIR /app
# Копируем бинарники бэкенда
COPY --from=publish /app/publish .
# Копируем собранный фронтенд в папку wwwroot (откуда UseStaticFiles будет его раздавать)
COPY --from=frontend-build /app/frontend/dist ./wwwroot

ENTRYPOINT ["dotnet", "GoS.API.dll"]