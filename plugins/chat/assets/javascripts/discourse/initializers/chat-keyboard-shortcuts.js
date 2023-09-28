import { withPluginApi } from "discourse/lib/plugin-api";
<<<<<<< HEAD
import { PLATFORM_KEY_MODIFIER } from "discourse/lib/keyboard-shortcuts";
import ChatModalNewMessage from "discourse/plugins/chat/discourse/components/chat/modal/new-message";
=======
import showModal from "discourse/lib/show-modal";

const APPLE =
  navigator.platform.startsWith("Mac") || navigator.platform === "iPhone";
export const KEY_MODIFIER = APPLE ? "meta" : "ctrl";
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

export default {
  name: "chat-keyboard-shortcuts",

  initialize(container) {
    const chatService = container.lookup("service:chat");
    if (!chatService.userCanChat) {
      return;
    }

    const router = container.lookup("service:router");
    const appEvents = container.lookup("service:app-events");
<<<<<<< HEAD
    const modal = container.lookup("service:modal");
    const chatStateManager = container.lookup("service:chat-state-manager");
    const chatThreadPane = container.lookup("service:chat-thread-pane");
    const chatThreadListPane = container.lookup(
      "service:chat-thread-list-pane"
    );
    const chatChannelsManager = container.lookup(
      "service:chat-channels-manager"
    );
    const openQuickChannelSelector = (e) => {
      e.preventDefault();
      e.stopPropagation();
      modal.show(ChatModalNewMessage);
=======
    const chatStateManager = container.lookup("service:chat-state-manager");
    const openChannelSelector = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (document.getElementById("chat-channel-selector-modal-inner")) {
        appEvents.trigger("chat-channel-selector-modal:close");
      } else {
        showModal("chat-channel-selector-modal");
      }
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    };

    const handleMoveUpShortcut = (e) => {
      e.preventDefault();
      e.stopPropagation();
      chatService.switchChannelUpOrDown("up");
    };

    const handleMoveDownShortcut = (e) => {
      e.preventDefault();
      e.stopPropagation();
      chatService.switchChannelUpOrDown("down");
    };

<<<<<<< HEAD
    const isChatComposer = (el) =>
      el.classList.contains("chat-composer__input");
=======
    const isChatComposer = (el) => el.classList.contains("chat-composer-input");
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    const isInputSelection = (el) => {
      const inputs = ["input", "textarea", "select", "button"];
      const elementTagName = el?.tagName.toLowerCase();

      if (inputs.includes(elementTagName)) {
        return false;
      }
      return true;
    };
    const modifyComposerSelection = (event, type) => {
      if (!isChatComposer(event.target)) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
<<<<<<< HEAD
      appEvents.trigger("chat:modify-selection", event, {
        type,
        context: event.target.dataset.chatComposerContext,
      });
=======
      appEvents.trigger("chat:modify-selection", { type });
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    };

    const openInsertLinkModal = (event) => {
      if (!isChatComposer(event.target)) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
<<<<<<< HEAD
      appEvents.trigger("chat:open-insert-link-modal", event, {
        context: event.target.dataset.chatComposerContext,
      });
=======
      appEvents.trigger("chat:open-insert-link-modal", { event });
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    };

    const openChatDrawer = (event) => {
      if (!isInputSelection(event.target)) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();

      chatStateManager.prefersDrawer();
      router.transitionTo(chatStateManager.lastKnownChatURL || "chat");
    };

<<<<<<< HEAD
    const closeChat = (event) => {
      // TODO (joffrey): removes this when we move from magnific popup
      // there's no proper way to prevent propagation in mfp
      if (event.srcElement?.classList?.value?.includes("mfp-wrap")) {
        return;
      }

      if (chatStateManager.isDrawerActive) {
        event.preventDefault();
        event.stopPropagation();
        appEvents.trigger("chat:toggle-close", event);
        return;
      }

      if (chatThreadPane.isOpened) {
        event.preventDefault();
        event.stopPropagation();
        chatThreadPane.close();
        return;
      }

      if (chatThreadListPane.isOpened) {
        event.preventDefault();
        event.stopPropagation();
        chatThreadListPane.close();
        return;
      }
    };

    const markAllChannelsRead = (event) => {
      event.preventDefault();
      event.stopPropagation();

      if (chatStateManager.isActive) {
        chatChannelsManager.markAllChannelsRead();
      }
    };

    withPluginApi("0.12.1", (api) => {
      api.addKeyboardShortcut(
        `${PLATFORM_KEY_MODIFIER}+k`,
        openQuickChannelSelector,
        {
          global: true,
          help: {
            category: "chat",
            name: "chat.keyboard_shortcuts.open_quick_channel_selector",
            definition: {
              keys1: ["meta", "k"],
              keysDelimiter: "plus",
            },
          },
        }
      );
=======
    const closeChatDrawer = (event) => {
      if (!chatStateManager.isDrawerActive) {
        return;
      }

      if (!isChatComposer(event.target)) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      appEvents.trigger("chat:toggle-close", event);
    };

    withPluginApi("0.12.1", (api) => {
      api.addKeyboardShortcut(`${KEY_MODIFIER}+k`, openChannelSelector, {
        global: true,
        help: {
          category: "chat",
          name: "chat.keyboard_shortcuts.open_quick_channel_selector",
          definition: {
            keys1: ["meta", "k"],
            keysDelimiter: "plus",
          },
        },
      });
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      api.addKeyboardShortcut("alt+up", handleMoveUpShortcut, {
        global: true,
        help: {
          category: "chat",
          name: "chat.keyboard_shortcuts.switch_channel_arrows",
          definition: {
            keys1: ["alt", "&uarr;"],
            keys2: ["alt", "&darr;"],
            keysDelimiter: "plus",
            shortcutsDelimiter: "slash",
          },
        },
      });

      api.addKeyboardShortcut("alt+down", handleMoveDownShortcut, {
        global: true,
      });
      api.addKeyboardShortcut(
<<<<<<< HEAD
        `${PLATFORM_KEY_MODIFIER}+b`,
=======
        `${KEY_MODIFIER}+b`,
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
        (event) => modifyComposerSelection(event, "bold"),
        {
          global: true,
          help: {
            category: "chat",
            name: "chat.keyboard_shortcuts.composer_bold",
            definition: {
              keys1: ["meta", "b"],
              keysDelimiter: "plus",
            },
          },
        }
      );
      api.addKeyboardShortcut(
<<<<<<< HEAD
        `${PLATFORM_KEY_MODIFIER}+i`,
=======
        `${KEY_MODIFIER}+i`,
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
        (event) => modifyComposerSelection(event, "italic"),
        {
          global: true,
          help: {
            category: "chat",
            name: "chat.keyboard_shortcuts.composer_italic",
            definition: {
              keys1: ["meta", "i"],
              keysDelimiter: "plus",
            },
          },
        }
      );
      api.addKeyboardShortcut(
<<<<<<< HEAD
        `${PLATFORM_KEY_MODIFIER}+e`,
=======
        `${KEY_MODIFIER}+e`,
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
        (event) => modifyComposerSelection(event, "code"),
        {
          global: true,
          help: {
            category: "chat",
            name: "chat.keyboard_shortcuts.composer_code",
            definition: {
              keys1: ["meta", "e"],
              keysDelimiter: "plus",
            },
          },
        }
      );
      api.addKeyboardShortcut(
<<<<<<< HEAD
        `${PLATFORM_KEY_MODIFIER}+l`,
=======
        `${KEY_MODIFIER}+l`,
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
        (event) => openInsertLinkModal(event),
        {
          global: true,
          help: {
            category: "chat",
            name: "chat.keyboard_shortcuts.open_insert_link_modal",
            definition: {
              keys1: ["meta", "l"],
              keysDelimiter: "plus",
            },
          },
        }
      );
      api.addKeyboardShortcut(`-`, (event) => openChatDrawer(event), {
        global: true,
        help: {
          category: "chat",
          name: "chat.keyboard_shortcuts.drawer_open",
          definition: {
            keys1: ["-"],
          },
        },
      });
<<<<<<< HEAD
      api.addKeyboardShortcut("esc", (event) => closeChat(event), {
=======
      api.addKeyboardShortcut("esc", (event) => closeChatDrawer(event), {
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
        global: true,
        help: {
          category: "chat",
          name: "chat.keyboard_shortcuts.drawer_close",
          definition: {
            keys1: ["esc"],
          },
        },
      });
<<<<<<< HEAD
      api.addKeyboardShortcut(
        `shift+esc`,
        (event) => markAllChannelsRead(event),
        {
          global: true,
          help: {
            category: "chat",
            name: "chat.keyboard_shortcuts.mark_all_channels_read",
            definition: {
              keys1: ["shift", "esc"],
              keysDelimiter: "plus",
            },
          },
        }
      );
=======
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    });
  },
};
