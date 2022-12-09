<<<<<<< HEAD
import I18n from "I18n";
import Component from "@glimmer/component";
import {
  CHANNEL_STATUSES,
  channelStatusIcon,
} from "discourse/plugins/chat/discourse/models/chat-channel";

export default class ChatChannelStatus extends Component {
  LONG_FORMAT = "long";
  SHORT_FORMAT = "short";
  VALID_FORMATS = [this.SHORT_FORMAT, this.LONG_FORMAT];

  get format() {
    return this.VALID_FORMATS.includes(this.args.format)
      ? this.args.format
      : this.LONG_FORMAT;
  }

  get shouldRender() {
    return (
      this.channelStatusIcon &&
      this.args.channel.status !== CHANNEL_STATUSES.open
    );
  }

  get channelStatusMessage() {
    if (this.format === this.LONG_FORMAT) {
      return this.#longStatusMessage(this.args.channel.status);
    } else {
      return this.#shortStatusMessage(this.args.channel.status);
    }
  }

  get channelStatusIcon() {
    return channelStatusIcon(this.args.channel.status);
  }

  #shortStatusMessage(status) {
    switch (status) {
      case CHANNEL_STATUSES.archived:
        return I18n.t("chat.channel_status.archived");
      case CHANNEL_STATUSES.closed:
        return I18n.t("chat.channel_status.closed");
      case CHANNEL_STATUSES.open:
        return I18n.t("chat.channel_status.open");
      case CHANNEL_STATUSES.readOnly:
        return I18n.t("chat.channel_status.read_only");
    }
  }

  #longStatusMessage(status) {
    switch (status) {
      case CHANNEL_STATUSES.archived:
        return I18n.t("chat.channel_status.archived_header");
      case CHANNEL_STATUSES.closed:
        return I18n.t("chat.channel_status.closed_header");
      case CHANNEL_STATUSES.open:
        return I18n.t("chat.channel_status.open_header");
      case CHANNEL_STATUSES.readOnly:
        return I18n.t("chat.channel_status.read_only_header");
    }
  }
}
=======
import discourseComputed from "discourse-common/utils/decorators";
import I18n from "I18n";
import Component from "@ember/component";
import {
  CHANNEL_STATUSES,
  channelStatusIcon,
  channelStatusName,
} from "discourse/plugins/chat/discourse/models/chat-channel";

export default Component.extend({
  tagName: "",
  channel: null,
  format: null,

  init() {
    this._super(...arguments);
    if (!["short", "long"].includes(this.format)) {
      this.set("format", "long");
    }
  },

  @discourseComputed("channel.status")
  channelStatusMessage(channelStatus) {
    if (channelStatus === CHANNEL_STATUSES.open) {
      return null;
    }

    if (this.format === "long") {
      return this._longStatusMessage(channelStatus);
    } else {
      return this._shortStatusMessage(channelStatus);
    }
  },

  @discourseComputed("channel.status")
  channelStatusIcon(channelStatus) {
    return channelStatusIcon(channelStatus);
  },

  _shortStatusMessage(channelStatus) {
    return channelStatusName(channelStatus);
  },

  _longStatusMessage(channelStatus) {
    switch (channelStatus) {
      case CHANNEL_STATUSES.closed:
        return I18n.t("chat.channel_status.closed_header");
        break;
      case CHANNEL_STATUSES.readOnly:
        return I18n.t("chat.channel_status.read_only_header");
        break;
      case CHANNEL_STATUSES.archived:
        return I18n.t("chat.channel_status.archived_header");
        break;
    }
  },
});
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
