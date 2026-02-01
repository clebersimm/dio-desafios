# Deploy de uma API .NET Core no Azure com Docker

Este guia detalha o passo a passo para criar uma API em .NET Core, empacotá-la em um container Docker e fazer o deploy na Azure. Vamos criar uma API simples que retorna "Hello, World!".

---

## **1. Criar o Projeto .NET Core**

1. Instale o [.NET SDK](https://dotnet.microsoft.com/download) se ainda não estiver instalado.
2. No terminal, crie um diretório e uma API do tipo `webapi`:
   ```bash
   mkdir HelloWorldApi
   cd HelloWorldApi
   dotnet new webapi -n HelloWorld
   ```
3. Rode a API para confirmar que está funcionando:
   ```bash
   cd HelloWorld
   dotnet run
   ```
4. Verifique no navegador em `https://localhost:5001`.

---

## **2. Modificar a API para Retornar "Hello, World!"**

Altere o controle padrão da aplicação para um retorno simples.

1. Abra o arquivo `Controllers/WeatherForecastController.cs`.
2. Substitua o conteúdo pelo seguinte código:
   ```csharp
   using Microsoft.AspNetCore.Mvc;

   [ApiController]
   [Route("[controller]")]
   public class HelloWorldController : ControllerBase
   {
       [HttpGet]
       public string Get()
       {
           return "Hello, World!";
       }
   }
   ```
3. Rode novamente a aplicação:
   ```bash
   dotnet run
   ```
4. Acesse `https://localhost:5001/HelloWorld` para verificar.

---

## **3. Criar um Dockerfile**

O próximo passo é empacotar a aplicação em um container. Na raiz do diretório do projeto (onde está o arquivo `*.csproj`), crie um arquivo chamado `Dockerfile` e insira o seguinte conteúdo:

```dockerfile
# Use uma imagem base do SDK do .NET para compilar a API
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /app

# Copie os arquivos e restaure as dependências
COPY *.csproj .
RUN dotnet restore

# Copie todo o restante e compile a aplicação
COPY . .
RUN dotnet publish -c Release -o out

# Use uma imagem base mais leve para rodar a aplicação
FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /app
COPY --from=build /app/out .

# Comando para executar a API
ENTRYPOINT ["dotnet", "HelloWorld.dll"]
```

### Gerar Imagem Docker

1. No terminal, navegue para o diretório do projeto e execute:
   ```bash
   docker build -t helloworld-api .
   ```
2. Teste o container:
   ```bash
   docker run -d -p 8080:80 --name helloworld-api-container helloworld-api
   ```
3. Acesse no navegador: [http://localhost:8080/HelloWorld](http://localhost:8080/HelloWorld).

---

## **4. Publicar o Container no Azure Container Registry (ACR)**

### Criar o Registro de Container no Azure

1. Faça login no Azure:
   ```bash
   az login
   ```
2. Crie um *Azure Container Registry (ACR)*:
   ```bash
   az acr create --name MyUniqueRegistryName --resource-group MyResourceGroup --sku Basic --admin-enabled true
   ```

   - Substitua `MyUniqueRegistryName` por um nome globalmente único.
   - Substitua `MyResourceGroup` pelo nome do grupo de recursos.

3. Faça login no ACR criado:
   ```bash
   az acr login --name MyUniqueRegistryName
   ```

4. Faça o *tag* e envie a imagem para o registro:
   ```bash
   docker tag helloworld-api MyUniqueRegistryName.azurecr.io/helloworld-api:latest
   docker push MyUniqueRegistryName.azurecr.io/helloworld-api:latest
   ```

---

## **5. Criar o Serviço no Azure para o Container**

1. **Criar um Serviço do Azure App**:
   ```bash
   az appservice plan create --name MyAppServicePlan --resource-group MyResourceGroup --sku B1 --is-linux
   ```

2. **Criar o Web App**:
   ```bash
   az webapp create --resource-group MyResourceGroup --plan MyAppServicePlan --name MyHelloWorldApp --deployment-container-image-name MyUniqueRegistryName.azurecr.io/helloworld-api:latest
   ```

3. **Configurar o Registro no Web App**:
   ```bash
   az webapp config container set --name MyHelloWorldApp --resource-group MyResourceGroup --docker-custom-image-name MyUniqueRegistryName.azurecr.io/helloworld-api:latest --docker-registry-server-url https://MyUniqueRegistryName.azurecr.io
   ```

4. **Obter a URL**:
   Rode o comando a seguir para obter o endereço da aplicação:
   ```bash
   az webapp show --name MyHelloWorldApp --resource-group MyResourceGroup --query defaultHostName
   ```

5. **Teste a API**:
   Acesse a URL retornada no navegador, seguida de `/HelloWorld`.

---

## **Resumo**
- **Criar a API:** Use `dotnet new` para criar uma API básica que retorna "Hello, World!".
- **Containerizar:** Crie um *Dockerfile* e construa uma imagem Docker.
- **Publicar no ACR:** Envie a imagem gerada para o Azure Container Registry.
- **Rodar no Azure:** Use o Azure App Service para executar o container.

Sua API estará disponível na Azure com alta escalabilidade e integração contínua com o Docker!
