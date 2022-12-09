import Component from "@ember/component";
import { action } from "@ember/object";

export default Component.extend({
  tagName: "",

  collapsed: false,
  header: null,
<<<<<<< HEAD
  onToggle: null,
=======
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

  @action
  open() {
    this.set("collapsed", false);
<<<<<<< HEAD
    this.onToggle?.(false);
=======
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  },

  @action
  close() {
    this.set("collapsed", true);
<<<<<<< HEAD
    this.onToggle?.(true);
=======
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  },
});
