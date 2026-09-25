const samplePosts = [
  { id: 1, title: 'O pixel perfeito não existe (e ainda bem)', description: 'Entre nostalgia, limitações técnicas e escolhas artísticas, os jogos antigos continuam ensinando o que significa criar com intenção.', category: 'Games', thumbImage: '/images/post-1.jpg', thumbImageAltText: 'Cena editorial sobre jogos', profileName: 'Lia Martins', profileThumbImage: '/images/profile-1.jpg', postDate: '2026-09-18' },
  { id: 2, title: 'A internet ficou pequena demais', description: 'Quando todo mundo vê as mesmas coisas, encontrar seu próprio canto na rede parece quase um ato de rebeldia.', category: 'Cultura', thumbImage: '/images/post-2.jpg', thumbImageAltText: 'Imagem editorial de cultura digital', profileName: 'Caio Nunes', profileThumbImage: '/images/profile-1.jpg', postDate: '2026-09-15' },
  { id: 3, title: 'Design bom também sabe dizer não', description: 'Menos uma tendência, mais uma conversa honesta entre forma, função e as pessoas que realmente usam um produto.', category: 'Design', thumbImage: '/images/post-3.jpg', thumbImageAltText: 'Composição editorial de design', profileName: 'Nina Rocha', profileThumbImage: '/images/profile-1.jpg', postDate: '2026-09-11' },
  { id: 4, title: 'O futuro não precisa de mais um app', description: 'Talvez inovação seja devolver um pouco de silêncio ao dia, em vez de ocupar cada segundo com outra notificação.', category: 'Tecnologia', thumbImage: '/images/post-4.jpg', thumbImageAltText: 'Imagem sobre tecnologia', profileName: 'Lia Martins', profileThumbImage: '/images/profile-1.jpg', postDate: '2026-09-07' },
  { id: 5, title: 'A gente ainda sabe escutar um álbum?', description: 'Uma capa, uma sequência e quarenta minutos sem pular faixa: exploramos a estranha resistência do formato álbum.', category: 'Cultura', thumbImage: '/images/post-5.jpg', thumbImageAltText: 'Imagem editorial sobre música e cultura', profileName: 'Bia Alves', profileThumbImage: '/images/profile-1.jpg', postDate: '2026-09-02' },
  { id: 6, title: 'Jogar junto é uma linguagem', description: 'Do sofá compartilhado às comunidades online, videogames inventaram jeitos novos de estar perto.', category: 'Games', thumbImage: '/images/post-6.jpg', thumbImageAltText: 'Imagem editorial sobre jogos', profileName: 'Caio Nunes', profileThumbImage: '/images/profile-1.jpg', postDate: '2026-08-27' }
];

const grid = document.querySelector('#post-grid');
const statusLine = document.querySelector('#feed-status');
const emptyState = document.querySelector('#empty-state');
const searchInput = document.querySelector('#search');
const dialog = document.querySelector('#post-dialog');
const dialogContent = document.querySelector('#dialog-content');
let posts = [];
let selectedCategory = 'all';

function escapeHTML(value = '') {
  return String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
}

function formatDate(value) {
  if (!value) return 'SEM DATA';
  const date = new Date(`${value}`.length === 10 ? `${value}T12:00:00` : value);
  return Number.isNaN(date.getTime()) ? 'SEM DATA' : new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).format(date).toUpperCase();
}

function categorySlug(category = '') {
  return category.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function filteredPosts() {
  const term = searchInput.value.trim().toLocaleLowerCase('pt-BR');
  return posts.filter((post) => {
    const inCategory = selectedCategory === 'all' || categorySlug(post.category) === selectedCategory;
    const text = `${post.title || ''} ${post.description || ''} ${post.category || ''} ${post.profileName || ''}`.toLocaleLowerCase('pt-BR');
    return inCategory && (!term || text.includes(term));
  });
}

function renderPosts() {
  const visible = filteredPosts();
  grid.innerHTML = visible.map((post) => `
    <article class="post-card" tabindex="0" role="button" data-post-id="${escapeHTML(post.id)}" aria-label="Abrir leitura: ${escapeHTML(post.title)}">
      <img class="post-image" src="${escapeHTML(post.thumbImage || '/images/post-1.jpg')}" alt="${escapeHTML(post.thumbImageAltText || post.title || 'Imagem da leitura')}" loading="lazy" onerror="this.src='/images/post-1.jpg'" />
      <div class="post-info"><div class="post-meta"><span class="category-tag">${escapeHTML(post.category || 'Ideias')}</span><time>${escapeHTML(formatDate(post.postDate || post.createdAt))}</time></div>
      <h3 class="post-title">${escapeHTML(post.title || 'Sem título')}</h3><p class="post-description">${escapeHTML(post.description || '')}</p>
      <div class="post-byline"><img class="avatar" src="${escapeHTML(post.profileThumbImage || '/images/profile-1.jpg')}" alt="" loading="lazy" onerror="this.src='/images/profile-1.jpg'" /><span>POR <strong>${escapeHTML(post.profileName || 'Redação')}</strong></span><span class="read-arrow" aria-hidden="true">↗</span></div></div>
    </article>`).join('');
  emptyState.hidden = visible.length > 0;
  statusLine.textContent = `${String(visible.length).padStart(2, '0')} ${visible.length === 1 ? 'LEITURA' : 'LEITURAS'} · IDEIAS FRESCAS, SEM ORDEM DE IMPORTÂNCIA`;
}

function openPost(id) {
  const post = posts.find((item) => String(item.id) === String(id));
  if (!post) return;
  dialogContent.innerHTML = `<img class="dialog-image" src="${escapeHTML(post.thumbImage || '/images/post-1.jpg')}" alt="${escapeHTML(post.thumbImageAltText || post.title || '')}" /><p class="eyebrow">${escapeHTML(post.category || 'IDEIAS')} · ${escapeHTML(formatDate(post.postDate || post.createdAt))}</p><h2 class="dialog-title" id="dialog-title">${escapeHTML(post.title || 'Sem título')}</h2><p class="dialog-body">${escapeHTML(post.description || '')}</p><p class="post-byline">UMA IDEIA DE <strong>${escapeHTML(post.profileName || 'Redação')}</strong></p>`;
  dialog.showModal();
}

document.querySelectorAll('.filter').forEach((button) => button.addEventListener('click', () => {
  selectedCategory = button.dataset.category;
  document.querySelectorAll('.filter').forEach((item) => {
    const active = item === button;
    item.classList.toggle('is-active', active);
    item.setAttribute('aria-pressed', String(active));
  });
  renderPosts();
}));

searchInput.addEventListener('input', renderPosts);
document.querySelector('#clear-filters').addEventListener('click', () => {
  selectedCategory = 'all';
  searchInput.value = '';
  const allButton = document.querySelector('[data-category="all"]');
  document.querySelectorAll('.filter').forEach((item) => {
    const active = item === allButton;
    item.classList.toggle('is-active', active);
    item.setAttribute('aria-pressed', String(active));
  });
  renderPosts();
});

grid.addEventListener('click', (event) => {
  const card = event.target.closest('[data-post-id]');
  if (card) openPost(card.dataset.postId);
});
grid.addEventListener('keydown', (event) => {
  if ((event.key === 'Enter' || event.key === ' ') && event.target.matches('[data-post-id]')) {
    event.preventDefault();
    openPost(event.target.dataset.postId);
  }
});
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });

fetch('/postagens').then((response) => {
  if (!response.ok) throw new Error('Não foi possível carregar as leituras.');
  return response.json();
}).then((data) => {
  posts = Array.isArray(data) && data.length ? data : samplePosts;
  renderPosts();
}).catch(() => {
  posts = samplePosts;
  statusLine.textContent = 'EDIÇÃO DE AMOSTRA · CONECTE A API PARA PUBLICAR SUAS IDEIAS';
  renderPosts();
});
