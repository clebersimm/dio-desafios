# Mind Map - Cadastro de Usuário

```
                                    CADASTRO DE USUÁRIO
                                           |
                    ┌──────────────────────┼──────────────────────┐
                    │                      │                      │
                ENTRADA                PROCESSO               RESULTADO
                    │                      │                      │
          ┌─────────┼─────────┐           │           ┌─────────┼─────────┐
          │         │         │           │           │         │         │
      CAMPOS    VALIDAÇÕES  AÇÕES        │       SUCESSO   ERRO    FLUXOS
          │         │         │           │           │         │         │
          │         │         │           │           │         │         │
     ┌────┼────┐    │    ┌────┼────┐      │      ┌────┼────┐    │    ┌────┼────┐
     │    │    │    │    │    │    │      │      │    │    │    │    │    │    │
   Nome Email Senha │  Real- Força Submit │   Conta Email  │  Msgs  │  Login Verify
     │    │    │    │   Time  │    │      │   Criada │    │   Erro  │    │    │
     │    │    │    │    │    │    │      │     │    │    │    │    │    │    │
     │    │    │    │    │    │    │      │     │    │    │    │    │    │    │
   [Req] [Uniq] [8+] │   [JS] [●●●] [BTN]  │   [DB] [SMTP] │  [UI]  │  [Auth] [Link]
     │    │    │    │    │    │    │      │     │    │    │    │    │    │    │
     │    │    │    │    │    │    │      │     │    │    │    │    │    │    │
   2-100 RFC  Crit  │   Inst Indic Valid  │   Pend  24h   │  Toast │  Redir Token
   chars 5322  Mix   │    │    │    │      │   Stat  Exp   │  Alert │   Page  Exp
     │    │    │    │    │    │    │      │     │    │    │    │    │    │    │
     │    │    │    │    │    │    │      │     │    │    │    │    │    │    │
   Regex Email Hash  │   Fast Bars Rules  │   User Email  │  Field │  Login 24h
   Valid Check bcr   │   Feed Color Check  │   Created     │  High  │  Page  Limit
         Exist ypt   │   back    s    s    │   Record      │  light │       
               10    │                     │               │        │       
```

## Estrutura Detalhada

### 🎯 **CORE STORY**
```
┌─────────────────────────────────────────────┐
│  "Como visitante, quero criar uma conta     │
│   para acessar as funcionalidades"         │
└─────────────────────────────────────────────┘
                        │
                        ▼
```

### 📝 **CAMPOS DE ENTRADA**
```
                    FORMULÁRIO
                        │
        ┌───────────────┼───────────────┐
        │               │               │
   NOME COMPLETO    EMAIL ÚNICO    SENHA SEGURA
        │               │               │
    ┌───┴───┐       ┌───┴───┐       ┌───┴───┐
    │ Min 2 │       │ RFC   │       │ 8+    │
    │ Max100│       │ 5322  │       │ Mix   │
    │ Regex │       │ Exist?│       │ Hash  │
    └───────┘       └───────┘       └───────┘
                                        │
                                    ┌───┴───┐
                                    │CONFIRM│
                                    │ Match │
                                    └───────┘
```

### ⚡ **VALIDAÇÕES EM TEMPO REAL**
```
            VALIDAÇÃO DINÂMICA
                    │
    ┌───────────────┼───────────────┐
    │               │               │
FORÇA SENHA    EMAIL EXIST    MATCH CONFIRM
    │               │               │
┌───┴───┐       ┌───┴───┐       ┌───┴───┐
│●●●○○  │       │ AJAX  │       │ JS    │
│Indic  │       │ Check │       │ Event │
│Visual │       │ API   │       │ Live  │
└───────┘       └───────┘       └───────┘
```

### 🔄 **FLUXO DE PROCESSOS**
```
                    SUBMISSÃO
                        │
            ┌───────────┼───────────┐
            │           │           │
      VALIDAÇÃO    CRIAÇÃO     NOTIFICAÇÃO
        FRONT       BACK          EMAIL
            │           │           │
        ┌───┴───┐   ┌───┴───┐   ┌───┴───┐
        │ JS    │   │ API   │   │ SMTP  │
        │ Rules │   │ Hash  │   │ Queue │
        │ Check │   │ Store │   │ Send  │
        └───────┘   └───────┘   └───────┘
                        │
                    ┌───┴───┐
                    │ STATUS│
                    │PENDING│
                    │VERIFY │
                    └───────┘
```

### ✅ **CENÁRIOS DE SUCESSO**
```
                CADASTRO OK
                     │
        ┌────────────┼────────────┐
        │            │            │
   CONTA CRIADA  EMAIL SENT   REDIRECT
        │            │            │
    ┌───┴───┐    ┌───┴───┐    ┌───┴───┐
    │ DB    │    │ SMTP  │    │ PAGE  │
    │ User  │    │ Verify│    │ Conf  │
    │ Saved │    │ Link  │    │ irm   │
    └───────┘    └───────┘    └───────┘
                     │
                 ┌───┴───┐
                 │ 24h   │
                 │ Exp   │
                 │ Token │
                 └───────┘
```

### ❌ **CENÁRIOS DE ERRO**
```
                TRATAMENTO ERROS
                       │
        ┌──────────────┼──────────────┐
        │              │              │
   VALIDAÇÃO      EMAIL EXIST    SISTEMA
    CAMPOS           DUP          ERROR
        │              │              │
    ┌───┴───┐      ┌───┴───┐      ┌───┴───┐
    │ Toast │      │ Alert │      │ 500   │
    │ Field │      │ Msg   │      │ Retry │
    │ High  │      │ Email │      │ Log   │
    └───────┘      └───────┘      └───────┘
```

### 🔗 **STORIES CONECTADAS**
```
            CADASTRO (PRINCIPAL)
                    │
    ┌───────────────┼───────────────┐
    │               │               │
VERIFICAÇÃO     REENVIO         LOGIN
  EMAIL          EMAIL           AUTH
    │               │               │
┌───┴───┐       ┌───┴───┐       ┌───┴───┐
│ Link  │       │ 3x    │       │ After │
│ Click │       │ Hour  │       │ Verify│
│ Active│       │ Limit │       │ Ready │
└───────┘       └───────┘       └───────┘
```

## Mapa de Testes

### 🧪 **ESTRATÉGIA DE TESTES**
```
                    TESTES
                      │
        ┌─────────────┼─────────────┐
        │             │             │
   FUNCIONAIS     SEGURANÇA      PERFORMANCE
        │             │             │
        │             │             │
    ┌───┴───┐     ┌───┴───┐     ┌───┴───┐
    │ E2E   │     │ SQL   │     │ Load  │
    │ Unit  │     │ XSS   │     │ Stress│
    │ Integ │     │ CSRF  │     │ Time  │
    └───────┘     └───────┘     └───────┘
        │             │             │
    ┌───┴───┐     ┌───┴───┐     ┌───┴───┐
    │ Happy │     │ Auth  │     │ <3s   │
    │ Sad   │     │ Rate  │     │ Conc  │
    │ Edge  │     │ Limit │     │ Users │
    └───────┘     └───────┘     └───────┘
```

### 📊 **CRITÉRIOS DE ACEITAÇÃO**
```
                ACCEPTANCE CRITERIA
                        │
        ┌───────────────┼───────────────┐
        │               │               │
    MUST HAVE       SHOULD HAVE     NICE TO HAVE
        │               │               │
    ┌───┴───┐       ┌───┴───┐       ┌───┴───┐
    │ Form  │       │ Real  │       │ Social│
    │ Valid │       │ Time  │       │ Login │
    │ Email │       │ Feed  │       │ 2FA   │
    │ Verify│       │ back  │       │ Avatar│
    └───────┘       └───────┘       └───────┘
```

## Estados do Sistema

### 🔄 **ESTADOS DA CONTA**
```
    GUEST ──────► PENDING ──────► ACTIVE
      │              │              │
      │              │              │
   [Register]    [Verify]       [Login]
      │              │              │
      │              ▼              │
      │          EXPIRED ◄──────────┘
      │              │         [24h timeout]
      │              │
      └──────────────┼──────────────┐
                     │              │
                 [Resend]       [New Register]
                     │              │
                     ▼              ▼
                  PENDING         GUEST
```

### 📱 **FLUXO DE UX/UI**
```
                 USER JOURNEY
                      │
        ┌─────────────┼─────────────┐
        │             │             │
    DISCOVERY      ACTION         RESULT
        │             │             │
    ┌───┴───┐     ┌───┴───┐     ┌───┴───┐
    │ Land  │     │ Fill  │     │ Conf  │
    │ Page  │     │ Form  │     │ Page  │
    │ CTA   │     │ Valid │     │ Email │
    └───────┘     └───────┘     └───────┘
        │             │             │
    ┌───┴───┐     ┌───┴───┐     ┌───┴───┐
    │ Sign  │     │ Real  │     │ Verify│
    │ Up    │     │ Time  │     │ Click │
    │ Button│     │ Check │     │ Active│
    └───────┘     └───────┘     └───────┘
```

## Arquitetura Técnica

### 🏗️ **COMPONENTES DO SISTEMA**
```
                    FRONTEND
                        │
            ┌───────────┼───────────┐
            │           │           │
        REACT       VALIDATION   STATE MGT
      COMPONENT       LOGIC        REDUX
            │           │           │
        ┌───┴───┐   ┌───┴───┐   ┌───┴───┐
        │ Form  │   │ Yup   │   │ Store │
        │ Hook  │   │ Joi   │   │ Action│
        │ UI    │   │ Zod   │   │ Reduce│
        └───────┘   └───────┘   └───────┘
                        │
                    BACKEND
                        │
            ┌───────────┼───────────┐
            │           │           │
        API LAYER    BUSINESS     DATA LAYER
        EXPRESS       LOGIC       DATABASE
            │           │           │
        ┌───┴───┐   ┌───┴───┐   ┌───┴───┐
        │ Route │   │ Hash  │   │ User  │
        │ Valid │   │ Email │   │ Model │
        │ Auth  │   │ Token │   │ Schema│
        └───────┘   └───────┘   └───────┘
```

### 🔐 **SEGURANÇA**
```
                   SECURITY
                      │
        ┌─────────────┼─────────────┐
        │             │             │
   PREVENTION     DETECTION      RESPONSE
        │             │             │
    ┌───┴───┐     ┌───┴───┐     ┌───┴───┐
    │ Hash  │     │ Log   │     │ Block │
    │ Valid │     │ Audit │     │ Alert │
    │ Rate  │     │ Monitor│     │ Report│
    └───────┘     └───────┘     └───────┘
```

---

## 📋 Legenda de Símbolos

- **│** = Conexão hierárquica
- **┌┐└┘** = Caixas/containers  
- **►** = Fluxo sequencial
- **[  ]** = Ações/eventos
- **●●●○○** = Indicador visual
- **✅❌⚠️** = Status/estados
- **🎯📝⚡🔄** = Categorias funcionais

---

*Mind Map criado em: 13 de julho de 2025*
*Baseado no User Story: Cadastro de Usuário*