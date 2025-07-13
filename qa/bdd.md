# Behavior Driven Development (BDD) - Autenticação de Usuários

## O que é BDD?

BDD é uma metodologia que utiliza linguagem natural para descrever o comportamento esperado do sistema, facilitando a comunicação entre desenvolvedores, testadores e stakeholders.

**Estrutura**: `Given` (Dado) → `When` (Quando) → `Then` (Então)

---

# 🔐 BDD - LOGIN DE USUÁRIO

## Feature: Login de Usuário
```gherkin
Feature: Login de Usuário
  Como um usuário registrado
  Eu quero fazer login no sistema
  Para que eu possa acessar minha conta e usar as funcionalidades
```

### Cenário 1: Login com sucesso
```gherkin
Scenario: Login com credenciais válidas
  Given que sou um usuário registrado no sistema
  And estou na página de login
  When eu preencho o campo "email" com "usuario@teste.com"
  And eu preencho o campo "senha" com "minhasenha123"
  And eu clico no botão "Entrar"
  Then eu devo ser redirecionado para a página inicial
  And eu devo ver a mensagem "Bem-vindo de volta!"
  And minha sessão deve estar ativa
```

### Cenário 2: Login com email inválido
```gherkin
Scenario: Tentativa de login com email inexistente
  Given que estou na página de login
  When eu preencho o campo "email" com "naoexiste@teste.com"
  And eu preencho o campo "senha" com "qualquersenha"
  And eu clico no botão "Entrar"
  Then eu devo permanecer na página de login
  And eu devo ver a mensagem de erro "Email ou senha inválidos"
  And os campos devem permanecer preenchidos
```

### Cenário 3: Login com senha incorreta
```gherkin
Scenario: Tentativa de login com senha errada
  Given que sou um usuário registrado com email "usuario@teste.com"
  And estou na página de login
  When eu preencho o campo "email" com "usuario@teste.com"
  And eu preencho o campo "senha" com "senhaerrada"
  And eu clico no botão "Entrar"
  Then eu devo permanecer na página de login
  And eu devo ver a mensagem de erro "Email ou senha inválidos"
```

### Cenário 4: Campos obrigatórios vazios
```gherkin
Scenario: Tentativa de login sem preencher campos
  Given que estou na página de login
  When eu deixo o campo "email" vazio
  And eu deixo o campo "senha" vazio
  And eu clico no botão "Entrar"
  Then eu devo ver a mensagem "Email é obrigatório"
  And eu devo ver a mensagem "Senha é obrigatória"
  And o formulário não deve ser enviado
```

### Cenário 5: Proteção contra ataques de força bruta
```gherkin
Scenario: Bloqueio após múltiplas tentativas inválidas
  Given que tentei fazer login 5 vezes com credenciais inválidas
  When eu tento fazer login novamente
  Then eu devo ver a mensagem "Muitas tentativas. Tente novamente em 15 minutos"
  And o botão "Entrar" deve estar desabilitado
  And um captcha deve aparecer na tela
```

### Cenário 6: Função "Lembrar-me"
```gherkin
Scenario: Login com opção lembrar-me ativada
  Given que estou na página de login
  When eu preencho o campo "email" com "usuario@teste.com"
  And eu preencho o campo "senha" com "minhasenha123"
  And eu marco a opção "Lembrar-me"
  And eu clico no botão "Entrar"
  Then eu devo ser redirecionado para a página inicial
  And minha sessão deve durar 30 dias
  And eu não devo precisar fazer login novamente por 30 dias
```

---

# 📝 BDD - CADASTRO DE USUÁRIO

## Feature: Cadastro de Usuário
```gherkin
Feature: Cadastro de Usuário
  Como um visitante do sistema
  Eu quero criar uma conta de usuário
  Para que eu possa acessar as funcionalidades da aplicação
```

### Cenário 1: Cadastro com sucesso
```gherkin
Scenario: Cadastro com dados válidos
  Given que sou um visitante sem conta no sistema
  And estou na página de cadastro
  When eu preencho o campo "nome" com "João Silva"
  And eu preencho o campo "email" com "joao@teste.com"
  And eu preencho o campo "senha" com "MinhaSenh@123"
  And eu preencho o campo "confirmar senha" com "MinhaSenh@123"
  And eu marco a checkbox "Aceito os termos de uso"
  And eu clico no botão "Criar Conta"
  Then eu devo ver a mensagem "Conta criada com sucesso!"
  And eu devo ser redirecionado para a página de confirmação
  And eu devo receber um email de verificação
```

### Cenário 2: Email já cadastrado
```gherkin
Scenario: Tentativa de cadastro com email existente
  Given que existe um usuário com email "usuario@teste.com"
  And estou na página de cadastro
  When eu preencho o campo "nome" com "Maria Santos"
  And eu preencho o campo "email" com "usuario@teste.com"
  And eu preencho o campo "senha" com "OutraSenh@456"
  And eu preencho o campo "confirmar senha" com "OutraSenh@456"
  And eu marco a checkbox "Aceito os termos de uso"
  And eu clico no botão "Criar Conta"
  Then eu devo ver a mensagem "Este email já está cadastrado"
  And eu devo permanecer na página de cadastro
  And o campo email deve estar destacado em vermelho
```

### Cenário 3: Senhas não coincidem
```gherkin
Scenario: Confirmação de senha diferente
  Given que estou na página de cadastro
  When eu preencho o campo "nome" com "Pedro Costa"
  And eu preencho o campo "email" com "pedro@teste.com"
  And eu preencho o campo "senha" com "MinhaSenh@123"
  And eu preencho o campo "confirmar senha" com "SenhaDiferente456"
  And eu marco a checkbox "Aceito os termos de uso"
  And eu clico no botão "Criar Conta"
  Then eu devo ver a mensagem "As senhas não coincidem"
  And o campo "confirmar senha" deve estar destacado em vermelho
  And o formulário não deve ser enviado
```

### Cenário 4: Senha fraca
```gherkin
Scenario: Cadastro com senha que não atende critérios
  Given que estou na página de cadastro
  When eu preencho o campo "nome" com "Ana Lima"
  And eu preencho o campo "email" com "ana@teste.com"
  And eu preencho o campo "senha" com "123456"
  And eu preencho o campo "confirmar senha" com "123456"
  And eu marco a checkbox "Aceito os termos de uso"
  And eu clico no botão "Criar Conta"
  Then eu devo ver a mensagem "Senha deve ter pelo menos 8 caracteres"
  And eu devo ver a mensagem "Senha deve conter letra maiúscula"
  And eu devo ver a mensagem "Senha deve conter símbolo especial"
  And o indicador de força deve mostrar "Fraca"
```

### Cenário 5: Campos obrigatórios não preenchidos
```gherkin
Scenario: Tentativa de cadastro com campos vazios
  Given que estou na página de cadastro
  When eu deixo o campo "nome" vazio
  And eu deixo o campo "email" vazio
  And eu deixo o campo "senha" vazio
  And eu clico no botão "Criar Conta"
  Then eu devo ver a mensagem "Nome é obrigatório"
  And eu devo ver a mensagem "Email é obrigatório"
  And eu devo ver a mensagem "Senha é obrigatória"
  And o formulário não deve ser enviado
```

### Cenário 6: Termos não aceitos
```gherkin
Scenario: Cadastro sem aceitar termos de uso
  Given que estou na página de cadastro
  When eu preencho todos os campos corretamente
  And eu NÃO marco a checkbox "Aceito os termos de uso"
  And eu clico no botão "Criar Conta"
  Then eu devo ver a mensagem "Você deve aceitar os termos de uso"
  And a checkbox deve estar destacada em vermelho
  And o formulário não deve ser enviado
```

### Cenário 7: Verificação de email
```gherkin
Scenario: Ativação da conta via email
  Given que criei uma conta com sucesso
  And recebi um email de verificação
  When eu clico no link de verificação no email
  Then eu devo ser redirecionado para a página de login
  And eu devo ver a mensagem "Email verificado com sucesso!"
  And minha conta deve estar ativa
  And eu devo conseguir fazer login
```

### Cenário 8: Link de verificação expirado
```gherkin
Scenario: Tentativa de verificação com link expirado
  Given que criei uma conta há mais de 24 horas
  And recebi um email de verificação
  When eu clico no link de verificação expirado
  Then eu devo ver a mensagem "Link de verificação expirado"
  And eu devo ter a opção "Reenviar email de verificação"
  And minha conta deve permanecer inativa
```

---

# 🛠️ Como Implementar esses Cenários

## Estrutura de Arquivos BDD

```
tests/
├── features/
│   ├── login.feature
│   └── cadastro.feature
├── step_definitions/
│   ├── login_steps.js
│   └── cadastro_steps.js
└── support/
    ├── hooks.js
    └── world.js
```

## Exemplo de Step Definition (JavaScript + Cucumber)

### Login Steps
```javascript
// login_steps.js
Given('que sou um usuário registrado no sistema', function () {
  // Criar usuário no banco de teste
  this.user = {
    email: 'usuario@teste.com',
    password: 'minhasenha123'
  };
});

Given('estou na página de login', function () {
  // Navegar para página de login
  cy.visit('/login');
});

When('eu preencho o campo {string} com {string}', function (campo, valor) {
  // Preencher campo específico
  cy.get(`[data-testid="${campo}"]`).type(valor);
});

When('eu clico no botão {string}', function (botao) {
  // Clicar no botão específico
  cy.get(`[data-testid="${botao}"]`).click();
});

Then('eu devo ser redirecionado para a página inicial', function () {
  // Verificar redirecionamento
  cy.url().should('include', '/dashboard');
});
```

## Ferramentas Recomendadas

### Para JavaScript
- **Cucumber.js** + **Cypress**: Testes E2E
- **Jest** + **Cucumber**: Testes unitários BDD

### Para Python
- **Behave**: Framework BDD nativo
- **Pytest-BDD**: Integração com pytest

### Para Java
- **Cucumber-JVM**: Framework padrão
- **Serenity BDD**: Framework mais avançado

### Para C#
- **SpecFlow**: Framework .NET
- **BDDfy**: Framework alternativo

---

# 📊 Relatórios BDD

## Exemplo de Relatório de Execução

```
Feature: Login de Usuário                    ✅ 6/6 Passed
├── Login com credenciais válidas            ✅ Passed (2.3s)
├── Login com email inválido                 ✅ Passed (1.8s)
├── Login com senha incorreta                ✅ Passed (1.9s)
├── Campos obrigatórios vazios               ✅ Passed (1.2s)
├── Proteção contra força bruta              ✅ Passed (3.1s)
└── Função "Lembrar-me"                      ✅ Passed (2.5s)

Feature: Cadastro de Usuário                 ✅ 8/8 Passed
├── Cadastro com dados válidos               ✅ Passed (4.2s)
├── Email já cadastrado                      ✅ Passed (2.1s)
├── Senhas não coincidem                     ✅ Passed (1.7s)
├── Senha fraca                              ✅ Passed (2.3s)
├── Campos obrigatórios vazios               ✅ Passed (1.5s)
├── Termos não aceitos                       ✅ Passed (1.8s)
├── Verificação de email                     ✅ Passed (5.1s)
└── Link de verificação expirado             ✅ Passed (3.2s)

Total: 14 scenarios, 14 passed, 0 failed
Execution time: 29.6 seconds
```

---

# 🎯 Benefícios do BDD

## ✅ **Para a Equipe**
- **Comunicação clara** entre todos os membros
- **Documentação viva** que sempre está atualizada
- **Testes automatizados** que verificam comportamento real
- **Redução de bugs** em produção

## ✅ **Para o Negócio**
- **Validação** de que software atende requisitos
- **Confiança** nas entregas
- **Feedback rápido** sobre funcionalidades
- **Melhoria contínua** baseada em comportamentos reais

---

*Documento criado em: 13 de julho de 2025*
*Baseado nas melhores práticas de BDD*