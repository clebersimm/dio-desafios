# User Stories - Cadastro de Usuário

## Epic: Gerenciamento de Usuários

### User Story: Cadastro de Usuário

**Como** um visitante do sistema  
**Eu quero** criar uma conta de usuário  
**Para que** eu possa acessar as funcionalidades da aplicação

---

#### Critérios de Aceitação

##### ✅ Cenário 1: Cadastro bem-sucedido
- **Dado** que sou um visitante sem conta no sistema
- **E** estou na página de cadastro
- **Quando** preencho todos os campos obrigatórios corretamente
- **E** aceito os termos de uso e política de privacidade
- **E** clico no botão "Criar Conta"
- **Então** devo receber uma confirmação de que a conta foi criada
- **E** devo receber um email de verificação
- **E** devo ser redirecionado para página de confirmação
- **E** minha conta deve ser criada com status "pendente verificação"

##### 📧 Cenário 2: Verificação de email
- **Dado** que criei uma conta e recebi email de verificação
- **Quando** clico no link de verificação no email
- **Então** minha conta deve ser ativada
- **E** devo ser redirecionado para página de login
- **E** devo ver mensagem "Email verificado com sucesso"

##### ❌ Cenário 3: Email já cadastrado
- **Dado** que estou na página de cadastro
- **Quando** insiro um email que já está registrado no sistema
- **E** preencho os demais campos
- **E** clico no botão "Criar Conta"
- **Então** devo ver mensagem "Este email já está cadastrado"
- **E** devo permanecer na página de cadastro
- **E** o campo email deve ser destacado com erro

##### ⚠️ Cenário 4: Validação de campos obrigatórios
- **Dado** que estou na página de cadastro
- **Quando** deixo campos obrigatórios vazios
- **E** clico no botão "Criar Conta"
- **Então** devo ver mensagens de validação específicas para cada campo
- **E** o formulário não deve ser submetido
- **E** os campos com erro devem ser destacados

##### 🔒 Cenário 5: Validação de senha segura
- **Dado** que estou preenchendo o campo senha
- **Quando** insiro uma senha que não atende aos critérios de segurança
- **Então** devo ver feedback em tempo real sobre a força da senha
- **E** devo ver quais critérios ainda não foram atendidos
- **E** não deve ser possível submeter com senha fraca

##### 🔄 Cenário 6: Confirmação de senha
- **Dado** que preenchi o campo senha
- **Quando** preencho o campo "Confirmar Senha" com valor diferente
- **Então** devo ver mensagem "As senhas não coincidem"
- **E** o campo deve ser destacado com erro
- **E** não deve ser possível submeter o formulário

##### 📜 Cenário 7: Termos e condições
- **Dado** que preenchi todos os campos corretamente
- **Quando** não marco a checkbox de aceite dos termos
- **E** clico no botão "Criar Conta"
- **Então** devo ver mensagem "Você deve aceitar os termos de uso"
- **E** o formulário não deve ser submetido

---

#### Regras de Negócio

1. **Email único**: Cada email pode ter apenas uma conta associada
2. **Senha segura**: Mínimo 8 caracteres, com maiúscula, minúscula, número e símbolo
3. **Verificação obrigatória**: Conta só é ativada após verificação do email
4. **Dados obrigatórios**: Nome, email, senha, confirmação de senha, aceite de termos
5. **Expiração do token**: Link de verificação expira em 24 horas
6. **Reenvio de verificação**: Permitir reenviar email até 3 vezes por hora
7. **Logs de auditoria**: Registrar tentativas de cadastro para análise

---

#### Definição de Pronto (DoD)

- [ ] Interface de cadastro implementada e responsiva
- [ ] Validação frontend de todos os campos
- [ ] Validação de força da senha em tempo real
- [ ] Integração com API de cadastro
- [ ] Sistema de verificação por email
- [ ] Tratamento de erros e feedback ao usuário
- [ ] Proteção contra spam/bots (captcha opcional)
- [ ] Testes unitários para componentes
- [ ] Testes de integração para fluxo completo
- [ ] Testes de validação de email
- [ ] Documentação da API atualizada
- [ ] Code review aprovado

---

#### Estimativa
**Story Points**: 13  
**Prioridade**: Alta  
**Sprint**: 1  
**Dependências**: Infraestrutura de email configurada

---

#### Tarefas Técnicas

##### Frontend
- [ ] Criar componente de formulário de cadastro
- [ ] Implementar validação em tempo real
- [ ] Criar indicador de força da senha
- [ ] Integrar com serviço de cadastro
- [ ] Implementar feedback visual (loading, sucesso, erros)
- [ ] Criar página de confirmação de cadastro
- [ ] Adicionar testes unitários

##### Backend
- [ ] Criar endpoint POST /auth/register
- [ ] Implementar validação de dados de entrada
- [ ] Verificar unicidade do email
- [ ] Gerar hash seguro da senha
- [ ] Criar sistema de tokens de verificação
- [ ] Implementar envio de email de verificação
- [ ] Criar endpoint de verificação GET /auth/verify/{token}
- [ ] Implementar rate limiting para cadastros
- [ ] Adicionar logs de auditoria
- [ ] Criar testes de integração

##### Infraestrutura
- [ ] Configurar serviço de email (SMTP/SES)
- [ ] Criar templates de email
- [ ] Configurar domínio para links de verificação

##### QA
- [ ] Criar casos de teste manuais
- [ ] Implementar testes automatizados E2E
- [ ] Testar cenários de segurança
- [ ] Validar responsividade
- [ ] Testar integração com email

---

#### Mockups/Wireframes

```
┌─────────────────────────────────────┐
│           CRIAR CONTA               │
├─────────────────────────────────────┤
│                                     │
│  Nome Completo: [_________________] │
│  Email:         [_________________] │
│  Senha:         [_________________] │
│                 Força: ●●●○○        │
│  Confirmar:     [_________________] │
│                                     │
│  [x] Aceito os termos de uso e      │
│      política de privacidade       │
│                                     │
│  [    CRIAR CONTA    ]             │
│                                     │
│  Já tem conta? Faça login          │
│                                     │
└─────────────────────────────────────┘
```

---

## Fluxos Relacionados

### Fluxo Principal: Cadastro Completo
1. **Usuário acessa** página de cadastro
2. **Preenche formulário** com dados pessoais
3. **Sistema valida** dados em tempo real
4. **Usuário submete** formulário
5. **Sistema cria** conta pendente
6. **Sistema envia** email de verificação
7. **Usuário clica** no link do email
8. **Sistema ativa** a conta
9. **Usuário pode** fazer login

### Fluxo Alternativo: Reenvio de Verificação
1. **Usuário não recebe** email de verificação
2. **Acessa página** de reenvio
3. **Informa email** cadastrado
4. **Sistema reenvia** email (se dentro do limite)
5. **Usuário recebe** novo email

---

## Validações Detalhadas

### Campo Nome
- **Obrigatório**: Sim
- **Mínimo**: 2 caracteres
- **Máximo**: 100 caracteres
- **Formato**: Apenas letras e espaços
- **Mensagem erro**: "Nome deve ter entre 2 e 100 caracteres"

### Campo Email
- **Obrigatório**: Sim
- **Formato**: Validação RFC 5322
- **Unicidade**: Verificar se já existe
- **Máximo**: 255 caracteres
- **Mensagem erro**: "Formato de email inválido" / "Email já cadastrado"

### Campo Senha
- **Obrigatório**: Sim
- **Mínimo**: 8 caracteres
- **Máximo**: 128 caracteres
- **Critérios**:
  - Pelo menos 1 letra minúscula
  - Pelo menos 1 letra maiúscula
  - Pelo menos 1 número
  - Pelo menos 1 símbolo especial
- **Indicador visual**: Barra de força da senha

### Campo Confirmar Senha
- **Obrigatório**: Sim
- **Validação**: Deve ser idêntica à senha
- **Mensagem erro**: "As senhas não coincidem"

---

## User Stories Relacionadas

### US-006: Verificação de Email
**Como** um usuário que se cadastrou  
**Eu quero** verificar meu email  
**Para que** minha conta seja ativada

**Prioridade**: Alta  
**Dependência**: US-004 (Cadastro)

### US-007: Reenvio de Email de Verificação
**Como** um usuário que não recebeu o email  
**Eu quero** solicitar reenvio da verificação  
**Para que** eu possa ativar minha conta

**Prioridade**: Média  
**Dependência**: US-004 (Cadastro)

### US-008: Recuperação de Conta Não Verificada
**Como** um usuário com conta não verificada  
**Eu quero** reativar o processo de verificação  
**Para que** eu possa usar minha conta

**Prioridade**: Baixa  
**Dependência**: US-004 (Cadastro)

### US-009: Validação de Dados em Tempo Real
**Como** um usuário preenchendo o cadastro  
**Eu quero** ver feedback imediato sobre os dados  
**Para que** eu possa corrigir erros antes de submeter

**Prioridade**: Média  
**Relacionada com**: US-004 (Cadastro)

---

## Critérios de Aceitação para Testes

### Testes Funcionais
1. **Cadastro válido** - Dados corretos devem criar conta
2. **Email único** - Emails duplicados devem ser rejeitados
3. **Senha segura** - Senhas fracas devem ser rejeitadas
4. **Verificação email** - Link deve ativar conta
5. **Campos obrigatórios** - Validação deve impedir submissão incompleta

### Testes de Validação
1. **Formato email** - Validar formato RFC 5322
2. **Força senha** - Verificar critérios de segurança
3. **Confirmação senha** - Senhas devem coincidir
4. **Termos aceitos** - Checkbox deve estar marcada
5. **Caracteres especiais** - Tratar entrada com caracteres especiais

### Testes de Integração
1. **Envio email** - Verificar entrega do email de verificação
2. **Token válido** - Link de verificação deve funcionar
3. **Token expirado** - Links antigos devem ser rejeitados
4. **Ativação conta** - Status deve mudar após verificação

### Testes de Segurança
1. **SQL Injection** - Campos protegidos contra injeção
2. **XSS** - Sanitização de entrada de dados
3. **CSRF** - Proteção contra ataques de requisição forjada
4. **Rate limiting** - Prevenir spam de cadastros
5. **Hash senha** - Senhas devem ser hasheadas com salt

### Testes de Performance
1. **Tempo resposta** - Cadastro deve completar em menos de 3 segundos
2. **Envio email** - Email deve ser enviado em menos de 5 segundos
3. **Validação tempo real** - Feedback deve ser instantâneo
4. **Concurrent users** - Sistema deve suportar múltiplos cadastros

### Testes de Usabilidade
1. **Interface intuitiva** - Formulário claro e fácil de usar
2. **Mensagens claras** - Erros compreensíveis
3. **Indicadores visuais** - Força da senha visível
4. **Responsividade** - Funcionar em mobile e desktop
5. **Acessibilidade** - Seguir padrões WCAG

---

## Especificações Técnicas

### API Endpoints

#### POST /api/auth/register
```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "MinhaSenh@123",
  "password_confirmation": "MinhaSenh@123",
  "terms_accepted": true
}
```

**Response Success (201)**:
```json
{
  "message": "Conta criada com sucesso. Verifique seu email.",
  "user_id": "uuid-123",
  "verification_required": true
}
```

**Response Error (422)**:
```json
{
  "message": "Dados inválidos",
  "errors": {
    "email": ["Email já está cadastrado"],
    "password": ["Senha deve ter pelo menos 8 caracteres"]
  }
}
```

#### GET /api/auth/verify/{token}
**Response Success (200)**:
```json
{
  "message": "Email verificado com sucesso",
  "user": {
    "id": "uuid-123",
    "name": "João Silva",
    "email": "joao@email.com",
    "verified_at": "2025-07-13T10:30:00Z"
  }
}
```

### Códigos de Erro
- **400**: Bad Request - Dados malformados
- **422**: Unprocessable Entity - Validação falhou
- **429**: Too Many Requests - Rate limit excedido
- **500**: Internal Server Error - Erro interno

### Email Template
- **Assunto**: "Confirme seu cadastro - [Nome da Aplicação]"
- **Conteúdo**: HTML responsivo com link de verificação
- **Expiração**: 24 horas
- **Remetente**: noreply@aplicacao.com

---

## Métricas e Monitoramento

### KPIs
- **Taxa de conversão**: % de visitantes que completam cadastro
- **Taxa de verificação**: % de usuários que verificam email
- **Tempo médio**: Tempo para completar cadastro
- **Taxa de erro**: % de cadastros que falham
- **Abandono**: Em qual etapa usuários desistem

### Logs de Auditoria
- Tentativas de cadastro (sucesso/falha)
- Emails enviados e status de entrega
- Verificações de email realizadas
- IPs e user agents para análise de segurança

---

## Considerações de Acessibilidade

- **ARIA labels** em todos os campos
- **Navegação por teclado** funcional
- **Contraste adequado** para leitura
- **Screen reader** compatível
- **Textos alternativos** para elementos visuais

---

*Última atualização: 13 de julho de 2025*