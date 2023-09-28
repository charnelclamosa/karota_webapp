import DiscourseRoute from "discourse/routes/discourse";
import { inject as service } from "@ember/service";
<<<<<<< HEAD
import { defaultHomepage } from "discourse/lib/utilities";

export default class ChatBrowseIndexRoute extends DiscourseRoute {
  @service chat;
  @service siteSettings;
  @service router;

  beforeModel() {
    if (!this.siteSettings.enable_public_channels) {
      return this.router.transitionTo(`discovery.${defaultHomepage()}`);
    }
  }

  activate() {
    this.chat.activeChannel = null;
  }

  afterModel() {
    this.router.replaceWith("chat.browse.open");
=======

export default class ChatBrowseIndexRoute extends DiscourseRoute {
  @service chat;

  activate() {
    this.chat.setActiveChannel(null);
  }

  afterModel() {
    this.replaceWith("chat.browse.open");
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  }
}
