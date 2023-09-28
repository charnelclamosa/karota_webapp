<<<<<<< HEAD
import Component from "@glimmer/component";
import { action } from "@ember/object";
import { ajax } from "discourse/lib/ajax";
import { popupAjaxError } from "discourse/lib/ajax-error";
import { inject as service } from "@ember/service";

export default class ChatRetentionReminder extends Component {
  @service currentUser;

  get show() {
    return (
      (this.args.channel?.isDirectMessageChannel &&
        this.currentUser?.get("needs_dm_retention_reminder")) ||
      (this.args.channel?.isCategoryChannel &&
        this.currentUser?.get("needs_channel_retention_reminder"))
    );
  }
=======
import Component from "@ember/component";
import discourseComputed from "discourse-common/utils/decorators";
import I18n from "I18n";
import { action } from "@ember/object";
import { ajax } from "discourse/lib/ajax";
import { popupAjaxError } from "discourse/lib/ajax-error";

export default Component.extend({
  tagName: "",
  loading: false,

  @discourseComputed(
    "chatChannel.chatable_type",
    "currentUser.{needs_dm_retention_reminder,needs_channel_retention_reminder}"
  )
  show() {
    return (
      !this.chatChannel.isDraft &&
      ((this.chatChannel.isDirectMessageChannel &&
        this.currentUser.needs_dm_retention_reminder) ||
        (!this.chatChannel.isDirectMessageChannel &&
          this.currentUser.needs_channel_retention_reminder))
    );
  },

  @discourseComputed("chatChannel.chatable_type")
  text() {
    let days = this.siteSettings.chat_channel_retention_days;
    let translationKey = "chat.retention_reminders.public";

    if (this.chatChannel.isDirectMessageChannel) {
      days = this.siteSettings.chat_dm_retention_days;
      translationKey = "chat.retention_reminders.dm";
    }
    return I18n.t(translationKey, { days });
  },

  @discourseComputed("chatChannel.chatable_type")
  daysCount() {
    return this.chatChannel.isDirectMessageChannel
      ? this.siteSettings.chat_dm_retention_days
      : this.siteSettings.chat_channel_retention_days;
  },
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

  @action
  dismiss() {
    return ajax("/chat/dismiss-retention-reminder", {
      method: "POST",
<<<<<<< HEAD
      data: { chatable_type: this.args.channel.chatableType },
    })
      .then(() => {
        const field = this.args.channel.isDirectMessageChannel
=======
      data: { chatable_type: this.chatChannel.chatable_type },
    })
      .then(() => {
        const field = this.chatChannel.isDirectMessageChannel
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
          ? "needs_dm_retention_reminder"
          : "needs_channel_retention_reminder";
        this.currentUser.set(field, false);
      })
      .catch(popupAjaxError);
<<<<<<< HEAD
  }
}
=======
  },
});
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
