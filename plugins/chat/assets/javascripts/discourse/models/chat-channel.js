<<<<<<< HEAD
import UserChatChannelMembership from "discourse/plugins/chat/discourse/models/user-chat-channel-membership";
import ChatMessage from "discourse/plugins/chat/discourse/models/chat-message";
import { escapeExpression } from "discourse/lib/utilities";
import { tracked } from "@glimmer/tracking";
import slugifyChannel from "discourse/plugins/chat/discourse/lib/slugify-channel";
import ChatThreadsManager from "discourse/plugins/chat/discourse/lib/chat-threads-manager";
import ChatMessagesManager from "discourse/plugins/chat/discourse/lib/chat-messages-manager";
import { getOwnerWithFallback } from "discourse-common/lib/get-owner";
import guid from "pretty-text/guid";
import ChatDirectMessage from "discourse/plugins/chat/discourse/models/chat-direct-message";
import ChatChannelArchive from "discourse/plugins/chat/discourse/models/chat-channel-archive";
import Category from "discourse/models/category";
import ChatTrackingState from "discourse/plugins/chat/discourse/models/chat-tracking-state";
=======
import RestModel from "discourse/models/rest";
import I18n from "I18n";
import { computed } from "@ember/object";
import User from "discourse/models/user";
import UserChatChannelMembership from "discourse/plugins/chat/discourse/models/user-chat-channel-membership";
import { ajax } from "discourse/lib/ajax";
import { escapeExpression } from "discourse/lib/utilities";
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

export const CHATABLE_TYPES = {
  directMessageChannel: "DirectMessage",
  categoryChannel: "Category",
};
<<<<<<< HEAD

=======
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
export const CHANNEL_STATUSES = {
  open: "open",
  readOnly: "read_only",
  closed: "closed",
  archived: "archived",
};

<<<<<<< HEAD
=======
export function channelStatusName(channelStatus) {
  switch (channelStatus) {
    case CHANNEL_STATUSES.open:
      return I18n.t("chat.channel_status.open");
    case CHANNEL_STATUSES.readOnly:
      return I18n.t("chat.channel_status.read_only");
    case CHANNEL_STATUSES.closed:
      return I18n.t("chat.channel_status.closed");
    case CHANNEL_STATUSES.archived:
      return I18n.t("chat.channel_status.archived");
  }
}

>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
export function channelStatusIcon(channelStatus) {
  if (channelStatus === CHANNEL_STATUSES.open) {
    return null;
  }

  switch (channelStatus) {
    case CHANNEL_STATUSES.closed:
      return "lock";
<<<<<<< HEAD
    case CHANNEL_STATUSES.readOnly:
      return "comment-slash";
    case CHANNEL_STATUSES.archived:
      return "archive";
=======
      break;
    case CHANNEL_STATUSES.readOnly:
      return "comment-slash";
      break;
    case CHANNEL_STATUSES.archived:
      return "archive";
      break;
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  }
}

const STAFF_READONLY_STATUSES = [
  CHANNEL_STATUSES.readOnly,
  CHANNEL_STATUSES.archived,
];

const READONLY_STATUSES = [
  CHANNEL_STATUSES.closed,
  CHANNEL_STATUSES.readOnly,
  CHANNEL_STATUSES.archived,
];

<<<<<<< HEAD
export default class ChatChannel {
  static create(args = {}) {
    return new ChatChannel(args);
  }

  @tracked title;
  @tracked slug;
  @tracked description;
  @tracked status;
  @tracked activeThread = null;
  @tracked meta;
  @tracked chatableType;
  @tracked chatableUrl;
  @tracked autoJoinUsers = false;
  @tracked allowChannelWideMentions = true;
  @tracked membershipsCount = 0;
  @tracked archive;
  @tracked tracking;
  @tracked threadingEnabled = false;

  threadsManager = new ChatThreadsManager(getOwnerWithFallback(this));
  messagesManager = new ChatMessagesManager(getOwnerWithFallback(this));

  @tracked _currentUserMembership;
  @tracked _lastMessage;

  constructor(args = {}) {
    this.id = args.id;
    this.chatableId = args.chatable_id;
    this.chatableUrl = args.chatable_url;
    this.chatableType = args.chatable_type;
    this.membershipsCount = args.memberships_count;
    this.slug = args.slug;
    this.title = args.title;
    this.status = args.status;
    this.description = args.description;
    this.threadingEnabled = args.threading_enabled;
    this.autoJoinUsers = args.auto_join_users;
    this.allowChannelWideMentions = args.allow_channel_wide_mentions;
    this.chatable = this.isDirectMessageChannel
      ? ChatDirectMessage.create({
          id: args.chatable?.id,
          users: args.chatable?.users,
        })
      : Category.create(args.chatable);
    this.currentUserMembership = args.current_user_membership;

    if (args.archive_completed || args.archive_failed) {
      this.archive = ChatChannelArchive.create(args);
    }

    this.tracking = new ChatTrackingState(getOwnerWithFallback(this));
    this.lastMessage = args.last_message;
    this.meta = args.meta;
  }

  get unreadThreadsCountSinceLastViewed() {
    return Array.from(this.threadsManager.unreadThreadOverview.values()).filter(
      (lastReplyCreatedAt) =>
        lastReplyCreatedAt >= this.currentUserMembership.lastViewedAt
    ).length;
  }

  updateLastViewedAt() {
    this.currentUserMembership.lastViewedAt = new Date();
  }

  get canDeleteSelf() {
    return this.meta.can_delete_self;
  }

  get canDeleteOthers() {
    return this.meta.can_delete_others;
  }

  get canFlag() {
    return this.meta.can_flag;
  }

  get userSilenced() {
    return this.meta.user_silenced;
  }

  get canModerate() {
    return this.meta.can_moderate;
  }

=======
export default class ChatChannel extends RestModel {
  isDraft = false;
  lastSendReadMessageId = null;

  @computed("title")
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  get escapedTitle() {
    return escapeExpression(this.title);
  }

<<<<<<< HEAD
=======
  @computed("description")
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  get escapedDescription() {
    return escapeExpression(this.description);
  }

<<<<<<< HEAD
  get slugifiedTitle() {
    return this.slug || slugifyChannel(this);
  }

  get routeModels() {
    return [this.slugifiedTitle, this.id];
  }

  get isDirectMessageChannel() {
    return this.chatableType === CHATABLE_TYPES.directMessageChannel;
  }

  get isCategoryChannel() {
    return this.chatableType === CHATABLE_TYPES.categoryChannel;
  }

=======
  @computed("chatable_type")
  get isDirectMessageChannel() {
    return this.chatable_type === CHATABLE_TYPES.directMessageChannel;
  }

  @computed("chatable_type")
  get isCategoryChannel() {
    return this.chatable_type === CHATABLE_TYPES.categoryChannel;
  }

  @computed("status")
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  get isOpen() {
    return !this.status || this.status === CHANNEL_STATUSES.open;
  }

<<<<<<< HEAD
=======
  @computed("status")
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  get isReadOnly() {
    return this.status === CHANNEL_STATUSES.readOnly;
  }

<<<<<<< HEAD
=======
  @computed("status")
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  get isClosed() {
    return this.status === CHANNEL_STATUSES.closed;
  }

<<<<<<< HEAD
=======
  @computed("status")
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  get isArchived() {
    return this.status === CHANNEL_STATUSES.archived;
  }

<<<<<<< HEAD
=======
  @computed("isArchived", "isOpen")
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  get isJoinable() {
    return this.isOpen && !this.isArchived;
  }

<<<<<<< HEAD
  get isFollowing() {
    return this.currentUserMembership.following;
  }

  get canJoin() {
    return this.meta.can_join_chat_channel;
  }

  async stageMessage(message) {
    message.id = guid();
    message.staged = true;
    message.draft = false;
    message.createdAt = new Date();
    message.channel = this;

    if (message.inReplyTo) {
      if (!this.threadingEnabled) {
        this.messagesManager.addMessages([message]);
      }
    } else {
      this.messagesManager.addMessages([message]);
    }

    message.manager = this.messagesManager;
=======
  @computed("memberships_count")
  get membershipsCount() {
    return this.memberships_count;
  }

  @computed("current_user_membership.following")
  get isFollowing() {
    return this.current_user_membership.following;
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  }

  canModifyMessages(user) {
    if (user.staff) {
      return !STAFF_READONLY_STATUSES.includes(this.status);
    }

    return !READONLY_STATUSES.includes(this.status);
  }

<<<<<<< HEAD
  get currentUserMembership() {
    return this._currentUserMembership;
  }

  set currentUserMembership(membership) {
    if (membership instanceof UserChatChannelMembership) {
      this._currentUserMembership = membership;
    } else {
      this._currentUserMembership =
        UserChatChannelMembership.create(membership);
    }
  }

  get lastMessage() {
    return this._lastMessage;
  }

  set lastMessage(message) {
    if (!message) {
      this._lastMessage = null;
      return;
    }

    if (message instanceof ChatMessage) {
      this._lastMessage = message;
    } else {
      this._lastMessage = ChatMessage.create(this, message);
    }
  }
}
=======
  updateMembership(membership) {
    this.current_user_membership.setProperties({
      following: membership.following,
      muted: membership.muted,
      desktop_notification_level: membership.desktop_notification_level,
      mobile_notification_level: membership.mobile_notification_level,
    });
  }

  updateLastReadMessage(messageId) {
    if (!this.isFollowing || !messageId) {
      return;
    }

    return ajax(`/chat/${this.id}/read/${messageId}.json`, {
      method: "PUT",
    }).then(() => {
      this.set("lastSendReadMessageId", messageId);
    });
  }
}

ChatChannel.reopenClass({
  create(args) {
    args = args || {};
    this._initUserModels(args);
    this._initUserMembership(args);

    args.lastSendReadMessageId =
      args.current_user_membership?.last_read_message_id;

    return this._super(args);
  },

  _initUserModels(args) {
    if (args.chatable?.users?.length) {
      for (let i = 0; i < args.chatable?.users?.length; i++) {
        const userData = args.chatable.users[i];
        args.chatable.users[i] = User.create(userData);
      }
    }
  },

  _initUserMembership(args) {
    if (args.current_user_membership instanceof UserChatChannelMembership) {
      return;
    }

    args.current_user_membership = UserChatChannelMembership.create(
      args.current_user_membership || {
        following: false,
        muted: false,
        unread_count: 0,
        unread_mentions: 0,
      }
    );
  },
});

export function createDirectMessageChannelDraft() {
  return ChatChannel.create({
    isDraft: true,
    chatable_type: CHATABLE_TYPES.directMessageChannel,
    chatable: {
      users: [],
    },
  });
}
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
