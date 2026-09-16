(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const dataEl = $('skinProfileData');
  const colorsEl = $('skinProfileColors');
  if (!dataEl || !colorsEl) return;
  const profiles = JSON.parse(dataEl.textContent || '{}');
  const colors = JSON.parse(colorsEl.textContent || '{}');
  const validCodes = new Set(Object.keys(profiles));
  const base = document.documentElement.getAttribute('data-baseurl') || '';
  const asset = path => `${base}${path}`;
  const ASSETS = {
    dims: Object.fromEntries(['D','O','S','R','P','N','W','T'].map(x => [x, asset(`/assets/images/skin-profile/baumann/${x}.png`)])),
    decor: {
      leaf: asset('/assets/images/skin-profile/decorative/leaf-sprig.png'),
      flower: asset('/assets/images/skin-profile/decorative/flower-leaf-accent.png'),
      corner: asset('/assets/images/skin-profile/decorative/corner-branch.png'),
      still: asset('/assets/images/skin-profile/decorative/skincare-still-life.png')
    },
    ingredients: {
      uv: asset('/assets/images/skin-profile/ingredients/uv-filters.png'),
      barrier: asset('/assets/images/skin-profile/ingredients/humectants-emollients-barrier-lipids.png'),
      niacinamide: asset('/assets/images/skin-profile/ingredients/niacinamide.png'),
      retinoid: asset('/assets/images/skin-profile/ingredients/retinoid.png'),
      antioxidant: asset('/assets/images/skin-profile/ingredients/antioxidant.png'),
      pigment: asset('/assets/images/skin-profile/ingredients/pigmentation-support.png'),
      soothing: asset('/assets/images/skin-profile/ingredients/soothing-support.png')
    },
    products: {
      cleanser: asset('/assets/images/skin-profile/products/cleanser.png'),
      moisturizer: asset('/assets/images/skin-profile/products/moisturizer.png'),
      sunscreen: asset('/assets/images/skin-profile/products/sunscreen.png'),
      targeted: asset('/assets/images/skin-profile/products/targeted.png')
    }
  };
  const esc = s => String(s ?? '').replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  const params = new URLSearchParams(location.search);
  const code = (params.get('code') || '').trim().toUpperCase();
  const content = $('skinProfileContent');
  const invalid = $('skinProfileInvalid');
  if (!validCodes.has(code)) { invalid.hidden = false; return; }
  const p = profiles[code];
  const accent = colors[code] || '#6E9A7C';
  document.querySelector('.skin-profile-result-page').style.setProperty('--profile-accent', accent);
  content.hidden = false;

  const safeDate = key => {
    const raw = params.get(key);
    if (!raw || !/^\d{4}-\d{2}-\d{2}$/.test(raw)) return '—';
    const [y,m,d] = raw.split('-'); return `${d}.${m}.${y}`;
  };
  $('spv2AssessmentDate').textContent = safeDate('assessment');
  $('spv2ReassessmentDate').textContent = safeDate('reassess');

  $('spv2Code').textContent = code;
  $('spv2Code').style.color = accent;
  document.querySelector('.spv2-code-brush').style.background = accent;
  $('spv2English').textContent = p.full_name;
  $('spv2DimensionLine').textContent = p.dimensions.map(x => `${x.letter} · ${x.vietnamese}`).join('  ·  ');
  $('spv2Summary').textContent = p.summary;
  $('spv2Overview').textContent = p.overview;
  $('spv2HeroCorner').src = ASSETS.decor.corner;
  $('spv2DimHeadArt').src = ASSETS.decor.leaf;
  $('spv2PriorityHeadArt').src = ASSETS.decor.flower;
  $('spv2RoutineHeadArt').src = ASSETS.decor.leaf;
  $('spv2ProductHeadArt').src = ASSETS.decor.flower;
  $('spv2IngredientHeadArt').src = ASSETS.decor.leaf;
  $('spv2CautionCorner').src = ASSETS.decor.corner;

  $('spv2Standout').innerHTML = p.dimensions.map(x => `<div class="spv2-side-dim"><img src="${ASSETS.dims[x.letter]}" alt=""><div><strong>${esc(x.letter)} · ${esc(x.english)}</strong><span>${esc(x.vietnamese)}</span></div></div>`).join('');
  $('spv2HeroPriorities').innerHTML = p.priorities.map(x => `<span>${esc(x.label)}</span>`).join('');
  $('spv2Dimensions').innerHTML = p.dimensions.map(x => `<article class="spv2-dim-card"><h3>${esc(x.letter)} – ${esc(x.english)}</h3><div class="spv2-dim-label">${esc(x.vietnamese)}</div><img src="${ASSETS.dims[x.letter]}" alt="" width="122" height="122"><p>${esc(x.description)}</p></article>`).join('');
  $('spv2Priorities').innerHTML = p.priorities.map((x,i) => `<article class="spv2-priority-card"><span class="spv2-priority-number">${i+1}</span><div><h3>${esc(x.label)}</h3><p>${esc(x.description)}</p></div>${i%2===0?`<img src="${ASSETS.decor.leaf}" alt="">`:''}</article>`).join('');

  const productIcon = label => {
    const s = label.toLowerCase();
    if (s.includes('làm sạch')) return ASSETS.products.cleanser;
    if (s.includes('dưỡng ẩm') || s.includes('cấp ẩm')) return ASSETS.products.moisturizer;
    if (s.includes('chống nắng')) return ASSETS.products.sunscreen;
    return ASSETS.products.targeted;
  };
  const ingredientIcon = label => {
    const s = label.toLowerCase();
    if (s.includes('bộ lọc')) return ASSETS.ingredients.uv;
    if (s.includes('hút ẩm') || s.includes('lipid') || s.includes('hàng rào')) return ASSETS.ingredients.barrier;
    if (s.includes('niacinamide')) return ASSETS.ingredients.niacinamide;
    if (s.includes('retinoid')) return ASSETS.ingredients.retinoid;
    if (s.includes('chống oxy')) return ASSETS.ingredients.antioxidant;
    if (s.includes('sắc tố')) return ASSETS.ingredients.pigment;
    return ASSETS.ingredients.soothing;
  };
  const flow = steps => `<div class="spv5-flow">${steps.map((s,i)=>`${i?'<span class="spv5-flow-arrow" aria-hidden="true">→</span>':''}<div class="spv5-step"><div class="spv5-step-visual"><img src="${productIcon(s.label)}" alt=""></div><span class="spv5-step-num">${esc(s.order)}</span><span class="spv5-step-label">${esc(s.label)}</span><span class="spv5-step-note">${esc(s.note)}</span></div>`).join('')}</div>`;
  const guidanceList = txt => (txt || '').split(/(?<=[.!?])\s+/).filter(Boolean).map(s => `<li>${esc(s)}</li>`).join('');
  $('spv2Routine').innerHTML =
    `<article class="spv2-routine-card"><h3>Buổi sáng</h3>${flow(p.routine.morning.steps)}<ul class="spv5-routine-notes">${guidanceList(p.routine.morning.guidance)}</ul></article>`+
    `<article class="spv2-routine-card"><h3>Buổi tối</h3>${flow(p.routine.evening.steps)}<ul class="spv5-routine-notes">${guidanceList(p.routine.evening.guidance)}</ul></article>`+
    `<article class="spv2-routine-card"><div class="spv5-flex-support"><div class="spv5-support-visual"><img src="${ASSETS.decor.still}" alt=""></div><div><h3>Khi cần</h3><ul>${guidanceList(p.routine.when_needed)}</ul></div></div></article>`;

  $('spv2Products').innerHTML = p.product_types.map(x => `<article class="spv2-product-tile"><img src="${productIcon(x.label)}" alt=""><strong>${esc(x.label)}</strong></article>`).join('');
  $('spv2ProductDetails').innerHTML = p.product_types.map(x => `<div class="spv2-detail-item"><strong>${esc(x.label)}</strong><p>${esc(x.description)}</p></div>`).join('');
  $('spv2Ingredients').innerHTML = p.ingredients.map(x => `<div class="spv2-ingredient-chip"><img src="${ingredientIcon(x.label)}" alt=""><span>${esc(x.label)}</span></div>`).join('');
  $('spv2IngredientDetails').innerHTML = p.ingredients.map(x => `<div class="spv2-detail-item"><strong>${esc(x.label)}</strong><p>${esc(x.description)}</p></div>`).join('');
  $('spv2Cautions').innerHTML = p.cautions.map(x => `<li>${esc(x)}</li>`).join('');
  $('spv2Misreads').innerHTML = p.not_mean.map(x => `<li>${esc(x)}</li>`).join('');
  $('spv2Topics').innerHTML = p.related_topics.map(x => `<span>${esc(x)}</span>`).join('');
  $('spv2Methodology').textContent = p.methodology_note;

  const referenceParts = raw => {
    const text = String(raw || '');
    const match = text.match(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)\s*$/);
    return {
      citation: match ? text.slice(0, match.index).trim() : text.trim(),
      url: match ? match[2] : ''
    };
  };

  const referenceCitationParts = citation => {
    const match = String(citation || '').match(/^(.+?)\.\s+(.+?)\.\s+(.+)$/);
    if (!match) return { author: '', title: '', publication: citation };
    return { author: match[1], title: match[2], publication: match[3] };
  };

  const referenceLinkLabel = url => {
    if (/pubmed\.ncbi\.nlm\.nih\.gov/i.test(url)) return 'Xem trên PubMed →';
    if (/pmc\.ncbi\.nlm\.nih\.gov/i.test(url)) return 'Xem nghiên cứu →';
    if (/skintypesolutions\.com/i.test(url)) return 'Xem trên Skin Type Solutions →';
    if (/plos\.org/i.test(url)) return 'Xem bài nghiên cứu trên PLOS ONE →';
    if (/wiley\.com|doi\.org|springer\.com|sciencedirect\.com/i.test(url)) return 'Xem nghiên cứu →';
    return 'Xem nguồn →';
  };

  const referenceEntry = raw => {
    const { citation, url } = referenceParts(raw);
    const parts = referenceCitationParts(citation);
    const citationHTML = parts.author
      ? `<p class="reference-section__citation"><span class="reference-section__author">${esc(parts.author)}</span>. <span class="reference-section__title">${esc(parts.title)}</span>. <span class="reference-section__publication">${esc(parts.publication)}</span></p>`
      : `<p class="reference-section__citation"><span class="reference-section__publication">${esc(parts.publication)}</span></p>`;
    const linkHTML = url
      ? `<a class="reference-section__link" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${referenceLinkLabel(url)}</a>`
      : '';
    return `<div class="reference-section__entry">${citationHTML}${linkHTML}</div>`;
  };

  const frameworkReferences = p.references.filter(x => /Baumann Skin Type Indicator/i.test(x));
  const supportingReferences = p.references.filter(x => /Skin Type Solutions/i.test(x));
  const researchReferences = p.references.filter(
    x => !/Baumann Skin Type Indicator/i.test(x) && !/Skin Type Solutions/i.test(x)
  );

  const referenceGroup = (title, items) => items.length
    ? `<div class="reference-section__group"><h3 class="reference-section__group-title">${esc(title)}</h3>${items.map(referenceEntry).join('')}</div>`
    : '';

  $('spv2References').innerHTML =
    referenceGroup('Baumann Skin Type', frameworkReferences) +
    referenceGroup('Nghiên cứu liên quan đến Skin Profile này', researchReferences);
  $('spv2OtherReferences').innerHTML = supportingReferences.map(referenceEntry).join('');

  $('spv2SaveCode').textContent = code;
  $('spv2SaveCode').style.color = accent;
  $('spv2SaveDims').innerHTML = p.dimensions.map(x => `<div class="spv2-save-dim"><img src="${ASSETS.dims[x.letter]}" alt=""><div><strong>${esc(x.letter)} · ${esc(x.english)}</strong><span>${esc(x.vietnamese)}</span></div></div>`).join('');
  $('spv2SaveSummary').textContent = p.summary;
  $('spv2SavePriorities').innerHTML = p.priorities.map(x => `<span>${esc(x.label)}</span>`).join('');
})();
