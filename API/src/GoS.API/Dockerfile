FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS base

RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

USER $APP_UID
WORKDIR /app
EXPOSE 43190

FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["src/GoS.API/GoS.API.csproj", "src/GoS.API/"]
COPY ["src/GoS.Domain/GoS.Domain.csproj", "src/GoS.Domain/"]
COPY ["src/GoS.Application/GoS.Application.csproj", "src/GoS.Application/"]
COPY ["src/Infrastructure/GoS.Infrastructure.OptionsProvider/GoS.Infrastructure.OptionsProvider.csproj", "src/Infrastructure/GoS.Infrastructure.OptionsProvider/"]
COPY ["src/Infrastructure/GoS.Infrastructure.OpenDotaRequester/GoS.Infrastructure.OpenDotaRequester.csproj", "src/Infrastructure/GoS.Infrastructure.OpenDotaRequester/"]
COPY ["src/Infrastructure/GoS.Infrastructure.ResourceManager/GoS.Infrastructure.ResourceManager.csproj", "src/Infrastructure/GoS.Infrastructure.ResourceManager/"]
COPY ["src/Infrastructure/GoS.Infrastructure.Steam/GoS.Infrastructure.Steam.csproj", "src/Infrastructure/GoS.Infrastructure.Steam/"]
COPY ["src/Infrastructure/GoS.Infrastructure.StratzRequester/GoS.Infrastructure.StratzRequester.csproj", "src/Infrastructure/GoS.Infrastructure.StratzRequester/"]
RUN dotnet restore "src/GoS.API/GoS.API.csproj"
COPY . .
WORKDIR "/src/GoS.API"
RUN dotnet build "./GoS.API.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./GoS.API.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "GoS.API.dll"]
