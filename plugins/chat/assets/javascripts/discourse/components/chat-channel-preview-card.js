<<<<<<< HEAD
import Component from "@glimmer/component";
import { isEmpty } from "@ember/utils";
=======
import Component from "@ember/component";
import { isEmpty } from "@ember/utils";
import { action, computed } from "@ember/object";
import { readOnly } from "@ember/object/computed";
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
import { inject as service } from "@ember/service";

export default class ChatChannelPreviewCard extends Component {
  @service chat;
<<<<<<< HEAD

  get showJoinButton() {
    return this.args.channel?.isOpen && this.args.channel?.canJoin;
  }

  get hasDescription() {
    return !isEmpty(this.args.channel?.description);
=======
  tagName = "";

  channel = null;

  @readOnly("channel.isOpen") showJoinButton;

  @computed("channel.description")
  get hasDescription() {
    return !isEmpty(this.channel.description);
  }

  @action
  afterMembershipToggle() {
    this.chat.forceRefreshChannels().then(() => {
      this.chat.openChannel(this.channel);
    });
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  }
}
