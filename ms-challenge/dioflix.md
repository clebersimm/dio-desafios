# Dioflix

O **Dioflix** é um projeto desenvolvido em .NET C# que combina funcionalidades de armazenamento e manipulação de dados na nuvem utilizando recursos da **Microsoft Azure**. O objetivo do projeto é permitir o upload e manipulação de metadados de vídeos.

## Funcionalidades

1. **Gravação de Arquivos na Storage Account**:
   - Permitir o upload dos vídeos diretamente para um **Blob Storage**.
   - Gerar um identificador único para o arquivo e armazená-lo em um container organizado.

2. **Manipulação de Metadados no Azure Cosmos DB**:
   - **Gravação**: Armazenar metadados dos vídeos no Cosmos DB.
   - **Filtragem**: Buscar vídeos com base em critérios como idioma, duração e nome.
   - **Listagem**: Listar todos os metadados dos vídeos.

3. **Modelo de Dados**:
   ```json
   {
     "id": "string",
     "nome": "string",
     "duracao": "int",
     "descricao": "string",
     "idioma": "string"
   }
   ```

## Stack Tecnológica

- **Backend**: .NET 6 ou superior (C#).
- **Banco de Dados**: Azure Cosmos DB (API SQL ou MongoDB).
- **Armazenamento de Arquivos**: Azure Blob Storage.
- **Infraestrutura**: Azure App Service para hospedar a aplicação.
- **Autenticação**: Opcional com Azure Active Directory.

## Estrutura do Projeto

- **Camada de Aplicação**:
  - APIs construídas em ASP.NET Core para acesso ao Cosmos DB e Storage Account.
  - Swagger para documentação da API.
- **Camada de Domínio**:
  - Modelos e regras de negócio para manipulação dos metadados.
- **Camada de Infraestrutura**:
  - Cosmos DB SDK para manipulação dos dados.
  - Azure Storage SDK para gravação de vídeos.

## Endpoints da API

### 1. Gravar Vídeo e Metadados
**Rota**: `POST /api/videos`

#### Entrada:
- Arquivo de vídeo no formato `form-data`.
- Corpo JSON para os metadados do vídeo:
  ```json
  {
    "nome": "string",
    "duracao": "int",
    "descricao": "string",
    "idioma": "string"
  }
  ```

#### Ação:
1. Faz o upload do arquivo na Azure Storage Account.
2. Armazena os metadados vinculados ao arquivo no Cosmos DB.

---

### 2. Listar Metadados
**Rota**: `GET /api/videos`

#### Ação:
Retorna todos os metadados armazenados no Cosmos DB.

---

### 3. Filtrar Metadados
**Rota**: `GET /api/videos/filter`

#### Parâmetros:
- `nome` (string).
- `idioma` (string).
- `duracao` (int, maior ou menor).

#### Ação:
Retorna uma lista de metadados com base nos filtros fornecidos.

---

## Passos para Configuração

### 1. Backend
- Criar um projeto ASP.NET Core Web API.
- Configurar o acesso ao Cosmos DB (chave e URL) no `appsettings.json`.
- Configurar o acesso à Azure Storage Account no `appsettings.json`.

### 2. Banco de Dados - Azure Cosmos DB
- Criar uma coleção chamada `Videos`.
- Configurar a chave de partição como `id` ou outro identificador único.

### 3. Armazenamento - Azure Storage
- Criar um container chamado `videos` dentro da Storage Account.
- Fazer upload utilizando o Azure Storage SDK.

### 4. Azure DevOps / GitHub Actions
- Configurar pipelines de CI/CD para deploy no Azure App Service.
- Criar scripts para provisionar recursos no Azure automaticamente.

### 5. Deploy na Azure
- Criar os recursos necessários (App Service, Cosmos DB, Storage Account).
- Fazer o deploy usando Azure DevOps ou manualmente a partir de um repositório Git.

---

## Estrutura de Pastas

```plaintext
Dioflix/
├── Dioflix.Api/         # Camada de APIs e controllers
├── Dioflix.Domain/      # Camada de domínios e modelos
├── Dioflix.Infrastructure/ # Comunicação com Cosmos DB e Storage
├── Dioflix.Tests/       # Projetos de testes
└── README.md            # Documentação
```

Com esta estrutura, o **Dioflix** está pronto para ser desenvolvido, implantado na Azure e escalável conforme as necessidades do projeto.

---

## Recursos Utilizados

- **Azure Cosmos DB**
  - Gravação, filtragem e listagem de dados relacionados aos metadados dos vídeos.
- **Azure Storage Account**
  - Upload de arquivos de vídeo.
- **Azure App Service**
  - Hospedagem da API.

---

# Dioflix API

Este projeto implementa a API Dioflix, desenvolvida em .NET C# com ASP.NET Core. A API armazena metadados de vídeos no Azure Cosmos DB e os vídeos no Azure Blob Storage. Abaixo estão os arquivos necessários para estruturação do projeto.

---

## Estrutura de Código

### 1. **`Dioflix.Domain`** - Modelos de Dados

**Arquivo:** `Video.cs`

```csharp
namespace Dioflix.Domain.Models;

public class Video
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string Nome { get; set; } = string.Empty;
    public int Duracao { get; set; } // Em segundos
    public string Descricao { get; set; } = string.Empty;
    public string Idioma { get; set; } = string.Empty;
}
```

---

### 2. **`Dioflix.Infrastructure`** - Cosmos DB e Blob Storage

**Arquivo:** `CosmosDbService.cs`

```csharp
using Microsoft.Azure.Cosmos;
using Dioflix.Domain.Models;

namespace Dioflix.Infrastructure;

public class CosmosDbService
{
    private readonly Container _container;

    public CosmosDbService(string endpoint, string key, string databaseId, string containerId)
    {
        CosmosClient client = new CosmosClient(endpoint, key);
        _container = client.GetContainer(databaseId, containerId);
    }

    public async Task AddVideoAsync(Video video) =>
        await _container.CreateItemAsync(video, new PartitionKey(video.Id));

    public async Task<IEnumerable<Video>> GetVideosAsync()
    {
        var query = _container.GetItemQueryIterator<Video>();
        List<Video> results = new();
        while (query.HasMoreResults)
        {
            var response = await query.ReadNextAsync();
            results.AddRange(response);
        }
        return results;
    }

    public async Task<IEnumerable<Video>> FilterVideosAsync(string? nome, string? idioma, int? duracaoMin)
    {
        string queryString = "SELECT * FROM c WHERE 1 = 1";
        if (!string.IsNullOrEmpty(nome))
            queryString += $" AND CONTAINS(c.Nome, '{nome}')";
        if (!string.IsNullOrEmpty(idioma))
            queryString += $" AND c.Idioma = '{idioma}'";
        if (duracaoMin.HasValue)
            queryString += $" AND c.Duracao >= {duracaoMin.Value}";

        var query = _container.GetItemQueryIterator<Video>(new QueryDefinition(queryString));
        List<Video> results = new();
        while (query.HasMoreResults)
        {
            var response = await query.ReadNextAsync();
            results.AddRange(response);
        }
        return results;
    }
}
```

**Arquivo:** `BlobStorageService.cs`

```csharp
using Azure.Storage.Blobs;

namespace Dioflix.Infrastructure;

public class BlobStorageService
{
    private readonly string _connectionString;
    private readonly string _containerName;

    public BlobStorageService(string connectionString, string containerName)
    {
        _connectionString = connectionString;
        _containerName = containerName;
    }

    public async Task<string> UploadFileAsync(Stream fileStream, string fileName, string contentType)
    {
        BlobServiceClient blobServiceClient = new(_connectionString);
        BlobContainerClient containerClient = blobServiceClient.GetBlobContainerClient(_containerName);
        await containerClient.CreateIfNotExistsAsync();
        BlobClient blobClient = containerClient.GetBlobClient(fileName);

        await blobClient.UploadAsync(fileStream, overwrite: true);
        return blobClient.Uri.ToString();
    }
}
```

---

### 3. **`Dioflix.Api`** - Controllers

**Arquivo:** `VideosController.cs`

```csharp
using Dioflix.Domain.Models;
using Dioflix.Infrastructure;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class VideosController : ControllerBase
{
    private readonly CosmosDbService _cosmosDbService;
    private readonly BlobStorageService _blobStorageService;

    public VideosController(CosmosDbService cosmosDbService, BlobStorageService blobStorageService)
    {
        _cosmosDbService = cosmosDbService;
        _blobStorageService = blobStorageService;
    }

    [HttpPost]
    public async Task<IActionResult> UploadVideo([FromForm] IFormFile file, [FromForm] Video video)
    {
        if (file == null || video == null) return BadRequest("Arquivo e metadados são obrigatórios");

        var blobUri = await _blobStorageService.UploadFileAsync(file.OpenReadStream(), file.FileName, file.ContentType);
        video.Descricao += $" [Video Blob URI: {blobUri}]";
        await _cosmosDbService.AddVideoAsync(video);

        return Created(blobUri, video);
    }

    [HttpGet]
    public async Task<IActionResult> GetVideos() =>
        Ok(await _cosmosDbService.GetVideosAsync());

    [HttpGet("filter")]
    public async Task<IActionResult> FilterVideos([FromQuery] string? nome, [FromQuery] string? idioma, [FromQuery] int? duracaoMin) =>
        Ok(await _cosmosDbService.FilterVideosAsync(nome, idioma, duracaoMin));
}
```

---

### 4. Configuração do Projeto

**Arquivo:** `Program.cs`

```csharp
using Dioflix.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton(new CosmosDbService(
    builder.Configuration["CosmosDB:Endpoint"],
    builder.Configuration["CosmosDB:Key"],
    builder.Configuration["CosmosDB:DatabaseId"],
    builder.Configuration["CosmosDB:ContainerId"]
));

builder.Services.AddSingleton(new BlobStorageService(
    builder.Configuration["BlobStorage:ConnectionString"],
    builder.Configuration["BlobStorage:ContainerName"]
));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();
app.UseAuthorization();
app.MapControllers();

app.Run();
```

**Arquivo:** `appsettings.json`

```json
{
  "CosmosDB": {
    "Endpoint": "https://<your-cosmosdb-account>.documents.azure.com:443/",
    "Key": "<your-cosmosdb-key>",
    "DatabaseId": "DioflixDb",
    "ContainerId": "Videos"
  },
  "BlobStorage": {
    "ConnectionString": "<your-storage-account-connection-string>",
    "ContainerName": "videos"
  }
}
```

---

## Deploy na Azure

1. **Configurar os Recursos na Azure**:
   - Crie uma **Storage Account** e copie a Connection String.
   - Crie um **Cosmos DB** com uma coleção `Videos` no banco `DioflixDb`.

2. **Publicação via Visual Studio**:
   - Configure a publicação no **Azure App Service**.

3. **Deploy via CLI**:
   - Compile o projeto:
     ```bash
     dotnet publish -c Release -o ./publish
     ```
   - Suba o serviço usando o comando:
     ```bash
     az webapp up --name DioflixApp --resource-group <seu-grupo> --plan <seu-plano>
     ```

4. **CI/CD com GitHub Actions** (opcional):
   - Configure um pipeline básico no GitHub Actions para automatizar o deploy.

5. **Teste sua API**:
   - Acesse `<seu-app>.azurewebsites.net/swagger` e verifique se todos os endpoints estão funcionando.

---

Pronto! Sua API Dioflix está configurada para uso e implantação na Azure. 🚀
