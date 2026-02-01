# Criando uma Azure Function para Validar CPF Usando .NET Core C#

## Pré-requisitos
1. Instale o [.NET 6 SDK ou superior](https://dotnet.microsoft.com/download).
2. Instale o [Azure Functions Core Tools](https://learn.microsoft.com/azure/azure-functions/functions-run-local#install-the-azure-functions-core-tools).
3. Instale o Visual Studio 2022 ou superior (ou um editor compatível, como VS Code) com suporte para desenvolvimento de Azure Functions.
4. Certifique-se de ter uma conta ativa no [Azure](https://portal.azure.com).

---

## Passo 1 - Criar um novo projeto de Azure Functions
1. Abra o terminal ou prompt de comando.
2. Execute o comando abaixo para criar um projeto de funções:
   ```bash
   func init CpfValidatorFunction --worker-runtime dotnet
   cd CpfValidatorFunction
   ```

---

## Passo 2 - Criar uma nova Function
1. No diretório do projeto, crie a function:
   ```bash
   func new
   ```
2. Escolha **HTTP trigger** como tipo da function.
3. Nomeie sua function como `ValidateCPF`.

---

## Passo 3 - Implementar a lógica de validação de CPF
Substitua o conteúdo do arquivo gerado `ValidateCPF.cs` pelo exemplo abaixo:

```csharp
using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace CpfValidatorFunction
{
    public static class ValidateCPF
    {
        [FunctionName("ValidateCPF")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("Processing request to validate CPF.");

            string cpf = req.Query["cpf"];

            if (string.IsNullOrEmpty(cpf))
            {
                return new BadRequestObjectResult("Please provide a CPF in the query string.");
            }

            if (IsValidCpf(cpf))
            {
                return new OkObjectResult($"CPF {cpf} is valid.");
            }
            else
            {
                return new BadRequestObjectResult($"CPF {cpf} is invalid.");
            }
        }

        private static bool IsValidCpf(string cpf)
        {
            cpf = cpf.Replace(".", "").Replace("-", "");
            
            if (cpf.Length != 11 || cpf.All(c => c == cpf[0]))
            {
                return false;
            }

            int[] multiplicador1 = { 10, 9, 8, 7, 6, 5, 4, 3, 2 };
            int[] multiplicador2 = { 11, 10, 9, 8, 7, 6, 5, 4, 3, 2 };

            string tempCpf = cpf.Substring(0, 9);
            int soma = tempCpf.Select((t, i) => int.Parse(t.ToString()) * multiplicador1[i]).Sum();

            int resto = soma % 11;
            resto = resto < 2 ? 0 : 11 - resto;
            string digito = resto.ToString();

            tempCpf = tempCpf + digito;
            soma = tempCpf.Select((t, i) => int.Parse(t.ToString()) * multiplicador2[i]).Sum();

            resto = soma % 11;
            resto = resto < 2 ? 0 : 11 - resto;
            digito = digito + resto;

            return cpf.EndsWith(digito);
        }
    }
}
```

---

## Passo 4 - Testar a Function Localmente
1. Execute sua Azure Function localmente:
   ```bash
   func start
   ```
2. Acesse a URL fornecida no console e adicione o parâmetro `?cpf=12345678909` para testar com um CPF válido ou inválido.

Exemplo de requisição para testes:
```bash
http://localhost:7071/api/ValidateCPF?cpf=12345678909
```

---

## Passo 5 - Publicar para o Azure
1. Faça login no CLI do Azure:
   ```bash
   az login
   ```
2. Crie um Azure Function App no Azure:
   ```bash
   az functionapp create --resource-group <ResourceGroup> --consumption-plan-location westeurope --runtime dotnet --name CpfValidatorFunctionApp --storage-account <StorageAccountName>
   ```
3. Implemente sua Azure Function para o app criado:
   ```bash
   func azure functionapp publish CpfValidatorFunctionApp
   ```

---

## Passo 6 - Testar no ambiente do Azure
1. Acesse o portal do Azure e navegue até o **Function App** que você publicou.
2. Copie a URL fornecida e realize uma chamada HTTP utilizando um software como Postman ou cURL:
   ```
   https://<CpfValidatorFunctionApp>.azurewebsites.net/api/ValidateCPF?cpf=12345678909
   ```

---

## Conclusão
Agora você tem uma Azure Function em C# que valida CPFs. Você pode expandir esta função adicionando autenticação, monitoramento por meio do Application Insights, ou até exportar logs detalhados para análises futuras.
