import DiscourseRoute from "discourse/routes/discourse";
import { inject as service } from "@ember/service";
import { ORIGINS } from "discourse/plugins/chat/discourse/services/chat-channel-info-route-origin-manager";
<<<<<<< HEAD
import withChatChannel from "./chat-channel-decorator";

@withChatChannel
=======

>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
export default class ChatChannelInfoRoute extends DiscourseRoute {
  @service chatChannelInfoRouteOriginManager;

  activate(transition) {
    const name = transition?.from?.name;
    if (name) {
      this.chatChannelInfoRouteOriginManager.origin = name.startsWith(
        "chat.browse"
      )
        ? ORIGINS.browse
        : ORIGINS.channel;
    }
  }

  deactivate() {
    this.chatChannelInfoRouteOriginManager.origin = null;
  }
}
