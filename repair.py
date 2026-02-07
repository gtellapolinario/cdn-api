import os

# Pasta alvo 2 (raiz de apoioClinico para HTMLs)
input_folder = "/root/PROJETOS/API/cdn-api/static-files/apoioClinico"

# Arquivos que eu já corrigi manualmente e não quero que o script toque
EXCLUDE = []

print(f"Iniciando correção de Mojibake em {input_folder} (HTMLs)")

for filename in os.listdir(input_folder):
    if filename.endswith(".html") and filename not in EXCLUDE:
        file_path = os.path.join(input_folder, filename)

        try:
            with open(file_path, "r", encoding="utf-8") as f:
                content = f.read()

            fixed = content.encode("latin1").decode("utf-8")

            if fixed != content:
                print(f"Corrigindo: {filename}")
                with open(file_path, "w", encoding="utf-8") as f:
                    f.write(fixed)
            else:
                print(f"Nada a corrigir em: {filename}")

        except UnicodeEncodeError:
            print(f"SKIP {filename}: char > latin1")
        except UnicodeDecodeError:
            print(f"SKIP {filename}: decode fail")
        except Exception as e:
            print(f"ERRO em {filename}: {e}")
