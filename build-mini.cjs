#!/usr/bin/env node
//@ts-nocheck

/**
 * GT-Medics - Mini Bundle Builder
 * Cria um pacote leve apenas com utilitários essenciais
 * Uso: node build-mini.cjs [--dev|--prod]
 */

const { execSync } = require('child_process');
const fs = require('fs');
const { join } = require('path');

// ==========================================
// CONFIGURAÇÃO
// ==========================================

const BASE_PATH = join(process.cwd(), 'static-files');
const OUTPUT_DIR = join(BASE_PATH, 'geral/js');
const VERSION = '1.0.0-mini';

// Lista APENAS de módulos essenciais e independentes
const FILES = [
	'geral/js/cid10-module.js', // Busca de CID (novo)
	'geral/js/ufs-brasil-module.js', // Lista de Estados
	'geral/js/adm_drugs.js', // Vias de administração
	'apoioClinico/js/unified_hotstrings.js', // Hotstrings (opcional, mas útil)
];

// ==========================================
// FUNÇÕES
// ==========================================

function log(emoji, message) {
	console.log(`${emoji} ${message}`);
}

function error(message) {
	console.error(`❌ ERRO: ${message}`);
	process.exit(1);
}

function checkDependencies() {
	try {
		require('uglify-js');
		log('✅', 'Uglify-JS instalado');
	} catch (e) {
		log('⚠️', 'Uglify-JS não encontrado. Instalando...');
		try {
			execSync('npm install uglify-js', { stdio: 'inherit' });
			log('✅', 'Uglify-JS instalado com sucesso');
		} catch (err) {
			error('Falha ao instalar Uglify-JS. Execute: npm install uglify-js');
		}
	}
}

function createBundle() {
	log('🔨', 'Criando mini-bundle...');

	let bundle = `/**
 * GT-Medics - Mini Bundle Utils
 * @version ${VERSION}
 * @generated ${new Date().toISOString()}
 * @files ${FILES.length} arquivos concatenados
 */

'use strict';

`;

	let filesAdded = 0;

	FILES.forEach((file, index) => {
		const filepath = join(BASE_PATH, file);

		if (!fs.existsSync(filepath)) {
			console.warn(`Arquivo ignorado (não encontrado): ${file}`);
			return;
		}

		try {
			const content = fs.readFileSync(filepath, 'utf8');

			bundle += `\n/* ==========================================
   [${index + 1}/${FILES.length}] ${file}
   ========================================== */\n`;
			bundle += content + '\n';

			filesAdded++;
			log('✅', `Adicionado: ${file}`);
		} catch (err) {
			console.error(`Erro ao ler ${file}: ${err.message}`);
		}
	});

	log('📦', `Mini Bundle criado com ${filesAdded}/${FILES.length} arquivos`);

	return bundle;
}

function saveBundle(bundle, filename) {
	const filepath = join(OUTPUT_DIR, filename);

	if (!fs.existsSync(OUTPUT_DIR)) {
		fs.mkdirSync(OUTPUT_DIR, { recursive: true });
	}

	fs.writeFileSync(filepath, bundle, 'utf8');
	const size = (fs.statSync(filepath).size / 1024).toFixed(2);
	log('💾', `Salvo: ${filename} (${size} KB)`);
	return filepath;
}

function minifyBundle(bundle) {
	log('⚙️', 'Minificando...');
	const UglifyJS = require('uglify-js');
	const result = UglifyJS.minify(bundle);
	if (result.error) error(`Erro ao minificar: ${result.error.message}`);
	return result.code;
}

// ==========================================
// EXECUÇÃO
// ==========================================

function main() {
	console.log('\n🚀 GT-Medics Mini Bundle Builder\n');

	checkDependencies();

	const bundle = createBundle();
	saveBundle(bundle, 'mini-bundle.js');

	const minified = minifyBundle(bundle);
	saveBundle(minified, 'mini-bundle.min.js');

	console.log('\n✨ Mini Bundle Pronto \n');
}

main();
