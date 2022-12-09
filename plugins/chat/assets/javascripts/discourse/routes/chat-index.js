import DiscourseRoute from "discourse/routes/discourse";
import { inject as service } from "@ember/service";

export default class ChatIndexRoute extends DiscourseRoute {
  @service chat;
<<<<<<< HEAD
  @service chatChannelsManager;
  @service router;

  activate() {
    this.chat.activeChannel = null;
  }

  redirect() {
    // Always want the channel index on mobile.
    if (this.site.mobileView) {
      return;
    }

    // We are on desktop. Check for a channel to enter and transition if so
    const id = this.chat.getIdealFirstChannelId();
    if (id) {
      return this.chatChannelsManager.find(id).then((c) => {
        return this.router.replaceWith("chat.channel", ...c.routeModels);
      });
    } else {
      return this.router.replaceWith("chat.browse");
    }
=======
  @service router;

  redirect() {
    if (this.site.mobileView) {
      return; // Always want the channel index on mobile.
    }

    // We are on desktop. Check for a channel to enter and transition if so.
    // Otherwise, `setupController` will fetch all available
    return this.chat.getIdealFirstChannelIdAndTitle().then((channelInfo) => {
      if (channelInfo) {
        return this.chat.getChannelBy("id", channelInfo.id).then((c) => {
          return this.chat.openChannel(c);
        });
      } else {
        return this.router.transitionTo("chat.browse");
      }
    });
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  }

  model() {
    if (this.site.mobileView) {
<<<<<<< HEAD
      return this.chatChannelsManager.channels;
=======
      return this.chat.getChannels().then((channels) => {
        if (
          channels.publicChannels.length ||
          channels.directMessageChannels.length
        ) {
          return channels;
        }
      });
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    }
  }
}
