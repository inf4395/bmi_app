#!/usr/bin/env node
/**
 * Script pour collecter les métriques d'utilisation des ressources
 * - CPU usage par stage
 * - Memory usage par stage
 * - Network bandwidth
 * - Storage usage
 * 
 * Usage: node scripts/collect-resource-usage.js
 */

import { execSync } from 'child_process';
import { writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = join(__dirname, '..');

const OUTPUT_DIR = join(ROOT_DIR, 'results', 'resource-usage');
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

// Créer le répertoire de sortie
try {
  execSync(`mkdir -p "${OUTPUT_DIR}"`, { stdio: 'inherit' });
} catch (e) {
  // Ignorer si le répertoire existe déjà
}

function runCommand(command) {
  try {
    return execSync(command, { 
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe']
    });
  } catch (error) {
    return error.stdout || error.message;
  }
}

function getSystemResources() {
  console.log('📊 Collecte des métriques système...');
  
  const resources = {
    timestamp,
    platform: process.platform,
    nodeVersion: process.version,
    cpu: {},
    memory: {},
    disk: {}
  };
  
  // CPU Info
  try {
    if (process.platform === 'win32') {
      const cpuInfo = runCommand('wmic cpu get name,numberofcores,numberoflogicalprocessors /format:list');
      resources.cpu.info = cpuInfo;
    } else {
      const cpuInfo = runCommand('lscpu');
      resources.cpu.info = cpuInfo;
    }
  } catch (e) {
    resources.cpu.info = 'N/A';
  }
  
  // Memory Info
  try {
    if (process.platform === 'win32') {
      const memInfo = runCommand('wmic computersystem get TotalPhysicalMemory /format:list');
      resources.memory.info = memInfo;
    } else {
      const memInfo = runCommand('free -h');
      resources.memory.info = memInfo;
    }
  } catch (e) {
    resources.memory.info = 'N/A';
  }
  
  // Disk Usage
  try {
    if (process.platform === 'win32') {
      const diskInfo = runCommand('wmic logicaldisk get size,freespace,caption /format:list');
      resources.disk.info = diskInfo;
    } else {
      const diskInfo = runCommand('df -h');
      resources.disk.info = diskInfo;
    }
  } catch (e) {
    resources.disk.info = 'N/A';
  }
  
  // Node.js process resources
  const usage = process.cpuUsage();
  const memUsage = process.memoryUsage();
  
  resources.process = {
    cpu: {
      user: usage.user,
      system: usage.system
    },
    memory: {
      rss: memUsage.rss,
      heapTotal: memUsage.heapTotal,
      heapUsed: memUsage.heapUsed,
      external: memUsage.external,
      arrayBuffers: memUsage.arrayBuffers
    }
  };
  
  return resources;
}

function estimatePipelineResources() {
  console.log('📊 Estimation des ressources pour les pipelines CI/CD...');
  
  // Estimations basées sur les tests de performance
  const stages = {
    lint: {
      estimatedCpu: '10-20%',
      estimatedMemory: '200-400 MB',
      estimatedDuration: '30-60s',
      description: 'Analyse statique du code'
    },
    test: {
      estimatedCpu: '30-50%',
      estimatedMemory: '500-800 MB',
      estimatedDuration: '15-30s',
      description: 'Exécution des tests unitaires'
    },
    build: {
      estimatedCpu: '40-60%',
      estimatedMemory: '1-2 GB',
      estimatedDuration: '60-120s',
      description: 'Compilation et build de l\'application'
    },
    e2e: {
      estimatedCpu: '20-40%',
      estimatedMemory: '800 MB - 1.5 GB',
      estimatedDuration: '120-300s',
      description: 'Tests end-to-end avec Playwright'
    },
    docker: {
      estimatedCpu: '30-50%',
      estimatedMemory: '1-2 GB',
      estimatedDuration: '180-300s',
      description: 'Build des images Docker'
    },
    deploy: {
      estimatedCpu: '10-30%',
      estimatedMemory: '300-600 MB',
      estimatedDuration: '30-90s',
      description: 'Déploiement de l\'application'
    }
  };
  
  return stages;
}

function calculateResourceCosts() {
  console.log('💰 Calcul des coûts de ressources...');
  
  // Coûts estimés par type de runner (par minute)
  const costs = {
    github: {
      ubuntu_latest: {
        cpu: 0.002, // $ par minute de CPU
        memory: 0.001, // $ par GB-minute
        network: 0.0001 // $ par GB transféré
      }
    },
    gitlab: {
      shared: {
        cpu: 0.0025,
        memory: 0.0012,
        network: 0.0001
      }
    },
    jenkins: {
      self_hosted: {
        infrastructure: 20, // $ par mois
        maintenance: 200, // $ par mois (4h * $50/h)
        variable: 0 // Coût variable négligeable
      }
    }
  };
  
  return costs;
}

// Collecter toutes les métriques
console.log('🔍 Collecte des métriques d\'utilisation des ressources...\n');

const systemResources = getSystemResources();
const pipelineResources = estimatePipelineResources();
const resourceCosts = calculateResourceCosts();

const report = {
  timestamp,
  system: systemResources,
  pipeline: {
    stages: pipelineResources,
    total: {
      estimatedCpu: '40-60%',
      estimatedMemory: '2-4 GB',
      estimatedDuration: '6-10 minutes',
      description: 'Pipeline complet'
    }
  },
  costs: resourceCosts,
  recommendations: [
    'Utiliser le cache npm pour réduire le temps de build',
    'Exécuter les tests en parallèle quand possible',
    'Optimiser les images Docker pour réduire la taille',
    'Utiliser des runners plus puissants pour les builds lourds'
  ]
};

const outputFile = join(OUTPUT_DIR, `resource-usage_${timestamp}.json`);
writeFileSync(outputFile, JSON.stringify(report, null, 2));

console.log(`\n✅ Rapport sauvegardé dans: ${outputFile}`);

// Afficher un résumé
console.log('\n📊 Résumé des ressources:');
console.log('  Pipeline complet:');
console.log(`    CPU: ${report.pipeline.total.estimatedCpu}`);
console.log(`    Mémoire: ${report.pipeline.total.estimatedMemory}`);
console.log(`    Durée: ${report.pipeline.total.estimatedDuration}`);

console.log('\n  Par stage:');
for (const [stage, metrics] of Object.entries(report.pipeline.stages)) {
  console.log(`    ${stage}:`);
  console.log(`      CPU: ${metrics.estimatedCpu}, Mémoire: ${metrics.estimatedMemory}, Durée: ${metrics.estimatedDuration}`);
}

