import Controller from "@ember/controller";
<<<<<<< HEAD
=======
import { action } from "@ember/object";
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
import { inject as service } from "@ember/service";

export default class ChatDraftChannelController extends Controller {
  @service chat;
<<<<<<< HEAD
=======

  @action
  onSwitchChannel(channel) {
    return this.chat.openChannel(channel);
  }
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
}
