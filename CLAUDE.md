# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Managed CDN for GT-Medics healthcare application. Serves static JS/CSS assets via Nginx with immutable hash-based caching, automatic versioning, hotlink protection, and backup management. Deployed as a Docker container on a VPS at `cdn.gtmedics.com`.

## Build Commands

```bash
# After editing any JS file in static-files/ — generates hashes, updates manifests, moves old versions to backup
python3 build.py

# Bundle builder (concatenates + minifies JS modules into geral/js/bundle.min.js)
npm run build          # Production (with UglifyJS minification)
npm run build:dev      # Development (no minification)
npm run watch          # Watch mode (auto-rebuild on JS changes)

# Restart Nginx after changing nginx.conf
docker restart cdn_nginx

# Recreate container after changing docker-cdn.compose.yml
docker compose -f docker-cdn.compose.yml up -d
```

There is no test suite. No linter configuration.

## Architecture

The system has three layers:

1. **Build System** — Two independent build tools:
   - `build.py` (Python): Hashes individual JS files (`app.js` → `app.a1b2c3d4.js`), updates `manifest.json` in each module directory, moves old versions to `storage/*Backup/`, regenerates `VERSIONS.md`
   - `build-bundle.cjs` (Node): Concatenates 20+ JS files from multiple component directories into `static-files/geral/js/bundle.js` and `bundle.min.js` in a specific load order

2. **Nginx Server** (`nginx.conf`): Serves `static-files/` with three cache tiers:
   - Hashed files (`*.a1b2c3d4.js`): immutable, 1-year cache
   - `manifest.json`: no-store (always fresh)
   - Unhashed JS: no-cache (revalidate)
   - Referer-based hotlink protection on `/apoioClinico/` (allows `*.gtmedics.com`, `localhost`, `huggingface.co`)

3. **Client Loader** (`static-files/geral/cdn-loader.js`): Browser-side utility that fetches `manifest.json` and resolves logical file names to their current hashed versions

## Key Workflow

Edit JS file → run `python3 build.py` → hash generated, manifest updated, old version backed up, `VERSIONS.md` regenerated. Frontends using CDNLoader auto-resolve new version; direct `<script>` tags need manual update from `VERSIONS.md`.

For bundle changes: edit source files → run `npm run build` → then `python3 build.py` to hash the output.

## Module Structure

- `static-files/geral/` — General UI: header, prescription components (tabs, aside, box), API integration, bundle files, CSS, assets
- `static-files/apoioClinico/` — Clinical support: hotstrings, PSF app, clinical utilities
- `static-files/html/` — Static HTML content
- `storage/` — Backup directories (gitignored, not served)

Each module directory with JS files has its own `manifest.json` mapping logical names to hashed filenames.

## Build Targets (build.py)

Seven directory targets, each a tuple of (JS source dir, manifest output dir, backup dir):

| Source | Manifest | Backup |
|--------|----------|--------|
| `static-files/geral/js` | `static-files/geral` | `storage/geralBackup` |
| `static-files/apoioClinico/js` | `static-files/apoioClinico` | `storage/apoioClinicoBackup` |
| `static-files/geral/components/prescription/js` | `.../prescription` | `storage/geralPrescriptionBackup` |
| `static-files/geral/components/prescription/tabs/js` | `.../tabs` | `storage/geralPrescriptionTabsBackup` |
| `static-files/geral/components/prescription/aside/js` | `.../aside` | `storage/geralPrescriptionAsideBackup` |
| `static-files/geral/components/header/js` | `.../header` | `storage/geralHeaderBackup` |
| `static-files/geral/components/api/js` | `.../api` | `storage/geralApiBackup` |

## Bundle Load Order (build-bundle.cjs)

Files are concatenated in this specific order: hotstrings data → PSF app → drug admin → header components → prescription components → aside components → tab components. The output goes to `static-files/geral/js/bundle.js` (and `bundle.min.js` in prod).

## Deployment

VPS at `/root/PROJETOS/API/cdn-api`. Docker container `cdn_nginx` uses `nginx:alpine` on external network `web` with Traefik for HTTPS. Volumes mount `static-files/` and `nginx.conf` as read-only.

Deploy flow: `git pull origin main` → `python3 build.py` → (if nginx.conf changed) `docker restart cdn_nginx`.

## Language Notes

Project documentation (README, VERSIONS.md, code comments) is written in Brazilian Portuguese. Code identifiers and variable names use English.



----


 Searched for 1 pattern (ctrl+o to expand)                                                                        
                                                                                                                   
● Good, all fixed. Now let me write the psiqui_2025.js - the most complex module.                                  
                                                                                                                   
● Write(static-files/geral/components/prescription/tabs/psf/js/psiqui_2025.js)                                     
  ⎿  Added 598 lines, removed 234 lines                                                                            
        1  /**                                                                                                     
        2 - * Psiquiatria                                                                                          
        3 - * Convertido de psiqui_2025.html para módulo JavaScript                                                
        4 - * Padrão baseado em inc_radio.js                                                                       
        2 + * Psiquiatria - Exame Psíquico                                                                         
        3 + * Convertido de psiqui_2025.html — layout original preservado                                          
        4   */                                                                                                     
        5 -                                                                                                        
        6 -(function() {                                                                                           
        5 +(function () {                                                                                   
        6    'use strict';
        7
        8 -  const Psiquiatria = {                                                                          
        9 -    state: {                                                                                     
       10 -      selectedEscala: null,                                                                      
       11 -      resultados: {}                                                                             
       12 -    },                                                                                           
        8 +  function injectNeuCSS() {                                                                      
        9 +    if (document.getElementById('psf-neu-styles')) return;                                       
       10 +    var s = document.createElement('style');                                                     
       11 +    s.id = 'psf-neu-styles';                                                                     
       12 +    s.textContent = [                                                                            
       13 +      '.neu-card{background:#e0e5ec;padding:22px;border-radius:24px;box-shadow:6px 6px 12px      
          +#c1c9d2,-6px -6px 12px #fff}',                                                                   
       14 +      '.neu-inset{background:#e0e5ec;padding:18px;border-radius:24px;box-shadow:3px 3px 6px      
          +#c1c9d2,-3px -3px 6px #fff}',                                                                    
       15 +                                                                                                 
          +'.neu-btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;padding:14px    
          +22px;border:none;border-radius:60px;background:#e0e5ec;color:#5f6775;font-weight:bold;cursor:poi 
          +nter;transition:all .2s;box-shadow:3px 3px 6px #c1c9d2,-3px -3px 6px #fff;font-size:13px}',      
       16 +      '.neu-btn:hover{color:#007bff;box-shadow:6px 6px 12px #c1c9d2,-6px -6px 12px #fff}',       
       17 +      '.neu-btn:active{box-shadow:inset 3px 3px 6px #c1c9d2,inset -3px -3px 6px                  
          +#fff;color:#23217c;transform:translateY(1px)}',                                                  
       18 +      '.neu-btn-primary{color:#007bff}',                                                         
       19 +      '.neu-btn-danger{color:#dc3545}',                                                          
       20 +      '.neu-btn-success{color:#28a745}',                                                         
       21 +      '.neu-btn-info{color:#007bff}',                                                            
       22 +      '.neu-btn-container{display:flex;gap:15px;justify-content:center;margin-top:15px}',        
       23 +      '.neu-form-group{margin-bottom:20px;display:flex;flex-direction:row;gap:10px;align-items:c 
          +enter;justify-content:center}',                                                                  
       24 +      '.neu-form-label{font-size:14px;font-weight:500;color:#5f6775;display:flex;align-items:cen 
          +ter;gap:10px}',                                                                                  
       25 +      '.neu-form-input{padding:14px;border:none;border-radius:24px;background:#e0e5ec;color:#5f6 
          +775;font-size:14px;box-shadow:inset 6px 6px 12px #c1c9d2,inset -6px -6px 12px                    
          +#fff;height:30px;transition:box-shadow .2s;max-width:80px}',                                     
       26 +      '.neu-form-input:focus{outline:none;box-shadow:inset 6px 6px 12px #c1c9d2,inset -6px -6px  
          +12px #fff}',                                                                                     
       27 +      '.neu-form-select{padding:14px;border:none;border-radius:24px;background:#e0e5ec;color:#5f 
          +6775;font-size:14px;box-shadow:inset 6px 6px 12px #c1c9d2,inset -6px -6px 12px                   
          +#fff;transition:box-shadow .2s}',                                                                
       28 +      '.neu-form-select:focus{outline:none}',                                                    
       29 +      '.neu-form-textarea{padding:14px;border:none;border-radius:24px;background:#e0e5ec;color:# 
          +5f6775;font-size:14px;box-shadow:inset 6px 6px 12px #c1c9d2,inset -6px -6px 12px                 
          +#fff;min-height:100px;resize:vertical;transition:box-shadow .2s}',                               
       30 +      '.neu-form-textarea:focus{outline:none}',                                                  
       31 +      '.neu-modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:40}',         
       32 +      '.neu-modal-card{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:95%; 
          +max-width:600px;z-index:50;max-height:90vh}',                                                    
       33 +      '.neu-modal{background:#e0e5ec;border-radius:36px;padding:18px;margin:20px}',              
       34 +      '.neu-tabs-nav{display:flex;gap:10px;flex-wrap:wrap}',                                     
       35 +      '.neu-tab-button{padding:10px 20px;border:none;border-radius:60px;background:#e0e5ec;color 
          +:#5f6775;font-weight:500;cursor:pointer;box-shadow:3px 3px 6px #c1c9d2,-3px -3px 6px #fff}',     
       36 +      '.neu-tab-button.active{box-shadow:inset 3px 3px 6px #c1c9d2,inset -3px -3px 6px           
          +#fff;color:#007bff;font-weight:bold}',                                                           
       37 +      '.neu-tab-panel{display:none}',                                                            
       38 +      '.neu-tab-panel.active{display:block}'                                                     
       39 +    ].join('\n');                                                                                
       40 +    document.head.appendChild(s);                                                                
       41 +  }                                                                                              
       42
       43 -    elements: {                                                                                  
       44 -      escalasContainer: null,                                                                    
       45 -      escalaContainer: null,                                                                     
       46 -      resultadoContainer: null                                                                   
       47 -    },                                                                                           
       43 +  function renderPsiqui() {                                                                      
       44 +    var container = document.getElementById('psf_sub_psiqui');                                   
       45 +    if (!container) {                                                                            
       46 +      console.error('[Psiqui] Container #psf_sub_psiqui não encontrado');                        
       47 +      return;                                                                                    
       48 +    }                                                                                            
       49
       50 -    data: {                                                                                      
       51 -      escalas: [                                                                                 
       52 -        { id: 'phq9', nome: 'PHQ-9', descricao: 'Questionário de Saúde do Paciente - 9', icone:  
          -'fa-brain' },                                                                                    
       53 -        { id: 'gad7', nome: 'GAD-7', descricao: 'Escala de Ansiedade de GAD-7', icone:           
          -'fa-head-side-virus' },                                                                          
       54 -        { id: 'phq2', nome: 'PHQ-2', descricao: 'Triagem de Depressão', icone:                   
          -'fa-question-circle' },                                                                          
       55 -        { id: 'gad2', nome: 'GAD-2', descricao: 'Triagem de Ansiedade', icone: 'fa-question' }   
       56 -      ],                                                                                         
       57 -      perguntas: {                                                                               
       58 -        phq9: [                                                                                  
       59 -          { id: 'p1', texto: 'Pouco interesse ou prazer em fazer as coisas', pesos: [0, 1, 2, 3] 
          - },                                                                                              
       60 -          { id: 'p2', texto: 'Sentindo-se para baixo, deprimido ou sem esperança', pesos: [0, 1, 
          - 2, 3] },                                                                                        
       61 -          { id: 'p3', texto: 'Dificuldade para pegar no sono ou dormir demais', pesos: [0, 1, 2, 
          - 3] },                                                                                           
       62 -          { id: 'p4', texto: 'Sentindo-se cansado ou com pouca energia', pesos: [0, 1, 2, 3] },  
       63 -          { id: 'p5', texto: 'Sem apetite ou comendo demais', pesos: [0, 1, 2, 3] },             
       64 -          { id: 'p6', texto: 'Sentindo-se mal consigo mesmo ou que é um fracasso', pesos: [0, 1, 
          - 2, 3] },                                                                                        
       65 -          { id: 'p7', texto: 'Dificuldade para se concentrar', pesos: [0, 1, 2, 3] },            
       66 -          { id: 'p8', texto: 'Movimentos ou fala lentos, ou agitado e inquieto', pesos: [0, 1,   
          -2, 3] },                                                                                         
       67 -          { id: 'p9', texto: 'Pensamentos de ferir a si mesmo de alguma forma', pesos: [0, 1, 2, 
          - 3] }                                                                                            
       68 -        ],                                                                                       
       69 -        gad7: [                                                                                  
       70 -          { id: 'g1', texto: 'Sentindo-se nervoso, ansioso ou muito tenso', pesos: [0, 1, 2, 3]  
          -},                                                                                               
       71 -          { id: 'g2', texto: 'Não consegue parar de se preocupar', pesos: [0, 1, 2, 3] },        
       72 -          { id: 'g3', texto: 'Preocupando-se excessivamente com diferentes coisas', pesos: [0,   
          -1, 2, 3] },                                                                                      
       73 -          { id: 'g4', texto: 'Dificuldade para relaxar', pesos: [0, 1, 2, 3] },                  
       74 -          { id: 'g5', texto: 'Tão agitado que fica difícil ficar quieto', pesos: [0, 1, 2, 3] }, 
       75 -          { id: 'g6', texto: 'Tornando-se facilmente irritado ou impaciente', pesos: [0, 1, 2,   
          -3] },                                                                                            
       76 -          { id: 'g7', texto: 'Sentindo-se como se algo terrível pudesse acontecer', pesos: [0,   
          -1, 2, 3] }                                                                                       
       77 -        ],                                                                                       
       78 -        phq2: [                                                                                  
       79 -          { id: 'ph2_1', texto: 'Pouco interesse ou prazer em fazer as coisas', pesos: [0, 1, 2, 
          - 3] },                                                                                           
       80 -          { id: 'ph2_2', texto: 'Sentindo-se para baixo, deprimido ou sem esperança', pesos: [0, 
          - 1, 2, 3] }                                                                                      
       81 -        ],                                                                                       
       82 -        gad2: [                                                                                  
       83 -          { id: 'ga2_1', texto: 'Sentindo-se nervoso, ansioso ou muito tenso', pesos: [0, 1, 2,  
          -3] },                                                                                            
       84 -          { id: 'ga2_2', texto: 'Não consegue parar de se preocupar', pesos: [0, 1, 2, 3] }      
       50 +    injectNeuCSS();                                                                              
       51 +                                                                                                 
       52 +    container.innerHTML = [                                                                      
       53 +      '<div class="p-4">',                                                                       
       54 +      '<header class="flex flex-row justify-start items-center gap-4 mb-6 border-b               
          +border-gray-200 pb-4">',                                                                         
       55 +      '<h1 class="text-2xl font-bold flex items-center gap-3 text-[#23217c]"><i class="fa-solid  
          +fa-brain"></i> Exame Psíquico</h1>',                                                             
       56 +      '<div class="neu-form-group" style="margin-bottom:0;flex:0 0 auto"><label                  
          +for="psiqui_nome" class="neu-form-label" style="font-size:14px">Nome:</label><input type="text"  
          +id="psiqui_nome" class="neu-form-input" style="max-width:200px;height:32px" /></div>',           
       57 +      '<div class="neu-form-group" style="margin-bottom:0;flex:0 0 auto"><label                  
          +for="psiqui_data" class="neu-form-label" style="font-size:14px">Data:</label><input              
          +type="datetime-local" id="psiqui_data" class="neu-form-input"                                    
          +style="max-width:220px;height:32px" /></div>',                                                   
       58 +      '</header>',                                                                               
       59 +      '<div id="psiqui_examePsiquicoForm" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  
          +xl:grid-cols-4 gap-6" style="font-size:11px"></div>',                                            
       60 +      '<section class="neu-inset mt-6 flex flex-col">',                                          
       61 +      '<div class="flex flex-row gap-3 items-center justify-center mb-3"><i class="fa-solid      
          +fa-pencil text-gray-500"></i><h3 class="font-bold" style="font-size:14px">Observações            
          +adicionais</h3></div>',                                                                          
       62 +      '<textarea id="psiqui_obsAdicionais" class="neu-form-textarea" style="font-size:14px"      
          +rows="3" placeholder="Observações adicionais..."></textarea>',                                   
       63 +      '</section>',                                                                              
       64 +      '<div class="neu-btn-container mt-6 flex flex-col md:flex-row gap-4">',                    
       65 +      '<button id="psiqui_openScalesBtn" type="button" class="neu-btn"><i class="fa-solid        
          +fa-chart-simple mr-2"></i> ABRIR ESCALAS</button>',                                              
       66 +      '<button id="psiqui_copyBtn" type="button" class="neu-btn neu-btn-primary"><i              
          +class="fa-solid fa-clipboard mr-2"></i> COPIAR TUDO</button>',                                   
       67 +      '</div>',                                                                                  
       68 +      '</div>',                                                                                  
       69 +      '<!-- MODAL DE ESCALAS -->',                                                               
       70 +      '<div id="psiqui_scalesModalOverlay" class="neu-modal-overlay hidden"></div>',             
       71 +      '<div id="psiqui_scalesModal" class="neu-modal neu-modal-card hidden"                      
          +style="max-width:640px">',                                                                       
       72 +      '<div class="flex flex-col h-[85vh] p-4">',                                                
       73 +      '<div class="flex justify-between items-center border-b border-gray-200 pb-4 mb-4">',      
       74 +      '<h2 class="text-xl font-bold flex items-center gap-3 text-[#23217c]"><i class="fa-solid   
          +fa-ruler-combined"></i> Escalas de Rastreamento</h2>',                                           
       75 +      '<button id="psiqui_closeScalesBtn" type="button" class="text-2xl bg-transparent           
          +border-none cursor-pointer">&times;</button>',                                                   
       76 +      '</div>',                                                                                  
       77 +      '<div id="psiqui_tabNav" class="neu-tabs-nav mb-4">',                                      
       78 +      '<button class="neu-tab-button active" data-tab="psiqui_phq9">PHQ-9</button>',             
       79 +      '<button class="neu-tab-button" data-tab="psiqui_gad7">GAD-7</button>',                    
       80 +      '<button class="neu-tab-button" data-tab="psiqui_cage">CAGE</button>',                     
       81 +      '<button class="neu-tab-button" data-tab="psiqui_bdi">Beck (BDI-II)</button>',             
       82 +      '</div>',                                                                                  
       83 +      '<div class="flex-grow overflow-y-auto neu-inset p-4">',                                   
       84 +      '<div id="psiqui_phq9" class="neu-tab-panel active"></div>',                               
       85 +      '<div id="psiqui_gad7" class="neu-tab-panel"></div>',                                      
       86 +      '<div id="psiqui_cage" class="neu-tab-panel"></div>',                                      
       87 +      '<div id="psiqui_bdi" class="neu-tab-panel"></div>',                                       
       88 +      '</div>',                                                                                  
       89 +      '<div class="neu-btn-container mt-4 flex flex-col md:flex-row gap-4">',                    
       90 +      '<button id="psiqui_copyScalesBtn" type="button" class="neu-btn"><i class="fa-solid        
          +fa-copy mr-2"></i> Copiar Escalas</button>',                                                     
       91 +      '<button id="psiqui_closeScalesBtnModal" type="button" class="neu-btn                      
          +neu-btn-primary">Fechar</button>',                                                               
       92 +      '</div>',                                                                                  
       93 +      '</div>',                                                                                  
       94 +      '</div>'                                                                                   
       95 +    ].join('\n');                                                                                
       96 +                                                                                                 
       97 +    // ===============================                                                           
       98 +    //  ESTADO E HELPERS                                                                         
       99 +    // ===============================                                                           
      100 +    var APP_STATE = { scalesMD: '', scalesMD2: '' };                                             
      101 +                                                                                                 
      102 +    var qs = function (sel, root) { return (root || container).querySelector(sel); };            
      103 +    var qsa = function (sel, root) { return Array.from((root ||                                  
          +container).querySelectorAll(sel)); };                                                            
      104 +    var toSlug = function (s) {                                                                  
      105 +      return (s || '').toLowerCase()                                                             
      106 +        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')                                        
      107 +        .replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');                                    
      108 +    };                                                                                           
      109 +                                                                                                 
      110 +    function copyToClipboard(text) {                                                             
      111 +      try {                                                                                      
      112 +        if (navigator.clipboard && window.isSecureContext) {                                     
      113 +          return navigator.clipboard.writeText(text).then(function () { return true; });         
      114 +        }                                                                                        
      115 +      } catch (e) {}                                                                             
      116 +      var ta = document.createElement('textarea');                                               
      117 +      ta.value = text;                                                                           
      118 +      ta.style.position = 'fixed';                                                               
      119 +      ta.style.left = '-9999px';                                                                 
      120 +      document.body.appendChild(ta);                                                             
      121 +      ta.focus();                                                                                
      122 +      ta.select();                                                                               
      123 +      var ok = false;                                                                            
      124 +      try { ok = document.execCommand('copy'); } catch (e) {}                                    
      125 +      document.body.removeChild(ta);                                                             
      126 +      return Promise.resolve(ok);                                                                
      127 +    }                                                                                            
      128 +                                                                                                 
      129 +    var getVal = function (id) {                                                                 
      130 +      var el = document.getElementById(id);                                                      
      131 +      return el ? (el.value || '').trim() : '';                                                  
      132 +    };                                                                                           
      133 +                                                                                                 
      134 +    function formatarDuasColunas(textoEsquerda, textoDireita, larguraColuna) {                   
      135 +      var linhasEsq = (textoEsquerda || '').split('\n');                                         
      136 +      var linhasDir = (textoDireita || '').split('\n');                                          
      137 +      var maxLinhas = Math.max(linhasEsq.length, linhasDir.length);                              
      138 +      var out = '';                                                                              
      139 +      for (var i = 0; i < maxLinhas; i++) {                                                      
      140 +        var lEsq = (linhasEsq[i] || '').padEnd(larguraColuna);                                   
      141 +        var lDir = linhasDir[i] || '';                                                           
      142 +        out += lEsq + ' | ' + lDir + '\n';                                                       
      143 +      }                                                                                          
      144 +      return out;                                                                                
      145 +    }                                                                                            
      146 +                                                                                                 
      147 +    // ===============================                                                           
      148 +    //  DADOS DOS GRUPOS                                                                         
      149 +    // ===============================                                                           
      150 +    var EXAME_PSIQUICO_GRUPOS = [                                                                
      151 +      {                                                                                          
      152 +        icon: 'fa-user-tie', title: 'Aspecto geral',                                             
      153 +        subgroups: [                                                                             
      154 +          { label: 'Cuidado', options: ['Adequado', 'Descuidado'] },                             
      155 +          { label: 'Higiene', options: ['Adequada', 'Precária'] },                               
      156 +          { label: 'Compostura', options: ['Preservada', 'Alterada'] }                           
      157          ]
      158        },
      159 -      opcoes: [                                                                                  
      160 -        { valor: 0, texto: 'Nenhuma vez' },                                                      
      161 -        { valor: 1, texto: 'Vários dias' },                                                      
      162 -        { valor: 2, texto: 'Mais da metade dos dias' },                                          
      163 -        { valor: 3, texto: 'Quase todos os dias' }                                               
      164 -      ]                                                                                          
      165 -    },                                                                                           
      159 +      {                                                                                          
      160 +        icon: 'fa-handshake-angle', title: 'Atitude',                                            
      161 +        subgroups: [                                                                             
      162 +          { label: 'Cooperação', options: ['Cooperativo', 'Pouco cooperativo', 'Hostil'] },      
      163 +          { label: 'Motivação', options: ['Motivado p/ tratamento', 'Pouco motivado'] }          
      164 +        ]                                                                                        
      165 +      },                                                                                         
      166 +      {                                                                                          
      167 +        icon: 'fa-compass', title: 'Consciência',                                                
      168 +        subgroups: [                                                                             
      169 +          { label: 'Nível', options: ['Clara', 'Rebaixada', 'Flutuante'] }                       
      170 +        ]                                                                                        
      171 +      },                                                                                         
      172 +      {                                                                                          
      173 +        icon: 'fa-map-location-dot', title: 'Orientação',                                        
      174 +        subgroups: [                                                                             
      175 +          { label: 'Tempo', options: ['Orientado', 'Desorientado'] },                            
      176 +          { label: 'Espaço', options: ['Orientado', 'Desorientado'] },                           
      177 +          { label: 'Pessoa', options: ['Orientado', 'Desorientado'] }                            
      178 +        ]                                                                                        
      179 +      },                                                                                         
      180 +      {                                                                                          
      181 +        icon: 'fa-comments', title: 'Discurso',                                                  
      182 +        subgroups: [                                                                             
      183 +          { label: 'Fluência', options: ['Fluente', 'Arrastado'] },                              
      184 +          { label: 'Coerência', options: ['Coerente', 'Incoerente'] },                           
      185 +          { label: 'Volume', options: ['Adequado', 'Hipofonia', 'Hipersonoridade'] },            
      186 +          { label: 'Velocidade', options: ['Normal', 'Reduzida', 'Taquilalia'] }                 
      187 +        ]                                                                                        
      188 +      },                                                                                         
      189 +      {                                                                                          
      190 +        icon: 'fa-face-smile', title: 'Humor',                                                   
      191 +        subgroups: [                                                                             
      192 +          { label: 'Qualidade', options: ['Eutímico', 'Depressivo', 'Ansioso', 'Eufórico',       
          +'Lábil'] }                                                                                       
      193 +        ]                                                                                        
      194 +      },                                                                                         
      195 +      {                                                                                          
      196 +        icon: 'fa-masks-theater', title: 'Afeto',                                                
      197 +        subgroups: [                                                                             
      198 +          { label: 'Congruência', options: ['Congruente', 'Incongruente'] },                     
      199 +          { label: 'Amplitude', options: ['Normal', 'Amortecido', 'Restrito', 'Emboto'] }        
      200 +        ]                                                                                        
      201 +      },                                                                                         
      202 +      {                                                                                          
      203 +        icon: 'fa-project-diagram', title: 'Pensamento',                                         
      204 +        subgroups: [                                                                             
      205 +          { label: 'Curso', options: ['Normal', 'Lentificado', 'Acelerado', 'Fuga de ideias'] }, 
      206 +          { label: 'Forma', options: ['Organizada', 'Desorganizada', 'Tangencial'] },            
      207 +          { label: 'Conteúdo', options: ['Normal', 'Ideias obsessivas', 'Delírios'] }            
      208 +        ]                                                                                        
      209 +      },                                                                                         
      210 +      {                                                                                          
      211 +        icon: 'fa-eye', title: 'Percepções',                                                     
      212 +        subgroups: [                                                                             
      213 +          { label: 'Qualidade', options: ['Sem alterações', 'Alucinações auditivas',             
          +'Alucinações visuais', 'Ilusões'] }                                                              
      214 +        ]                                                                                        
      215 +      },                                                                                         
      216 +      {                                                                                          
      217 +        icon: 'fa-puzzle-piece', title: 'Cognição',                                              
      218 +        subgroups: [                                                                             
      219 +          { label: 'Memória', options: ['Preservada', 'Comprometida'] },                         
      220 +          { label: 'Atenção', options: ['Preservada', 'Déficit'] },                              
      221 +          { label: 'Concentração', options: ['Preservada', 'Prejudicada'] },                     
      222 +          { label: 'Inteligência', options: ['Dentro da média', 'Abaixo da média'] }             
      223 +        ]                                                                                        
      224 +      },                                                                                         
      225 +      {                                                                                          
      226 +        icon: 'fa-bolt', title: 'Insight',                                                       
      227 +        subgroups: [                                                                             
      228 +          { label: 'Reconhecimento', options: ['Reconhece a doença', 'Reconhecimento parcial',   
          +'Sem reconhecimento'] }                                                                          
      229 +        ]                                                                                        
      230 +      },                                                                                         
      231 +      {                                                                                          
      232 +        icon: 'fa-scale-balanced', title: 'Julgamento',                                          
      233 +        subgroups: [                                                                             
      234 +          { label: 'Qualidade', options: ['Adequado', 'Parcialmente preservado', 'Prejudicado']  
          +}                                                                                                
      235 +        ]                                                                                        
      236 +      }                                                                                          
      237 +    ];                                                                                           
      238
      239 -    init() {                                                                                     
      240 -      this.cacheElements();                                                                      
      241 -      this.renderEscalas();                                                                      
      242 -      this.setupEventListeners();                                                                
      243 -    },                                                                                           
      239 +    // ===============================                                                           
      240 +    //  RENDER DOS GRUPOS                                                                        
      241 +    // ===============================                                                           
      242 +    var formContainer = document.getElementById('psiqui_examePsiquicoForm');                     
      243
      244 -    cacheElements() {                                                                            
      245 -      this.elements.escalasContainer = document.getElementById('escalas-container');             
      246 -      this.elements.escalaContainer = document.getElementById('escala-container');               
      247 -      this.elements.resultadoContainer = document.getElementById('resultado-container');         
      248 -    },                                                                                           
      244 +    function createGroupComponent(groupData) {                                                   
      245 +      var groupId = toSlug(groupData.title);                                                     
      246 +      var section = document.createElement('section');                                           
      247 +      section.className = 'neu-inset';                                                           
      248 +      section.id = 'psiqui_group-' + groupId;                                                    
      249
      250 -    setupEventListeners() {                                                                      
      251 -    },                                                                                           
      250 +      var subgroupsHTML = groupData.subgroups.map(function (sub) {                               
      251 +        var subId = toSlug(sub.label);                                                           
      252 +        var checkboxesHTML = sub.options.map(function (opt) {                                    
      253 +          return '<label class="neu-form-label flex items-center gap-4" style="font-size:12px">' 
          + +                                                                                               
      254 +            '<input type="checkbox" name="psiqui_' + groupId + '-' + subId + '" value="' + opt + 
          + '" class="w-4 h-4"> ' +                                                                         
      255 +            opt + '</label>';                                                                    
      256 +        }).join('');                                                                             
      257
      258 -    renderEscalas() {                                                                            
      259 -      if (!this.elements.escalasContainer) return;                                               
      258 +        return '<div>' +                                                                         
      259 +          '<span class="font-semibold" style="font-size:14px">' + sub.label + '</span>' +        
      260 +          '<div class="flex flex-row flex-wrap items-center gap-x-6 gap-y-2 mt-2">' +            
          +checkboxesHTML + '</div>' +                                                                      
      261 +          '</div>';                                                                              
      262 +      }).join('<hr style="border:0;border-top:2px solid #0a74da;width:80%;margin:10px auto">');  
      263
      264 -      let html = '<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">';                          
      264 +      section.innerHTML = '<h3 class="mb-4 font-bold flex justify-center items-center gap-3"     
          +style="font-size:16px">' +                                                                       
      265 +        '<i class="fa-solid ' + groupData.icon + ' text-gray-500"></i> ' + groupData.title +     
          +'</h3>' +                                                                                        
      266 +        '<div class="flex flex-col gap-2 mb-2">' + subgroupsHTML + '</div>' +                    
      267 +        '<input type="text" id="psiqui_comp-' + groupId + '" class="neu-form-input mt-4 w-full"  
          +style="max-width:100%;height:32px" placeholder="Complemento...">';                               
      268
      269 -      this.data.escalas.forEach(escala => {                                                      
      270 -        html += `                                                                                
      271 -          <button type="button" class="btn flex flex-col items-center gap-3 p-6"                 
          -data-escala="${escala.id}">                                                                      
      272 -            <i class="fas ${escala.icone} text-3xl"></i>                                         
      273 -            <span class="font-semibold text-lg">${escala.nome}</span>                            
      274 -            <span class="text-sm text-gray-500">${escala.descricao}</span>                       
      275 -          </button>                                                                              
      276 -        `;                                                                                       
      277 -      });                                                                                        
      269 +      formContainer.appendChild(section);                                                        
      270 +    }                                                                                            
      271
      272 -      html += '</div>';                                                                          
      273 -      this.elements.escalasContainer.innerHTML = html;                                           
      272 +    EXAME_PSIQUICO_GRUPOS.forEach(createGroupComponent);                                         
      273
      274 -      this.elements.escalasContainer.querySelectorAll('button').forEach(btn => {                 
      275 -        btn.addEventListener('click', () => this.abrirEscala(btn.dataset.escala));               
      276 -      });                                                                                        
      277 -    },                                                                                           
      274 +    // Data padrão                                                                               
      275 +    var dataEl = document.getElementById('psiqui_data');                                         
      276 +    if (dataEl && !dataEl.value) {                                                               
      277 +      dataEl.value = new Date().toISOString().slice(0, 16);                                      
      278 +    }                                                                                            
      279
      280 -    abrirEscala(escalaId) {                                                                      
      281 -      this.state.selectedEscala = escalaId;                                                      
      282 -      this.renderEscala();                                                                       
      283 -    },                                                                                           
      280 +    // ===============================                                                           
      281 +    //  ESCALAS (MODAL)                                                                          
      282 +    // ===============================                                                           
      283 +    function getScaleResultText(checkAll) {                                                      
      284 +      var getResult = function (containerId) {                                                   
      285 +        var root = document.getElementById(containerId);                                         
      286 +        if (!root) return null;                                                                  
      287 +        var totalEl = root.querySelector('.total-score');                                        
      288 +        var interpEl = root.querySelector('.interpretation');                                    
      289 +        var isAnswered = totalEl && totalEl.textContent !== '-';                                 
      290 +        if (!isAnswered && !checkAll) return null;                                               
      291 +        return {                                                                                 
      292 +          total: isAnswered ? totalEl.textContent : 'Não preenchido',                            
      293 +          interp: isAnswered ? interpEl.textContent : 'Não aplicado'                             
      294 +        };                                                                                       
      295 +      };                                                                                         
      296
      297 -    renderEscala() {                                                                             
      298 -      if (!this.elements.escalaContainer || !this.state.selectedEscala) return;                  
      297 +      var phq = getResult('psiqui_phq9');                                                        
      298 +      var gad = getResult('psiqui_gad7');                                                        
      299 +      var cage = getResult('psiqui_cage');                                                       
      300 +      var bdi = getResult('psiqui_bdi');                                                         
      301
      302 -      const escala = this.data.escalas.find(e => e.id === this.state.selectedEscala);            
      303 -      const perguntas = this.data.perguntas[this.state.selectedEscala];                          
      302 +      var scaleText = '## Escalas\n\n';                                                          
      303 +      if (phq || checkAll) scaleText += '### PHQ-9\n- **Total:** ' + (phq ? phq.total : '-') + ' 
          + (de 27)\n- **Interpretação:** ' + (phq ? phq.interp : '-') + '\n\n';                            
      304 +      if (gad || checkAll) scaleText += '### GAD-7\n- **Total:** ' + (gad ? gad.total : '-') + ' 
          + (de 21)\n- **Interpretação:** ' + (gad ? gad.interp : '-') + '\n\n';                            
      305 +      if (cage || checkAll) scaleText += '### CAGE\n- **Total:** ' + (cage ? cage.total : '-') + 
          + ' (de 4, Sim=1)\n- **Interpretação:** ' + (cage ? cage.interp : '-') + '\n\n';                  
      306 +      if (bdi || checkAll) scaleText += '### Beck (BDI-II)\n- **Total:** ' + (bdi ? bdi.total :  
          +'-') + ' (de 63)\n- **Interpretação:** ' + (bdi ? bdi.interp : '-') + '\n\n';                    
      307
      308 -      if (!perguntas) return;                                                                    
      308 +      var anyAnswered = phq || gad || cage || bdi;                                               
      309 +      return (anyAnswered || checkAll) ? scaleText.trim() : '';                                  
      310 +    }                                                                                            
      311
      312 -      let html = `                                                                               
      313 -        <div class="card-inset p-6">                                                             
      314 -          <div class="flex justify-between items-center mb-6">                                   
      315 -            <h2 class="text-2xl font-bold flex items-center gap-2">                              
      316 -              <i class="fas ${escala.icone}"></i>                                                
      317 -              ${escala.nome}                                                                     
      318 -            </h2>                                                                                
      319 -            <button type="button" class="btn" onclick="Psiquiatria.voltar()">                    
      320 -              <i class="fas fa-arrow-left"></i>                                                  
      321 -            </button>                                                                            
      322 -          </div>                                                                                 
      323 -          <p class="mb-4 text-sm text-gray-600">Durante as últimas 2 semanas, com que frequência 
          - você foi incomodado por:</p>                                                                    
      324 -          <div class="space-y-4">                                                                
      325 -      `;                                                                                         
      312 +    function getScaleBlocks(checkAll) {                                                          
      313 +      var getResult = function (containerId) {                                                   
      314 +        var root = document.getElementById(containerId);                                         
      315 +        if (!root) return null;                                                                  
      316 +        var totalEl = root.querySelector('.total-score');                                        
      317 +        var interpEl = root.querySelector('.interpretation');                                    
      318 +        var isAnswered = totalEl && totalEl.textContent !== '-';                                 
      319 +        if (!isAnswered && !checkAll) return null;                                               
      320 +        return {                                                                                 
      321 +          total: isAnswered ? totalEl.textContent : 'Não preenchido',                            
      322 +          interp: isAnswered ? interpEl.textContent : 'Não aplicado'                             
      323 +        };                                                                                       
      324 +      };                                                                                         
      325
      326 -      perguntas.forEach(pergunta => {                                                            
      327 -        html += `<div class="card-inset p-4">`;                                                  
      328 -        html += `<p class="font-semibold mb-3">${pergunta.texto}</p>`;                           
      329 -        html += `<div class="grid grid-cols-1 sm:grid-cols-4 gap-2">`;                           
      326 +      var phq = getResult('psiqui_phq9');                                                        
      327 +      var gad = getResult('psiqui_gad7');                                                        
      328 +      var cage = getResult('psiqui_cage');                                                       
      329 +      var bdi = getResult('psiqui_bdi');                                                         
      330
      331 -        this.data.opcoes.forEach(opcao => {                                                      
      332 -          html += `                                                                              
      333 -            <label class="flex items-center gap-2 p-2 cursor-pointer">                           
      334 -              <input type="radio" name="${pergunta.id}" value="${opcao.valor}"                   
          -data-peso="${opcao.valor}" />                                                                    
      335 -              <span>${opcao.texto}</span>                                                        
      336 -            </label>                                                                             
      337 -          `;                                                                                     
      338 -        });                                                                                      
      331 +      var blocks = [];                                                                           
      332 +      var pushBlock = function (title, r, max) {                                                 
      333 +        var total = r ? r.total : '-';                                                           
      334 +        var interp = r ? r.interp : '-';                                                         
      335 +        blocks.push('### ' + title + '\n- **Total:** ' + total + ' (de ' + max + ')\n-           
          +**Interpretação:** ' + interp);                                                                  
      336 +      };                                                                                         
      337
      338 -        html += `</div></div>`;                                                                  
      339 -      });                                                                                        
      338 +      if (phq || checkAll) pushBlock('PHQ-9', phq, 27);                                          
      339 +      if (gad || checkAll) pushBlock('GAD-7', gad, 21);                                          
      340 +      if (cage || checkAll) pushBlock('CAGE', cage, 4);                                          
      341 +      if (bdi || checkAll) pushBlock('Beck (BDI-II)', bdi, 63);                                  
      342
      343 -      html += `                                                                                  
      344 -          </div>                                                                                 
      345 -          <div class="btn-container mt-6">                                                       
      346 -            <button type="button" class="btn btn-primary" onclick="Psiquiatria.calcular()">      
      347 -              <i class="fas fa-calculator mr-2"></i> Calcular                                    
      348 -            </button>                                                                            
      349 -            <button type="button" class="btn" onclick="Psiquiatria.limpar()">                    
      350 -              <i class="fas fa-eraser mr-2"></i> Limpar                                          
      351 -            </button>                                                                            
      352 -          </div>                                                                                 
      353 -        </div>                                                                                   
      354 -      `;                                                                                         
      343 +      return blocks;                                                                             
      344 +    }                                                                                            
      345
      346 -      this.elements.escalaContainer.innerHTML = html;                                            
      347 -      this.elements.escalaContainer.classList.remove('hidden');                                  
      348 -      this.elements.resultadoContainer.classList.add('hidden');                                  
      349 -    },                                                                                           
      346 +    function getScaleResultTextTwoCols(checkAll, larguraColuna) {                                
      347 +      var blocks = getScaleBlocks(checkAll);                                                     
      348 +      if (!blocks.length && !checkAll) return '';                                                
      349
      350 -    calcular() {                                                                                 
      351 -      if (!this.state.selectedEscala) return;                                                    
      350 +      var separador = '#'.padEnd(larguraColuna - 1, '=');                                        
      351 +      var out = '## Escalas\n\n';                                                                
      352
      353 -      const perguntas = this.data.perguntas[this.state.selectedEscala];                          
      354 -      let pontuacao = 0;                                                                         
      353 +      for (var i = 0; i < blocks.length; i += 2) {                                               
      354 +        var left = blocks[i] || '';                                                              
      355 +        var right = blocks[i + 1] || '';                                                         
      356 +        out += formatarDuasColunas(left, right, larguraColuna);                                  
      357 +        out += formatarDuasColunas(separador, separador, larguraColuna) + '\n';                  
      358 +      }                                                                                          
      359 +      return out.trim();                                                                         
      360 +    }                                                                                            
      361
      362 -      perguntas.forEach(pergunta => {                                                            
      363 -        const radio = document.querySelector(`input[name="${pergunta.id}"]:checked`);            
      364 -        if (radio) {                                                                             
      365 -          pontuacao += parseInt(radio.dataset.peso);                                             
      362 +    function generateScale(containerId, title, questions, options) {                             
      363 +      var scaleContainer = document.getElementById(containerId);                                 
      364 +      if (!scaleContainer) return;                                                               
      365 +                                                                                                 
      366 +      var questionsHTML = questions.map(function (q, i) {                                        
      367 +        var opts = options.map(function (opt) {                                                  
      368 +          return '<option value="' + opt.score + '">' + opt.text + '</option>';                  
      369 +        }).join('');                                                                             
      370 +        return '<div class="neu-form-group flex flex-col md:flex-row md:items-center             
          +justify-between gap-2 p-2 rounded-lg hover:bg-gray-100" style="margin-bottom:8px">' +            
      371 +          '<label class="neu-form-label" style="font-size:12px">' + (i + 1) + '. ' + q +         
          +'</label>' +                                                                                     
      372 +          '<select class="neu-form-select scale-item" style="width:100%;max-width:256px">' +     
      373 +          '<option value="-1">Selecione...</option>' + opts + '</select></div>';                 
      374 +      }).join('');                                                                               
      375 +                                                                                                 
      376 +      scaleContainer.innerHTML = '<h3 class="mb-2 font-bold" style="font-size:16px">' + title +  
          +'</h3>' +                                                                                        
      377 +        '<p class="font-semibold text-gray-500 mb-4" style="font-size:14px">Responda             
          +considerando as últimas 2 semanas:</p>' +                                                        
      378 +        '<div class="flex flex-col">' + questionsHTML + '</div>' +                               
      379 +        '<div class="neu-inset mt-4 p-3 text-center">' +                                         
      380 +        '<span class="font-bold" style="font-size:12px">Total: <span                             
          +class="total-score">-</span></span> | ' +                                                        
      381 +        '<span class="font-bold" style="font-size:12px">Interpretação: <span                     
          +class="interpretation">-</span></span></div>';                                                   
      382 +    }                                                                                            
      383 +                                                                                                 
      384 +    function setupScoreUpdater(containerId, calculateScore, getInterpretation) {                 
      385 +      var scaleContainer = document.getElementById(containerId);                                 
      386 +      if (!scaleContainer) return;                                                               
      387 +                                                                                                 
      388 +      var items = qsa('.scale-item', scaleContainer);                                            
      389 +      var totalEl = qs('.total-score', scaleContainer);                                          
      390 +      var interpEl = qs('.interpretation', scaleContainer);                                      
      391 +                                                                                                 
      392 +      var update = function () {                                                                 
      393 +        var score = calculateScore(items);                                                       
      394 +        if (totalEl) totalEl.textContent = String(score);                                        
      395 +        if (interpEl) interpEl.textContent = getInterpretation(score);                           
      396 +        APP_STATE.scalesMD = getScaleResultText(true);                                           
      397 +        APP_STATE.scalesMD2 = getScaleResultTextTwoCols(true, 75);                               
      398 +      };                                                                                         
      399 +                                                                                                 
      400 +      items.forEach(function (item) { item.addEventListener('change', update); });               
      401 +      update();                                                                                  
      402 +    }                                                                                            
      403 +                                                                                                 
      404 +    function generateCAGE() {                                                                    
      405 +      var cageContainer = document.getElementById('psiqui_cage');                                
      406 +      if (!cageContainer) return;                                                                
      407 +                                                                                                 
      408 +      var questions = [                                                                          
      409 +        'Alguma vez sentiu que deveria diminuir a quantidade de bebida?',                        
      410 +        'As pessoas criticaram o seu modo de beber?',                                            
      411 +        'Alguma vez sentiu-se mal ou culpado por beber?',                                        
      412 +        'De manhã, já tomou bebida logo ao acordar?'                                             
      413 +      ];                                                                                         
      414 +                                                                                                 
      415 +      var questionsHTML = questions.map(function (q, i) {                                        
      416 +        return '<label class="neu-form-label flex items-center gap-3 p-2 rounded-lg              
          +hover:bg-gray-100" style="font-size:12px">' +                                                    
      417 +          '<input type="checkbox" class="w-5 h-5 scale-item"> ' + (i + 1) + '. ' + q +           
          +'</label>';                                                                                      
      418 +      }).join('');                                                                               
      419 +                                                                                                 
      420 +      cageContainer.innerHTML = '<h3 class="mb-4 font-bold" style="font-size:16px">CAGE</h3>' +  
      421 +        '<div class="flex flex-col gap-2">' + questionsHTML + '</div>' +                         
      422 +        '<div class="neu-inset mt-4 p-3 text-center">' +                                         
      423 +        '<span class="font-bold" style="font-size:12px">Total: <span                             
          +class="total-score">-</span></span> | ' +                                                        
      424 +        '<span class="font-bold" style="font-size:12px">Interpretação: <span                     
          +class="interpretation">-</span></span></div>';                                                   
      425 +                                                                                                 
      426 +      setupScoreUpdater('psiqui_cage',                                                           
      427 +        function (items) { return items.reduce(function (sum, item) { return sum + (item.checked 
          + ? 1 : 0); }, 0); },                                                                             
      428 +        function (score) { return score >= 2 ? 'Positivo (risco)' : 'Negativo'; }                
      429 +      );                                                                                         
      430 +    }                                                                                            
      431 +                                                                                                 
      432 +    function generatePHQ9() {                                                                    
      433 +      var questions = [                                                                          
      434 +        'Pouco interesse ou prazer em fazer as coisas',                                          
      435 +        'Se sentir para baixo, deprimido(a) ou sem esperanças',                                  
      436 +        'Dificuldade para pegar no sono, manter o sono ou dormir demais',                        
      437 +        'Cansaço ou pouca energia',                                                              
      438 +        'Falta de apetite ou comer demais',                                                      
      439 +        'Sentir-se mal consigo mesmo(a) — um fracasso ou decepção',                              
      440 +        'Dificuldade para se concentrar',                                                        
      441 +        'Lentidão para se mover/falar ou agitação',                                              
      442 +        'Pensamentos de que seria melhor estar morto(a) ou se ferir'                             
      443 +      ];                                                                                         
      444 +      var options = [                                                                            
      445 +        { text: 'Nunca', score: 0 },                                                             
      446 +        { text: 'Alguns dias', score: 1 },                                                       
      447 +        { text: 'Mais da metade dos dias', score: 2 },                                           
      448 +        { text: 'Quase todos os dias', score: 3 }                                                
      449 +      ];                                                                                         
      450 +      generateScale('psiqui_phq9', 'PHQ-9 (Depressão)', questions, options);                     
      451 +                                                                                                 
      452 +      setupScoreUpdater('psiqui_phq9',                                                           
      453 +        function (items) { return items.reduce(function (sum, item) { return sum + Math.max(0,   
          +parseInt(item.value)); }, 0); },                                                                 
      454 +        function (score) {                                                                       
      455 +          if (score <= 4) return 'Mínimo/ausente';                                               
      456 +          if (score <= 9) return 'Leve';                                                         
      457 +          if (score <= 14) return 'Moderado';                                                    
      458 +          if (score <= 19) return 'Moderado-grave';                                              
      459 +          return 'Grave';                                                                        
      460          }
      461 -      });                                                                                        
      461 +      );                                                                                         
      462 +    }                                                                                            
      463
      464 -      const resultado = this.interpretarResultado(this.state.selectedEscala, pontuacao);         
      465 -      this.state.resultados[this.state.selectedEscala] = { pontuacao, resultado };               
      464 +    function generateGAD7() {                                                                    
      465 +      var questions = [                                                                          
      466 +        'Sentir-se nervoso(a), ansioso(a) ou no limite',                                         
      467 +        'Não conseguir parar/controlar a preocupação',                                           
      468 +        'Preocupar-se demais com diferentes coisas',                                             
      469 +        'Dificuldade para relaxar',                                                              
      470 +        'Agitação a ponto de ser difícil ficar parado(a)',                                       
      471 +        'Irritar-se ou ficar impaciente facilmente',                                             
      472 +        'Sentir medo como se algo terrível fosse acontecer'                                      
      473 +      ];                                                                                         
      474 +      var options = [                                                                            
      475 +        { text: 'Nunca', score: 0 },                                                             
      476 +        { text: 'Alguns dias', score: 1 },                                                       
      477 +        { text: 'Mais da metade dos dias', score: 2 },                                           
      478 +        { text: 'Quase todos os dias', score: 3 }                                                
      479 +      ];                                                                                         
      480 +      generateScale('psiqui_gad7', 'GAD-7 (Ansiedade)', questions, options);                     
      481
      482 -      this.mostrarResultado(resultado);                                                          
      483 -    },                                                                                           
      482 +      setupScoreUpdater('psiqui_gad7',                                                           
      483 +        function (items) { return items.reduce(function (sum, item) { return sum + Math.max(0,   
          +parseInt(item.value)); }, 0); },                                                                 
      484 +        function (score) {                                                                       
      485 +          if (score <= 4) return 'Mínimo/ausente';                                               
      486 +          if (score <= 9) return 'Leve';                                                         
      487 +          if (score <= 14) return 'Moderado';                                                    
      488 +          return 'Grave';                                                                        
      489 +        }                                                                                        
      490 +      );                                                                                         
      491 +    }                                                                                            
      492
      493 -    interpretarResultado(escalaId, pontuacao) {                                                  
      494 -      switch (escalaId) {                                                                        
      495 -        case 'phq9':                                                                             
      496 -          if (pontuacao <= 4) return { grau: 'Mínimo', cor: 'text-green-600', detalhe: 'Sintomas 
          - leves ou ausentes' };                                                                           
      497 -          if (pontuacao <= 9) return { grau: 'Leve', cor: 'text-yellow-600', detalhe: 'Depressão 
          - leve' };                                                                                        
      498 -          if (pontuacao <= 14) return { grau: 'Moderada', cor: 'text-orange-600', detalhe:       
          -'Depressão moderada' };                                                                          
      499 -          if (pontuacao <= 19) return { grau: 'Moderadamente grave', cor: 'text-red-600',        
          -detalhe: 'Depressão moderadamente grave' };                                                      
      500 -          return { grau: 'Grave', cor: 'text-red-800', detalhe: 'Depressão grave' };             
      493 +    function generateBDI() {                                                                     
      494 +      var questions = [                                                                          
      495 +        'Tristeza', 'Pessimismo', 'Sentimento de fracasso', 'Perda de prazer',                   
      496 +        'Sentimento de culpa', 'Sentimento de punição', 'Autoaversão', 'Autoacusação',           
      497 +        'Ideias de suicídio', 'Choro', 'Irritabilidade', 'Retração social',                      
      498 +        'Indecisão', 'Autoimagem corporal', 'Fadiga', 'Apetite',                                 
      499 +        'Insônia', 'Irritabilidade (física)', 'Concentração', 'Cansaço', 'Libido'                
      500 +      ];                                                                                         
      501 +      var options = [                                                                            
      502 +        { text: '0', score: 0 },                                                                 
      503 +        { text: '1', score: 1 },                                                                 
      504 +        { text: '2', score: 2 },                                                                 
      505 +        { text: '3', score: 3 }                                                                  
      506 +      ];                                                                                         
      507 +      generateScale('psiqui_bdi', 'Inventário de Depressão de Beck (BDI-II)', questions,         
          +options);                                                                                        
      508
      509 -        case 'gad7':                                                                             
      510 -          if (pontuacao <= 4) return { grau: 'Mínimo', cor: 'text-green-600', detalhe:           
          -'Ansiedade mínima' };                                                                            
      511 -          if (pontuacao <= 9) return { grau: 'Leve', cor: 'text-yellow-600', detalhe: 'Ansiedade 
          - leve' };                                                                                        
      512 -          if (pontuacao <= 14) return { grau: 'Moderada', cor: 'text-orange-600', detalhe:       
          -'Ansiedade moderada' };                                                                          
      513 -          return { grau: 'Grave', cor: 'text-red-600', detalhe: 'Ansiedade grave' };             
      509 +      setupScoreUpdater('psiqui_bdi',                                                            
      510 +        function (items) { return items.reduce(function (sum, item) { return sum + Math.max(0,   
          +parseInt(item.value)); }, 0); },                                                                 
      511 +        function (score) {                                                                       
      512 +          if (score <= 13) return 'Mínimo/ausente';                                              
      513 +          if (score <= 19) return 'Leve';                                                        
      514 +          if (score <= 28) return 'Moderado';                                                    
      515 +          return 'Grave';                                                                        
      516 +        }                                                                                        
      517 +      );                                                                                         
      518 +    }                                                                                            
      519
      520 -        case 'phq2':                                                                             
      521 -          if (pontuacao <= 2) return { grau: 'Negativo', cor: 'text-green-600', detalhe:         
          -'Triagem negativa para depressão' };                                                             
      522 -          return { grau: 'Positivo', cor: 'text-red-600', detalhe: 'Triagem positiva para        
          -depressão' };                                                                                    
      520 +    // ===============================                                                           
      521 +    //  SETUP MODAL ESCALAS                                                                      
      522 +    // ===============================                                                           
      523 +    function setupScalesModal() {                                                                
      524 +      var modal = document.getElementById('psiqui_scalesModal');                                 
      525 +      var overlay = document.getElementById('psiqui_scalesModalOverlay');                        
      526 +      var openBtn = document.getElementById('psiqui_openScalesBtn');                             
      527 +      var closeH = document.getElementById('psiqui_closeScalesBtn');                             
      528 +      var closeF = document.getElementById('psiqui_closeScalesBtnModal');                        
      529 +      var copyScalesBtn = document.getElementById('psiqui_copyScalesBtn');                       
      530 +      var tabNav = document.getElementById('psiqui_tabNav');                                     
      531 +      var panels = modal ? modal.querySelectorAll('.neu-tab-panel') : [];                        
      532
      533 -        case 'gad2':                                                                             
      534 -          if (pontuacao <= 2) return { grau: 'Negativo', cor: 'text-green-600', detalhe:         
          -'Triagem negativa para ansiedade' };                                                             
      535 -          return { grau: 'Positivo', cor: 'text-red-600', detalhe: 'Triagem positiva para        
          -ansiedade' };                                                                                    
      533 +      var open = function () {                                                                   
      534 +        if (modal) modal.classList.remove('hidden');                                             
      535 +        if (overlay) overlay.classList.remove('hidden');                                         
      536 +      };                                                                                         
      537 +      var close = function () {                                                                  
      538 +        if (modal) modal.classList.add('hidden');                                                
      539 +        if (overlay) overlay.classList.add('hidden');                                            
      540 +      };                                                                                         
      541
      542 -        default:                                                                                 
      543 -          return { grau: 'Não calculado', cor: 'text-gray-600', detalhe: '' };                   
      542 +      if (openBtn) openBtn.addEventListener('click', open);                                      
      543 +      if (closeH) closeH.addEventListener('click', close);                                       
      544 +      if (closeF) closeF.addEventListener('click', close);                                       
      545 +      if (overlay) overlay.addEventListener('click', close);                                     
      546 +                                                                                                 
      547 +      if (tabNav) {                                                                              
      548 +        tabNav.addEventListener('click', function (e) {                                          
      549 +          var t = e.target;                                                                      
      550 +          if (!(t instanceof HTMLElement) || t.tagName !== 'BUTTON') return;                     
      551 +          var tabId = t.getAttribute('data-tab');                                                
      552 +          tabNav.querySelectorAll('.neu-tab-button').forEach(function (btn) {                    
          +btn.classList.remove('active'); });                                                              
      553 +          t.classList.add('active');                                                             
      554 +          panels.forEach(function (p) {                                                          
      555 +            if (p.id === tabId) { p.classList.add('active'); }                                   
      556 +            else { p.classList.remove('active'); }                                               
      557 +          });                                                                                    
      558 +        });                                                                                      
      559        }
      560 -    },                                                                                           
      560
      561 -    mostrarResultado(resultado) {                                                                
      562 -      if (!this.elements.resultadoContainer) return;                                             
      561 +      generatePHQ9();                                                                            
      562 +      generateGAD7();                                                                            
      563 +      generateCAGE();                                                                            
      564 +      generateBDI();                                                                             
      565
      566 -      this.elements.resultadoContainer.innerHTML = `                                             
      567 -        <div class="card-inset p-6">                                                             
      568 -          <h3 class="text-xl font-bold mb-4">Resultado</h3>                                      
      569 -          <div class="space-y-2">                                                                
      570 -            <p><strong>Pontuação:</strong>                                                       
          -${this.state.resultados[this.state.selectedEscala].pontuacao}</p>                                
      571 -            <p><strong>Classificação:</strong> <span                                             
          -class="${resultado.cor}">${resultado.grau}</span></p>                                            
      572 -            <p><strong>Detalhe:</strong> ${resultado.detalhe}</p>                                
      573 -          </div>                                                                                 
      574 -          <div class="btn-container mt-4">                                                       
      575 -            <button type="button" class="btn" onclick="Psiquiatria.copiar()">                    
      576 -              <i class="fas fa-copy mr-2"></i> Copiar                                            
      577 -            </button>                                                                            
      578 -          </div>                                                                                 
      579 -        </div>                                                                                   
      580 -      `;                                                                                         
      566 +      APP_STATE.scalesMD = getScaleResultText(true);                                             
      567 +      APP_STATE.scalesMD2 = getScaleResultTextTwoCols(true, 75);                                 
      568
      569 -      this.elements.resultadoContainer.classList.remove('hidden');                               
      570 -    },                                                                                           
      569 +      if (copyScalesBtn) {                                                                       
      570 +        copyScalesBtn.addEventListener('click', function () {                                    
      571 +          APP_STATE.scalesMD = getScaleResultText(true);                                         
      572 +          APP_STATE.scalesMD2 = getScaleResultTextTwoCols(true, 75);                             
      573 +          copyToClipboard(APP_STATE.scalesMD2 || APP_STATE.scalesMD || '##                       
          +Escalas\n—').then(function (ok) {                                                                
      574 +            alert(ok ? 'Resultados das escalas copiados!' : 'Falha ao copiar escalas.');         
      575 +          });                                                                                    
      576 +        });                                                                                      
      577 +      }                                                                                          
      578 +    }                                                                                            
      579
      580 -    limpar() {                                                                                   
      581 -      const inputs = this.elements.escalaContainer.querySelectorAll('input[type="radio"]');      
      582 -      inputs.forEach(input => {                                                                  
      583 -        input.checked = false;                                                                   
      580 +    setupScalesModal();                                                                          
      581 +                                                                                                 
      582 +    // ===============================                                                           
      583 +    //  GERAÇÃO DO MARKDOWN                                                                      
      584 +    // ===============================                                                           
      585 +    function gerarTextoDoGrupo(group) {                                                          
      586 +      if (!group) return '';                                                                     
      587 +      var groupId = toSlug(group.title);                                                         
      588 +      var texto = '### ' + group.title + '\n';                                                   
      589 +                                                                                                 
      590 +      var selectionsText = '';                                                                   
      591 +      group.subgroups.forEach(function (sub) {                                                   
      592 +        var subId = toSlug(sub.label);                                                           
      593 +        var checked = qsa('input[name="psiqui_' + groupId + '-' + subId + '"]:checked',          
          +container).map(function (c) { return c.value; });                                                
      594 +        if (checked.length) {                                                                    
      595 +          selectionsText += '- ' + sub.label + ': ' + checked.join(', ') + '\n';                 
      596 +        }                                                                                        
      597        });
      598 -      this.elements.resultadoContainer.classList.add('hidden');                                  
      599 -    },                                                                                           
      598
      599 -    voltar() {                                                                                   
      600 -      this.state.selectedEscala = null;                                                          
      601 -      this.elements.escalaContainer.classList.add('hidden');                                     
      602 -      this.elements.escalaContainer.innerHTML = '';                                              
      603 -      this.elements.resultadoContainer.classList.add('hidden');                                  
      604 -    },                                                                                           
      599 +      texto += selectionsText || '- *(Sem alterações marcadas)*\n';                              
      600
      601 -    copiar() {                                                                                   
      602 -      if (!this.state.selectedEscala || !this.state.resultados[this.state.selectedEscala])       
          -return;                                                                                          
      601 +      var comp = getVal('psiqui_comp-' + groupId);                                               
      602 +      if (comp) texto += '  Complemento: ' + comp + '\n';                                        
      603
      604 -      const escala = this.data.escalas.find(e => e.id === this.state.selectedEscala);            
      605 -      const resultado = this.state.resultados[this.state.selectedEscala];                        
      604 +      return texto.trim();                                                                       
      605 +    }                                                                                            
      606
      607 -      const texto = `Escala: ${escala.nome}\n`;                                                  
      608 -      const interpretação = this.interpretarResultado(this.state.selectedEscala,                 
          -resultado.pontuacao);                                                                            
      609 -      const textoFinal = texto + `Pontuação: ${resultado.pontuacao}\nClassificação:              
          -${interpretação.grau}\nDetalhe: ${interpretação.detalhe}`;                                       
      607 +    function copiarTudo() {                                                                      
      608 +      var LARGURA_COLUNA = 75;                                                                   
      609 +      var separador = '#'.padEnd(LARGURA_COLUNA - 1, '=');                                       
      610
      611 -      navigator.clipboard.writeText(textoFinal)                                                  
      612 -        .then(() => alert('Resultado copiado!'))                                                 
      613 -        .catch(err => console.error('Erro ao copiar:', err));                                    
      611 +      var nome = getVal('psiqui_nome') || '-';                                                   
      612 +      var dataStr = getVal('psiqui_data');                                                       
      613 +      var dataFmt = dataStr ? new Date(dataStr).toLocaleString('pt-BR') : '-';                   
      614 +                                                                                                 
      615 +      var md = '**EXAME PSÍQUICO** — Paciente: ' + nome + ' | Data: ' + dataFmt + '\n\n';        
      616 +                                                                                                 
      617 +      for (var i = 0; i < EXAME_PSIQUICO_GRUPOS.length; i += 2) {                                
      618 +        var gEsq = EXAME_PSIQUICO_GRUPOS[i];                                                     
      619 +        var gDir = EXAME_PSIQUICO_GRUPOS[i + 1];                                                 
      620 +        var tEsq = gerarTextoDoGrupo(gEsq);                                                      
      621 +        var tDir = gerarTextoDoGrupo(gDir);                                                      
      622 +        md += formatarDuasColunas(tEsq, tDir, LARGURA_COLUNA);                                   
      623 +        md += formatarDuasColunas(separador, separador, LARGURA_COLUNA) + '\n';                  
      624 +      }                                                                                          
      625 +                                                                                                 
      626 +      md += '### Observações adicionais\n' + (getVal('psiqui_obsAdicionais') || '- *(sem         
          +observações adicionais)*') + '\n\n';                                                             
      627 +      md += separador + '\n\n';                                                                  
      628 +                                                                                                 
      629 +      var escalas2 = APP_STATE.scalesMD2 || getScaleResultTextTwoCols(true, LARGURA_COLUNA);     
      630 +      if (escalas2) {                                                                            
      631 +        md += escalas2;                                                                          
      632 +      } else {                                                                                   
      633 +        var escalasMD = APP_STATE.scalesMD || getScaleResultText(true);                          
      634 +        if (escalasMD) md += escalasMD;                                                          
      635 +      }                                                                                          
      636 +                                                                                                 
      637 +      copyToClipboard(md).then(function (ok) {                                                   
      638 +        alert(ok ? 'Exame psíquico + escalas copiados para a área de transferência.' : 'Falha ao 
          + copiar. Tente um navegador diferente ou HTTPS.');                                               
      639 +      });                                                                                        
      640      }
      641 -  };                                                                                             
      641
      642 -  window.Psiquiatria = Psiquiatria;                                                              
      642 +    var copyBtn = document.getElementById('psiqui_copyBtn');                                     
      643 +    if (copyBtn) copyBtn.addEventListener('click', copiarTudo);                                  
      644
      645 -  function renderPsiqui() {                                                                      
      646 -    const container = document.getElementById('psf_sub_psiqui');                                 
      647 -    if (!container) { console.error('[PSF] #psf_sub_psiqui não encontrado'); return; }           
      648 -    container.innerHTML = `                                                                      
      649 -      <div class="bg-[#e0e5ec] p-5 min-h-[400px]">                                               
      650 -        <h2 class="text-xl font-bold text-[#2d3748] mb-4 flex items-center gap-2">               
      651 -          <span class="material-symbols-outlined text-purple-600">psychology</span>              
      652 -          Escalas Psiquiátricas                                                                  
      653 -        </h2>                                                                                    
      654 -        <div id="escalas-container"></div>                                                       
      655 -        <div id="escala-container" class="hidden mt-4"></div>                                    
      656 -        <div id="resultado-container" class="hidden mt-4"></div>                                 
      657 -      </div>                                                                                     
      658 -    `;                                                                                           
      659 -    Psiquiatria.init();                                                                          
      645 +    console.log('[Psiqui] Renderizado com sucesso');                                             
      646    }
      647
      648 -  if (document.getElementById('psf_sub_psiqui')) { renderPsiqui(); }                             
      648 +  if (document.getElementById('psf_sub_psiqui')) {                                               
      649 +    renderPsiqui();                                                                              
      650 +  }                                                                                              
      651 +                                                                                                 
      652    window.renderPsiqui = renderPsiqui;
      653  })();

● visita_2025.js and psiqui_2025.js are done. Now I need to convert the remaining 5 files. Let me read the HTML
  sources for them in parallel and delegate the conversions to agents.
                                                                                                                   
● Read 3 files (ctrl+o to expand)         
  ⎿  Context limit reached · /compact or /clear to continue                                                        
                                                                                                                   
✻ Baked for 16m 11s
                                                                                                                   
❯ /compact                                                                                                         
  ⎿  Error: Error during compaction: Error: Conversation too long. Press esc twice to go up a few messages and try 
     again.                                                                                                        
                                                                                                                 
❯ /compact                                                                                                         
  ⎿  Error: Error during compaction: Error: Conversation too long. Press esc twice to go up a few messages and try 
     again.                                                                                                        
                                                                                                                   
❯ /security-review                                                                                                 
  ⎿  Error: Bash command failed for pattern "!git diff --name-only origin/HEAD...": [stderr]                       
     fatal: ambiguous argument 'origin/HEAD...': unknown revision or path not in the working tree.                 
     Use '--' to separate paths from revisions, like this:                                                         
     'git  [...] -- [...]'                                                                                         
                                                                                                                   
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────
❯ /security-review                                                                                                 
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  ⏵⏵ accept edits on (shift+tab to cycle) · 50 files +1155 -