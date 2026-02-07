from __future__ import annotations

import datetime
import hashlib
import json
import os
import re
import shutil
from pathlib import Path
from typing import Dict, Iterable, Tuple

# Configuração dos alvos: (Pasta JS fonte, Pasta onde salvar manifest.json, Pasta de Backup)
TARGETS: list[Tuple[Path, Path, Path]] = [
    (
        Path("static-files/geral/js"),
        Path("static-files/geral"),
        Path("storage/geralBackup"),
    ),
    (
        Path("static-files/apoioClinico/js"),
        Path("static-files/apoioClinico"),
        Path("storage/apoioClinicoBackup"),
    ),
]

# Regex para identificar arquivos JS que já possuem hash (ex: script.a1b2c3d4.js)
HASHED_RE = re.compile(r"\.[0-9a-f]{8}\.js$", re.IGNORECASE)


def calculate_hash(file_path: Path) -> str:
    """Calcula SHA-256 do arquivo e retorna os primeiros 8 caracteres."""
    h = hashlib.sha256()
    with file_path.open("rb") as f:
        for chunk in iter(lambda: f.read(8192), b""):
            h.update(chunk)
    return h.hexdigest()[:8]


def is_hashed_js(filename: str) -> bool:
    """Verifica se o nome do arquivo já contém um hash no formato esperado."""
    return bool(HASHED_RE.search(filename))


def source_js_files(js_dir: Path) -> Iterable[Path]:
    """Gera arquivos JS fonte (ignora arquivos que já são hasheados)."""
    # Ordena para garantir determinismo no processamento
    if not js_dir.exists():
        return
    for p in sorted(js_dir.iterdir()):
        if not p.is_file():
            continue
        if p.suffix != ".js":
            continue
        if is_hashed_js(p.name):
            continue
        yield p


def hashed_name(src: Path, short_hash: str) -> str:
    """Gera o nome hasheado.
    Ex: "script.js" -> "script.<hash>.js"
    """
    base = src.name[:-3]
    return f"{base}.{short_hash}.js"


def cleanup_old_versions(
    js_dir: Path, base_name: str, keep_hash: str, backup_dir: Path
) -> None:
    """Move versões antigas do mesmo arquivo para a pasta de backup."""
    if not backup_dir.exists():
        backup_dir.mkdir(parents=True, exist_ok=True)

    # Regex para encontrar arquivos hasheados deste base_name
    esc_base = re.escape(base_name)
    pattern = re.compile(rf"^{esc_base}\.[0-9a-f]{{8}}\.js$", re.IGNORECASE)

    for p in js_dir.iterdir():
        if not p.is_file():
            continue
        if pattern.match(p.name):
            expected_name = f"{base_name}.{keep_hash}.js"
            if p.name != expected_name:
                print(f"  [-] Moving old version to backup: {p.name}")
                try:
                    shutil.move(str(p), str(backup_dir / p.name))
                except shutil.Error as e:
                    print(f"      [!] Error moving {p.name}: {e}")
                    if (backup_dir / p.name).exists():
                        print(f"      [!] Target exists, removing source: {p.name}")
                        p.unlink()


def process_directory(js_dir: Path, manifest_dir: Path, backup_dir: Path) -> None:
    print(f"Processing: {js_dir}")

    if not js_dir.exists():
        print(f"  [!] Directory not found: {js_dir} (skipping)")
        return

    manifest_dir.mkdir(parents=True, exist_ok=True)

    manifest: Dict[str, str] = {}

    # Processa cada arquivo fonte
    for src in source_js_files(js_dir):
        h = calculate_hash(src)
        out_name = hashed_name(src, h)
        out_path = js_dir / out_name

        # Cria a cópia hasheada se não existir
        if not out_path.exists():
            shutil.copy2(src, out_path)
            print(f"  [+] Created: {out_name}")

        # Limpeza de versões antigas
        clean_base = src.name[:-3]
        cleanup_old_versions(js_dir, clean_base, h, backup_dir)

        # Mapeia nome original -> nome hasheado
        manifest[src.name] = out_name

    # Salva o manifest.json
    manifest_path = manifest_dir / "manifest.json"

    with manifest_path.open("w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2, ensure_ascii=False, sort_keys=True)

    print(f"  [v] Manifest updated: {manifest_path} ({len(manifest)} entries)")


def generate_versions_md(base_dir: Path) -> None:
    """Gera o arquivo VERSIONS.md na raiz listando as versões atuais."""
    versions_file = base_dir / "VERSIONS.md"
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    content = [f"# Current CDN Versions (Updated: {timestamp})\n"]

    for js_rel, man_rel, _ in TARGETS:
        manifest_path = base_dir / man_rel / "manifest.json"

        content.append(f"## {js_rel}")
        if not manifest_path.exists():
            content.append("*No manifest found*\n")
            continue

        try:
            with manifest_path.open("r", encoding="utf-8") as f:
                data = json.load(f)
                if not data:
                    content.append("*No files*\n")
                else:
                    # Seção Loader (Copy-Paste Friendly)
                    folder_name = js_rel.parts[
                        -2
                    ]  # Pega 'geral' ou 'apoioClinico' assumindo estrutura static-files/NAME/js

                    content.append("### 📋 Copy-Paste for CDNLoader")
                    content.append("```javascript")
                    content.append(f"// Base: https://cdn.gtmedics.com/{folder_name}")
                    content.append(
                        'const loader = new CDNLoader("https://cdn.gtmedics.com/'
                        + folder_name
                        + '");'
                    )
                    content.append("(async () => {")
                    for original_name in sorted(data.keys()):
                        content.append(f'  await loader.load("{original_name}");')
                    content.append("})();")
                    content.append("```\n")

                    # Seção Direct Link
                    content.append("### 🔗 Direct Hashed Links (Hardcoded)")
                    content.append("```html")
                    for hashed_file in sorted(data.values()):
                        content.append(
                            f'<script src="https://cdn.gtmedics.com/{folder_name}/js/{hashed_file}"></script>'
                        )
                    content.append("```")
        except Exception as e:
            content.append(f"*Error reading manifest: {e}*")

        content.append("")  # Linha em branco

    with versions_file.open("w", encoding="utf-8") as f:
        f.write("\n".join(content))

    print(f"  [v] Updated report: {versions_file}")


def main() -> None:
    # Garante que os caminhos sejam relativos ao local do script
    base_dir = Path(__file__).resolve().parent

    print("--- Starting Build ---")
    for js_rel, man_rel, backup_rel in TARGETS:
        process_directory(base_dir / js_rel, base_dir / man_rel, base_dir / backup_rel)

    print("--- Generating Report ---")
    generate_versions_md(base_dir)
    print("--- Build Complete ---")


if __name__ == "__main__":
    main()
