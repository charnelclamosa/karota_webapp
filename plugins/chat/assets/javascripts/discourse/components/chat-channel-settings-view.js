<<<<<<< HEAD
import Component from "@glimmer/component";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import I18n from "I18n";
import ChatModalArchiveChannel from "discourse/plugins/chat/discourse/components/chat/modal/archive-channel";
import ChatModalDeleteChannel from "discourse/plugins/chat/discourse/components/chat/modal/delete-channel";
import ChatModalToggleChannelStatus from "discourse/plugins/chat/discourse/components/chat/modal/toggle-channel-status";
=======
import Component from "@ember/component";
import { action, computed } from "@ember/object";
import { inject as service } from "@ember/service";
import ChatApi from "discourse/plugins/chat/discourse/lib/chat-api";
import showModal from "discourse/lib/show-modal";
import I18n from "I18n";
import { Promise } from "rsvp";
import { reads } from "@ember/object/computed";
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

const NOTIFICATION_LEVELS = [
  { name: I18n.t("chat.notification_levels.never"), value: "never" },
  { name: I18n.t("chat.notification_levels.mention"), value: "mention" },
  { name: I18n.t("chat.notification_levels.always"), value: "always" },
];

const MUTED_OPTIONS = [
  { name: I18n.t("chat.settings.muted_on"), value: true },
  { name: I18n.t("chat.settings.muted_off"), value: false },
];

const AUTO_ADD_USERS_OPTIONS = [
  { name: I18n.t("yes_value"), value: true },
  { name: I18n.t("no_value"), value: false },
];

<<<<<<< HEAD
const THREADING_ENABLED_OPTIONS = [
  { name: I18n.t("chat.settings.threading_enabled"), value: true },
  { name: I18n.t("chat.settings.threading_disabled"), value: false },
];

=======
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
const CHANNEL_WIDE_MENTIONS_OPTIONS = [
  { name: I18n.t("yes_value"), value: true },
  {
    name: I18n.t("no_value"),
    value: false,
  },
];

export default class ChatChannelSettingsView extends Component {
  @service chat;
<<<<<<< HEAD
  @service chatApi;
  @service chatGuardian;
  @service currentUser;
  @service siteSettings;
  @service router;
  @service dialog;
  @service modal;

  notificationLevels = NOTIFICATION_LEVELS;
  mutedOptions = MUTED_OPTIONS;
  threadingEnabledOptions = THREADING_ENABLED_OPTIONS;
=======
  @service chatGuardian;
  @service router;
  @service dialog;
  tagName = "";
  channel = null;

  notificationLevels = NOTIFICATION_LEVELS;
  mutedOptions = MUTED_OPTIONS;
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  autoAddUsersOptions = AUTO_ADD_USERS_OPTIONS;
  channelWideMentionsOptions = CHANNEL_WIDE_MENTIONS_OPTIONS;
  isSavingNotificationSetting = false;
  savedDesktopNotificationLevel = false;
  savedMobileNotificationLevel = false;
  savedMuted = false;

<<<<<<< HEAD
  get togglingChannelWideMentionsAvailable() {
    return this.args.channel.isCategoryChannel;
  }

  get autoJoinAvailable() {
    return (
      this.siteSettings.max_chat_auto_joined_users > 0 &&
      this.args.channel.isCategoryChannel
    );
  }

=======
  @reads("channel.isCategoryChannel") togglingChannelWideMentionsAvailable;

  @computed("channel.isCategoryChannel")
  get autoJoinAvailable() {
    return (
      this.siteSettings.max_chat_auto_joined_users > 0 &&
      this.channel.isCategoryChannel
    );
  }

  @computed("autoJoinAvailable", "togglingChannelWideMentionsAvailable")
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  get adminSectionAvailable() {
    return (
      this.chatGuardian.canEditChatChannel() &&
      (this.autoJoinAvailable || this.togglingChannelWideMentionsAvailable)
    );
  }

<<<<<<< HEAD
  get canArchiveChannel() {
    return (
      this.siteSettings.chat_allow_archiving_channels &&
      !this.args.channel.isArchived &&
      !this.args.channel.isReadOnly
=======
  @computed(
    "siteSettings.chat_allow_archiving_channels",
    "channel.{isArchived,isReadOnly}"
  )
  get canArchiveChannel() {
    return (
      this.siteSettings.chat_allow_archiving_channels &&
      !this.channel.isArchived &&
      !this.channel.isReadOnly
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    );
  }

  @action
<<<<<<< HEAD
  saveNotificationSettings(frontendKey, backendKey, newValue) {
    if (this.args.channel.currentUserMembership[frontendKey] === newValue) {
=======
  saveNotificationSettings(key, value) {
    if (this.channel[key] === value) {
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      return;
    }

    const settings = {};
<<<<<<< HEAD
    settings[backendKey] = newValue;
    return this.chatApi
      .updateCurrentUserChannelNotificationsSettings(
        this.args.channel.id,
        settings
      )
      .then((result) => {
        this.args.channel.currentUserMembership[frontendKey] =
          result.membership[backendKey];
      });
=======
    settings[key] = value;
    return ChatApi.updateChatChannelNotificationsSettings(
      this.channel.id,
      settings
    ).then((membership) => {
      this.channel.current_user_membership.setProperties({
        muted: membership.muted,
        desktop_notification_level: membership.desktop_notification_level,
        mobile_notification_level: membership.mobile_notification_level,
      });
    });
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  }

  @action
  onArchiveChannel() {
<<<<<<< HEAD
    return this.modal.show(ChatModalArchiveChannel, {
      model: { channel: this.args.channel },
    });
=======
    const controller = showModal("chat-channel-archive-modal");
    controller.set("chatChannel", this.channel);
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  }

  @action
  onDeleteChannel() {
<<<<<<< HEAD
    return this.modal.show(ChatModalDeleteChannel, {
      model: { channel: this.args.channel },
    });
=======
    const controller = showModal("chat-channel-delete-modal");
    controller.set("chatChannel", this.channel);
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  }

  @action
  onToggleChannelState() {
<<<<<<< HEAD
    this.modal.show(ChatModalToggleChannelStatus, { model: this.args.channel });
=======
    const controller = showModal("chat-channel-toggle");
    controller.set("chatChannel", this.channel);
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  }

  @action
  onToggleAutoJoinUsers() {
<<<<<<< HEAD
    if (!this.args.channel.autoJoinUsers) {
=======
    if (!this.channel.auto_join_users) {
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      this.onEnableAutoJoinUsers();
    } else {
      this.onDisableAutoJoinUsers();
    }
  }

  @action
<<<<<<< HEAD
  onToggleThreadingEnabled(value) {
    return this._updateChannelProperty(
      this.args.channel,
      "threading_enabled",
      value
    ).then((result) => {
      this.args.channel.threadingEnabled = result.channel.threading_enabled;
    });
  }

  @action
  onToggleChannelWideMentions() {
    const newValue = !this.args.channel.allowChannelWideMentions;
    if (this.args.channel.allowChannelWideMentions === newValue) {
      return;
    }

    return this._updateChannelProperty(
      this.args.channel,
      "allow_channel_wide_mentions",
      newValue
    ).then((result) => {
      this.args.channel.allowChannelWideMentions =
        result.channel.allow_channel_wide_mentions;
    });
  }

  onDisableAutoJoinUsers() {
    if (this.args.channel.autoJoinUsers === false) {
      return;
    }

    return this._updateChannelProperty(
      this.args.channel,
      "auto_join_users",
      false
    ).then((result) => {
      this.args.channel.autoJoinUsers = result.channel.auto_join_users;
    });
  }

  onEnableAutoJoinUsers() {
    if (this.args.channel.autoJoinUsers === true) {
      return;
    }

    this.dialog.confirm({
      message: I18n.t("chat.settings.auto_join_users_warning", {
        category: this.args.channel.chatable.name,
      }),
      didConfirm: () =>
        this._updateChannelProperty(
          this.args.channel,
          "auto_join_users",
          true
        ).then((result) => {
          this.args.channel.autoJoinUsers = result.channel.auto_join_users;
        }),
=======
  onToggleChannelWideMentions() {
    return this._updateChannelProperty(
      this.channel,
      "allow_channel_wide_mentions",
      !this.channel.allow_channel_wide_mentions
    );
  }

  onDisableAutoJoinUsers() {
    return this._updateChannelProperty(this.channel, "auto_join_users", false);
  }

  onEnableAutoJoinUsers() {
    this.dialog.confirm({
      message: I18n.t("chat.settings.auto_join_users_warning", {
        category: this.channel.chatable.name,
      }),
      didConfirm: () =>
        this._updateChannelProperty(this.channel, "auto_join_users", true),
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    });
  }

  _updateChannelProperty(channel, property, value) {
<<<<<<< HEAD
    const payload = {};
    payload[property] = value;

    return this.chatApi.updateChannel(channel.id, payload).catch((event) => {
      if (event.jqXHR?.responseJSON?.errors) {
        this.flash(event.jqXHR.responseJSON.errors.join("\n"), "error");
      }
    });
=======
    if (channel[property] === value) {
      return Promise.resolve();
    }

    const payload = {};
    payload[property] = value;
    return ChatApi.modifyChatChannel(channel.id, payload)
      .then((updatedChannel) => {
        channel.set(property, updatedChannel[property]);
      })
      .catch((event) => {
        if (event.jqXHR?.responseJSON?.errors) {
          this.flash(event.jqXHR.responseJSON.errors.join("\n"), "error");
        }
      });
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  }
}
