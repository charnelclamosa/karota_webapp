<<<<<<< HEAD
import { isPresent } from "@ember/utils";
import Component from "@glimmer/component";
import { inject as service } from "@ember/service";
import I18n from "I18n";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";

export default class ChatReplyingIndicator extends Component {
  @service currentUser;
  @service presence;

  @tracked presenceChannel = null;

  @action
  async updateSubscription() {
    await this.unsubscribe();
    await this.subscribe();
  }

  @action
  async subscribe() {
    this.presenceChannel = this.presence.getChannel(
      this.args.presenceChannelName
    );
    await this.presenceChannel.subscribe();
  }

  @action
  async unsubscribe() {
    if (this.presenceChannel?.subscribed) {
      await this.presenceChannel.unsubscribe();
    }
  }

  get users() {
    return (
      this.presenceChannel
        ?.get("users")
        ?.filter((u) => u.id !== this.currentUser.id) || []
    );
  }

  get usernames() {
    return this.users.mapBy("username");
  }

  get text() {
    if (this.usernames.length === 1) {
      return I18n.t("chat.replying_indicator.single_user", {
        username: this.usernames[0],
      });
    }

    if (this.usernames.length < 4) {
      const lastUsername = this.usernames[this.usernames.length - 1];
      const commaSeparatedUsernames = this.usernames
        .slice(0, this.usernames.length - 1)
        .join(I18n.t("word_connector.comma"));
=======
import { isBlank, isPresent } from "@ember/utils";
import Component from "@ember/component";
import { inject as service } from "@ember/service";
import discourseComputed from "discourse-common/utils/decorators";
import I18n from "I18n";
import { fmt } from "discourse/lib/computed";
import { next } from "@ember/runloop";

export default Component.extend({
  tagName: "",
  presence: service(),
  presenceChannel: null,
  chatChannel: null,

  @discourseComputed("presenceChannel.users.[]")
  usernames(users) {
    return users
      ?.filter((u) => u.id !== this.currentUser.id)
      ?.mapBy("username");
  },

  @discourseComputed("usernames.[]")
  text(usernames) {
    if (isBlank(usernames)) {
      return;
    }

    if (usernames.length === 1) {
      return I18n.t("chat.replying_indicator.single_user", {
        username: usernames[0],
      });
    }

    if (usernames.length < 4) {
      const lastUsername = usernames.pop();
      const commaSeparatedUsernames = usernames.join(", ");
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      return I18n.t("chat.replying_indicator.multiple_users", {
        commaSeparatedUsernames,
        lastUsername,
      });
    }

<<<<<<< HEAD
    const commaSeparatedUsernames = this.usernames
      .slice(0, 2)
      .join(I18n.t("word_connector.comma"));
    return I18n.t("chat.replying_indicator.many_users", {
      commaSeparatedUsernames,
      count: this.usernames.length - 2,
    });
  }

  get shouldRender() {
    return isPresent(this.usernames);
  }
}
=======
    const commaSeparatedUsernames = usernames.slice(0, 2).join(", ");
    return I18n.t("chat.replying_indicator.many_users", {
      commaSeparatedUsernames,
      count: usernames.length - 2,
    });
  },

  @discourseComputed("usernames.[]")
  shouldDisplay(usernames) {
    return isPresent(usernames);
  },

  channelName: fmt("chatChannel.id", "/chat-reply/%@"),

  didReceiveAttrs() {
    this._super(...arguments);

    if (!this.chatChannel || this.chatChannel.isDraft) {
      this.presenceChannel?.unsubscribe();
      return;
    }

    if (this.presenceChannel?.name !== this.channelName) {
      this.presenceChannel?.unsubscribe();

      next(() => {
        if (this.isDestroyed || this.isDestroying) {
          return;
        }

        const presenceChannel = this.presence.getChannel(this.channelName);
        this.set("presenceChannel", presenceChannel);
        presenceChannel.subscribe();
      });
    }
  },

  willDestroyElement() {
    this._super(...arguments);

    this.presenceChannel?.unsubscribe();
  },
});
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
