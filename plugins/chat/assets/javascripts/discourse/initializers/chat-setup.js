import { withPluginApi } from "discourse/lib/plugin-api";
import I18n from "I18n";
import { bind } from "discourse-common/utils/decorators";
<<<<<<< HEAD
import { getOwnerWithFallback } from "discourse-common/lib/get-owner";
import { MENTION_KEYWORDS } from "discourse/plugins/chat/discourse/components/chat-message";
import { clearChatComposerButtons } from "discourse/plugins/chat/discourse/lib/chat-composer-buttons";
import ChannelHashtagType from "discourse/plugins/chat/discourse/lib/hashtag-types/channel";
import { replaceIcon } from "discourse-common/lib/icon-library";
import chatStyleguide from "../components/styleguide/organisms/chat";
=======
import { getOwner } from "discourse-common/lib/get-owner";
import { MENTION_KEYWORDS } from "discourse/plugins/chat/discourse/components/chat-message";
import { clearChatComposerButtons } from "discourse/plugins/chat/discourse/lib/chat-composer-buttons";
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

let _lastForcedRefreshAt;
const MIN_REFRESH_DURATION_MS = 180000; // 3 minutes

<<<<<<< HEAD
replaceIcon("d-chat", "comment");

export default {
  name: "chat-setup",
  before: "hashtag-css-generator",

  initialize(container) {
    this.router = container.lookup("service:router");
    this.chatService = container.lookup("service:chat");
    this.chatHistory = container.lookup("service:chat-history");
    this.site = container.lookup("service:site");
    this.siteSettings = container.lookup("service:site-settings");
    this.currentUser = container.lookup("service:current-user");
    this.appEvents = container.lookup("service:app-events");
    this.appEvents.on("discourse:focus-changed", this, "_handleFocusChanged");
=======
export default {
  name: "chat-setup",
  initialize(container) {
    this.chatService = container.lookup("service:chat");
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

    if (!this.chatService.userCanChat) {
      return;
    }

<<<<<<< HEAD
    withPluginApi("0.12.1", (api) => {
      api.onPageChange((path) => {
        const route = this.router.recognize(path);
        if (route.name.startsWith("chat.")) {
          this.chatHistory.visit(route);
        }
      });

      api.registerHashtagType("channel", new ChannelHashtagType(container));

=======
    this.siteSettings = container.lookup("service:site-settings");
    this.appEvents = container.lookup("service:appEvents");
    this.appEvents.on("discourse:focus-changed", this, "_handleFocusChanged");

    withPluginApi("0.12.1", (api) => {
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      api.registerChatComposerButton({
        id: "chat-upload-btn",
        icon: "far-image",
        label: "chat.upload",
        position: "dropdown",
        action: "uploadClicked",
        dependentKeys: ["canAttachUploads"],
        displayed() {
          return this.canAttachUploads;
        },
      });

      if (this.siteSettings.discourse_local_dates_enabled) {
        api.registerChatComposerButton({
          label: "discourse_local_dates.title",
          id: "local-dates",
          class: "chat-local-dates-btn",
          icon: "calendar-alt",
          position: "dropdown",
          action() {
            this.insertDiscourseLocalDate();
          },
        });
      }

      api.registerChatComposerButton({
        label: "chat.emoji",
        id: "emoji",
        class: "chat-emoji-btn",
<<<<<<< HEAD
        icon: "far-smile",
        position: this.site.desktopView ? "inline" : "dropdown",
        context: "channel",
        action() {
          const chatEmojiPickerManager = container.lookup(
            "service:chat-emoji-picker-manager"
          );
          chatEmojiPickerManager.open({ context: "channel" });
        },
      });

      api.registerChatComposerButton({
        label: "chat.emoji",
        id: "channel-emoji",
        class: "chat-emoji-btn",
        icon: "discourse-emojis",
        position: "dropdown",
        context: "thread",
=======
        icon: "discourse-emojis",
        position: "dropdown",
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
        action() {
          const chatEmojiPickerManager = container.lookup(
            "service:chat-emoji-picker-manager"
          );
<<<<<<< HEAD
          chatEmojiPickerManager.open({ context: "thread" });
        },
      });

      const summarizationAllowedGroups =
        this.siteSettings.custom_summarization_allowed_groups
          .split("|")
          .map((id) => parseInt(id, 10));

      const canSummarize =
        this.siteSettings.summarization_strategy &&
        this.currentUser &&
        this.currentUser.groups.some((g) =>
          summarizationAllowedGroups.includes(g.id)
        );

      if (canSummarize) {
        api.registerChatComposerButton({
          translatedLabel: "chat.summarization.title",
          id: "channel-summary",
          icon: "magic",
          position: "dropdown",
          action: "showChannelSummaryModal",
        });
      }

      // we want to decorate the chat quote dates regardless
      // of whether the current user has chat enabled
      api.decorateCookedElement((elem) => {
        const currentUser = getOwnerWithFallback(this).lookup(
          "service:current-user"
        );
        const currentUserTimezone = currentUser?.user_option?.timezone;
        const chatTranscriptElements =
          elem.querySelectorAll(".chat-transcript");

        chatTranscriptElements.forEach((el) => {
          const dateTimeRaw = el.dataset["datetime"];
          const dateTimeEl = el.querySelector(
            ".chat-transcript-datetime a, .chat-transcript-datetime span"
          );

          if (currentUserTimezone) {
            dateTimeEl.innerText = moment
              .tz(dateTimeRaw, currentUserTimezone)
              .format(I18n.t("dates.long_no_year"));
          } else {
            dateTimeEl.innerText = moment(dateTimeRaw).format(
              I18n.t("dates.long_no_year")
            );
          }

          dateTimeEl.dataset.dateFormatted = true;
        });
      });
=======
          chatEmojiPickerManager.startFromComposer(this.didSelectEmoji);
        },
      });

      // we want to decorate the chat quote dates regardless
      // of whether the current user has chat enabled
      api.decorateCookedElement(
        (elem) => {
          const currentUser = getOwner(this).lookup("service:current-user");
          const currentUserTimezone = currentUser?.user_option?.timezone;
          const chatTranscriptElements =
            elem.querySelectorAll(".chat-transcript");

          chatTranscriptElements.forEach((el) => {
            const dateTimeRaw = el.dataset["datetime"];
            const dateTimeEl = el.querySelector(
              ".chat-transcript-datetime a, .chat-transcript-datetime span"
            );

            if (currentUserTimezone) {
              dateTimeEl.innerText = moment
                .tz(dateTimeRaw, currentUserTimezone)
                .format(I18n.t("dates.long_no_year"));
            } else {
              dateTimeEl.innerText = moment(dateTimeRaw).format(
                I18n.t("dates.long_no_year")
              );
            }
          });
        },
        { id: "chat-transcript-datetime" }
      );
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

      if (!this.chatService.userCanChat) {
        return;
      }

      document.body.classList.add("chat-enabled");

      const currentUser = api.getCurrentUser();
<<<<<<< HEAD

      // NOTE: chat_channels is more than a simple array, it also contains
      // tracking and membership data, see Chat::StructuredChannelSerializer
      if (currentUser?.chat_channels) {
        this.chatService.setupWithPreloadedChannels(currentUser.chat_channels);
=======
      if (currentUser?.chat_channels) {
        this.chatService.setupWithPreloadedChannels(currentUser.chat_channels);
      } else {
        this.chatService.setupWithoutPreloadedChannels();
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      }

      const chatNotificationManager = container.lookup(
        "service:chat-notification-manager"
      );
      chatNotificationManager.start();

      if (!this._registeredDocumentTitleCountCallback) {
        api.addDocumentTitleCounter(this.documentTitleCountCallback);
        this._registeredDocumentTitleCountCallback = true;
      }

      api.addCardClickListenerSelector(".chat-drawer-outlet");

<<<<<<< HEAD
      api.addToHeaderIcons("chat-header-icon");

      api.addStyleguideSection?.({
        component: chatStyleguide,
        category: "organisms",
        id: "chat",
      });

      api.addChatDrawerStateCallback(({ isDrawerActive }) => {
        if (isDrawerActive) {
          document.body.classList.add("chat-drawer-active");
        } else {
          document.body.classList.remove("chat-drawer-active");
        }
      });
=======
      api.dispatchWidgetAppEvent(
        "site-header",
        "header-chat-link",
        "chat:rerender-header"
      );

      api.dispatchWidgetAppEvent(
        "sidebar-header",
        "header-chat-link",
        "chat:rerender-header"
      );

      api.addToHeaderIcons("header-chat-link");
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

      api.decorateChatMessage(function (chatMessage, chatChannel) {
        if (!this.currentUser) {
          return;
        }

        const highlightable = [`@${this.currentUser.username}`];
<<<<<<< HEAD
        if (chatChannel.allowChannelWideMentions) {
=======
        if (chatChannel.allow_channel_wide_mentions) {
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
          highlightable.push(...MENTION_KEYWORDS.map((k) => `@${k}`));
        }

        chatMessage.querySelectorAll(".mention").forEach((node) => {
          const mention = node.textContent.trim();
          if (highlightable.includes(mention)) {
            node.classList.add("highlighted", "valid-mention");
          }
        });
      });
    });
  },

  @bind
  documentTitleCountCallback() {
    return this.chatService.getDocumentTitleCount();
  },

  teardown() {
<<<<<<< HEAD
    this.appEvents.off("discourse:focus-changed", this, "_handleFocusChanged");

=======
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    if (!this.chatService.userCanChat) {
      return;
    }

<<<<<<< HEAD
=======
    this.appEvents.off("discourse:focus-changed", this, "_handleFocusChanged");
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    _lastForcedRefreshAt = null;
    clearChatComposerButtons();
  },

  @bind
  _handleFocusChanged(hasFocus) {
<<<<<<< HEAD
    if (!this.chatService.userCanChat) {
      return;
    }

=======
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    if (!hasFocus) {
      _lastForcedRefreshAt = Date.now();
      return;
    }

    _lastForcedRefreshAt = _lastForcedRefreshAt || Date.now();

    const duration = Date.now() - _lastForcedRefreshAt;
    if (duration <= MIN_REFRESH_DURATION_MS) {
      return;
    }

    _lastForcedRefreshAt = Date.now();
<<<<<<< HEAD
=======
    this.chatService.refreshTrackingState();
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  },
};
