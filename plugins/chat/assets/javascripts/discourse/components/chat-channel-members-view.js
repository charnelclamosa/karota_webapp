<<<<<<< HEAD
=======
import { isEmpty } from "@ember/utils";
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
import { INPUT_DELAY } from "discourse-common/config/environment";
import Component from "@ember/component";
import { action } from "@ember/object";
import { schedule } from "@ember/runloop";
<<<<<<< HEAD
import discourseDebounce from "discourse-common/lib/debounce";
import { inject as service } from "@ember/service";

export default class ChatChannelMembersView extends Component {
  @service chatApi;

  tagName = "";
  channel = null;
  isSearchFocused = false;
  onlineUsers = null;
  filter = null;
  inputSelector = "channel-members-view__search-input";
  members = null;
=======
import ChatApi from "discourse/plugins/chat/discourse/lib/chat-api";
import discourseDebounce from "discourse-common/lib/debounce";

const LIMIT = 50;

export default class ChatChannelMembersView extends Component {
  tagName = "";
  channel = null;
  members = null;
  isSearchFocused = false;
  isFetchingMembers = false;
  onlineUsers = null;
  offset = 0;
  filter = null;
  inputSelector = "channel-members-view__search-input";
  canLoadMore = true;
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

  didInsertElement() {
    this._super(...arguments);

<<<<<<< HEAD
    if (!this.channel) {
=======
    if (!this.channel || this.channel.isDraft) {
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      return;
    }

    this._focusSearch();
<<<<<<< HEAD
    this.set("members", this.chatApi.listChannelMemberships(this.channel.id));
    this.members.load();
=======
    this.set("members", []);
    this.fetchMembers();
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

    this.appEvents.on("chat:refresh-channel-members", this, "onFilterMembers");
  }

  willDestroyElement() {
    this._super(...arguments);
<<<<<<< HEAD

    this.appEvents.off("chat:refresh-channel-members", this, "onFilterMembers");
  }

  @action
  onFilterMembers(username) {
    this.set("filter", username);
    this.set("members", this.chatApi.listChannelMemberships(this.channel.id));

    discourseDebounce(
      this,
      this.members.load,
      { username: this.filter },
=======
    this.appEvents.off("chat:refresh-channel-members", this, "onFilterMembers");
  }

  get chatProgressBarContainer() {
    return document.querySelector("#chat-progress-bar-container");
  }

  @action
  onFilterMembers(username) {
    this.set("filter", username);
    this.set("offset", 0);
    this.set("canLoadMore", true);

    discourseDebounce(
      this,
      this.fetchMembers,
      this.filter,
      this.offset,
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      INPUT_DELAY
    );
  }

  @action
<<<<<<< HEAD
  load() {
    discourseDebounce(this, this.members.load, INPUT_DELAY);
=======
  loadMore() {
    if (!this.canLoadMore) {
      return;
    }

    discourseDebounce(
      this,
      this.fetchMembers,
      this.filter,
      this.offset,
      INPUT_DELAY
    );
  }

  fetchMembersHandler(id, params = {}) {
    return ChatApi.chatChannelMemberships(id, params);
  }

  fetchMembers(filter = null, offset = 0) {
    this.set("isFetchingMembers", true);

    return this.fetchMembersHandler(this.channel.id, {
      username: filter,
      offset,
    })
      .then((response) => {
        if (this.offset === 0) {
          this.set("members", []);
        }

        if (isEmpty(response)) {
          this.set("canLoadMore", false);
        } else {
          this.set("offset", this.offset + LIMIT);
          this.members.pushObjects(response);
        }
      })
      .finally(() => {
        this.set("isFetchingMembers", false);
      });
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  }

  _focusSearch() {
    if (this.capabilities.isIpadOS || this.site.mobileView) {
      return;
    }

    schedule("afterRender", () => {
      document.getElementsByClassName(this.inputSelector)[0]?.focus();
    });
  }
}
