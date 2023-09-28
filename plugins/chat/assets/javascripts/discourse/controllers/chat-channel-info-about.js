import Controller from "@ember/controller";
import { action } from "@ember/object";
import ModalFunctionality from "discourse/mixins/modal-functionality";
<<<<<<< HEAD
import { inject as service } from "@ember/service";
import ChatModalEditChannelDescription from "discourse/plugins/chat/discourse/components/chat/modal/edit-channel-description";
import ChatModalEditChannelName from "discourse/plugins/chat/discourse/components/chat/modal/edit-channel-name";
=======
import showModal from "discourse/lib/show-modal";
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

export default class ChatChannelInfoAboutController extends Controller.extend(
  ModalFunctionality
) {
<<<<<<< HEAD
  @service modal;

  @action
  onEditChatChannelName() {
    return this.modal.show(ChatModalEditChannelName, {
      model: this.model,
    });
=======
  @action
  onEditChatChannelTitle() {
    showModal("chat-channel-edit-title", { model: this.model?.chatChannel });
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  }

  @action
  onEditChatChannelDescription() {
<<<<<<< HEAD
    return this.modal.show(ChatModalEditChannelDescription, {
      model: this.model,
=======
    showModal("chat-channel-edit-description", {
      model: this.model?.chatChannel,
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    });
  }
}
