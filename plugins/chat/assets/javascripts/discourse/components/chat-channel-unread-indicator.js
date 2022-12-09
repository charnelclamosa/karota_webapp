<<<<<<< HEAD
import Component from "@glimmer/component";
import { inject as service } from "@ember/service";

export default class ChatChannelUnreadIndicator extends Component {
  @service chat;
  @service site;

  get showUnreadIndicator() {
    return (
      this.args.channel.tracking.unreadCount > 0 ||
      // We want to do this so we don't show a blue dot if the user is inside
      // the channel and a new unread thread comes in.
      (this.chat.activeChannel?.id !== this.args.channel.id &&
        this.args.channel.unreadThreadsCountSinceLastViewed > 0)
    );
  }

  get unreadCount() {
    return this.args.channel.tracking.unreadCount;
  }

  get isUrgent() {
    return (
      this.args.channel.isDirectMessageChannel ||
      this.args.channel.tracking.mentionCount > 0
    );
  }

  get showUnreadCount() {
    return this.args.channel.isDirectMessageChannel || this.isUrgent;
  }
}
=======
import discourseComputed from "discourse-common/utils/decorators";
import Component from "@ember/component";
import { equal, gt } from "@ember/object/computed";
import { CHATABLE_TYPES } from "discourse/plugins/chat/discourse/models/chat-channel";

export default Component.extend({
  tagName: "",
  channel: null,

  isDirectMessage: equal(
    "channel.chatable_type",
    CHATABLE_TYPES.directMessageChannel
  ),

  hasUnread: gt("unreadCount", 0),

  @discourseComputed(
    "currentUser.chat_channel_tracking_state.@each.{unread_count,unread_mentions}",
    "channel.id"
  )
  channelTrackingState(state, channelId) {
    return state?.[channelId];
  },

  @discourseComputed(
    "channelTrackingState.unread_mentions",
    "channel",
    "isDirectMessage"
  )
  isUrgent(unreadMentions, channel, isDirectMessage) {
    if (!channel) {
      return;
    }

    return isDirectMessage || unreadMentions > 0;
  },

  @discourseComputed("channelTrackingState.unread_count", "channel")
  unreadCount(unreadCount, channel) {
    if (!channel) {
      return;
    }

    return unreadCount || 0;
  },
});
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
