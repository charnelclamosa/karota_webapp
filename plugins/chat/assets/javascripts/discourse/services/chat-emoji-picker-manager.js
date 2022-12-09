<<<<<<< HEAD
=======
import { headerOffset } from "discourse/lib/offset-calculator";
import { createPopper } from "@popperjs/core";
import Service from "@ember/service";
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
import { tracked } from "@glimmer/tracking";
import { ajax } from "discourse/lib/ajax";
import { popupAjaxError } from "discourse/lib/ajax-error";
import { bind } from "discourse-common/utils/decorators";
<<<<<<< HEAD
import { later } from "@ember/runloop";
import { makeArray } from "discourse-common/lib/helpers";
import { Promise } from "rsvp";
import { isTesting } from "discourse-common/config/environment";
import { action } from "@ember/object";
import Service, { inject as service } from "@ember/service";
=======
import { later, schedule } from "@ember/runloop";
import { makeArray } from "discourse-common/lib/helpers";
import { Promise } from "rsvp";
import { computed } from "@ember/object";
import { isTesting } from "discourse-common/config/environment";
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

const TRANSITION_TIME = isTesting() ? 0 : 125; // CSS transition time
const DEFAULT_VISIBLE_SECTIONS = ["favorites", "smileys_&_emotion"];
const DEFAULT_LAST_SECTION = "favorites";

export default class ChatEmojiPickerManager extends Service {
<<<<<<< HEAD
  @service appEvents;

  @tracked closing = false;
  @tracked loading = false;
  @tracked picker = null;
=======
  @tracked opened = false;
  @tracked closing = false;
  @tracked loading = false;
  @tracked context = null;
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  @tracked emojis = null;
  @tracked visibleSections = DEFAULT_VISIBLE_SECTIONS;
  @tracked lastVisibleSection = DEFAULT_LAST_SECTION;
  @tracked element = null;
<<<<<<< HEAD

=======
  @tracked callback;

  @computed("emojis.[]", "loading")
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  get sections() {
    return !this.loading && this.emojis ? Object.keys(this.emojis) : [];
  }

  @bind
  closeExisting() {
<<<<<<< HEAD
    this.visibleSections = DEFAULT_VISIBLE_SECTIONS;
    this.lastVisibleSection = DEFAULT_LAST_SECTION;
    this.picker = null;
=======
    this.callback = null;
    this.opened = false;
    this.visibleSections = DEFAULT_VISIBLE_SECTIONS;
    this.lastVisibleSection = DEFAULT_LAST_SECTION;
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  }

  @bind
  close() {
<<<<<<< HEAD
=======
    this.callback = null;
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    this.closing = true;

    later(() => {
      if (this.isDestroyed || this.isDestroying) {
        return;
      }

      this.visibleSections = DEFAULT_VISIBLE_SECTIONS;
      this.lastVisibleSection = DEFAULT_LAST_SECTION;
      this.closing = false;
<<<<<<< HEAD
      this.picker = null;
=======
      this.opened = false;
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    }, TRANSITION_TIME);
  }

  addVisibleSections(sections) {
    this.visibleSections = makeArray(this.visibleSections)
      .concat(makeArray(sections))
      .uniq();
  }

<<<<<<< HEAD
  open(picker) {
    this.loadEmojis();

    if (this.picker) {
      if (this.picker.trigger === picker.trigger) {
        this.closeExisting();
      } else {
        this.closeExisting();
        this.picker = picker;
      }
    } else {
      this.picker = picker;
    }
  }

  @action
  loadEmojis() {
=======
  didSelectEmoji(emoji) {
    this?.callback(emoji);
    this.callback = null;
    this.close();
  }

  startFromMessageReactionList(message, isDesktop, callback) {
    const trigger = document.querySelector(
      `.chat-message-container[data-id="${message.id}"] .chat-message-react-btn`
    );
    this.startFromMessage(callback, isDesktop, trigger);
  }

  startFromMessageActions(message, isDesktop, callback) {
    const trigger = document.querySelector(
      `.chat-message-actions-container[data-id="${message.id}"] .chat-message-actions`
    );
    this.startFromMessage(callback, isDesktop, trigger);
  }

  startFromMessage(callback, isDesktop, trigger) {
    this.context = "chat-message";
    this.element = document.querySelector(".chat-message-emoji-picker-anchor");
    this.open(callback);
    this._popper?.destroy();

    if (isDesktop) {
      schedule("afterRender", () => {
        this._popper = createPopper(trigger, this.element, {
          placement: "top",
          modifiers: [
            {
              name: "eventListeners",
              options: {
                scroll: false,
                resize: false,
              },
            },
            {
              name: "flip",
              options: {
                padding: { top: headerOffset() },
              },
            },
          ],
        });
      });
    }
  }

  startFromComposer(callback) {
    this.context = "chat-composer";
    this.element = document.querySelector(".chat-composer-emoji-picker-anchor");
    this.open(callback);
  }

  open(callback) {
    if (this.opened) {
      this.closeExisting();
    }

    this._loadEmojisData();

    this.callback = callback;
    this.opened = true;
  }

  _loadEmojisData() {
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    if (this.emojis) {
      return Promise.resolve();
    }

    this.loading = true;

    return ajax("/chat/emojis.json")
      .then((emojis) => {
        this.emojis = emojis;
      })
<<<<<<< HEAD
=======

>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      .catch(popupAjaxError)
      .finally(() => {
        this.loading = false;
      });
  }
}
