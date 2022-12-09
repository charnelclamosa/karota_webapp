import Service, { inject as service } from "@ember/service";
<<<<<<< HEAD
=======
import discourseDebounce from "discourse-common/lib/debounce";
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
import { withPluginApi } from "discourse/lib/plugin-api";
import { isTesting } from "discourse-common/config/environment";
import {
  alertChannel,
  onNotification,
} from "discourse/lib/desktop-notifications";
<<<<<<< HEAD
import { bind } from "discourse-common/utils/decorators";
=======
import { bind, observes } from "discourse-common/utils/decorators";
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

export default class ChatNotificationManager extends Service {
  @service presence;
  @service chat;
<<<<<<< HEAD
  @service chatStateManager;

=======

  _inChat = false;
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  _subscribedToCore = true;
  _subscribedToChat = false;
  _countChatInDocTitle = true;

  start() {
    if (!this._shouldRun()) {
      return;
    }

    this.set(
      "_chatPresenceChannel",
      this.presence.getChannel(`/chat-user/chat/${this.currentUser.id}`)
    );
    this.set(
      "_corePresenceChannel",
      this.presence.getChannel(`/chat-user/core/${this.currentUser.id}`)
    );
    this._chatPresenceChannel.subscribe();
    this._corePresenceChannel.subscribe();

    withPluginApi("0.12.1", (api) => {
      api.onPageChange(this._pageChanged);
    });
<<<<<<< HEAD

    this._pageChanged();

    this._chatPresenceChannel.on(
      "change",
      this._subscribeToCorrectNotifications
    );
    this._corePresenceChannel.on(
      "change",
      this._subscribeToCorrectNotifications
    );
=======
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  }

  willDestroy() {
    super.willDestroy(...arguments);

    if (!this._shouldRun()) {
      return;
    }

<<<<<<< HEAD
    this._chatPresenceChannel.off(
      "change",
      this._subscribeToCorrectNotifications
    );
    this._chatPresenceChannel.unsubscribe();
    this._chatPresenceChannel.leave();

    this._corePresenceChannel.off(
      "change",
      this._subscribeToCorrectNotifications
    );
=======
    this._chatPresenceChannel.unsubscribe();
    this._chatPresenceChannel.leave();
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    this._corePresenceChannel.unsubscribe();
    this._corePresenceChannel.leave();
  }

  shouldCountChatInDocTitle() {
    return this._countChatInDocTitle;
  }

  @bind
<<<<<<< HEAD
  _pageChanged() {
    if (this.chatStateManager.isActive) {
=======
  _pageChanged(path) {
    this.set("_inChat", path.startsWith("/chat/channel/"));
    if (this._inChat) {
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      this._chatPresenceChannel.enter({ onlyWhileActive: false });
      this._corePresenceChannel.leave();
    } else {
      this._chatPresenceChannel.leave();
      this._corePresenceChannel.enter({ onlyWhileActive: false });
    }
  }

<<<<<<< HEAD
=======
  @observes("_chatPresenceChannel.count", "_corePresenceChannel.count")
  _channelCountsChanged() {
    discourseDebounce(this, this._subscribeToCorrectNotifications, 2000);
  }

>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  _coreAlertChannel() {
    return alertChannel(this.currentUser);
  }

  _chatAlertChannel() {
    return `/chat${alertChannel(this.currentUser)}`;
  }

<<<<<<< HEAD
  @bind
=======
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  _subscribeToCorrectNotifications() {
    const oneTabForEachOpen =
      this._chatPresenceChannel.count > 0 &&
      this._corePresenceChannel.count > 0;
    if (oneTabForEachOpen) {
<<<<<<< HEAD
      this.chatStateManager.isActive
=======
      this._inChat
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
        ? this._subscribeToChat({ only: true })
        : this._subscribeToCore({ only: true });
    } else {
      this._subscribeToBoth();
    }
  }

  _subscribeToBoth() {
    this._subscribeToChat();
    this._subscribeToCore();
  }

  _subscribeToChat(opts = { only: false }) {
    this.set("_countChatInDocTitle", true);

    if (!this._subscribedToChat) {
<<<<<<< HEAD
      this.messageBus.subscribe(this._chatAlertChannel(), this.onMessage);
      this.set("_subscribedToChat", true);
    }

    if (opts.only && this._subscribedToCore) {
      this.messageBus.unsubscribe(this._coreAlertChannel(), this.onMessage);
=======
      this.messageBus.subscribe(this._chatAlertChannel(), (data) =>
        onNotification(data, this.siteSettings, this.currentUser)
      );
    }

    if (opts.only && this._subscribedToCore) {
      this.messageBus.unsubscribe(this._coreAlertChannel());
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      this.set("_subscribedToCore", false);
    }
  }

  _subscribeToCore(opts = { only: false }) {
    if (opts.only) {
      this.set("_countChatInDocTitle", false);
    }
    if (!this._subscribedToCore) {
<<<<<<< HEAD
      this.messageBus.subscribe(this._coreAlertChannel(), this.onMessage);
      this.set("_subscribedToCore", true);
    }

    if (opts.only && this._subscribedToChat) {
      this.messageBus.unsubscribe(this._chatAlertChannel(), this.onMessage);
=======
      this.messageBus.subscribe(this._coreAlertChannel(), (data) =>
        onNotification(data, this.siteSettings, this.currentUser)
      );
    }

    if (this.only && this._subscribedToChat) {
      this.messageBus.unsubscribe(this._chatAlertChannel());
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      this.set("_subscribedToChat", false);
    }
  }

<<<<<<< HEAD
  @bind
  onMessage(data) {
    return onNotification(data, this.siteSettings, this.currentUser);
  }

=======
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  _shouldRun() {
    return this.chat.userCanChat && !isTesting();
  }
}
