<<<<<<< HEAD
import Component from "@glimmer/component";
import { htmlSafe } from "@ember/template";
import I18n from "I18n";
import { popupAjaxError } from "discourse/lib/ajax-error";
import getURL from "discourse-common/lib/get-url";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import { isPresent } from "@ember/utils";

export default class ChatChannelArchiveStatus extends Component {
  @service chatApi;
  @service currentUser;

  get shouldRender() {
    return this.currentUser.admin && isPresent(this.args.channel.archive);
  }

  get channelArchiveFailedMessage() {
    const archive = this.args.channel.archive;
    const translationKey = !archive.topicId
      ? "chat.channel_status.archive_failed_no_topic"
      : "chat.channel_status.archive_failed";
    return htmlSafe(
      I18n.t(translationKey, {
        completed: archive.messages,
        total: archive.totalMessages,
        topic_url: this.topicUrl,
      })
    );
  }

  get channelArchiveCompletedMessage() {
    return htmlSafe(
      I18n.t("chat.channel_status.archive_completed", {
        topic_url: this.topicUrl,
      })
    );
  }

  @action
  retryArchive() {
    return this.chatApi
      .createChannelArchive(this.args.channel.id)
      .catch(popupAjaxError);
  }

  get topicUrl() {
    if (!this.args.channel.archive.topicId) {
      return "";
    }
    return getURL(`/t/-/${this.args.channel.archive.topicId}`);
  }
}
=======
import Component from "@ember/component";
import { htmlSafe } from "@ember/template";
import I18n from "I18n";
import { popupAjaxError } from "discourse/lib/ajax-error";
import { ajax } from "discourse/lib/ajax";
import getURL from "discourse-common/lib/get-url";
import { action } from "@ember/object";
import discourseComputed from "discourse-common/utils/decorators";

export default Component.extend({
  channel: null,
  tagName: "",

  @discourseComputed(
    "channel.status",
    "channel.archived_messages",
    "channel.total_messages",
    "channel.archive_failed"
  )
  channelArchiveFailedMessage() {
    return htmlSafe(
      I18n.t("chat.channel_status.archive_failed", {
        completed: this.channel.archived_messages,
        total: this.channel.total_messages,
        topic_url: this._getTopicUrl(),
      })
    );
  },

  @discourseComputed(
    "channel.status",
    "channel.archived_messages",
    "channel.total_messages",
    "channel.archive_completed"
  )
  channelArchiveCompletedMessage() {
    return htmlSafe(
      I18n.t("chat.channel_status.archive_completed", {
        topic_url: this._getTopicUrl(),
      })
    );
  },

  @action
  retryArchive() {
    return ajax({
      url: `/chat/chat_channels/${this.channel.id}/retry_archive.json`,
      type: "PUT",
    })
      .then(() => {
        this.channel.set("archive_failed", false);
      })
      .catch(popupAjaxError);
  },

  didInsertElement() {
    this._super(...arguments);
    if (this.currentUser.admin) {
      this.messageBus.subscribe("/chat/channel-archive-status", (busData) => {
        if (busData.chat_channel_id === this.channel.id) {
          this.channel.setProperties({
            archive_failed: busData.archive_failed,
            archive_completed: busData.archive_completed,
            archived_messages: busData.archived_messages,
            archive_topic_id: busData.archive_topic_id,
            total_messages: busData.total_messages,
          });
        }
      });
    }
  },

  willDestroyElement() {
    this._super(...arguments);
    this.messageBus.unsubscribe("/chat/channel-archive-status");
  },

  _getTopicUrl() {
    return getURL(`/t/-/${this.channel.archive_topic_id}`);
  },
});
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
