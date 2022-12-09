import Component from "@ember/component";
<<<<<<< HEAD
=======
import { action } from "@ember/object";
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
import { inject as service } from "@ember/service";

export default class ChatChannelAboutView extends Component {
  @service chat;
  tagName = "";
  channel = null;
<<<<<<< HEAD
  onEditChatChannelName = null;
  onEditChatChannelDescription = null;
  isLoading = false;
=======
  onEditChatChannelTitle = null;
  onEditChatChannelDescription = null;
  isLoading = false;

  @action
  afterMembershipToggle() {
    this.chat.forceRefreshChannels().then(() => {
      this.chat.openChannel(this.channel);
    });
  }
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
}
