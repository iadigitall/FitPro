# FitPro Academy - SaaS de Treino & Nutrição

[![Deploy Status](https://img.shields.io/badge/Status-MVP%20Funcional-00A85C)]()
[![License](https://img.shields.io/badge/License-MIT-blue)]()
[![HTML5](https://img.shields.io/badge/HTML5-Vanilla-orange)]()

> Aplicação web progressive para recomendação de treinos e dietas personalizadas baseadas em avaliação online segura.

## 🎯 Funcionalidades

- ✅ **Autenticação Local** - Login/Signup com localStorage
- ✅ **Avaliação Multiestep** - Captura de dados físicos e preferências
- ✅ **Banco de Exercícios** - 15+ exercícios com vídeos YouTube integrados
- ✅ **Gerador de Refeições** - Macronutrientes calculados dinamicamente
- ✅ **Dashboard de Evolução** - Tracking de peso, medidas e hidratação
- ✅ **Responsivo** - Mobile-first, funciona offline com localStorage
- ✅ **Sem Dependências** - HTML5 + CSS3 + Vanilla JavaScript

## 🚀 Como Usar

### 1. Clonar o Repositório
```bash
git clone https://github.com/iadigitall/fitpro-academy.git
cd fitpro-academy
```

### 2. Abrir Localmente
```bash
# Option A: Abrir direto no navegador
open fitpro-academy.html

# Option B: Usar live-server (recomendado)
npx live-server
```

### 3. Deploy no GitHub Pages

#### A. Criar repositório público
```bash
git init
git add fitpro-academy.html
git commit -m "Initial FitPro Academy MVP"
git branch -M main
git remote add origin https://github.com/SEU_USER/fitpro-academy.git
git push -u origin main
```

#### B. Configurar GitHub Pages
1. Vá para **Settings** do repositório
2. Selecione **Pages** na sidebar
3. Source: `main` branch
4. Aguarde 1-2 minutos
5. Sua app estará em: `https://SEU_USER.github.io/fitpro-academy`

### 4. Acessar a Aplicação

**Teste com credenciais de exemplo:**
- Email: `teste@fitpro.com`
- Senha: `123456`

## 📁 Estrutura

```
fitpro-academy/
├── fitpro-academy.html     # Arquivo único completo
├── README.md               # Este arquivo
└── .gitignore             # (opcional)
```

## 🛠️ Tecnologias

| Tech | Versão | Uso |
|------|--------|-----|
| HTML5 | 5.2+ | Estrutura semântica |
| CSS3 | 3.0+ | Styling (variáveis CSS, grid, flexbox) |
| JavaScript (Vanilla) | ES6+ | Lógica, localStorage, DOM manipulation |
| YouTube Embed API | v1 | Player de vídeos de exercícios |

## 💾 Armazenamento

Todos os dados são persistidos localmente via **localStorage**:

```
fitpro_user_session           → Usuário logado
fitpro_registered_users       → Base de usuários
fitpro_profile_{email}        → Dados da avaliação
fitpro_weights_{email}        → Histórico de pesagens
fitpro_measurements_{email}   → Medidas corporais
fitpro_water_{email}          → Hidratação diária
fitpro_completed_{email}      → Dias concluídos
fitpro_skipped_{email}        → Dias pulados
```

## 🎨 Personalização

### Mudar Cores
Edite as variáveis CSS no `<style>`:

```css
:root {
    --primary: #00A85C;        /* Verde FitPro */
    --bg-dark: #141414;        /* Fundo preto */
    --bg-card: #1A1A1A;        /* Cards */
    --border: #2A2A2A;         /* Bordas */
}
```

### Adicionar Exercícios
Edite o array `exercises` na seção JavaScript:

```javascript
{ 
    id: 'ex-16', 
    name: 'Seu Exercício',
    muscle: 'Grupo Muscular',
    difficulty: 'Iniciante',
    duration: '10 min',
    reps: '3 séries x 12 reps',
    videoId: 'YouTubeVideoID',
    cautionArea: 'nenhuma'
}
```

## 📊 Cálculo de Macronutrientes

**Fórmulas aplicadas automaticamente:**

### Hipertrofia (Ganho Muscular)
- Calorias: peso × 34 kcal
- Proteína: peso × 2.0g
- Gordura: peso × 1.0g
- Carbos: resto das calorias ÷ 4

### Perda de Peso
- Calorias: peso × 24 kcal
- Proteína: peso × 2.2g
- Gordura: peso × 0.8g

### Ganho de Força
- Calorias: peso × 37 kcal
- Proteína: peso × 1.8g
- Gordura: peso × 1.1g

## 🔒 Segurança

⚠️ **MVP em localStorage**: Senhas são armazenadas localmente. Para produção:
- Implementar backend com autenticação segura (Firebase, Auth0)
- Usar HTTPS obrigatório
- Hash de senhas com bcrypt

## 📱 Compatibilidade

| Browser | Suporte |
|---------|---------|
| Chrome | ✅ 100% |
| Firefox | ✅ 100% |
| Safari | ✅ 100% |
| Edge | ✅ 100% |
| Mobile (iOS/Android) | ✅ 95% |
| IE 11 | ❌ Não suportado |

## 🐛 Troubleshooting

### Dados não persistem?
- Verifique se localStorage está habilitado
- Limpe cache: DevTools → Storage → localStorage

### Vídeos não carregam?
- Verifique conexão com internet
- Teste em aba incógnita (sem ad blockers)

### Estilos quebrados?
- Hard refresh: `Ctrl+Shift+R` (Windows) ou `Cmd+Shift+R` (Mac)

## 🚀 Roadmap (v2.0+)

- [ ] Backend Firebase com autenticação real
- [ ] Integração com Strapi CMS
- [ ] App mobile nativa (React Native)
- [ ] Sincronização entre dispositivos
- [ ] Integração com smartwatches
- [ ] Analytics avançados
- [ ] Modo offline completo (Service Workers)
- [ ] PWA com instalação
- [ ] API RESTful própria

## 📞 Suporte

- Issues: [GitHub Issues](https://github.com/iadigitall/fitpro-academy/issues)
- Email: gustavo@iadigitall.com
- Instagram: [@off.henriqee](https://instagram.com/off.henriqee)

## 📄 Licença

MIT License - veja LICENSE para detalhes

---

**Desenvolvido com 💪 por Gustavo | FitPro Academy 2026**
