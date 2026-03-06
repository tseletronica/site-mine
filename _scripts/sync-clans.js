/**
 * Script para sincronizar dados dos clãs do servidor com o site
 * Execute este script periodicamente para atualizar as informações
 * 
 * Uso: node sync-clans.js
 */

const fs = require('fs');
const path = require('path');

// Caminhos dos arquivos
const clansDir = path.join(__dirname, '../../clans');
const dataFile = path.join(__dirname, '../_data/clans.json');

// Mapa de cores para cada clã
const colorMap = {
  'blue': { color: '#3498db', colorCode: '§9', name: 'Água', flag: 'bandeira_agua.png' },
  'red': { color: '#e74c3c', colorCode: '§c', name: 'Fogo', flag: 'bandeira_fogo.png' },
  'green': { color: '#2ecc71', colorCode: '§a', name: 'Terra', flag: 'bandeira_terra.png' },
  'yellow': { color: '#f1c40f', colorCode: '§e', name: 'Vento', flag: 'bandeira_vento.png' }
};

// Descrições e habilidades
const clanDetails = {
  'blue': {
    description: 'Controle do mar, mobilidade e sobrevivência aquática.',
    abilities: [
      'Respiração na água',
      'Conduit Power',
      'Velocidade e vantagens em combate aquático'
    ]
  },
  'red': {
    description: 'Força bruta e resistência. Domine o Nether.',
    abilities: [
      'Combate agressivo',
      'Resistência ao fogo',
      'Pressão constante em PvP'
    ]
  },
  'green': {
    description: 'Defesa, mineração e controle de terreno.',
    abilities: [
      'Regeneração em biomas',
      'Visão noturna',
      'Economia forte e base sólida'
    ]
  },
  'yellow': {
    description: 'Velocidade, mobilidade e impacto tático.',
    abilities: [
      'Velocidade e salto',
      'Queda reduzida',
      'Perseguição e controle de rotas'
    ]
  }
};

function syncClans() {
  try {
    const clans = [];

    // Ler cada arquivo de clã
    for (const [clanId, details] of Object.entries(colorMap)) {
      const clanFile = path.join(clansDir, `${clanId}.json`);
      
      if (fs.existsSync(clanFile)) {
        const clanData = JSON.parse(fs.readFileSync(clanFile, 'utf8'));
        
        const clanInfo = {
          id: clanId,
          name: details.name,
          color: details.color,
          colorCode: details.colorCode,
          description: clanDetails[clanId].description,
          abilities: clanDetails[clanId].abilities,
          members: clanData.members || [],
          totalMembers: (clanData.members || []).length,
          leader: (clanData.members && clanData.members.length > 0) ? clanData.members[0] : 'Nenhum',
          founded: new Date().toISOString().split('T')[0]
        };
        
        clans.push(clanInfo);
      }
    }

    // Salvar dados sincronizados
    const output = { clans };
    fs.writeFileSync(dataFile, JSON.stringify(output, null, 2));
    
    console.log('✓ Clãs sincronizados com sucesso!');
    console.log(`  Total de clãs: ${clans.length}`);
    clans.forEach(clan => {
      console.log(`  - ${clan.name}: ${clan.totalMembers} membros`);
    });
  } catch (error) {
    console.error('✗ Erro ao sincronizar clãs:', error.message);
    process.exit(1);
  }
}

syncClans();
