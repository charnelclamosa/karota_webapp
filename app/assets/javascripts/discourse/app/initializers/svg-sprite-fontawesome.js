import { loadSprites } from "discourse/lib/svg-sprite-loader";

export default {
<<<<<<<< HEAD:app/assets/javascripts/discourse/app/instance-initializers/svg-sprite-fontawesome.js
  initialize(owner) {
    const session = owner.lookup("service:session");

========
  name: "svg-sprite-fontawesome",
  after: "export-application-global",

  initialize(container) {
    const session = container.lookup("service:session");

>>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream):app/assets/javascripts/discourse/app/initializers/svg-sprite-fontawesome.js
    if (session.svgSpritePath) {
      loadSprites(session.svgSpritePath, "fontawesome");
    }
  },
};
