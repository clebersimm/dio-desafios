# User Stories - Sistema de Autenticação

## Epic: Gerenciamento de Usuários

### User Story: Login de Usuário

**Como** um usuário registrado  
**Eu quero** fazer login no sistema  
**Para que** eu possa acessar as funcionalidades da aplicação

---

#### Critérios de Aceitação

##### ✅ Cenário 1: Login bem-sucedido
- **Dado** que sou um usuário registrado no sistema
- **E** estou na página de login
- **Quando** insiro meu email/username válido
- **E** insiro minha senha correta
- **E** clico no botão "Entrar"
- **Então** devo ser redirecionado para a página inicial/dashboard
- **E** devo ver uma mensagem de boas-vindas
- **E** minha sessão deve ser criada

##### ❌ Cenário 2: Login com credenciais inválidas
- **Dado** que estou na página de login
- **Quando** insiro um email/username inválido
- **Ou** insiro uma senha incorreta
- **E** clico no botão "Entrar"
- **Então** devo ver uma mensagem de erro "Email ou senha inválidos"
- **E** devo permanecer na página de login
- **E** os campos devem ser limpos (opcional)

##### ⚠️ Cenário 3: Campos obrigatórios
- **Dado** que estou na página de login
- **Quando** deixo o campo email/username vazio
- **Ou** deixo o campo senha vazio
- **E** clico no botão "Entrar"
- **Então** devo ver mensagens de validação nos campos obrigatórios
- **E** o formulário não deve ser submetido

##### 🔒 Cenário 4: Proteção contra ataques de força bruta
- **Dado** que tentei fazer login 5 vezes consecutivas com credenciais inválidas
- **Quando** tento fazer login novamente
- **Então** devo ver uma mensagem "Muitas tentativas. Tente novamente em 15 minutos"
- **E** o botão de login deve ficar desabilitado temporariamente
- **E** um captcha pode ser exibido (opcional)

##### 📱 Cenário 5: Lembrar-me (opcional)
- **Dado** que estou na página de login
- **E** marco a opção "Lembrar-me"
- **Quando** faço login com sucesso
- **Então** minha sessão deve permanecer ativa por mais tempo
- **E** não devo precisar fazer login novamente por 30 dias

---

#### Regras de Negócio

1. **Autenticação**: Email/username + senha
2. **Segurança**: Senhas devem ser hasheadas no backend
3. **Tentativas**: Máximo 5 tentativas por IP por período de 15 minutos
4. **Sessão**: Token JWT com expiração de 24 horas (ou configurável)
5. **Redirecionamento**: Após login, redirecionar para página de origem ou dashboard
6. **Logs**: Registrar tentativas de login (sucesso e falha) para auditoria

---

#### Definição de Pronto (DoD)

- [ ] Interface de login implementada e responsiva
- [ ] Validação frontend dos campos obrigatórios
- [ ] Integração com API de autenticação
- [ ] Tratamento de erros e feedback ao usuário
- [ ] Implementação de proteção contra força bruta
- [ ] Testes unitários para componentes
- [ ] Testes de integração para fluxo de login
- [ ] Testes de segurança básicos
- [ ] Documentação da API atualizada
- [ ] Code review aprovado

---

#### Estimativa
**Story Points**: 8  
**Prioridade**: Alta  
**Sprint**: 1

---

#### Tarefas Técnicas

##### Frontend
- [ ] Criar componente de formulário de login
- [ ] Implementar validação de campos
- [ ] Integrar com serviço de autenticação
- [ ] Implementar feedback visual (loading, erros)
- [ ] Adicionar testes unitários

##### Backend
- [ ] Criar endpoint POST /auth/login
- [ ] Implementar validação de credenciais
- [ ] Gerar token JWT
- [ ] Implementar rate limiting
- [ ] Adicionar logs de auditoria
- [ ] Criar testes de integração

##### QA
- [ ] Criar casos de teste manuais
- [ ] Implementar testes automatizados E2E
- [ ] Testar cenários de segurança
- [ ] Validar responsividade

---

#### Mockups/Wireframes

```
┌─────────────────────────────────┐
│           LOGIN                 │
├─────────────────────────────────┤
│                                 │
│  Email/Username: [____________] │
│  Senha:         [____________]  │
│                                 │
│  [ ] Lembrar-me                 │
│                                 │
│  [     ENTRAR     ]             │
│                                 │
│  Esqueceu a senha?              │
│  Não tem conta? Registre-se     │
│                                 │
└─────────────────────────────────┘
```

---

## User Stories Relacionadas

### US-002: Esqueci Minha Senha
**Como** um usuário registrado  
**Eu quero** recuperar minha senha  
**Para que** eu possa acessar minha conta novamente

**Prioridade**: Média  
**Dependência**: US-001 (Login)

### US-003: Logout
**Como** um usuário logado  
**Eu quero** fazer logout do sistema  
**Para que** eu possa sair com segurança da minha conta

**Prioridade**: Alta  
**Dependência**: US-001 (Login)

### US-004: Registro de Usuário
**Como** um visitante  
**Eu quero** criar uma conta no sistema  
**Para que** eu possa fazer login e usar a aplicação

**Prioridade**: Alta  
**Relacionada com**: US-001 (Login)

### US-005: Autenticação em Dois Fatores (2FA)
**Como** um usuário preocupado com segurança  
**Eu quero** ativar autenticação em dois fatores  
**Para que** minha conta tenha uma camada extra de proteção

**Prioridade**: Baixa  
**Dependência**: US-001 (Login)

---

## Critérios de Aceitação para Testes

### Testes Funcionais
1. **Login válido** - Credenciais corretas devem permitir acesso
2. **Login inválido** - Credenciais incorretas devem ser rejeitadas
3. **Campos obrigatórios** - Validação deve impedir submissão sem dados
4. **Rate limiting** - Muitas tentativas devem ser bloqueadas
5. **Redirecionamento** - Usuário deve ir para página correta após login

### Testes de Segurança
1. **SQL Injection** - Campos devem ser protegidos contra injeção
2. **XSS** - Entrada de dados deve ser sanitizada
3. **Força bruta** - Sistema deve resistir a ataques automatizados
4. **Token seguro** - JWT deve ser gerado com assinatura válida

### Testes de Performance
1. **Tempo de resposta** - Login deve completar em menos de 2 segundos
2. **Concurrent users** - Sistema deve suportar múltiplos logins simultâneos
3. **Rate limiting** - Proteção não deve afetar usuários legítimos

### Testes de Usabilidade
1. **Interface intuitiva** - Formulário deve ser claro e fácil de usar
2. **Mensagens claras** - Erros devem ser compreensíveis
3. **Responsividade** - Interface deve funcionar em mobile e desktop
4. **Acessibilidade** - Deve seguir padrões WCAG

---

## Notas Adicionais

- **API Endpoint**: `POST /api/auth/login`
- **Response Format**: JSON com token e informações do usuário
- **Error Codes**: 401 (Unauthorized), 429 (Too Many Requests), 422 (Validation Error)
- **Logs**: Incluir IP, timestamp, user agent para auditoria
- **Métricas**: Monitorar taxa de sucesso/falha de logins

---

*Última atualização: 13 de julho de 2025*