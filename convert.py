import os

input_folder = '/root/PROJETOS/API/cdn-api/static-files/apoioClinico/js'

for filename in os.listdir(input_folder):
    if filename.endswith('.js'):  # ajuste a extensão
        file_path = os.path.join(input_folder, filename)
        
        with open(file_path, 'r', encoding='ISO-8859-1') as infile:
            content = infile.read()
        
        with open(file_path, 'w', encoding='UTF-8') as outfile:
            outfile.write(content)

print("Conversão concluída!")
