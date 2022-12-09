import Component from "@ember/component";
<<<<<<< HEAD
import { bind, observes } from "discourse-common/utils/decorators";
import { action } from "@ember/object";
import { cancel, throttle } from "@ember/runloop";
import { inject as service } from "@ember/service";
import { htmlSafe } from "@ember/template";
import { escapeExpression } from "discourse/lib/utilities";
import DiscourseURL from "discourse/lib/url";
import getURL from "discourse-common/lib/get-url";

export default Component.extend({
  tagName: "",
  chat: service(),
  router: service(),
  chatDrawerSize: service(),
  chatChannelsManager: service(),
  chatStateManager: service(),
  chatDrawerRouter: service(),
  loading: false,
  sizeTimer: null,
  rafTimer: null,
  hasUnreadMessages: false,
  drawerStyle: null,

  didInsertElement() {
    this._super(...arguments);

=======
import discourseComputed, { observes } from "discourse-common/utils/decorators";
import { action } from "@ember/object";
import {
  CHAT_VIEW,
  DRAFT_CHANNEL_VIEW,
  LIST_VIEW,
} from "discourse/plugins/chat/discourse/services/chat";
import { equal } from "@ember/object/computed";
import { cancel, next, throttle } from "@ember/runloop";
import { inject as service } from "@ember/service";

export default Component.extend({
  tagName: "",
  listView: equal("view", LIST_VIEW),
  chatView: equal("view", CHAT_VIEW),
  draftChannelView: equal("view", DRAFT_CHANNEL_VIEW),
  chat: service(),
  router: service(),
  chatStateManager: service(),
  loading: false,
  showClose: true, // TODO - false when on same topic
  sizeTimer: null,
  rafTimer: null,
  view: null,
  hasUnreadMessages: false,

  didInsertElement() {
    this._super(...arguments);
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    if (!this.chat.userCanChat) {
      return;
    }

    this._checkSize();
    this.appEvents.on("chat:open-url", this, "openURL");
    this.appEvents.on("chat:toggle-close", this, "close");
<<<<<<< HEAD
=======
    this.appEvents.on("chat:open-channel", this, "switchChannel");
    this.appEvents.on(
      "chat:open-channel-at-message",
      this,
      "openChannelAtMessage"
    );
    this.appEvents.on("chat:refresh-channels", this, "refreshChannels");
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    this.appEvents.on("composer:closed", this, "_checkSize");
    this.appEvents.on("composer:opened", this, "_checkSize");
    this.appEvents.on("composer:resized", this, "_checkSize");
    this.appEvents.on("composer:div-resizing", this, "_dynamicCheckSize");
<<<<<<< HEAD
    window.addEventListener("resize", this._checkSize);
=======
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    this.appEvents.on(
      "composer:resize-started",
      this,
      "_startDynamicCheckSize"
    );
    this.appEvents.on("composer:resize-ended", this, "_clearDynamicCheckSize");
<<<<<<< HEAD

    this.computeDrawerStyle();
=======
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  },

  willDestroyElement() {
    this._super(...arguments);
<<<<<<< HEAD

=======
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    if (!this.chat.userCanChat) {
      return;
    }

<<<<<<< HEAD
    window.removeEventListener("resize", this._checkSize);

    if (this.appEvents) {
      this.appEvents.off("chat:open-url", this, "openURL");
      this.appEvents.off("chat:toggle-close", this, "close");
=======
    if (this.appEvents) {
      this.appEvents.off("chat:open-url", this, "openURL");
      this.appEvents.off("chat:toggle-close", this, "close");
      this.appEvents.off("chat:open-channel", this, "switchChannel");
      this.appEvents.off(
        "chat:open-channel-at-message",
        this,
        "openChannelAtMessage"
      );
      this.appEvents.off("chat:refresh-channels", this, "refreshChannels");
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      this.appEvents.off("composer:closed", this, "_checkSize");
      this.appEvents.off("composer:opened", this, "_checkSize");
      this.appEvents.off("composer:resized", this, "_checkSize");
      this.appEvents.off("composer:div-resizing", this, "_dynamicCheckSize");
      this.appEvents.off(
        "composer:resize-started",
        this,
        "_startDynamicCheckSize"
      );
      this.appEvents.off(
        "composer:resize-ended",
        this,
        "_clearDynamicCheckSize"
      );
    }
    if (this.sizeTimer) {
      cancel(this.sizeTimer);
      this.sizeTimer = null;
    }
    if (this.rafTimer) {
      window.cancelAnimationFrame(this.rafTimer);
    }
  },

  @observes("chatStateManager.isDrawerActive")
  _fireHiddenAppEvents() {
    this.appEvents.trigger("chat:rerender-header");
  },

<<<<<<< HEAD
  computeDrawerStyle() {
    const { width, height } = this.chatDrawerSize.size;
    let style = `width: ${escapeExpression((width || "0").toString())}px;`;
    style += `height: ${escapeExpression((height || "0").toString())}px;`;
    this.set("drawerStyle", htmlSafe(style));
  },

  get drawerActions() {
    return {
      openInFullPage: this.openInFullPage,
      close: this.close,
      toggleExpand: this.toggleExpand,
    };
  },

  @bind
=======
  @discourseComputed("chatStateManager.isDrawerExpanded")
  topLineClass(expanded) {
    const baseClass = "chat-drawer-header__top-line";
    return expanded ? `${baseClass}--expanded` : `${baseClass}--collapsed`;
  },

  @discourseComputed("chatStateManager.isDrawerExpanded", "chat.activeChannel")
  displayMembers(expanded, channel) {
    return expanded && !channel?.isDirectMessageChannel;
  },

  @discourseComputed("displayMembers")
  infoTabRoute(displayMembers) {
    if (displayMembers) {
      return "chat.channel.info.members";
    }

    return "chat.channel.info.settings";
  },

  openChannelAtMessage(channel, messageId) {
    this.chat.openChannel(channel, messageId);
  },

>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  _dynamicCheckSize() {
    if (!this.chatStateManager.isDrawerActive) {
      return;
    }

    if (this.rafTimer) {
      return;
    }

    this.rafTimer = window.requestAnimationFrame(() => {
      this.rafTimer = null;
      this._performCheckSize();
    });
  },

  _startDynamicCheckSize() {
    if (!this.chatStateManager.isDrawerActive) {
      return;
    }

<<<<<<< HEAD
    document
      .querySelector(".chat-drawer-outlet-container")
      .classList.add("clear-transitions");
=======
    document.querySelector(".chat-drawer").classList.add("clear-transitions");
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  },

  _clearDynamicCheckSize() {
    if (!this.chatStateManager.isDrawerActive) {
      return;
    }

    document
<<<<<<< HEAD
      .querySelector(".chat-drawer-outlet-container")
=======
      .querySelector(".chat-drawer")
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      .classList.remove("clear-transitions");
    this._checkSize();
  },

<<<<<<< HEAD
  @bind
  _checkSize() {
=======
  _checkSize() {
    if (!this.chatStateManager.isDrawerActive) {
      return;
    }

>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    this.sizeTimer = throttle(this, this._performCheckSize, 150);
  },

  _performCheckSize() {
<<<<<<< HEAD
    if (this.isDestroying || this.isDestroyed) {
      return;
    }

    const drawerContainer = document.querySelector(
      ".chat-drawer-outlet-container"
    );
    if (!drawerContainer) {
=======
    if (!this.isDestroying || this.isDestroyed) {
      return;
    }

    if (!this.chatStateManager.isDrawerActive) {
      return;
    }

    const drawer = document.querySelector(".chat-drawer");
    if (!drawer) {
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      return;
    }

    const composer = document.getElementById("reply-control");
    const composerIsClosed = composer.classList.contains("closed");
    const minRightMargin = 15;
<<<<<<< HEAD

    drawerContainer.style.setProperty(
=======
    drawer.style.setProperty(
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      "--composer-right",
      (composerIsClosed
        ? minRightMargin
        : Math.max(minRightMargin, composer.offsetLeft)) + "px"
    );
  },

<<<<<<< HEAD
  @action
  openURL(url = null) {
    this.chat.activeChannel = null;
    this.chatDrawerRouter.stateFor(this._routeFromURL(url));
    this.chatStateManager.didOpenDrawer(url);
  },

  _routeFromURL(url) {
    let route = this.router.recognize(getURL(url || "/"));

    // ember might recognize the index subroute
    if (route.localName === "index") {
      route = route.parent;
    }

    return route;
=======
  @discourseComputed("chatStateManager.isDrawerExpanded")
  expandIcon(expanded) {
    if (expanded) {
      return "angle-double-down";
    } else {
      return "angle-double-up";
    }
  },

  @discourseComputed(
    "chat.activeChannel",
    "currentUser.chat_channel_tracking_state"
  )
  unreadCount(activeChannel, trackingState) {
    return trackingState[activeChannel.id]?.unread_count || 0;
  },

  @action
  openURL(URL = null) {
    this.chat.setActiveChannel(null);
    this.chatStateManager.didOpenDrawer(URL);

    const route = this._buildRouteFromURL(
      URL || this.chatStateManager.lastKnownChatURL
    );

    switch (route.name) {
      case "chat":
        this.set("view", LIST_VIEW);
        this.refreshChannels();
        this.appEvents.trigger("chat:float-toggled", false);
        return;
      case "chat.draft-channel":
        this.set("view", DRAFT_CHANNEL_VIEW);
        this.appEvents.trigger("chat:float-toggled", false);
        return;
      case "chat.channel":
        return this.chat
          .getChannelBy("id", route.params.channelId)
          .then((channel) => {
            this.chat.set("messageId", route.queryParams.messageId);
            this.chat.setActiveChannel(channel);
            this.set("view", CHAT_VIEW);
            this.appEvents.trigger("chat:float-toggled", false);
          });
    }
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  },

  @action
  openInFullPage() {
    this.chatStateManager.storeAppURL();
    this.chatStateManager.prefersFullPage();
<<<<<<< HEAD
    this.chat.activeChannel = null;

    return DiscourseURL.routeTo(this.chatStateManager.lastKnownChatURL);
=======
    this.chat.setActiveChannel(null);

    return this.router.transitionTo(this.chatStateManager.lastKnownChatURL);
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  },

  @action
  toggleExpand() {
<<<<<<< HEAD
    this.computeDrawerStyle();
=======
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    this.chatStateManager.didToggleDrawer();
    this.appEvents.trigger(
      "chat:toggle-expand",
      this.chatStateManager.isDrawerExpanded
    );
  },

  @action
  close() {
<<<<<<< HEAD
    this.computeDrawerStyle();
    this.chatStateManager.didCloseDrawer();
    this.chat.activeChannel = null;
  },

  @action
  didResize(element, { width, height }) {
    this.chatDrawerSize.size = { width, height };
=======
    this.chatStateManager.didCloseDrawer();
    this.chat.setActiveChannel(null);
    this.appEvents.trigger("chat:float-toggled", true);
  },

  @action
  refreshChannels() {
    if (this.view === LIST_VIEW) {
      this.fetchChannels();
    }
  },

  @action
  fetchChannels() {
    this.set("loading", true);

    this.chat.getChannels().then(() => {
      if (this.isDestroying || this.isDestroyed) {
        return;
      }

      this.setProperties({
        loading: false,
        view: LIST_VIEW,
      });

      this.chatStateManager.didExpandDrawer();
      this.chat.setActiveChannel(null);
    });
  },

  @action
  switchChannel(channel) {
    // we need next here to ensure we correctly let the time for routes transitions
    // eg: deactivate hook of full page chat routes will set activeChannel to null
    next(() => {
      if (this.isDestroying || this.isDestroyed) {
        return;
      }

      this.chat.setActiveChannel(channel);

      if (!channel) {
        const URL = this._buildURLFromState(LIST_VIEW);
        this.openURL(URL);
        return;
      }

      const URL = this._buildURLFromState(CHAT_VIEW, channel);
      this.openURL(URL);
    });
  },

  _buildRouteFromURL(URL) {
    let route = this.router.recognize(URL || "/");

    // ember might recognize the index subroute
    if (route.localName === "index") {
      route = route.parent;
    }

    return route;
  },

  _buildURLFromState(view, channel = null) {
    switch (view) {
      case LIST_VIEW:
        return "/chat";
      case DRAFT_CHANNEL_VIEW:
        return "/chat/draft-channel";
      case CHAT_VIEW:
        if (channel) {
          return `/chat/channel/${channel.id}/${channel.slug || "-"}`;
        } else {
          return "/chat";
        }
      default:
        return "/chat";
    }
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  },
});
