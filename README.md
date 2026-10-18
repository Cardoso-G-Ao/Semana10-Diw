# Luar das Gerais 

Site de turismo com destinos de Minas Gerais, feito como Trabalho Prático da disciplina de desenvolvimento web. Todo o conteúdo das páginas é montado por JavaScript a partir de uma estrutura JSON.

## Autor

| | |
|---|---|
| **Nome** | Gabriel Cardoso Alvares de Oliveira |
| **Código de pessoa** | 1616643 |
| **Curso** | Ciência da Computação |

## Sobre o projeto

O site apresenta quatro cidades mineiras e as atrações de cada uma:

| Cidade | Atrações |
|---|---|
| Belo Horizonte | Igrejinha da Pampulha, Praça da Liberdade, Mercado Central |
| Ouro Preto | Igreja de São Francisco de Assis, Praça Tiradentes, Mina do Chico Rei |
| Tiradentes | Chafariz de São José, Igreja Matriz de Santo Antônio, Maria Fumaça |
| Capitólio | Cânions de Furnas, Cascatinha, Mirante dos Cânions |

### Telas

- **`index.html` (página inicial):** cabeçalho fixo, slider com as cidades em destaque, grade com todas as cidades e seção com as informações do autor.
- **`detalhes.html` (detalhes da cidade):** informações gerais da cidade (descrição, altitude, melhor época, número de atrações e data de cadastro) e as atrações com foto, título e descrição. A cidade é escolhida pelo parâmetro `?id=` da URL, por exemplo `detalhes.html?id=2`.

### Design

Visual escuro, com efeito de vidro translúcido (`backdrop-filter`) no cabeçalho, nos cards e nos painéis. A cor de destaque é um dourado suave, usado em botões, links em hover e pequenos detalhes. Os cards flutuam levemente no hover, e o layout se adapta a desktop, tablet e celular.

## Tecnologias

- HTML5 e CSS3 (variáveis `:root`, CSS Grid, Flexbox, media queries)
- JavaScript puro (`URLSearchParams`, manipulação do DOM)
- Bootstrap 5.3 (carrossel e JavaScript)
- Fonte Outfit (Google Fonts)

## Estrutura de pastas

```
├── index.html
├── detalhes.html
├── CREDITOS.txt
├── baixar_imagens.py
└── assets/
    ├── css/styles.css
    ├── js/app.js
    └── img/
        └── atracoes/
```

- `assets/js/app.js` guarda o JSON (`cidades` e `atracoes`) e o código que monta as duas telas.
- `assets/css/styles.css` tem as cores e medidas em variáveis no topo do arquivo.

## Como executar

Não precisa instalar nada. Baixe o projeto e abra o `index.html` no navegador, com internet, porque o Bootstrap e a fonte são carregados por CDN.

## Imagens

As fotos vêm do Wikimedia Commons. O script `baixar_imagens.py` baixa as imagens para `assets/img/` e gera o `CREDITOS.txt` com autor, licença e link de cada foto:

```
python baixar_imagens.py
```

## Site publicado

https://cardoso-g-ao.github.io/Semana10-Diw/
