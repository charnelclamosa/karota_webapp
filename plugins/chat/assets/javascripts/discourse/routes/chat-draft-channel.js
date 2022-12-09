import DiscourseRoute from "discourse/routes/discourse";
import { inject as service } from "@ember/service";

export default class ChatDraftChannelRoute extends DiscourseRoute {
  @service chat;
<<<<<<< HEAD
  @service router;

  beforeModel() {
    if (!this.chat.userCanDirectMessage) {
      this.router.transitionTo("chat");
=======

  beforeModel() {
    if (!this.chat.userCanDirectMessage) {
      this.transitionTo("chat");
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    }
  }

  activate() {
<<<<<<< HEAD
    this.chat.activeChannel = null;
=======
    this.chat.setActiveChannel(null);
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  }
}
