import DiscourseRoute from "discourse/routes/discourse";
import { ajax } from "discourse/lib/ajax";
import { defaultHomepage } from "discourse/lib/utilities";
import { inject as service } from "@ember/service";

export default class ChatMessageRoute extends DiscourseRoute {
  @service chat;
<<<<<<< HEAD
  @service router;
=======
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

  async model(params) {
    return ajax(`/chat/message/${params.messageId}.json`)
      .then((response) => {
<<<<<<< HEAD
        this.router.transitionTo(
          "chat.channel.near-message",
          response.chat_channel_title,
          response.chat_channel_id,
          params.messageId
        );
      })
      .catch(() => this.router.replaceWith("/404"));
=======
        this.transitionTo(
          "chat.channel",
          response.chat_channel_id,
          response.chat_channel_title,
          {
            queryParams: { messageId: params.messageId },
          }
        );
      })
      .catch(() => this.replaceWith("/404"));
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  }

  beforeModel() {
    if (!this.chat.userCanChat) {
<<<<<<< HEAD
      return this.router.transitionTo(`discovery.${defaultHomepage()}`);
=======
      return this.transitionTo(`discovery.${defaultHomepage()}`);
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    }
  }
}
