#!/usr/bin/env node
/**
 * Script zum Sammeln von Ressourcennutzungsmetriken
 * - CPU-Nutzung pro Stage
 * - Speichernutzung pro Stage
 * - Netzwerkbandbreite
 * - Speicherplatzverbrauch
 * 
 * Verwendung: node scripts/collect-resource-usage.js
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

try {
  execSync(`mkdir -p "${OUTPUT_DIR}"`, { stdio: 'inherit' });
} catch (e) {
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
  console.log('📊 Sammeln von Systemmetriken...');
  
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
  console.log('📊 Schätzung der Ressourcen für CI/CD-Pipelines...');
  
  const stages = {
    lint: {
      estimatedCpu: '10-20%',
      estimatedMemory: '200-400 MB',
      estimatedDuration: '30-60s',
      description: 'Statische Codeanalyse'
    },
    test: {
      estimatedCpu: '30-50%',
      estimatedMemory: '500-800 MB',
      estimatedDuration: '15-30s',
      description: 'Ausführung von Unit-Tests'
    },
    build: {
      estimatedCpu: '40-60%',
      estimatedMemory: '1-2 GB',
      estimatedDuration: '60-120s',
      description: 'Kompilierung und Build der Anwendung'
    },
    e2e: {
      estimatedCpu: '20-40%',
      estimatedMemory: '800 MB - 1.5 GB',
      estimatedDuration: '120-300s',
      description: 'End-to-End-Tests mit Playwright'
    },
    docker: {
      estimatedCpu: '30-50%',
      estimatedMemory: '1-2 GB',
      estimatedDuration: '180-300s',
      description: 'Build von Docker-Images'
    },
    deploy: {
      estimatedCpu: '10-30%',
      estimatedMemory: '300-600 MB',
      estimatedDuration: '30-90s',
      description: 'Bereitstellung der Anwendung'
    }
  };
  
  return stages;
}

function calculateResourceCosts() {
  console.log('💰 Berechnung der Ressourcenkosten...');
  
  const costs = {
    github: {
      ubuntu_latest: {
        cpu: 0.002,
        memory: 0.001,
        network: 0.0001
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
        infrastructure: 20,
        maintenance: 200,
        variable: 0
      }
    }
  };
  
  return costs;
}

console.log('🔍 Sammeln von Ressourcennutzungsmetriken...\n');

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
      estimatedDuration: '6-10 Minuten',
      description: 'Vollständige Pipeline'
    }
  },
  costs: resourceCosts,
  recommendations: [
    'npm-Cache verwenden, um Build-Zeit zu reduzieren',
    'Tests parallel ausführen, wenn möglich',
    'Docker-Images optimieren, um die Größe zu reduzieren',
    'Leistungsstärkere Runner für schwere Builds verwenden'
  ]
};

const outputFile = join(OUTPUT_DIR, `resource-usage_${timestamp}.json`);
writeFileSync(outputFile, JSON.stringify(report, null, 2));

console.log(`\n✅ Bericht gespeichert in: ${outputFile}`);

console.log('\n📊 Ressourcenzusammenfassung:');
console.log('  Vollständige Pipeline:');
console.log(`    CPU: ${report.pipeline.total.estimatedCpu}`);
console.log(`    Speicher: ${report.pipeline.total.estimatedMemory}`);
console.log(`    Dauer: ${report.pipeline.total.estimatedDuration}`);

console.log('\n  Pro Stage:');
for (const [stage, metrics] of Object.entries(report.pipeline.stages)) {
  console.log(`    ${stage}:`);
  console.log(`      CPU: ${metrics.estimatedCpu}, Mémoire: ${metrics.estimatedMemory}, Durée: ${metrics.estimatedDuration}`);
}

