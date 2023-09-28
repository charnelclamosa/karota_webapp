import { createWidget } from "discourse/widgets/widget";
import hbs from "discourse/widgets/hbs-compiler";

createWidget("header-contents", {
  tagName: "div.contents",
  transform() {
    return {
      showBootstrapMode: this.currentUser?.staff && this.site.desktopView,
    };
  },
  template: hbs`
    {{#if this.site.desktopView}}
      {{#if attrs.sidebarEnabled}}
        {{sidebar-toggle attrs=attrs}}
      {{/if}}
    {{/if}}

    {{home-logo attrs=attrs}}

    {{#if attrs.topic}}
      {{header-topic-info attrs=attrs}}
    {{else if this.siteSettings.bootstrap_mode_enabled}}
      {{#if transformed.showBootstrapMode}}
        {{header-bootstrap-mode attrs=attrs}}
      {{/if}}
    {{/if}}

<<<<<<< HEAD
    {{before-header-panel-outlet attrs=attrs}}

    <div class="panel" role="navigation">{{yield}}</div>
=======
    <div class="panel clearfix" role="navigation">{{yield}}</div>
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  `,
});
