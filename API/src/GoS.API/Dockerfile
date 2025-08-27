FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["src/GoS.API/GoS.API.csproj", "src/GoS.API/"]
COPY ["src/GoS.Application/GoS.Application.csproj", "src/GoS.Application/"]
COPY ["src/GoS.Domain/GoS.Domain.csproj", "src/GoS.Domain/"]
COPY ["src/Infrastructure/GoS.Infrastructure.OptionsProvider/GoS.Infrastructure.OptionsProvider.csproj", "src/Infrastructure/GoS.Infrastructure.OptionsProvider/"]
COPY ["src/Infrastructure/GoS.Infrastructure.Requester/GoS.Infrastructure.Requester.csproj", "src/Infrastructure/GoS.Infrastructure.Requester/"]
COPY ["src/Infrastructure/GoS.Infrastructure.ResourceManager/GoS.Infrastructure.ResourceManager.csproj", "src/Infrastructure/GoS.Infrastructure.ResourceManager/"]
RUN dotnet restore "src/GoS.API/GoS.API.csproj"
COPY . .
WORKDIR "/src/src/GoS.API"
RUN dotnet build "GoS.API.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "GoS.API.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "GoS.API.dll"]
