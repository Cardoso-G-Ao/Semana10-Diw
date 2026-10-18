#!/usr/bin/env python3
"""
Baixa fotos reais (Wikimedia Commons) dos destinos do site e salva em assets/img/,
substituindo as imagens de exemplo. Usa apenas a biblioteca padrão do Python 3.

Como usar (dentro da pasta do projeto, com internet):
    python baixar_imagens.py

Também gera CREDITOS.txt com autor, licença e link de cada foto.
Se alguma busca não achar foto adequada, a imagem de exemplo é mantida.
"""
import json, re, time, urllib.parse, urllib.request
from pathlib import Path

API = "https://commons.wikimedia.org/w/api.php"
UA = {"User-Agent": "GardenCMoon/1.0 (trabalho academico; gabriel 1616643)"}
RAIZ = Path(__file__).parent

# arquivo de destino -> lista de buscas (a primeira com foto adequada vence)
FOTOS = {
  "assets/img/belo_horizonte.jpg": ["Belo Horizonte skyline", "Belo Horizonte panorama"],
  "assets/img/ouro_preto.jpg": ["Ouro Preto panorama", "Ouro Preto Minas Gerais cidade"],
  "assets/img/tiradentes.jpg": ["Tiradentes Minas Gerais", "Tiradentes centro histórico"],
  "assets/img/capitolio.jpg": ["Capitólio Minas Gerais", "Lago de Furnas Capitólio"],
  "assets/img/atracoes/pampulha.jpg": ["Igrejinha da Pampulha", "Igreja São Francisco de Assis Pampulha"],
  "assets/img/atracoes/praca_liberdade.jpg": ["Praça da Liberdade Belo Horizonte"],
  "assets/img/atracoes/mercado_central.jpg": ["Mercado Central Belo Horizonte"],
  "assets/img/atracoes/sao_francisco.jpg": ["Igreja de São Francisco de Assis Ouro Preto"],
  "assets/img/atracoes/praca_tiradentes.jpg": ["Praça Tiradentes Ouro Preto"],
  "assets/img/atracoes/chico_rei.jpg": ["Mina do Chico Rei Ouro Preto", "Mina da Passagem Ouro Preto"],
  "assets/img/atracoes/chafariz.jpg": ["Chafariz de São José Tiradentes"],
  "assets/img/atracoes/matriz.jpg": ["Igreja Matriz de Santo Antônio Tiradentes"],
  "assets/img/atracoes/maria_fumaca.jpg": ["Maria Fumaça Tiradentes", "Maria Fumaça São João del-Rei"],
  "assets/img/atracoes/canions.jpg": ["Cânions de Furnas Capitólio", "Cânions de Furnas"],
  "assets/img/atracoes/cascatinha.jpg": ["Cascatinha Capitólio", "Cachoeira Capitólio"],
  "assets/img/atracoes/mirante.jpg": ["Mirante dos Cânions Capitólio", "Mirante Capitólio Furnas"],
}

def pegar(url):
    for tentativa in range(4):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=30) as r:
                return r.read()
        except Exception as e:
            time.sleep(2 * (tentativa + 1))
    return None

def buscar(consulta):
    params = {
        "action": "query", "format": "json", "generator": "search",
        "gsrsearch": f"{consulta} filetype:bitmap", "gsrnamespace": 6, "gsrlimit": 15,
        "prop": "imageinfo", "iiprop": "url|size|mime|extmetadata", "iiurlwidth": 1400,
    }
    dados = pegar(API + "?" + urllib.parse.urlencode(params))
    if not dados:
        return []
    paginas = json.loads(dados).get("query", {}).get("pages", {})
    return sorted(paginas.values(), key=lambda p: p.get("index", 0))

def limpar(html):
    return re.sub(r"<[^>]+>", "", html or "").strip()

def escolher(paginas):
    for p in paginas:
        info = (p.get("imageinfo") or [{}])[0]
        w, h = info.get("width", 0), info.get("height", 0)
        if info.get("mime") == "image/jpeg" and w >= 1200 and w > h * 1.2:
            return p["title"], info
    return None, None

creditos = []
for destino, consultas in FOTOS.items():
    ok = False
    for q in consultas:
        titulo, info = escolher(buscar(q))
        time.sleep(1)
        if not info:
            continue
        foto = pegar(info.get("thumburl") or info["url"])
        if foto:
            caminho = RAIZ / destino
            caminho.parent.mkdir(parents=True, exist_ok=True)
            caminho.write_bytes(foto)
            meta = info.get("extmetadata", {})
            creditos.append(
                f"{destino}\n  {titulo}\n  Autor: {limpar(meta.get('Artist', {}).get('value'))}\n"
                f"  Licença: {limpar(meta.get('LicenseShortName', {}).get('value'))}\n"
                f"  Fonte: {info.get('descriptionurl')}\n")
            print("OK     ", destino, "<-", titulo)
            ok = True
            break
    if not ok:
        print("SEM FOTO", destino, "(mantida a imagem de exemplo)")

(RAIZ / "CREDITOS.txt").write_text("\n".join(creditos), encoding="utf-8")
print("\nPronto. Veja CREDITOS.txt e confira se cada foto combina com o lugar.")
