import DiscourseRoute from "discourse/routes/discourse";
import I18n from "I18n";
import { defaultHomepage } from "discourse/lib/utilities";
import { inject as service } from "@ember/service";
import { scrollTop } from "discourse/mixins/scroll-top";
import { schedule } from "@ember/runloop";
<<<<<<< HEAD
import { withPluginApi } from "discourse/lib/plugin-api";
import { initSidebarState } from "discourse/plugins/chat/discourse/lib/init-sidebar-state";
import { getUserChatSeparateSidebarMode } from "discourse/plugins/chat/discourse/lib/get-user-chat-separate-sidebar-mode";
=======
import { action } from "@ember/object";
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

export default class ChatRoute extends DiscourseRoute {
  @service chat;
  @service router;
  @service chatStateManager;
<<<<<<< HEAD
  @service currentUser;
=======
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

  titleToken() {
    return I18n.t("chat.title_capitalized");
  }

  beforeModel(transition) {
    if (!this.chat.userCanChat) {
      return this.router.transitionTo(`discovery.${defaultHomepage()}`);
    }

    const INTERCEPTABLE_ROUTES = [
<<<<<<< HEAD
      "chat.channel",
      "chat.channel.thread",
      "chat.channel.thread.index",
      "chat.channel.thread.near-message",
      "chat.channel.threads",
      "chat.channel.index",
      "chat.channel.near-message",
      "chat.channel-legacy",
      "chat",
      "chat.index",
=======
      "chat.channel.index",
      "chat.channel",
      "chat",
      "chat.index",
      "chat.draft-channel",
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    ];

    if (
      transition.from && // don't intercept when directly loading chat
      this.chatStateManager.isDrawerPreferred &&
      INTERCEPTABLE_ROUTES.includes(transition.targetName)
    ) {
      transition.abort();

<<<<<<< HEAD
      let url = transition.intent.url;
      if (transition.targetName.startsWith("chat.channel")) {
        url ??= this.router.urlFor(
=======
      let URL = transition.intent.url;
      if (transition.targetName.startsWith("chat.channel")) {
        URL ??= this.router.urlFor(
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
          transition.targetName,
          ...transition.intent.contexts
        );
      } else {
<<<<<<< HEAD
        url ??= this.router.urlFor(transition.targetName);
      }

      this.appEvents.trigger("chat:open-url", url);
=======
        URL ??= this.router.urlFor(transition.targetName);
      }

      this.appEvents.trigger("chat:open-url", URL);
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      return;
    }

    this.appEvents.trigger("chat:toggle-close");
  }

  activate() {
<<<<<<< HEAD
    withPluginApi("1.8.0", (api) => {
      api.setSidebarPanel("chat");

      const chatSeparateSidebarMode = getUserChatSeparateSidebarMode(
        this.currentUser
      );

      if (chatSeparateSidebarMode.never) {
        api.setCombinedSidebarMode();
        api.hideSidebarSwitchPanelButtons();
      } else {
        api.setSeparatedSidebarMode();
      }
    });

=======
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    this.chatStateManager.storeAppURL();
    this.chat.updatePresence();

    schedule("afterRender", () => {
      document.body.classList.add("has-full-page-chat");
      document.documentElement.classList.add("has-full-page-chat");
<<<<<<< HEAD
=======
    });
  }

  deactivate() {
    schedule("afterRender", () => {
      document.body.classList.remove("has-full-page-chat");
      document.documentElement.classList.remove("has-full-page-chat");
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      scrollTop();
    });
  }

<<<<<<< HEAD
  deactivate(transition) {
    withPluginApi("1.8.0", (api) => {
      initSidebarState(api, this.currentUser);
    });

    if (transition) {
      const url = this.router.urlFor(transition.from.name);
      this.chatStateManager.storeChatURL(url);
    }

    this.chat.activeChannel = null;
    this.chat.updatePresence();

    schedule("afterRender", () => {
      document.body.classList.remove("has-full-page-chat");
      document.documentElement.classList.remove("has-full-page-chat");
    });
=======
  @action
  willTransition(transition) {
    if (!transition?.to?.name?.startsWith("chat.channel")) {
      this.chat.setActiveChannel(null);
    }

    if (!transition?.to?.name?.startsWith("chat.")) {
      this.chatStateManager.storeChatURL();
      this.chat.updatePresence();
    }
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  }
}
