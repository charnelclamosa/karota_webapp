<<<<<<< HEAD
import Component from "@glimmer/component";
import { isCollapsible } from "discourse/plugins/chat/discourse/components/chat-message-collapser";

export default class ChatMessageText extends Component {
  get isEdited() {
    return this.args.edited ?? false;
  }

  get isCollapsible() {
    return isCollapsible(this.args.cooked, this.args.uploads);
=======
import Component from "@ember/component";
import { computed } from "@ember/object";
import { isCollapsible } from "discourse/plugins/chat/discourse/components/chat-message-collapser";

export default class ChatMessageText extends Component {
  tagName = "";
  cooked = null;
  uploads = null;
  edited = false;

  @computed("cooked", "uploads.[]")
  get isCollapsible() {
    return isCollapsible(this.cooked, this.uploads);
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  }
}
