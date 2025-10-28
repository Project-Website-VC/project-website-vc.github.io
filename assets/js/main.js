// Progressive enhancements for research.html
// - Keeps native <details>/<summary> behavior as baseline
// - Adds Expand/Collapse All controls
// - Remembers open/closed state per section via localStorage
// - Also sets footer year and improves skip-link focus

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

  // Collapsibles
  var detailsList = Array.prototype.slice.call(document.querySelectorAll('details[data-collapsible]'));
  if (!detailsList.length) return; // nothing else to do

  // Restore saved states
  detailsList.forEach(function (el) {
    try {
      if (!el.id) return; // persistence needs an id
      var k = 'collapsible:' + el.id;
      var v = localStorage.getItem(k);
      if (v === 'open') el.open = true;
      if (v === 'closed') el.open = false;
      el.addEventListener('toggle', function(){
        try { localStorage.setItem(k, el.open ? 'open' : 'closed'); } catch (e) {}
      });
    } catch (e) {}
  });

  // Controls (progressively enhanced)
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
        // Move focus to the first summary for accessibility
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
})();
