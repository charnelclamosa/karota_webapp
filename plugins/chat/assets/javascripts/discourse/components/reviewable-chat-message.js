import Component from "@glimmer/component";
import { inject as service } from "@ember/service";
import { cached } from "@glimmer/tracking";
<<<<<<< HEAD
import ChatChannel from "discourse/plugins/chat/discourse/models/chat-channel";

export default class ReviewableChatMessage extends Component {
  @service store;
  @service chatChannelsManager;

  @cached
  get chatChannel() {
    return ChatChannel.create(this.args.reviewable.chat_channel);
=======

export default class ReviewableChatMessage extends Component {
  @service store;

  @cached
  get chatChannel() {
    return this.store.createRecord(
      "chat-channel",
      this.args.reviewable.chat_channel
    );
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  }
}
