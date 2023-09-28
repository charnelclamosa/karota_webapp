<<<<<<< HEAD
import Component from "@glimmer/component";
import { inject as service } from "@ember/service";
import { isPresent } from "@ember/utils";
export default class ChatChannelLeaveBtn extends Component {
  @service chat;
  @service site;

  get shouldRender() {
    return !this.site.mobileView && isPresent(this.args.channel);
  }

  get leaveChatTitleKey() {
    if (this.args.channel.isDirectMessageChannel) {
=======
import discourseComputed from "discourse-common/utils/decorators";
import Component from "@ember/component";
import { equal } from "@ember/object/computed";
import { inject as service } from "@ember/service";
import { CHATABLE_TYPES } from "discourse/plugins/chat/discourse/models/chat-channel";

export default Component.extend({
  tagName: "",
  channel: null,
  chat: service(),

  isDirectMessageRow: equal(
    "channel.chatable_type",
    CHATABLE_TYPES.directMessageChannel
  ),

  @discourseComputed("isDirectMessageRow")
  leaveChatTitleKey(isDirectMessageRow) {
    if (isDirectMessageRow) {
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      return "chat.direct_messages.leave";
    } else {
      return "chat.leave";
    }
<<<<<<< HEAD
  }
}
=======
  },
});
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
