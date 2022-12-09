import DiscourseRoute from "discourse/routes/discourse";
<<<<<<< HEAD
import { inject as service } from "@ember/service";

export default class ChatChannelInfoAboutRoute extends DiscourseRoute {
  @service router;

  afterModel(model) {
    if (model.isDirectMessageChannel) {
      this.router.replaceWith("chat.channel.info.index");
=======

export default class ChatChannelInfoAboutRoute extends DiscourseRoute {
  afterModel(model) {
    if (model.chatChannel.isDirectMessageChannel) {
      this.replaceWith("chat.channel.info.index");
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    }
  }
}
