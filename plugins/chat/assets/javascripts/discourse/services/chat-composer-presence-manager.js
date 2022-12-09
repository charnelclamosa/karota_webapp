import Service, { inject as service } from "@ember/service";
import { cancel, debounce } from "@ember/runloop";
import { isTesting } from "discourse-common/config/environment";

<<<<<<< HEAD
=======
const CHAT_PRESENCE_CHANNEL_PREFIX = "/chat-reply";
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
const KEEP_ALIVE_DURATION_SECONDS = 10;

// This service is loosely based on discourse-presence's ComposerPresenceManager service
// It is a singleton which receives notifications each time the value of the chat composer changes
// This service ensures that a single browser can only be 'replying' to a single chatChannel at
// one time, and automatically 'leaves' the channel if the composer value hasn't changed for 10 seconds
export default class ChatComposerPresenceManager extends Service {
  @service presence;

  willDestroy() {
    this.leave();
  }

<<<<<<< HEAD
  notifyState(channelName, replying) {
=======
  notifyState(chatChannelId, replying) {
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    if (!replying) {
      this.leave();
      return;
    }

<<<<<<< HEAD
    if (this._channelName !== channelName) {
      this._enter(channelName);
      this._channelName = channelName;
=======
    if (this._chatChannelId !== chatChannelId) {
      this._enter(chatChannelId);
      this._chatChannelId = chatChannelId;
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    }

    if (!isTesting()) {
      this._autoLeaveTimer = debounce(
        this,
        this.leave,
        KEEP_ALIVE_DURATION_SECONDS * 1000
      );
    }
  }

  leave() {
    this._presentChannel?.leave();
    this._presentChannel = null;
<<<<<<< HEAD
    this._channelName = null;
=======
    this._chatChannelId = null;
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    if (this._autoLeaveTimer) {
      cancel(this._autoLeaveTimer);
      this._autoLeaveTimer = null;
    }
  }

<<<<<<< HEAD
  _enter(channelName) {
    this.leave();

=======
  _enter(chatChannelId) {
    this.leave();

    let channelName = `${CHAT_PRESENCE_CHANNEL_PREFIX}/${chatChannelId}`;
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    this._presentChannel = this.presence.getChannel(channelName);
    this._presentChannel.enter();
  }
}
