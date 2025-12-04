#!/usr/bin/env node
/**
 * Script pour collecter les métriques de qualité de code
 * - Code coverage
 * - Code complexity
 * - Security vulnerabilities (npm audit)
 * - Code smells
 * 
 * Usage: node scripts/collect-code-quality-metrics.js [backend|frontend|all]
 */

import { execSync } from 'child_process';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = join(__dirname, '..');

const TARGET = process.argv[2] || 'all';
const OUTPUT_DIR = join(ROOT_DIR, 'results', 'code-quality');
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

// Créer le répertoire de sortie
try {
  execSync(`mkdir -p "${OUTPUT_DIR}"`, { stdio: 'inherit' });
} catch (e) {
  // Ignorer si le répertoire existe déjà
}

function runCommand(command, cwd = ROOT_DIR) {
  try {
    return execSync(command, { 
      cwd, 
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe']
    });
  } catch (error) {
    return error.stdout || error.message;
  }
}

function getCodeCoverage(project) {
  console.log(`📊 Collecte du code coverage pour ${project}...`);
  
  const projectDir = join(ROOT_DIR, project);
  const coverageFile = join(projectDir, 'coverage', 'coverage-final.json');
  
  if (!existsSync(coverageFile)) {
    console.log(`⚠️  Fichier de coverage non trouvé: ${coverageFile}`);
    console.log(`   Exécutez d'abord: cd ${project} && npm test -- --coverage`);
    return null;
  }
  
  try {
    const coverage = JSON.parse(readFileSync(coverageFile, 'utf-8'));
    
    // Calculer les métriques globales
    let totalStatements = 0;
    let coveredStatements = 0;
    let totalBranches = 0;
    let coveredBranches = 0;
    let totalFunctions = 0;
    let coveredFunctions = 0;
    let totalLines = 0;
    let coveredLines = 0;
    
    for (const file in coverage) {
      const fileCoverage = coverage[file];
      totalStatements += fileCoverage.s ? Object.keys(fileCoverage.s).length : 0;
      coveredStatements += fileCoverage.s ? Object.values(fileCoverage.s).filter(v => v > 0).length : 0;
      
      totalBranches += fileCoverage.b ? Object.keys(fileCoverage.b).length : 0;
      coveredBranches += fileCoverage.b ? Object.values(fileCoverage.b).flat().filter(v => v > 0).length : 0;
      
      totalFunctions += fileCoverage.f ? Object.keys(fileCoverage.f).length : 0;
      coveredFunctions += fileCoverage.f ? Object.values(fileCoverage.f).filter(v => v > 0).length : 0;
      
      totalLines += fileCoverage.l ? Object.keys(fileCoverage.l).length : 0;
      coveredLines += fileCoverage.l ? Object.values(fileCoverage.l).filter(v => v > 0).length : 0;
    }
    
    return {
      statements: {
        total: totalStatements,
        covered: coveredStatements,
        percentage: totalStatements > 0 ? (coveredStatements / totalStatements * 100).toFixed(2) : 0
      },
      branches: {
        total: totalBranches,
        covered: coveredBranches,
        percentage: totalBranches > 0 ? (coveredBranches / totalBranches * 100).toFixed(2) : 0
      },
      functions: {
        total: totalFunctions,
        covered: coveredFunctions,
        percentage: totalFunctions > 0 ? (coveredFunctions / totalFunctions * 100).toFixed(2) : 0
      },
      lines: {
        total: totalLines,
        covered: coveredLines,
        percentage: totalLines > 0 ? (coveredLines / totalLines * 100).toFixed(2) : 0
      }
    };
  } catch (error) {
    console.error(`❌ Erreur lors de la lecture du coverage: ${error.message}`);
    return null;
  }
}

function getSecurityVulnerabilities(project) {
  console.log(`🔒 Analyse des vulnérabilités de sécurité pour ${project}...`);
  
  const projectDir = join(ROOT_DIR, project);
  const packageJson = join(projectDir, 'package.json');
  
  if (!existsSync(packageJson)) {
    return null;
  }
  
  try {
    const auditOutput = runCommand('npm audit --json', projectDir);
    const audit = JSON.parse(auditOutput);
    
    return {
      vulnerabilities: audit.metadata?.vulnerabilities || {},
      summary: {
        total: audit.metadata?.vulnerabilities?.total || 0,
        critical: audit.metadata?.vulnerabilities?.critical || 0,
        high: audit.metadata?.vulnerabilities?.high || 0,
        moderate: audit.metadata?.vulnerabilities?.moderate || 0,
        low: audit.metadata?.vulnerabilities?.low || 0,
        info: audit.metadata?.vulnerabilities?.info || 0
      }
    };
  } catch (error) {
    // npm audit peut échouer si aucune vulnérabilité n'est trouvée
    return {
      vulnerabilities: {},
      summary: {
        total: 0,
        critical: 0,
        high: 0,
        moderate: 0,
        low: 0,
        info: 0
      }
    };
  }
}

function getCodeComplexity(project) {
  console.log(`📈 Analyse de la complexité du code pour ${project}...`);
  
  const projectDir = join(ROOT_DIR, project);
  const srcDir = join(projectDir, 'src');
  
  if (!existsSync(srcDir)) {
    return null;
  }
  
  // Compter les fichiers et lignes de code
  try {
    const findOutput = runCommand(`find "${srcDir}" -type f \\( -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" \\)`, projectDir);
    const files = findOutput.trim().split('\n').filter(f => f);
    
    let totalLines = 0;
    let totalFunctions = 0;
    let totalClasses = 0;
    
    files.forEach(file => {
      try {
        const content = readFileSync(file, 'utf-8');
        const lines = content.split('\n');
        totalLines += lines.length;
        
        // Compter les fonctions (approximation)
        const functionMatches = content.match(/(?:function|const|let|var)\s+\w+\s*[=:]\s*(?:async\s+)?\(/g);
        if (functionMatches) {
          totalFunctions += functionMatches.length;
        }
        
        // Compter les classes
        const classMatches = content.match(/class\s+\w+/g);
        if (classMatches) {
          totalClasses += classMatches.length;
        }
      } catch (e) {
        // Ignorer les erreurs de lecture
      }
    });
    
    return {
      files: files.length,
      totalLines,
      totalFunctions,
      totalClasses,
      averageLinesPerFile: files.length > 0 ? (totalLines / files.length).toFixed(2) : 0,
      averageFunctionsPerFile: files.length > 0 ? (totalFunctions / files.length).toFixed(2) : 0
    };
  } catch (error) {
    console.error(`❌ Erreur lors de l'analyse de complexité: ${error.message}`);
    return null;
  }
}

function collectMetrics(project) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`📦 Collecte des métriques pour: ${project}`);
  console.log('='.repeat(60));
  
  const metrics = {
    project,
    timestamp,
    coverage: getCodeCoverage(project),
    security: getSecurityVulnerabilities(project),
    complexity: getCodeComplexity(project)
  };
  
  const outputFile = join(OUTPUT_DIR, `${project}_code-quality_${timestamp}.json`);
  writeFileSync(outputFile, JSON.stringify(metrics, null, 2));
  
  console.log(`\n✅ Métriques sauvegardées dans: ${outputFile}`);
  
  // Afficher un résumé
  console.log('\n📊 Résumé:');
  if (metrics.coverage) {
    console.log(`  Coverage: ${metrics.coverage.lines.percentage}% (lignes)`);
  }
  if (metrics.security) {
    console.log(`  Vulnérabilités: ${metrics.security.summary.total} (${metrics.security.summary.critical} critiques, ${metrics.security.summary.high} élevées)`);
  }
  if (metrics.complexity) {
    console.log(`  Fichiers: ${metrics.complexity.files}, Lignes: ${metrics.complexity.totalLines}`);
  }
  
  return metrics;
}

// Collecter les métriques
const projects = TARGET === 'all' ? ['backend', 'frontend'] : [TARGET];
const allMetrics = {};

for (const project of projects) {
  allMetrics[project] = collectMetrics(project);
}

// Générer un rapport consolidé
const consolidatedReport = {
  timestamp,
  projects: allMetrics,
  summary: {
    totalVulnerabilities: Object.values(allMetrics).reduce((sum, m) => 
      sum + (m?.security?.summary?.total || 0), 0),
    averageCoverage: Object.values(allMetrics)
      .map(m => parseFloat(m?.coverage?.lines?.percentage || 0))
      .filter(v => v > 0)
      .reduce((sum, v, i, arr) => sum + v / arr.length, 0).toFixed(2)
  }
};

const consolidatedFile = join(OUTPUT_DIR, `consolidated_code-quality_${timestamp}.json`);
writeFileSync(consolidatedFile, JSON.stringify(consolidatedReport, null, 2));

console.log(`\n✅ Rapport consolidé sauvegardé dans: ${consolidatedFile}`);

