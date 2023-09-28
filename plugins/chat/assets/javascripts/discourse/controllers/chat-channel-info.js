import Controller from "@ember/controller";
<<<<<<< HEAD
import { inject as service } from "@ember/service";
import { reads } from "@ember/object/computed";
import { computed } from "@ember/object";
=======
import { action, computed } from "@ember/object";
import { inject as service } from "@ember/service";
import { reads } from "@ember/object/computed";
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

export default class ChatChannelInfoIndexController extends Controller {
  @service router;
  @service chat;
  @service chatChannelInfoRouteOriginManager;

  @reads("router.currentRoute.localName") tab;

<<<<<<< HEAD
  @computed("model.{membershipsCount,status,currentUserMembership.following}")
  get tabs() {
    const tabs = [];

    if (!this.model.isDirectMessageChannel) {
      tabs.push("about");
    }

    if (this.model.isOpen && this.model.membershipsCount >= 1) {
      tabs.push("members");
    }

    if (
      this.currentUser?.staff ||
      this.model.currentUserMembership?.following
    ) {
      tabs.push("settings");
    }

    return tabs;
  }
=======
  @computed("model.chatChannel.{membershipsCount,status}")
  get tabs() {
    const tabs = [];

    if (!this.model.chatChannel.isDirectMessageChannel) {
      tabs.push("about");
    }

    if (
      this.model.chatChannel.isOpen &&
      this.model.chatChannel.membershipsCount >= 1
    ) {
      tabs.push("members");
    }

    tabs.push("settings");

    return tabs;
  }

  @action
  switchChannel(channel) {
    return this.chat.openChannel(channel);
  }
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
}
