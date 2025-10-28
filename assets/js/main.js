// Shared progressive enhancements:
// - Footer year
// - Skip-link focus to <main>
// - Collapsibles (on research.html): expand/collapse all + persistence
// - SEO micro-hardening: add rel attributes to external links (security + hinting)

(function () {
  // Footer year
  try {
    var y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
  } catch (e) {}

  // Skip link focus to <main>
  try {
    var main = document.getElementById('content');
    var skip = document.querySelector('.skip-link');
    if (main && skip) {
      skip.addEventListener('click', function(){
        setTimeout(function(){ try { main.focus(); } catch(e){} }, 0);
      });
    }
  } catch (e) {}

  // External links: add security/SEO-friendly rel attrs
  try {
    var origin = location.origin;
    var anchors = document.querySelectorAll('a[href^="http"]');
    anchors.forEach(function(a){
      if (!a.href.startsWith(origin)) {
        var rel = (a.getAttribute('rel') || '').split(/\s+/);
        ['noopener','noreferrer','external'].forEach(function(tok){
          if (rel.indexOf(tok) === -1) rel.push(tok);
        });
        a.setAttribute('rel', rel.join(' ').trim());
      }
    });
  } catch (e) {}

  // Collapsibles (research.html)
  var detailsList = Array.prototype.slice.call(document.querySelectorAll('details[data-collapsible]'));
  if (detailsList.length) {
    // Restore saved states
    detailsList.forEach(function (el) {
      try {
        if (!el.id) return;
        var k = 'collapsible:' + el.id;
        var v = localStorage.getItem(k);
        if (v === 'open') el.open = true;
        if (v === 'closed') el.open = false;
        el.addEventListener('toggle', function(){
          try { localStorage.setItem(k, el.open ? 'open' : 'closed'); } catch (e) {}
        });
      } catch (e) {}
    });

    // Controls
    var controls = document.querySelector('[data-js-collapsible-controls]');
    if (controls) {
      controls.hidden = false;
      var expandBtn = controls.querySelector('[data-action="expand-all"]');
      var collapseBtn = controls.querySelector('[data-action="collapse-all"]');
      if (expandBtn) {
        expandBtn.addEventListener('click', function () {
          detailsList.forEach(function (d) {
            d.open = true;
            if (d.id) try { localStorage.setItem('collapsible:' + d.id, 'open'); } catch (e) {}
          });
          var firstSummary = detailsList[0] && detailsList[0].querySelector('summary');
          if (firstSummary) firstSummary.focus();
        });
      }
      if (collapseBtn) {
        collapseBtn.addEventListener('click', function () {
          detailsList.forEach(function (d) {
            d.open = false;
            if (d.id) try { localStorage.setItem('collapsible:' + d.id, 'closed'); } catch (e) {}
          });
          var firstSummary = detailsList[0] && detailsList[0].querySelector('summary');
          if (firstSummary) firstSummary.focus();
        });
      }
    }
  }
})();
