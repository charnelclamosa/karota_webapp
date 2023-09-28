<<<<<<< HEAD
import Component from "@glimmer/component";
import I18n from "I18n";
import { inject as service } from "@ember/service";
import { popupAjaxError } from "discourse/lib/ajax-error";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";
export default class ToggleChannelMembershipButton extends Component {
  @service chat;
  @tracked isLoading = false;
  onToggle = null;
  options = {};

  constructor() {
    super(...arguments);

    this.options = {
      labelType: "normal",
      joinTitle: I18n.t("chat.channel_settings.join_channel"),
      joinIcon: "",
      joinClass: "",
      leaveTitle: I18n.t("chat.channel_settings.leave_channel"),
      leaveIcon: "",
      leaveClass: "",
      ...this.args.options,
    };
  }

=======
import Component from "@ember/component";
import I18n from "I18n";
import { inject as service } from "@ember/service";
import { popupAjaxError } from "discourse/lib/ajax-error";
import { action, computed } from "@ember/object";

export default class ToggleChannelMembershipButton extends Component {
  @service chat;

  tagName = "";
  channel = null;
  onToggle = null;
  options = null;
  isLoading = false;

  init() {
    super.init(...arguments);

    this.set(
      "options",
      Object.assign(
        {
          labelType: "normal",
          joinTitle: I18n.t("chat.channel_settings.join_channel"),
          joinIcon: "",
          joinClass: "",
          leaveTitle: I18n.t("chat.channel_settings.leave_channel"),
          leaveIcon: "",
          leaveClass: "",
        },
        this.options || {}
      )
    );
  }

  @computed("channel.current_user_membership.following")
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  get label() {
    if (this.options.labelType === "none") {
      return "";
    }

    if (this.options.labelType === "short") {
<<<<<<< HEAD
      if (this.args.channel.currentUserMembership.following) {
=======
      if (this.channel.isFollowing) {
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
        return I18n.t("chat.channel_settings.leave");
      } else {
        return I18n.t("chat.channel_settings.join");
      }
    }

<<<<<<< HEAD
    if (this.args.channel.currentUserMembership.following) {
=======
    if (this.channel.isFollowing) {
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      return I18n.t("chat.channel_settings.leave_channel");
    } else {
      return I18n.t("chat.channel_settings.join_channel");
    }
  }

  @action
  onJoinChannel() {
<<<<<<< HEAD
    this.isLoading = true;

    return this.chat
      .followChannel(this.args.channel)
=======
    this.set("isLoading", true);

    return this.chat
      .followChannel(this.channel)
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      .then(() => {
        this.onToggle?.();
      })
      .catch(popupAjaxError)
      .finally(() => {
        if (this.isDestroying || this.isDestroyed) {
          return;
        }

<<<<<<< HEAD
        this.isLoading = false;
=======
        this.set("isLoading", false);
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      });
  }

  @action
  onLeaveChannel() {
<<<<<<< HEAD
    this.isLoading = true;

    return this.chat
      .unfollowChannel(this.args.channel)
=======
    this.set("isLoading", true);

    return this.chat
      .unfollowChannel(this.channel)
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      .then(() => {
        this.onToggle?.();
      })
      .catch(popupAjaxError)
      .finally(() => {
        if (this.isDestroying || this.isDestroyed) {
          return;
        }

<<<<<<< HEAD
        this.isLoading = false;
=======
        this.set("isLoading", false);
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      });
  }
}
