# CraftWar Site - Setup e Sincronização

## 📋 Estrutura

O site agora carrega dados dinâmicos dos clãs do servidor:

- `_data/clans.json` - Dados das nações (sincronizados automaticamente)
- `_scripts/sync-clans.js` - Script para sincronizar dados do servidor
- `nacoes.html` - Página de nações (agora dinâmica)

## 🔄 Sincronização de Dados

### Opção 1: Sincronização Manual (Node.js)

Se você tem Node.js instalado, execute:

```bash
node site-mine/_scripts/sync-clans.js
```

Isso lerá os dados dos clãs em `clans/*.json` e atualizará `site-mine/_data/clans.json`.

### Opção 2: Sincronização Automática (Recomendado)

Você pode configurar um cron job ou agendador de tarefas para executar o script periodicamente:

**Windows (Task Scheduler):**
```
Ação: node C:\caminho\para\site-mine\_scripts\sync-clans.js
Frequência: A cada 1 hora (ou conforme necessário)
```

**Linux/Mac (Crontab):**
```bash
0 * * * * cd /caminho/para/projeto && node site-mine/_scripts/sync-clans.js
```

## 📊 Dados Exibidos

A página de nações agora mostra:

- ✅ Nome da nação
- ✅ Descrição
- ✅ Habilidades especiais
- ✅ **Número de membros (dinâmico)**
- ✅ **Líder do clã (dinâmico)**

## 🎨 Personalizações

Para adicionar mais informações aos clãs, edite `_data/clans.json`:

```json
{
  "id": "blue",
  "name": "Água",
  "totalMembers": 5,
  "leader": "NomeDoLíder",
  "founded": "2026-01-15",
  "treasury": 1000,
  "level": 5
}
```

E atualize o template em `nacoes.html` para exibir esses dados.

## 🔗 Integração com Backend

Se você tiver um backend Node.js/Express, pode criar um endpoint que sincroniza automaticamente:

```javascript
// No seu servidor
app.post('/api/sync-clans', (req, res) => {
  const { exec } = require('child_process');
  exec('node site-mine/_scripts/sync-clans.js', (error, stdout) => {
    if (error) return res.status(500).json({ error: error.message });
    res.json({ success: true, message: stdout });
  });
});
```

## 📝 Notas

- Os dados são carregados via fetch no navegador (sem necessidade de servidor)
- O arquivo `_data/clans.json` é o "cache" que o site usa
- Execute `sync-clans.js` sempre que adicionar/remover membros dos clãs
