import Controller from "@ember/controller";
<<<<<<< HEAD
import { inject as service } from "@ember/service";
import { tracked } from "@glimmer/tracking";
=======
import { action } from "@ember/object";
import { inject as service } from "@ember/service";
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

export default class ChatChannelController extends Controller {
  @service chat;

<<<<<<< HEAD
  @tracked targetMessageId = null;

  // Backwards-compatibility
  queryParams = ["messageId"];
=======
  queryParams = ["messageId"];

  @action
  switchChannel(channel) {
    this.chat.openChannel(channel);
  }
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
}
