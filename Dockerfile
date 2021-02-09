FROM mcr.microsoft.com/dotnet/core/sdk:3.1 as backendBuilder

WORKDIR /app/

COPY ./WareHouse.API/WareHouse.API.csproj ./WareHouse.API/
COPY ./WareHouse.Core/WareHouse.Core.csproj ./WareHouse.Core/
COPY ./warehouse.sln ./


COPY . ./

RUN dotnet restore

RUN dotnet publish -c Release -o out WareHouse.API/WareHouse.API.csproj

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1

WORKDIR /app

COPY --from=backendBuilder /app/out .
ENTRYPOINT ["dotnet", "WareHouse.API.dll"]
