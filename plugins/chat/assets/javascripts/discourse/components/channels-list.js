import { bind } from "discourse-common/utils/decorators";
<<<<<<< HEAD
import Component from "@glimmer/component";
import { action } from "@ember/object";
import { schedule } from "@ember/runloop";
import { inject as service } from "@ember/service";
import { tracked } from "@glimmer/tracking";
import ChatModalNewMessage from "discourse/plugins/chat/discourse/components/chat/modal/new-message";
=======
import Component from "@ember/component";
import { action, computed } from "@ember/object";
import { schedule } from "@ember/runloop";
import { inject as service } from "@ember/service";
import { and, empty, reads } from "@ember/object/computed";
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

export default class ChannelsList extends Component {
  @service chat;
  @service router;
  @service chatStateManager;
<<<<<<< HEAD
  @service chatChannelsManager;
  @service site;
  @service siteSettings;
  @service session;
  @service currentUser;
  @service modal;

  @tracked hasScrollbar = false;

  @action
  computeHasScrollbar(element) {
    this.hasScrollbar = element.scrollHeight > element.clientHeight;
  }

  @action
  computeResizedEntries(entries) {
    this.computeHasScrollbar(entries[0].target);
  }

  @action
  openNewMessageModal() {
    this.modal.show(ChatModalNewMessage);
  }

  get showMobileDirectMessageButton() {
    return this.site.mobileView && this.canCreateDirectMessageChannel;
  }

  get inSidebar() {
    return this.args.inSidebar ?? false;
  }

  get publicMessageChannelsEmpty() {
    return this.chatChannelsManager.publicMessageChannels?.length === 0;
  }

=======
  tagName = "";
  inSidebar = false;
  toggleSection = null;
  @reads("chat.publicChannels.[]") publicChannels;
  @reads("chat.directMessageChannels.[]") directMessageChannels;
  @empty("publicChannels") publicChannelsEmpty;
  @and("site.mobileView", "showDirectMessageChannels")
  showMobileDirectMessageButton;

  @computed("canCreateDirectMessageChannel")
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  get createDirectMessageChannelLabel() {
    if (!this.canCreateDirectMessageChannel) {
      return "chat.direct_messages.cannot_create";
    }

    return "chat.direct_messages.new";
  }

<<<<<<< HEAD
  get showDirectMessageChannels() {
    return (
      this.canCreateDirectMessageChannel ||
      this.chatChannelsManager.directMessageChannels?.length > 0
=======
  @computed("canCreateDirectMessageChannel", "directMessageChannels")
  get showDirectMessageChannels() {
    return (
      this.canCreateDirectMessageChannel ||
      this.directMessageChannels?.length > 0
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    );
  }

  get canCreateDirectMessageChannel() {
    return this.chat.userCanDirectMessage;
  }

<<<<<<< HEAD
  get displayPublicChannels() {
    if (!this.siteSettings.enable_public_channels) {
      return false;
    }

    if (this.publicMessageChannelsEmpty) {
=======
  @computed("directMessageChannels.@each.last_message_sent_at")
  get sortedDirectMessageChannels() {
    if (!this.directMessageChannels?.length) {
      return [];
    }

    return this.chat.truncateDirectMessageChannels(
      this.chat.sortDirectMessageChannels(this.directMessageChannels)
    );
  }

  @computed("inSidebar")
  get publicChannelClasses() {
    return `channels-list-container public-channels ${
      this.inSidebar ? "collapsible-sidebar-section" : ""
    }`;
  }

  @computed(
    "publicChannelsEmpty",
    "currentUser.{staff,has_joinable_public_channels}"
  )
  get displayPublicChannels() {
    if (this.publicChannelsEmpty) {
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      return (
        this.currentUser?.staff ||
        this.currentUser?.has_joinable_public_channels
      );
    }

    return true;
  }

<<<<<<< HEAD
=======
  @computed("inSidebar")
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  get directMessageChannelClasses() {
    return `channels-list-container direct-message-channels ${
      this.inSidebar ? "collapsible-sidebar-section" : ""
    }`;
  }

  @action
  toggleChannelSection(section) {
<<<<<<< HEAD
    this.args.toggleSection(section);
=======
    this.toggleSection(section);
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  }

  didRender() {
    this._super(...arguments);

    schedule("afterRender", this._applyScrollPosition);
  }

  @action
  storeScrollPosition() {
<<<<<<< HEAD
    if (this.chatStateManager.isDrawerActive) {
      return;
    }

=======
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    const scrollTop = document.querySelector(".channels-list")?.scrollTop || 0;
    this.session.channelsListPosition = scrollTop;
  }

  @bind
  _applyScrollPosition() {
<<<<<<< HEAD
    if (this.chatStateManager.isDrawerActive) {
      return;
    }

=======
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    const position = this.chatStateManager.isFullPageActive
      ? this.session.channelsListPosition || 0
      : 0;
    const scroller = document.querySelector(".channels-list");
    scroller.scrollTo(0, position);
  }
}
