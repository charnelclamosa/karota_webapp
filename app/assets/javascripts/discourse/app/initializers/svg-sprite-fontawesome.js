import { loadSprites } from "discourse/lib/svg-sprite-loader";

export default {
<<<<<<<< HEAD:app/assets/javascripts/discourse/app/instance-initializers/svg-sprite-fontawesome.js
  initialize(owner) {
    const session = owner.lookup("service:session");
    
    if (session.svgSpritePath) {
      loadSprites(session.svgSpritePath, "fontawesome");
    }
  },
};
