<<<<<<< HEAD
import Component from "@glimmer/component";
import { action } from "@ember/object";

export default class ChatComposerDropdown extends Component {
  @action
  onButtonClick(button, closeFn) {
    closeFn();
    button.action();
  }
=======
import Component from "@ember/component";

export default class ChatComposerDropdown extends Component {
  tagName = "";
  buttons = null;
  isDisabled = false;
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
}
