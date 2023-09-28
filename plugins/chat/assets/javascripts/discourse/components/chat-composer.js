<<<<<<< HEAD
import Component from "@glimmer/component";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import { tracked } from "@glimmer/tracking";
import { cancel, next } from "@ember/runloop";
import { cloneJSON } from "discourse-common/lib/object";
import { chatComposerButtons } from "discourse/plugins/chat/discourse/lib/chat-composer-buttons";
import TextareaInteractor from "discourse/plugins/chat/discourse/lib/textarea-interactor";
import { getOwner } from "@ember/application";
import userSearch from "discourse/lib/user-search";
import { findRawTemplate } from "discourse-common/lib/raw-templates";
import { emojiSearch, isSkinTonableEmoji } from "pretty-text/emoji";
import { emojiUrlFor } from "discourse/lib/text";
import { SKIP } from "discourse/lib/autocomplete";
import I18n from "I18n";
import { translations } from "pretty-text/emoji/data";
import { setupHashtagAutocomplete } from "discourse/lib/hashtag-autocomplete";
import { isPresent } from "@ember/utils";
import { Promise } from "rsvp";
import ChatMessageInteractor from "discourse/plugins/chat/discourse/lib/chat-message-interactor";
import {
  destroyUserStatuses,
  initUserStatusHtml,
  renderUserStatusHtml,
} from "discourse/lib/user-status-on-autocomplete";
import ChatModalChannelSummary from "discourse/plugins/chat/discourse/components/chat/modal/channel-summary";
import InsertHyperlink from "discourse/components/modal/insert-hyperlink";

export default class ChatComposer extends Component {
  @service capabilities;
  @service site;
  @service siteSettings;
  @service store;
  @service chat;
  @service chatComposerPresenceManager;
  @service chatComposerWarningsTracker;
  @service appEvents;
  @service chatEmojiReactionStore;
  @service chatEmojiPickerManager;
  @service currentUser;
  @service chatApi;
  @service chatDraftsManager;
  @service modal;

  @tracked isFocused = false;
  @tracked inProgressUploadsCount = 0;
  @tracked presenceChannelName;

  get shouldRenderMessageDetails() {
    return (
      this.currentMessage?.editing ||
      (this.context === "channel" && this.currentMessage?.inReplyTo)
    );
  }

  get inlineButtons() {
    return chatComposerButtons(this, "inline", this.context);
  }

  get dropdownButtons() {
    return chatComposerButtons(this, "dropdown", this.context);
  }

  get fileUploadElementId() {
    return this.context + "-file-uploader";
  }

  get canAttachUploads() {
    return (
      this.siteSettings.chat_allow_uploads &&
      isPresent(this.args.uploadDropZone)
    );
  }

  @action
  persistDraft() {}

  @action
  setupAutocomplete(textarea) {
    const $textarea = $(textarea);
    this.#applyUserAutocomplete($textarea);
    this.#applyEmojiAutocomplete($textarea);
    this.#applyCategoryHashtagAutocomplete($textarea);
  }

  @action
  setupTextareaInteractor(textarea) {
    this.composer.textarea = new TextareaInteractor(getOwner(this), textarea);

    if (this.site.desktopView && this.args.autofocus) {
      this.composer.focus({ ensureAtEnd: true, refreshHeight: true });
    }
  }

  @action
  didUpdateMessage() {
    this.cancelPersistDraft();
    this.composer.textarea.value = this.currentMessage.message;
    this.persistDraft();
    this.captureMentions({ skipDebounce: true });
  }

  @action
  didUpdateInReplyTo() {
    this.cancelPersistDraft();
    this.persistDraft();
  }

  @action
  cancelPersistDraft() {
    cancel(this._persistHandler);
  }

  @action
  handleInlineButonAction(buttonAction, event) {
    event.stopPropagation();

    buttonAction();
  }

  get currentMessage() {
    return this.composer.message;
  }

  get hasContent() {
    const minLength = this.siteSettings.chat_minimum_message_length || 1;
    return (
      this.currentMessage?.message?.length >= minLength ||
      (this.canAttachUploads && this.hasUploads)
    );
  }

  get hasUploads() {
    return this.currentMessage?.uploads?.length > 0;
  }

  get sendEnabled() {
    return (
      (this.hasContent || this.currentMessage?.editing) &&
      !this.pane.sending &&
      !this.inProgressUploadsCount > 0
    );
  }

  @action
  setup() {
    this.appEvents.on("chat:modify-selection", this, "modifySelection");
    this.appEvents.on(
      "chat:open-insert-link-modal",
      this,
      "openInsertLinkModal"
    );
  }

  @action
  teardown() {
    this.appEvents.off("chat:modify-selection", this, "modifySelection");
    this.appEvents.off(
      "chat:open-insert-link-modal",
      this,
      "openInsertLinkModal"
    );
    this.pane.sending = false;
  }

  @action
  insertDiscourseLocalDate() {
    // JIT import because local-dates isn't necessarily enabled
    const LocalDatesCreateModal =
      require("discourse/plugins/discourse-local-dates/discourse/components/modal/local-dates-create").default;

    this.modal.show(LocalDatesCreateModal, {
      model: {
        insertDate: (markup) => {
          this.composer.textarea.addText(
            this.composer.textarea.getSelected(),
            markup
          );
          this.composer.focus();
        },
      },
    });
  }

  @action
  uploadClicked() {
    document.querySelector(`#${this.fileUploadElementId}`).click();
  }

  @action
  computeIsFocused(isFocused) {
    next(() => {
      this.isFocused = isFocused;
    });
  }

  @action
  onInput(event) {
    this.currentMessage.draftSaved = false;
    this.currentMessage.message = event.target.value;
    this.composer.textarea.refreshHeight();
    this.reportReplyingPresence();
    this.persistDraft();
    this.captureMentions();
  }

  @action
  onUploadChanged(uploads, { inProgressUploadsCount }) {
    this.currentMessage.draftSaved = false;

    this.inProgressUploadsCount = inProgressUploadsCount || 0;

    if (
      typeof uploads !== "undefined" &&
      inProgressUploadsCount !== "undefined" &&
      inProgressUploadsCount === 0 &&
      this.currentMessage
    ) {
      this.currentMessage.uploads = cloneJSON(uploads);
    }

    this.composer.textarea?.focus();
    this.reportReplyingPresence();
    this.persistDraft();
  }

  @action
  trapMouseDown(event) {
    event?.preventDefault();
  }

  @action
  async onSend(event) {
    if (!this.sendEnabled) {
      return;
    }

    event?.preventDefault();

    if (
      this.currentMessage.editing &&
      !this.hasUploads &&
      this.currentMessage.message.length === 0
    ) {
      this.#deleteEmptyMessage();
      return;
    }

    await this.args.onSendMessage(this.currentMessage);
    this.composer.textarea.refreshHeight();
  }

  reportReplyingPresence() {
    if (!this.args.channel || !this.currentMessage) {
      return;
    }

    this.chatComposerPresenceManager.notifyState(
      this.presenceChannelName,
      !this.currentMessage.editing && this.hasContent
    );
  }

  @action
  modifySelection(event, options = { type: null, context: null }) {
    if (options.context !== this.context) {
      return;
    }

    const sel = this.composer.textarea.getSelected("", { lineVal: true });
    if (options.type === "bold") {
      this.composer.textarea.applySurround(sel, "**", "**", "bold_text");
    } else if (options.type === "italic") {
      this.composer.textarea.applySurround(sel, "_", "_", "italic_text");
    } else if (options.type === "code") {
      this.composer.textarea.applySurround(sel, "`", "`", "code_text");
    }
  }

  @action
  onTextareaFocusIn(textarea) {
    if (!this.capabilities.isIOS) {
      return;
    }

    // hack to prevent the whole viewport to move on focus input
    // we need access to native node
    textarea = this.composer.textarea.textarea;
    textarea.style.transform = "translateY(-99999px)";
    textarea.focus();
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        textarea.style.transform = "";
      });
    });
  }

  @action
  onKeyDown(event) {
    if (
      this.site.mobileView ||
      event.altKey ||
      event.metaKey ||
      this.#isAutocompleteDisplayed()
    ) {
      return;
    }

    if (event.key === "Escape" && !event.shiftKey) {
      return this.handleEscape(event);
    }

    if (event.key === "Enter") {
=======
import { isEmpty } from "@ember/utils";
import Component from "@ember/component";
import showModal from "discourse/lib/show-modal";
import discourseComputed, {
  afterRender,
  bind,
} from "discourse-common/utils/decorators";
import I18n from "I18n";
import TextareaTextManipulation from "discourse/mixins/textarea-text-manipulation";
import userSearch from "discourse/lib/user-search";
import { action } from "@ember/object";
import { cancel, next, schedule, throttle } from "@ember/runloop";
import { cloneJSON } from "discourse-common/lib/object";
import { findRawTemplate } from "discourse-common/lib/raw-templates";
import { emojiSearch, isSkinTonableEmoji } from "pretty-text/emoji";
import { emojiUrlFor } from "discourse/lib/text";
import { inject as service } from "@ember/service";
import { readOnly, reads } from "@ember/object/computed";
import { SKIP } from "discourse/lib/autocomplete";
import { Promise } from "rsvp";
import { translations } from "pretty-text/emoji/data";
import { channelStatusName } from "discourse/plugins/chat/discourse/models/chat-channel";
import { setupHashtagAutocomplete } from "discourse/lib/hashtag-autocomplete";
import discourseDebounce from "discourse-common/lib/debounce";
import {
  chatComposerButtons,
  chatComposerButtonsDependentKeys,
} from "discourse/plugins/chat/discourse/lib/chat-composer-buttons";
import { mentionRegex } from "pretty-text/mentions";

const THROTTLE_MS = 150;
const MENTION_DEBOUNCE_MS = 1000;

export default Component.extend(TextareaTextManipulation, {
  chatChannel: null,
  lastChatChannelId: null,
  chat: service(),
  classNames: ["chat-composer-container"],
  classNameBindings: ["emojiPickerVisible:with-emoji-picker"],
  userSilenced: readOnly("details.user_silenced"),
  chatEmojiReactionStore: service("chat-emoji-reaction-store"),
  chatEmojiPickerManager: service("chat-emoji-picker-manager"),
  chatStateManager: service("chat-state-manager"),
  editingMessage: null,
  onValueChange: null,
  timer: null,
  mentionsTimer: null,
  value: "",
  inProgressUploads: null,
  composerEventPrefix: "chat",
  composerFocusSelector: ".chat-composer-input",
  canAttachUploads: reads("siteSettings.chat_allow_uploads"),
  isNetworkUnreliable: reads("chat.isNetworkUnreliable"),
  typingMention: false,

  @discourseComputed(...chatComposerButtonsDependentKeys())
  inlineButtons() {
    return chatComposerButtons(this, "inline");
  },

  @discourseComputed(...chatComposerButtonsDependentKeys())
  dropdownButtons() {
    return chatComposerButtons(this, "dropdown");
  },

  @discourseComputed("chatEmojiPickerManager.{opened,context}")
  emojiPickerVisible(picker) {
    return picker.opened && picker.context === "chat-composer";
  },

  @discourseComputed("chatStateManager.isFullPageActive")
  fileUploadElementId(fullPage) {
    return fullPage ? "chat-full-page-uploader" : "chat-widget-uploader";
  },

  init() {
    this._super(...arguments);

    this.appEvents.on("chat-composer:reply-to-set", this, "_replyToMsgChanged");
    this.appEvents.on(
      "upload-mixin:chat-composer-uploader:in-progress-uploads",
      this,
      "_inProgressUploadsChanged"
    );

    this.setProperties({
      inProgressUploads: [],
      _uploads: [],
    });
  },

  didInsertElement() {
    this._super(...arguments);

    this._textarea = this.element.querySelector(".chat-composer-input");
    this._$textarea = $(this._textarea);
    this._applyCategoryHashtagAutocomplete(this._$textarea);
    this._applyEmojiAutocomplete(this._$textarea);
    this.appEvents.on("chat:focus-composer", this, "_focusTextArea");
    this.appEvents.on("chat:insert-text", this, "insertText");
    this._focusTextArea();

    this.appEvents.on("chat:modify-selection", this, "_modifySelection");
    this.appEvents.on(
      "chat:open-insert-link-modal",
      this,
      "_openInsertLinkModal"
    );
    document.addEventListener("visibilitychange", this._blurInput);
    document.addEventListener("resume", this._blurInput);
    document.addEventListener("freeze", this._blurInput);

    this.set("ready", true);
  },

  _modifySelection(opts = { type: null }) {
    const sel = this.getSelected("", { lineVal: true });
    if (opts.type === "bold") {
      this.applySurround(sel, "**", "**", "bold_text");
    } else if (opts.type === "italic") {
      this.applySurround(sel, "_", "_", "italic_text");
    } else if (opts.type === "code") {
      this.applySurround(sel, "`", "`", "code_text");
    }
  },

  _openInsertLinkModal() {
    const selected = this.getSelected("", { lineVal: true });
    const linkText = selected?.value;
    showModal("insert-hyperlink").setProperties({
      linkText,
      toolbarEvent: {
        addText: (text) => this.addText(selected, text),
      },
    });
  },

  willDestroyElement() {
    this._super(...arguments);

    this.appEvents.off(
      "chat-composer:reply-to-set",
      this,
      "_replyToMsgChanged"
    );
    this.appEvents.off(
      "upload-mixin:chat-composer-uploader:in-progress-uploads",
      this,
      "_inProgressUploadsChanged"
    );

    cancel(this.timer);
    cancel(this.mentionsTimer);

    this.appEvents.off("chat:focus-composer", this, "_focusTextArea");
    this.appEvents.off("chat:insert-text", this, "insertText");
    this.appEvents.off("chat:modify-selection", this, "_modifySelection");
    this.appEvents.off(
      "chat:open-insert-link-modal",
      this,
      "_openInsertLinkModal"
    );
    document.removeEventListener("visibilitychange", this._blurInput);
    document.removeEventListener("resume", this._blurInput);
    document.removeEventListener("freeze", this._blurInput);
  },

  // It is important that this is keyDown and not keyUp, otherwise
  // we add new lines to chat message on send and on edit, because
  // you cannot prevent default with a keyUp event -- it is like trying
  // to shut the gate after the horse has already bolted!
  keyDown(event) {
    if (this.site.mobileView || event.altKey || event.metaKey) {
      return;
    }

    // keyCode for 'Enter'
    if (event.keyCode === 13) {
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      if (event.shiftKey) {
        // Shift+Enter: insert newline
        return;
      }

      // Ctrl+Enter, plain Enter: send
      if (!event.ctrlKey) {
        // if we are inside a code block just insert newline
<<<<<<< HEAD
        const { pre } = this.composer.textarea.getSelected({ lineVal: true });
        if (this.composer.textarea.isInside(pre, /(^|\n)```/g)) {
=======
        const { pre } = this.getSelected(null, { lineVal: true });
        if (this.isInside(pre, /(^|\n)```/g)) {
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
          return;
        }
      }

<<<<<<< HEAD
      this.onSend();
      event.preventDefault();
=======
      this.sendClicked();
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      return false;
    }

    if (
      event.key === "ArrowUp" &&
<<<<<<< HEAD
      !this.hasContent &&
      !this.currentMessage.editing
    ) {
      if (event.shiftKey && this.lastMessage?.replyable) {
        this.composer.replyTo(this.lastMessage);
      } else {
        const editableMessage = this.lastUserMessage(this.currentUser);
        if (editableMessage?.editable) {
          this.composer.edit(editableMessage);
        }
      }
    }
  }

  @action
  openInsertLinkModal(event, options = { context: null }) {
    if (options.context !== this.context) {
      return;
    }

    const selected = this.composer.textarea.getSelected("", { lineVal: true });
    const linkText = selected?.value;
    this.modal.show(InsertHyperlink, {
      model: {
        linkText,
        toolbarEvent: {
          addText: (text) => this.composer.textarea.addText(selected, text),
        },
      },
    });
  }

  @action
  onSelectEmoji(emoji) {
    const code = `:${emoji}:`;
    this.chatEmojiReactionStore.track(code);
    this.composer.textarea.addText(this.composer.textarea.getSelected(), code);

    if (this.site.desktopView) {
      this.composer.focus();
    } else {
      this.chatEmojiPickerManager.close();
    }
  }

  @action
  captureMentions(opts = { skipDebounce: false }) {
    if (this.hasContent) {
      this.chatComposerWarningsTracker.trackMentions(
        this.currentMessage,
        opts.skipDebounce
      );
    } else {
      this.chatComposerWarningsTracker.reset();
    }
  }

  @action
  showChannelSummaryModal() {
    this.modal.show(ChatModalChannelSummary, {
      model: { channelId: this.args.channel.id },
    });
  }

  #addMentionedUser(userData) {
    const user = this.store.createRecord("user", userData);
    this.currentMessage.mentionedUsers.set(user.id, user);
  }

  #applyUserAutocomplete($textarea) {
    if (!this.siteSettings.enable_mentions) {
      return;
    }

    $textarea.autocomplete({
      template: findRawTemplate("user-selector-autocomplete"),
      key: "@",
      width: "100%",
      treatAsTextarea: true,
      autoSelectFirstSuggestion: true,
      transformComplete: (obj) => {
        if (obj.isUser) {
          this.#addMentionedUser(obj);
        }

        return obj.username || obj.name;
      },
      dataSource: (term) => {
        destroyUserStatuses();
        return userSearch({ term, includeGroups: true }).then((result) => {
          if (result?.users?.length > 0) {
            const presentUserNames =
              this.chat.presenceChannel.users?.mapBy("username");
            result.users.forEach((user) => {
              if (presentUserNames.includes(user.username)) {
                user.cssClasses = "is-online";
              }
            });
            initUserStatusHtml(getOwner(this), result.users);
          }
          return result;
        });
      },
      onRender: (options) => {
        renderUserStatusHtml(options);
      },
      afterComplete: (text, event) => {
        event.preventDefault();
        this.composer.textarea.value = text;
        this.composer.focus();
        this.captureMentions();
      },
      onClose: destroyUserStatuses,
    });
  }

  #applyCategoryHashtagAutocomplete($textarea) {
=======
      this._messageIsEmpty() &&
      !this.editingMessage
    ) {
      event.preventDefault();
      this.onEditLastMessageRequested();
    }

    if (event.keyCode === 27) {
      // keyCode for 'Escape'
      if (this.replyToMsg) {
        this.set("value", "");
        this._replyToMsgChanged(null);
        return false;
      } else if (this.editingMessage) {
        this.set("value", "");
        this.cancelEditing();
        return false;
      } else {
        this._textarea.blur();
      }
    }
  },

  didReceiveAttrs() {
    this._super(...arguments);

    if (
      !this.editingMessage &&
      this.draft &&
      this.chatChannel?.canModifyMessages(this.currentUser)
    ) {
      // uses uploads from draft here...
      this.setProperties({
        value: this.draft.value,
        replyToMsg: this.draft.replyToMsg,
      });

      this._debouncedCaptureMentions();
      this._syncUploads(this.draft.uploads);
      this.setInReplyToMsg(this.draft.replyToMsg);
    }

    if (this.editingMessage && !this.loading) {
      this.setProperties({
        replyToMsg: null,
        value: this.editingMessage.message,
      });

      this._syncUploads(this.editingMessage.uploads);
      this._focusTextArea({ ensureAtEnd: true, resizeTextarea: false });
    }

    this.set("lastChatChannelId", this.chatChannel.id);
    this.resizeTextarea();
  },

  // the chat-composer needs to be able to set the internal list of uploads
  // for chat-composer-uploads to preload in existing uploads for drafts
  // and for when messages are being edited.
  //
  // the opposite is true as well -- when an upload is completed the chat-composer
  // needs its internal state updated so drafts can be saved, which is handled
  // by the uploadsChanged action
  _syncUploads(newUploads = []) {
    const currentUploadIds = this._uploads.mapBy("id");
    const newUploadIds = newUploads.mapBy("id");

    // don't need to load the uploads into chat-composer-uploads if
    // nothing has changed otherwise we would rerender for no reason
    if (
      currentUploadIds.length === newUploadIds.length &&
      newUploadIds.every((newUploadId) =>
        currentUploadIds.includes(newUploadId)
      )
    ) {
      return;
    }

    this.set("_uploads", cloneJSON(newUploads));
    this.appEvents.trigger("chat-composer:load-uploads", this._uploads);
  },

  _inProgressUploadsChanged(inProgressUploads) {
    next(() => {
      if (this.isDestroying || this.isDestroyed) {
        return;
      }

      this.set("inProgressUploads", inProgressUploads);
    });
  },

  _replyToMsgChanged(replyToMsg) {
    this.set("replyToMsg", replyToMsg);
    this.onValueChange?.(this.value, this._uploads, replyToMsg);
  },

  @action
  onTextareaInput(value) {
    this.set("value", value);
    this.resizeTextarea();

    this.typingMention = value.slice(-1) === "@";

    if (this.typingMention && value.slice(-1) === " ") {
      this.typingMention = false;
      this._debouncedCaptureMentions();
    }

    // throttle, not debounce, because we do eventually want to react during the typing
    this.timer = throttle(this, this._handleTextareaInput, THROTTLE_MS);
  },

  @bind
  _handleTextareaInput() {
    this._applyUserAutocomplete();
    this.onValueChange?.(this.value, this._uploads, this.replyToMsg);
  },

  @bind
  _debouncedCaptureMentions() {
    this.mentionsTimer = discourseDebounce(
      this,
      this._captureMentions,
      MENTION_DEBOUNCE_MS
    );
  },

  @bind
  _captureMentions() {
    if (this.siteSettings.enable_mentions) {
      const mentions = this._extractMentions();
      this.onMentionUpdates(mentions);
    }
  },

  _extractMentions() {
    let message = this.value;
    const regex = mentionRegex(this.siteSettings.unicode_usernames);
    const mentions = [];
    let mentionsLeft = true;

    while (mentionsLeft) {
      const matches = message.match(regex);

      if (matches) {
        const mention = matches[1] || matches[2];
        mentions.push(mention);
        message = message.replaceAll(`${mention}`, "");
      } else {
        mentionsLeft = false;
      }
    }

    return mentions;
  },

  @bind
  _blurInput() {
    document.activeElement?.blur();
  },

  @action
  uploadClicked() {
    this.element.querySelector(`#${this.fileUploadElementId}`).click();
  },

  @bind
  didSelectEmoji(emoji) {
    const code = `:${emoji}:`;
    this.chatEmojiReactionStore.track(code);
    this.addText(this.getSelected(), code);
  },

  @action
  insertDiscourseLocalDate() {
    showModal("discourse-local-dates-create-modal").setProperties({
      insertDate: (markup) => {
        this.addText(this.getSelected(), markup);
      },
    });
  },

  // text-area-manipulation mixin override
  addText() {
    this._super(...arguments);

    this.resizeTextarea();
  },

  _applyUserAutocomplete() {
    if (this.siteSettings.enable_mentions) {
      $(this._textarea).autocomplete({
        template: findRawTemplate("user-selector-autocomplete"),
        key: "@",
        width: "100%",
        treatAsTextarea: true,
        autoSelectFirstSuggestion: true,
        transformComplete: (v) => v.username || v.name,
        dataSource: (term) => userSearch({ term, includeGroups: true }),
        afterComplete: (text) => {
          this.set("value", text);
          this._focusTextArea();
          this._debouncedCaptureMentions();
        },
      });
    }
  },

  _applyCategoryHashtagAutocomplete($textarea) {
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    setupHashtagAutocomplete(
      this.site.hashtag_configurations["chat-composer"],
      $textarea,
      this.siteSettings,
<<<<<<< HEAD
      {
        treatAsTextarea: true,
        afterComplete: (text, event) => {
          event.preventDefault();
          this.composer.textarea.value = text;
          this.composer.focus();
        },
      }
    );
  }

  #applyEmojiAutocomplete($textarea) {
=======
      (value) => {
        this.set("value", value);
        return this._focusTextArea();
      }
    );
  },

  _applyEmojiAutocomplete($textarea) {
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    if (!this.siteSettings.enable_emoji) {
      return;
    }

    $textarea.autocomplete({
      template: findRawTemplate("emoji-selector-autocomplete"),
      key: ":",
<<<<<<< HEAD
      afterComplete: (text, event) => {
        event.preventDefault();
        this.composer.textarea.value = text;
        this.composer.focus();
      },
      treatAsTextarea: true,
=======
      afterComplete: (text) => {
        this.set("value", text);
        this._focusTextArea();
      },
      treatAsTextarea: true,

>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      onKeyUp: (text, cp) => {
        const matches =
          /(?:^|[\s.\?,@\/#!%&*;:\[\]{}=\-_()])(:(?!:).?[\w-]*:?(?!:)(?:t\d?)?:?) ?$/gi.exec(
            text.substring(0, cp)
          );

        if (matches && matches[1]) {
          return [matches[1]];
        }
      },
<<<<<<< HEAD
=======

>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      transformComplete: (v) => {
        if (v.code) {
          this.chatEmojiReactionStore.track(v.code);
          return `${v.code}:`;
        } else {
          $textarea.autocomplete({ cancel: true });
<<<<<<< HEAD
          this.chatEmojiPickerManager.open({
            context: this.context,
            initialFilter: v.term,
          });
          return "";
        }
      },
=======
          this.set("emojiPickerIsActive", true);
          return "";
        }
      },

>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      dataSource: (term) => {
        return new Promise((resolve) => {
          const full = `:${term}`;
          term = term.toLowerCase();

          // We need to avoid quick emoji autocomplete cause it can interfere with quick
          // typing, set minimal length to 2
          let minLength = Math.max(
            this.siteSettings.emoji_autocomplete_min_chars,
            2
          );

          if (term.length < minLength) {
            return resolve(SKIP);
          }

          // bypass :-p and other common typed smileys
          if (
            !term.match(
              /[^-\{\}\[\]\(\)\*_\<\>\\\/].*[^-\{\}\[\]\(\)\*_\<\>\\\/]/
            )
          ) {
            return resolve(SKIP);
          }

          if (term === "") {
            if (this.chatEmojiReactionStore.favorites.length) {
              return resolve(this.chatEmojiReactionStore.favorites.slice(0, 5));
            } else {
              return resolve([
                "slight_smile",
                "smile",
                "wink",
                "sunny",
                "blush",
              ]);
            }
          }

          // note this will only work for emojis starting with :
          // eg: :-)
<<<<<<< HEAD
          const emojiTranslation = this.site.custom_emoji_translation || {};
=======
          const emojiTranslation =
            this.get("site.custom_emoji_translation") || {};
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
          const allTranslations = Object.assign(
            {},
            translations,
            emojiTranslation
          );
          if (allTranslations[full]) {
            return resolve([allTranslations[full]]);
          }

<<<<<<< HEAD
          const emojiDenied = this.site.denied_emojis || [];
=======
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
          const match = term.match(/^:?(.*?):t([2-6])?$/);
          if (match) {
            const name = match[1];
            const scale = match[2];

<<<<<<< HEAD
            if (isSkinTonableEmoji(name) && !emojiDenied.includes(name)) {
=======
            if (isSkinTonableEmoji(name)) {
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
              if (scale) {
                return resolve([`${name}:t${scale}`]);
              } else {
                return resolve([2, 3, 4, 5, 6].map((x) => `${name}:t${x}`));
              }
            }
          }

          const options = emojiSearch(term, {
            maxResults: 5,
            diversity: this.chatEmojiReactionStore.diversity,
<<<<<<< HEAD
            exclude: emojiDenied,
=======
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
          });

          return resolve(options);
        })
          .then((list) => {
            if (list === SKIP) {
              return;
            }
            return list.map((code) => ({ code, src: emojiUrlFor(code) }));
          })
          .then((list) => {
            if (list?.length) {
              list.push({ label: I18n.t("composer.more_emoji"), term });
            }
            return list;
          });
      },
    });
<<<<<<< HEAD
  }

  #isAutocompleteDisplayed() {
    return document.querySelector(".autocomplete");
  }

  #deleteEmptyMessage() {
    new ChatMessageInteractor(
      getOwner(this),
      this.currentMessage,
      this.context
    ).delete();
    this.reset(this.args.channel, this.args.thread);
  }
}
=======
  },

  @afterRender
  _focusTextArea(opts = { ensureAtEnd: false, resizeTextarea: true }) {
    if (this.chatChannel.isDraft) {
      return;
    }

    if (!this._textarea) {
      return;
    }

    if (opts.resizeTextarea) {
      this.resizeTextarea();
    }

    if (opts.ensureAtEnd) {
      this._textarea.setSelectionRange(this.value.length, this.value.length);
    }

    if (this.capabilities.isIpadOS || this.site.mobileView) {
      return;
    }

    schedule("afterRender", () => {
      this._textarea?.focus();
    });
  },

  @action
  onEmojiSelected(code) {
    this.emojiSelected(code);
    this.set("emojiPickerIsActive", false);
  },

  @discourseComputed(
    "chatChannel.{id,chatable.users.[]}",
    "canInteractWithChat"
  )
  disableComposer(channel, canInteractWithChat) {
    return (
      (channel.isDraft && isEmpty(channel?.chatable?.users)) ||
      !canInteractWithChat ||
      !channel.canModifyMessages(this.currentUser)
    );
  },

  @discourseComputed("userSilenced", "chatChannel.{chatable.users.[],id}")
  placeholder(userSilenced, chatChannel) {
    if (!chatChannel.canModifyMessages(this.currentUser)) {
      return I18n.t("chat.placeholder_new_message_disallowed", {
        status: channelStatusName(chatChannel.status).toLowerCase(),
      });
    }

    if (chatChannel.isDraft) {
      return I18n.t("chat.placeholder_start_conversation", {
        usernames: chatChannel?.chatable?.users?.length
          ? chatChannel.chatable.users.mapBy("username").join(", ")
          : "...",
      });
    }

    if (userSilenced) {
      return I18n.t("chat.placeholder_silenced");
    } else {
      return this.messageRecipient(chatChannel);
    }
  },

  messageRecipient(chatChannel) {
    if (chatChannel.isDirectMessageChannel) {
      const directMessageRecipients = chatChannel.chatable.users;
      if (
        directMessageRecipients.length === 1 &&
        directMessageRecipients[0].id === this.currentUser.id
      ) {
        return I18n.t("chat.placeholder_self");
      }

      return I18n.t("chat.placeholder_others", {
        messageRecipient: directMessageRecipients
          .map((u) => u.name || `@${u.username}`)
          .join(", "),
      });
    } else {
      return I18n.t("chat.placeholder_others", {
        messageRecipient: `#${chatChannel.title}`,
      });
    }
  },

  @discourseComputed(
    "value",
    "loading",
    "disableComposer",
    "inProgressUploads.[]"
  )
  sendDisabled(value, loading, disableComposer, inProgressUploads) {
    if (loading || disableComposer || inProgressUploads.length > 0) {
      return true;
    }

    return !this._messageIsValid();
  },

  @action
  sendClicked() {
    if (this.site.mobileView) {
      // prevents android to hide the keyboard after sending a message
      // we do a focusTextarea later but it's too late for android
      document.querySelector(this.composerFocusSelector).focus();
    }

    if (this.sendDisabled) {
      return;
    }

    this.editingMessage
      ? this.internalEditMessage()
      : this.internalSendMessage();
  },

  @action
  internalSendMessage() {
    return this.sendMessage(this.value, this._uploads).then(this.reset);
  },

  @action
  internalEditMessage() {
    return this.editMessage(
      this.editingMessage,
      this.value,
      this._uploads
    ).then(this.reset);
  },

  _messageIsValid() {
    const validLength =
      (this.value || "").trim().length >=
      (this.siteSettings.chat_minimum_message_length || 0);

    if (this.canAttachUploads) {
      if (this._messageIsEmpty()) {
        // If message is empty, an an upload must present for sending to be enabled
        return this._uploads.length;
      } else {
        // Message is non-empty. Make sure it's long enough to be valid.
        return validLength;
      }
    }

    // Attachments are disabled so for a message to be valid it must be long enough.
    return validLength;
  },

  _messageIsEmpty() {
    return (this.value || "").trim() === "";
  },

  @action
  reset() {
    if (this.isDestroyed || this.isDestroying) {
      return;
    }

    this.setProperties({
      value: "",
      inReplyMsg: null,
    });
    this.onMentionUpdates([]);
    this._syncUploads([]);
    this._focusTextArea({ ensureAtEnd: true, resizeTextarea: true });
    this.onValueChange?.(this.value, this._uploads, this.replyToMsg);
  },

  @action
  cancelReplyTo() {
    this.set("replyToMsg", null);
    this.setInReplyToMsg(null);
    this.onValueChange?.(this.value, this._uploads, this.replyToMsg);
  },

  @action
  cancelEditing() {
    this.onCancelEditing();
    this._focusTextArea({ ensureAtEnd: true, resizeTextarea: true });
  },

  _cursorIsOnEmptyLine() {
    const selectionStart = this._textarea.selectionStart;
    if (selectionStart === 0) {
      return true;
    } else if (this._textarea.value.charAt(selectionStart - 1) === "\n") {
      return true;
    } else {
      return false;
    }
  },

  @action
  uploadsChanged(uploads) {
    this.set("_uploads", cloneJSON(uploads));
    this.onValueChange?.(this.value, this._uploads, this.replyToMsg);
  },

  @action
  onTextareaFocusIn(target) {
    if (!this.capabilities.isIOS) {
      return;
    }

    // hack to prevent the whole viewport
    // to move on focus input
    target = document.querySelector(".chat-composer-input");
    target.style.transform = "translateY(-99999px)";
    target.focus();
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        target.style.transform = "";
      });
    });
  },

  @action
  resizeTextarea() {
    schedule("afterRender", () => {
      if (!this._textarea) {
        return;
      }

      // this is a quirk which forces us to `auto` first or textarea
      // won't resize
      this._textarea.style.height = "auto";

      // +1 is to workaround a rounding error visible on electron
      // causing scrollbars to show when they shouldn’t
      this._textarea.style.height = this._textarea.scrollHeight + 1 + "px";
    });
  },
});
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
