<<<<<<< HEAD
import Component from "@glimmer/component";
import { htmlSafe } from "@ember/template";

export default class ChatChannelTitle extends Component {
  get users() {
    return this.args.channel.chatable.users;
  }

  get multiDm() {
    return this.users.length > 1;
  }

=======
import Component from "@ember/component";
import { htmlSafe } from "@ember/template";
import { computed } from "@ember/object";
import { gt, reads } from "@ember/object/computed";

export default class ChatChannelTitle extends Component {
  tagName = "";
  channel = null;

  @reads("channel.chatable.users.[]") users;
  @gt("users.length", 1) multiDm;

  @computed("users")
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  get usernames() {
    return this.users.mapBy("username").join(", ");
  }

<<<<<<< HEAD
  get channelColorStyle() {
    return htmlSafe(`color: #${this.args.channel.chatable.color}`);
  }

  get showUserStatus() {
    return !!(this.users.length === 1 && this.users[0].status);
=======
  @computed("channel.chatable.color")
  get channelColorStyle() {
    return htmlSafe(`color: #${this.channel.chatable.color}`);
  }

  @computed(
    "channel.chatable.users.length",
    "channel.chatable.users.@each.status"
  )
  get showUserStatus() {
    return !!(
      this.channel.chatable.users.length === 1 &&
      this.channel.chatable.users[0].status
    );
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  }
}
