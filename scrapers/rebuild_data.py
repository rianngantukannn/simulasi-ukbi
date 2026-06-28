import re

with open(r'd:\porto projek\belajarukbi\js\data.js', encoding='utf-8') as f:
    content = f.read()

# Get everything from SECTION2_DATA onwards
idx = content.find('/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n   SEKSI II')
if idx == -1:
    print("ERROR: SECTION2 marker not found")
    exit(1)

section2_onwards = content[idx:]
print(f"Split at char {idx}, section2_onwards length: {len(section2_onwards)}")

with open(r'd:\porto projek\belajarukbi\js\data_new_s1.js', encoding='utf-8') as f:
    new_section1 = f.read()

new_content = new_section1 + '\n' + section2_onwards

with open(r'd:\porto projek\belajarukbi\js\data.js', 'w', encoding='utf-8') as f:
    f.write(new_content)

print('Done. Total chars:', len(new_content))
monologs = re.findall(r"id: 'monolog-", new_content)
print('Monologs found:', len(monologs))
soals = re.findall(r"id: 's1-m", new_content)
print('Section1 soals found:', len(soals))
