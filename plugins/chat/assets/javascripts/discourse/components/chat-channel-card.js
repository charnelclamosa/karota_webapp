<<<<<<< HEAD
import Component from "@glimmer/component";
=======
import Component from "@ember/component";
import { action } from "@ember/object";
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
import { inject as service } from "@ember/service";

export default class ChatChannelCard extends Component {
  @service chat;
<<<<<<< HEAD
=======
  tagName = "";

  @action
  afterMembershipToggle() {
    this.chat.forceRefreshChannels();
  }
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
}
