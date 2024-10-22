word = "auto"
with open('C:\\aa_programovani\\webove-aplikace-slovnik\\backend\\slovnik_cz_en.txt', 'r', encoding='utf-8') as f:
    for line in f:
        if word in line:
            print(line.split()[0])
print('Slovo nenalezeno')