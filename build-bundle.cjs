#!/usr/bin/env node
//@ts-nocheck

/**
 * GT-Medics - Bundle Builder
 * Script robusto para concatenar e minificar JS
 * Uso: node build-bundle.js [--dev|--prod]
 */

const { execSync } = require('child_process');
const fs = require('fs');
const { join } = require('path');

// ==========================================
// CONFIGURAÇÃO
// ==========================================

const BASE_PATH = join(process.cwd(), 'static-files');
const OUTPUT_DIR = join(BASE_PATH, 'geral/js');
const VERSION = '1.0.0';

// Lista de arquivos na ordem exata (sincronizado com integra.html)
const FILES = [
	// 1. Dados e Apps
	'apoioClinico/js/unified_hotstrings.js',
	'apoioClinico/js/exames-module.js',
	'geral/js/adm_drugs.js',
	'geral/js/ufs-brasil-module.js',
	'geral/js/cid10-module.js',

	// 2. API / CDNLoader
	'geral/components/api/js/functions-initial.js',

	// 3. Header (ordem: index → tool_container → toolbar)
	'geral/components/header/js/header_index.js',
	'geral/components/header/js/header_tool_container.js',
	'geral/components/header/js/header_toolbar.js',

	// 4. Event Bus & Registry (antes dos componentes aside)
	'geral/components/prescription/aside/js/aside_event_bus.js',
	'geral/components/prescription/aside/js/aside_registry.js',

	// 5. Prescrição
	'geral/components/prescription/js/prescription_header.js',
	'geral/components/prescription/js/prescription_footer.js',
	'geral/components/prescription/box/js/apoiomed_prescription_box.js',

	// 6. Aside
	'geral/components/prescription/aside/js/aside_cnes_search.js',
	'geral/components/prescription/aside/js/aside_ubs_selector.js',
	'geral/components/prescription/aside/js/aside_formatting_tools.js',
	'geral/components/prescription/aside/js/aside_hotstrings_panel.js',
	'geral/components/prescription/aside/js/apoiomed_aside.js',

	// 7. Tabs
	'geral/components/prescription/tabs/js/tab_receituario.js',
	'geral/components/prescription/tabs/js/tab_exames.js',
	'geral/components/prescription/tabs/js/tab_guias.js',
	'geral/js/guia_lme.js',
	'geral/components/prescription/tabs/js/tab_apoio.js',
	'geral/components/prescription/tabs/js/tab_psf.js',

	// 8. Page Controller (deve ser o último - orquestra tudo)
	'geral/components/prescription/js/page_controller.js',
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
	log('🔨', 'Criando bundle...');

	let bundle = `/**
 * GT-Medics - Bundle Principal
 * @version ${VERSION}
 * @generated ${new Date().toISOString()}
 * @files ${FILES.length} arquivos concatenados
 */

'use strict';

`;

	let errors = [];
	let filesAdded = 0;

	FILES.forEach((file, index) => {
		const filepath = join(BASE_PATH, file);

		if (!fs.existsSync(filepath)) {
			errors.push(`Arquivo não encontrado: ${file}`);
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
			errors.push(`Erro ao ler ${file}: ${err.message}`);
		}
	});

	if (errors.length > 0) {
		log('⚠️', `${errors.length} erro(s) encontrado(s):`);
		errors.forEach((err) => console.error(`   - ${err}`));
	}

	log('📦', `Bundle criado com ${filesAdded}/${FILES.length} arquivos`);

	return bundle;
}

function saveBundle(bundle, filename) {
	const filepath = join(OUTPUT_DIR, filename);

	// Cria diretório se não existir
	if (!fs.existsSync(OUTPUT_DIR)) {
		fs.mkdirSync(OUTPUT_DIR, { recursive: true });
	}

	fs.writeFileSync(filepath, bundle, 'utf8');

	const size = (fs.statSync(filepath).size / 1024).toFixed(2);
	log('💾', `Salvo: ${filename} (${size} KB)`);

	return filepath;
}

function minifyBundle(bundle) {
	log('⚙️', 'Minificando bundle...');

	const UglifyJS = require('uglify-js');

	const result = UglifyJS.minify(bundle, {
		compress: {
			dead_code: true,
			drop_console: false, // ✅ Mantém console.log
			drop_debugger: true,
			unused: true,
		},
		mangle: {
			toplevel: false, // ✅ Não altera nomes de funções globais
			reserved: ['window', 'document'], // ✅ Protege objetos globais
		},
		output: {
			comments: /^!|@preserve|@license|@cc_on/i, // ✅ Mantém comentários de licença
		},
	});

	if (result.error) {
		error(`Erro ao minificar: ${result.error.message}`);
	}

	log('✅', 'Minificação concluída');
	return result.code;
}

function generateStats(originalBundle, minifiedBundle) {
	const originalSize = (originalBundle.length / 1024).toFixed(2);
	const minifiedSize = (minifiedBundle.length / 1024).toFixed(2);
	const savings = ((1 - minifiedBundle.length / originalBundle.length) * 100).toFixed(1);

	console.log('\n📊 ESTATÍSTICAS:');
	console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
	console.log(`   Bundle original:   ${originalSize} KB`);
	console.log(`   Bundle minificado: ${minifiedSize} KB`);
	console.log(`   Economia:          ${savings}%`);
	console.log(`   Arquivos:          ${FILES.length}`);
	console.log(`   Versão:            ${VERSION}`);
	console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

function updateVersion() {
	const versionFile = join(OUTPUT_DIR, 'bundle.version.json');
	const versionData = {
		version: VERSION,
		buildDate: new Date().toISOString(),
		files: FILES.length,
		buildType: process.argv.includes('--dev') ? 'development' : 'production',
	};

	fs.writeFileSync(versionFile, JSON.stringify(versionData, null, 2));
	log('📄', `Versão salva: ${versionFile}`);
}

// ==========================================
// EXECUÇÃO PRINCIPAL
// ==========================================

function main() {
	console.log('\n🚀 GT-Medics Bundle Builder v1.0\n');

	const isDev = process.argv.includes('--dev');
	const isProd = process.argv.includes('--prod') || !isDev;

	// 1. Verifica dependências
	checkDependencies();

	// 2. Cria bundle
	const bundle = createBundle();

	// 3. Salva bundle normal
	saveBundle(bundle, 'bundle.js');

	if (isProd) {
		// 4. Minifica (apenas em produção)
		const minified = minifyBundle(bundle);

		// 5. Salva bundle minificado
		saveBundle(minified, 'bundle.min.js');

		// 6. Estatísticas
		generateStats(bundle, minified);
	} else {
		log('ℹ️', 'Modo desenvolvimento - minificação desabilitada');
	}

	// 7. Atualiza versão
	updateVersion();

	log('🎉', 'Build concluído com sucesso!');
}

// Executa
try {
	main();
} catch (err) {
	error(`Erro fatal: ${err.message}\n${err.stack}`);
}
