(function () {
  if (window.unsupportedBrowser) {
    throw "Unsupported browser detected";
  }

<<<<<<< HEAD
  // In Ember 3.28, the `ember` package is responsible for configuring `Helper.helper`,
  // so we need to require('ember') before setting up any helpers.
  // https://github.com/emberjs/ember.js/blob/744e536d37/packages/ember/index.js#L493-L493
  // In modern Ember, the Helper.helper definition has moved to the helper module itself
  // https://github.com/emberjs/ember.js/blob/0c5518ea7b/packages/%40ember/-internals/glimmer/lib/helper.ts#L134-L138
  require("ember");
=======
  window.__widget_helpers = require("discourse-widget-hbs/helpers").default;

  // TODO: Eliminate this global
  window.virtualDom = require("virtual-dom");
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

  let element = document.querySelector(
    `meta[name="discourse/config/environment"]`
  );
  const config = JSON.parse(
    decodeURIComponent(element.getAttribute("content"))
  );
  const event = new CustomEvent("discourse-booted", { detail: config });
  document.dispatchEvent(event);
})();
