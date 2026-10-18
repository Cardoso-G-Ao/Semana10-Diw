/* ===== Dados (JSON) ===== */
const dados = {
  "cidades": [
    {"id":1,"nome":"Belo Horizonte","descricao":"Capital planejada com a Pampulha modernista, botecos e uma cena gastronômica forte.","conteudo":"Belo Horizonte une o conjunto arquitetônico da Pampulha, projetado por Niemeyer, a Praça da Liberdade e feiras de rua. É a porta de entrada para as cidades históricas e para a Serra do Cipó, e tem fama de ser a capital dos bares.","estado":"Minas Gerais, Brasil","destaque":false,"data":"2026-03-30","melhorEpoca":"Abril a setembro","altitude":"852 m","imagemPrincipal":"assets/img/belo_horizonte.jpg"},
    {"id":2,"nome":"Ouro Preto","descricao":"Cidade barroca, Patrimônio da Humanidade, nascida do ciclo do ouro.","conteudo":"Ouro Preto preserva igrejas ornamentadas, casarões coloniais e ladeiras de pedra. Foi o centro da corrida do ouro no século XVIII e hoje atrai quem gosta de história, arte sacra e da vida universitária das repúblicas.","estado":"Minas Gerais, Brasil","destaque":true,"data":"2026-03-28","melhorEpoca":"Maio a setembro","altitude":"1.150 m","imagemPrincipal":"assets/img/ouro_preto.jpg"},
    {"id":3,"nome":"Tiradentes","descricao":"Vila charmosa aos pés da serra, com casarões, gastronomia e festivais.","conteudo":"Tiradentes combina ruas de pedra, chafarizes antigos e restaurantes premiados. A cidade recebe festivais de cinema e de gastronomia ao longo do ano e é ponto de partida do passeio de trem a vapor até São João del-Rei.","estado":"Minas Gerais, Brasil","destaque":true,"data":"2026-03-27","melhorEpoca":"Janeiro e agosto","altitude":"930 m","imagemPrincipal":"assets/img/tiradentes.jpg"},
    {"id":4,"nome":"Capitólio","descricao":"Cânions, águas esverdeadas e passeios de lancha no Lago de Furnas.","conteudo":"Os cânions de Furnas formam paredões de pedra sobre o lago, com cachoeiras e mirantes por perto. Capitólio é um dos destinos de natureza mais procurados de Minas, ideal para passeios de barco e fins de semana de descanso.","estado":"Minas Gerais, Brasil","destaque":true,"data":"2026-03-25","melhorEpoca":"Maio a setembro","altitude":"780 m","imagemPrincipal":"assets/img/capitolio.jpg"}
  ],
  "atracoes": [
    {"id":1,"cidadeId":1,"nome":"Igrejinha da Pampulha","descricao":"Projeto de Niemeyer com painéis de Portinari.","imagem":"assets/img/atracoes/pampulha.jpg"},
    {"id":2,"cidadeId":1,"nome":"Praça da Liberdade","descricao":"Jardins cercados por museus e centros culturais.","imagem":"assets/img/atracoes/praca_liberdade.jpg"},
    {"id":3,"cidadeId":1,"nome":"Mercado Central","descricao":"Queijos, cachaças e petiscos mineiros.","imagem":"assets/img/atracoes/mercado_central.jpg"},
    {"id":4,"cidadeId":2,"nome":"Igreja de São Francisco de Assis","descricao":"Obra-prima de Aleijadinho e Mestre Ataíde.","imagem":"assets/img/atracoes/sao_francisco.jpg"},
    {"id":5,"cidadeId":2,"nome":"Praça Tiradentes","descricao":"Coração da cidade, cercada por casarões e museus.","imagem":"assets/img/atracoes/praca_tiradentes.jpg"},
    {"id":6,"cidadeId":2,"nome":"Mina do Chico Rei","descricao":"Antiga mina de ouro aberta à visitação.","imagem":"assets/img/atracoes/chico_rei.jpg"},
    {"id":7,"cidadeId":3,"nome":"Chafariz de São José","descricao":"Fonte de pedra de 1749 no centro histórico.","imagem":"assets/img/atracoes/chafariz.jpg"},
    {"id":8,"cidadeId":3,"nome":"Igreja Matriz de Santo Antônio","descricao":"Matriz com altar dourado e órgão antigo.","imagem":"assets/img/atracoes/matriz.jpg"},
    {"id":9,"cidadeId":3,"nome":"Maria Fumaça","descricao":"Passeio de trem a vapor até São João del-Rei.","imagem":"assets/img/atracoes/maria_fumaca.jpg"},
    {"id":10,"cidadeId":4,"nome":"Cânions de Furnas","descricao":"Paredões de rocha com passeios de lancha.","imagem":"assets/img/atracoes/canions.jpg"},
    {"id":11,"cidadeId":4,"nome":"Cascatinha","descricao":"Queda d'água com piscinas naturais.","imagem":"assets/img/atracoes/cascatinha.jpg"},
    {"id":12,"cidadeId":4,"nome":"Mirante dos Cânions","descricao":"Vista ampla do lago e das formações rochosas.","imagem":"assets/img/atracoes/mirante.jpg"}
  ]
};

/* ===== Utilidades ===== */
const $ = id => document.getElementById(id);
const pad = n => String(n).padStart(2, "0");
const formatarData = iso => iso.split("-").reverse().join("/");

/* ===== Tela principal ===== */
function montarCarrossel() {
  const destaques = dados.cidades.filter(c => c.destaque);
  $("carrossel-indicadores").innerHTML = destaques.map((c, i) =>
    `<button type="button" data-bs-target="#carrossel" data-bs-slide-to="${i}" class="${i === 0 ? "active" : ""}" aria-label="Destaque ${i + 1}: ${c.nome}"></button>`).join("");
  $("carrossel-itens").innerHTML = destaques.map((c, i) => `
    <div class="carousel-item ${i === 0 ? "active" : ""}">
      <img src="${c.imagemPrincipal}" alt="${c.nome}">
      <div class="legenda">
        <span class="chip">${c.altitude} de altitude</span>
        <h2>${c.nome}</h2>
        <p>${c.descricao}</p>
        <a class="cta" href="detalhes.html?id=${c.id}">Explorar ${c.nome}</a>
      </div>
    </div>`).join("");
  const atualizar = i => $("contador").textContent = `${pad(i + 1)} / ${pad(destaques.length)}`;
  atualizar(0);
  $("carrossel").addEventListener("slid.bs.carousel", e => atualizar(e.to));
}

function cardCidade(c) {
  return `
    <article class="card-vidro">
      <a class="card-img" href="detalhes.html?id=${c.id}" aria-label="Ver ${c.nome}"><img src="${c.imagemPrincipal}" alt="${c.nome}" loading="lazy"></a>
      <div class="card-corpo">
        <span class="meta">${c.altitude} · ${c.melhorEpoca}</span>
        <h3><a href="detalhes.html?id=${c.id}">${c.nome}</a></h3>
        <p>${c.descricao}</p>
        <a class="ver" href="detalhes.html?id=${c.id}">Ver detalhes</a>
      </div>
    </article>`;
}

/* ===== Tela de detalhes ===== */
function montarDetalhes() {
  const id = parseInt(new URLSearchParams(window.location.search).get("id"));
  const c = dados.cidades.find(x => x.id === id);
  const alvo = $("info-geral");
  if (!c) {
    alvo.innerHTML = `<div class="vidro vazio">Não encontramos esse destino. <a href="index.html#destinos">Escolha um destino na página inicial.</a></div>`;
    return;
  }
  const atracoes = dados.atracoes.filter(a => a.cidadeId === c.id);
  document.title = `${c.nome} – Garden C-Moon`;
  alvo.innerHTML = `
    <div class="hero-det">
      <div>
        <span class="chip">${c.estado}</span>
        <h1>${c.nome}</h1>
        <p class="lead">${c.descricao}</p>
        <p class="texto">${c.conteudo}</p>
        <ul class="fatos">
          <li><span>Altitude</span><strong>${c.altitude}</strong></li>
          <li><span>Melhor época</span><strong>${c.melhorEpoca}</strong></li>
          <li><span>Atrações</span><strong>${atracoes.length} cadastradas</strong></li>
          <li><span>Cadastro</span><strong>${formatarData(c.data)}</strong></li>
        </ul>
      </div>
      <div class="foto"><img src="${c.imagemPrincipal}" alt="${c.nome}"></div>
    </div>`;
  $("atracoes").innerHTML = atracoes.map(a => `
    <article class="card-vidro">
      <div class="card-img"><img src="${a.imagem}" alt="${a.nome}" loading="lazy"></div>
      <div class="card-corpo"><h3>${a.nome}</h3><p>${a.descricao}</p></div>
    </article>`).join("");
}

/* ===== Inicialização ===== */
if ($("carrossel")) {
  montarCarrossel();
  $("lista-cidades").innerHTML = dados.cidades.map(cardCidade).join("");
}
if ($("info-geral")) montarDetalhes();
