import Controller from "@ember/controller";
import { inject as service } from "@ember/service";

export default class ChatController extends Controller {
  @service chat;
<<<<<<< HEAD
  @service chatStateManager;
  @service router;
=======
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

  get shouldUseChatSidebar() {
    if (this.site.mobileView) {
      return false;
    }

    if (this.shouldUseCoreSidebar) {
      return false;
    }

    return true;
  }

  get shouldUseCoreSidebar() {
    return this.siteSettings.navigation_menu === "sidebar";
  }
<<<<<<< HEAD

  get mainOutletModifierClasses() {
    let modifierClasses = [];

    if (this.chatStateManager.isSidePanelExpanded) {
      modifierClasses.push("has-side-panel-expanded");
    }

    if (
      !this.router.currentRouteName.startsWith("chat.channel.info") &&
      !this.router.currentRouteName.startsWith("chat.browse")
    ) {
      modifierClasses.push("chat-view");
    }

    return modifierClasses.join(" ");
  }
=======
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
}
