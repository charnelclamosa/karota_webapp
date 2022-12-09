import DiscourseRoute from "discourse/routes/discourse";
<<<<<<< HEAD
import { inject as service } from "@ember/service";

export default class ChatChannelInfoIndexRoute extends DiscourseRoute {
  @service router;

  afterModel(model) {
    if (model.isDirectMessageChannel) {
      if (model.isOpen && model.membershipsCount >= 1) {
        this.router.replaceWith("chat.channel.info.members");
      } else {
        this.router.replaceWith("chat.channel.info.settings");
      }
    } else {
      this.router.replaceWith("chat.channel.info.about");
=======

export default class ChatChannelInfoIndexRoute extends DiscourseRoute {
  afterModel(model) {
    if (model.chatChannel.isDirectMessageChannel) {
      if (model.chatChannel.isOpen && model.chatChannel.membershipsCount >= 1) {
        this.replaceWith("chat.channel.info.members");
      } else {
        this.replaceWith("chat.channel.info.settings");
      }
    } else {
      this.replaceWith("chat.channel.info.about");
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    }
  }
}
