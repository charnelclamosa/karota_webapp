import { htmlSafe } from "@ember/template";
<<<<<<< HEAD
=======
import slugifyChannel from "discourse/plugins/chat/discourse/lib/slugify-channel";
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
import { withPluginApi } from "discourse/lib/plugin-api";
import I18n from "I18n";
import { bind } from "discourse-common/utils/decorators";
import { tracked } from "@glimmer/tracking";
<<<<<<< HEAD
import { escapeExpression } from "discourse/lib/utilities";
import { avatarUrl } from "discourse-common/lib/avatar-utils";
=======
import { avatarUrl, escapeExpression } from "discourse/lib/utilities";
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
import { dasherize } from "@ember/string";
import { emojiUnescape } from "discourse/lib/text";
import { decorateUsername } from "discourse/helpers/decorate-username-selector";
import { until } from "discourse/lib/formatter";
import { inject as service } from "@ember/service";
<<<<<<< HEAD
import ChatModalNewMessage from "discourse/plugins/chat/discourse/components/chat/modal/new-message";
import getURL from "discourse-common/lib/get-url";
import { initSidebarState } from "discourse/plugins/chat/discourse/lib/init-sidebar-state";
=======
import { computed } from "@ember/object";
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

export default {
  name: "chat-sidebar",
  initialize(container) {
    this.chatService = container.lookup("service:chat");

    if (!this.chatService.userCanChat) {
      return;
    }

<<<<<<< HEAD
    this.siteSettings = container.lookup("service:site-settings");

    withPluginApi("1.8.0", (api) => {
      api.addSidebarPanel(
        (BaseCustomSidebarPanel) =>
          class ChatSidebarPanel extends BaseCustomSidebarPanel {
            key = "chat";
            switchButtonLabel = I18n.t("sidebar.panels.chat.label");
            switchButtonIcon = "d-chat";
            switchButtonDefaultUrl = getURL("/chat");
          }
      );

      initSidebarState(api, api.getCurrentUser());
    });

    withPluginApi("1.3.0", (api) => {
      if (this.siteSettings.enable_public_channels) {
        api.addSidebarSection(
          (BaseCustomSidebarSection, BaseCustomSidebarSectionLink) => {
            const SidebarChatChannelsSectionLink = class extends BaseCustomSidebarSectionLink {
              constructor({ channel, chatService }) {
                super(...arguments);
                this.channel = channel;
                this.chatService = chatService;
              }

              get name() {
                return dasherize(this.channel.slugifiedTitle);
              }

              get classNames() {
                const classes = [];

                if (this.channel.currentUserMembership.muted) {
                  classes.push("sidebar-section-link--muted");
                }

                if (this.channel.id === this.chatService.activeChannel?.id) {
                  classes.push("sidebar-section-link--active");
                }

                classes.push(`channel-${this.channel.id}`);

                return classes.join(" ");
              }

              get route() {
                return "chat.channel";
              }

              get models() {
                return this.channel.routeModels;
              }

              get text() {
                return htmlSafe(emojiUnescape(this.channel.escapedTitle));
              }

              get prefixType() {
                return "icon";
              }

              get prefixValue() {
                return "d-chat";
              }

              get prefixColor() {
                return this.channel.chatable.color;
              }

              get title() {
                return this.channel.escapedDescription
                  ? htmlSafe(this.channel.escapedDescription)
                  : `${this.channel.escapedTitle} ${I18n.t("chat.title")}`;
              }

              get prefixBadge() {
                return this.channel.chatable.read_restricted ? "lock" : "";
              }

              get suffixType() {
                return "icon";
              }

              get suffixValue() {
                return this.channel.tracking.unreadCount > 0 ||
                  // We want to do this so we don't show a blue dot if the user is inside
                  // the channel and a new unread thread comes in.
                  (this.chatService.activeChannel?.id !== this.channel.id &&
                    this.channel.unreadThreadsCountSinceLastViewed > 0)
                  ? "circle"
                  : "";
              }

              get suffixCSSClass() {
                return this.channel.tracking.mentionCount > 0
                  ? "urgent"
                  : "unread";
              }
            };

            const SidebarChatChannelsSection = class extends BaseCustomSidebarSection {
              @service currentUser;

              @tracked
              currentUserCanJoinPublicChannels =
                this.currentUser &&
                (this.currentUser.staff ||
                  this.currentUser.has_joinable_public_channels);

              constructor() {
                super(...arguments);

                if (container.isDestroyed) {
                  return;
                }
                this.chatService = container.lookup("service:chat");
                this.chatChannelsManager = container.lookup(
                  "service:chat-channels-manager"
                );
                this.router = container.lookup("service:router");
              }

              get sectionLinks() {
                return this.chatChannelsManager.publicMessageChannels.map(
                  (channel) =>
=======
    withPluginApi("1.3.0", (api) => {
      api.addSidebarSection(
        (BaseCustomSidebarSection, BaseCustomSidebarSectionLink) => {
          const SidebarChatChannelsSectionLink = class extends BaseCustomSidebarSectionLink {
            @tracked chatChannelTrackingState =
              this.chatService.currentUser.chat_channel_tracking_state[
                this.channel.id
              ];

            constructor({ channel, chatService }) {
              super(...arguments);
              this.channel = channel;
              this.chatService = chatService;
            }

            @bind
            willDestroy() {
              this.chatService.appEvents.off(
                "chat:user-tracking-state-changed",
                this._refreshTrackingState
              );
            }

            @bind
            didInsert() {
              this.chatService.appEvents.on(
                "chat:user-tracking-state-changed",
                this._refreshTrackingState
              );
            }

            @bind
            _refreshTrackingState() {
              this.chatChannelTrackingState =
                this.chatService.currentUser.chat_channel_tracking_state[
                  this.channel.id
                ];
            }

            get name() {
              return dasherize(slugifyChannel(this.channel));
            }

            @computed("chatService.activeChannel")
            get classNames() {
              const classes = [];

              if (this.channel.current_user_membership.muted) {
                classes.push("sidebar-section-link--muted");
              }

              if (this.channel.id === this.chatService.activeChannel?.id) {
                classes.push("sidebar-section-link--active");
              }

              return classes.join(" ");
            }

            get route() {
              return "chat.channel";
            }

            get models() {
              return [this.channel.id, slugifyChannel(this.channel)];
            }

            get text() {
              return htmlSafe(emojiUnescape(this.channel.escapedTitle));
            }

            get prefixType() {
              return "icon";
            }

            get prefixValue() {
              return "hashtag";
            }

            get prefixColor() {
              return this.channel.chatable.color;
            }

            get title() {
              return this.channel.escapedDescription
                ? htmlSafe(this.channel.escapedDescription)
                : `${this.channel.escapedTitle} ${I18n.t("chat.title")}`;
            }

            get prefixBadge() {
              return this.channel.chatable.read_restricted ? "lock" : "";
            }

            get suffixType() {
              return "icon";
            }

            get suffixValue() {
              return this.chatChannelTrackingState?.unread_count > 0
                ? "circle"
                : "";
            }

            get suffixCSSClass() {
              return this.chatChannelTrackingState?.unread_mentions > 0
                ? "urgent"
                : "unread";
            }
          };

          const SidebarChatChannelsSection = class extends BaseCustomSidebarSection {
            @tracked sectionLinks = [];

            @tracked sectionIndicator =
              this.chatService.publicChannels &&
              this.chatService.publicChannels[0].current_user_membership
                .unread_count;

            @tracked currentUserCanJoinPublicChannels =
              this.sidebar.currentUser &&
              (this.sidebar.currentUser.staff ||
                this.sidebar.currentUser.has_joinable_public_channels);

            constructor() {
              super(...arguments);

              if (container.isDestroyed) {
                return;
              }
              this.chatService = container.lookup("service:chat");
              this.router = container.lookup("service:router");
              this.appEvents = container.lookup("service:app-events");
              this.appEvents.on("chat:refresh-channels", this._refreshChannels);
              this._refreshChannels();
            }

            @bind
            willDestroy() {
              if (!this.appEvents) {
                return;
              }
              this.appEvents.off(
                "chat:refresh-channels",
                this._refreshChannels
              );
            }

            @bind
            _refreshChannels() {
              const newSectionLinks = [];
              this.chatService.getChannels().then((channels) => {
                channels.publicChannels.forEach((channel) => {
                  newSectionLinks.push(
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
                    new SidebarChatChannelsSectionLink({
                      channel,
                      chatService: this.chatService,
                    })
<<<<<<< HEAD
                );
              }

              get name() {
                return "chat-channels";
              }

              get title() {
                return I18n.t("chat.chat_channels");
              }

              get text() {
                return I18n.t("chat.chat_channels");
              }

              get actions() {
                return [
                  {
                    id: "browseChannels",
                    title: I18n.t("chat.channels_list_popup.browse"),
                    action: () => this.router.transitionTo("chat.browse.open"),
                  },
                ];
              }

              get actionsIcon() {
                return "pencil-alt";
              }

              get links() {
                return this.sectionLinks;
              }

              get displaySection() {
                return (
                  this.sectionLinks.length > 0 ||
                  this.currentUserCanJoinPublicChannels
                );
              }
            };

            return SidebarChatChannelsSection;
          },
          "chat"
        );
      }
=======
                  );
                });
                this.sectionLinks = newSectionLinks;
              });
            }

            get name() {
              return "chat-channels";
            }

            get title() {
              return I18n.t("chat.chat_channels");
            }

            get text() {
              return I18n.t("chat.chat_channels");
            }

            get actions() {
              return [
                {
                  id: "browseChannels",
                  title: I18n.t("chat.channels_list_popup.browse"),
                  action: () => this.router.transitionTo("chat.browse.open"),
                },
              ];
            }

            get actionsIcon() {
              return "pencil-alt";
            }

            get links() {
              return this.sectionLinks;
            }

            get displaySection() {
              return (
                this.sectionLinks.length > 0 ||
                this.currentUserCanJoinPublicChannels
              );
            }
          };

          return SidebarChatChannelsSection;
        }
      );
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

      api.addSidebarSection(
        (BaseCustomSidebarSection, BaseCustomSidebarSectionLink) => {
          const SidebarChatDirectMessagesSectionLink = class extends BaseCustomSidebarSectionLink {
<<<<<<< HEAD
=======
            @tracked chatChannelTrackingState =
              this.chatService.currentUser.chat_channel_tracking_state[
                this.channel.id
              ];

>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
            constructor({ channel, chatService }) {
              super(...arguments);
              this.channel = channel;
              this.chatService = chatService;

              if (this.oneOnOneMessage) {
<<<<<<< HEAD
                const user = this.channel.chatable.users[0];
                if (user.username !== I18n.t("chat.deleted_chat_username")) {
                  user.trackStatus();
                }
=======
                this.channel.chatable.users[0].trackStatus();
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
              }
            }

            @bind
            willDestroy() {
              if (this.oneOnOneMessage) {
                this.channel.chatable.users[0].stopTrackingStatus();
              }
            }

            get name() {
<<<<<<< HEAD
              return this.channel.slugifiedTitle;
            }

            get classNames() {
              const classes = [];

              if (this.channel.currentUserMembership.muted) {
=======
              return slugifyChannel(this.channel);
            }

            @computed("chatService.activeChannel")
            get classNames() {
              const classes = [];

              if (this.channel.current_user_membership.muted) {
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
                classes.push("sidebar-section-link--muted");
              }

              if (this.channel.id === this.chatService.activeChannel?.id) {
                classes.push("sidebar-section-link--active");
              }

<<<<<<< HEAD
              classes.push(`channel-${this.channel.id}`);

=======
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
              return classes.join(" ");
            }

            get route() {
              return "chat.channel";
            }

            get models() {
<<<<<<< HEAD
              return this.channel.routeModels;
            }

            get title() {
              return I18n.t("chat.placeholder_channel", {
                channelName: this.channel.escapedTitle,
=======
              return [this.channel.id, slugifyChannel(this.channel)];
            }

            get title() {
              return I18n.t("chat.placeholder_others", {
                messageRecipient: this.channel.escapedTitle,
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
              });
            }

            get oneOnOneMessage() {
              return this.channel.chatable.users.length === 1;
            }

<<<<<<< HEAD
            get contentComponentArgs() {
              return this.channel.chatable.users[0].get("status");
            }

            get contentComponent() {
              return "user-status-message";
            }

            get text() {
              const username = this.channel.escapedTitle.replaceAll("@", "");
              if (this.oneOnOneMessage) {
                return htmlSafe(
                  `${escapeExpression(username)}${decorateUsername(
=======
            get text() {
              const username = this.channel.escapedTitle.replaceAll("@", "");
              if (this.oneOnOneMessage) {
                const status = this.channel.chatable.users[0].get("status");
                const statusHtml = status ? this._userStatusHtml(status) : "";
                return htmlSafe(
                  `${escapeExpression(
                    username
                  )}${statusHtml} ${decorateUsername(
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
                    escapeExpression(username)
                  )}`
                );
              } else {
                return username;
              }
            }

            get prefixType() {
              if (this.oneOnOneMessage) {
                return "image";
              } else {
                return "text";
              }
            }

            get prefixValue() {
              if (this.channel.chatable.users.length === 1) {
                return avatarUrl(
                  this.channel.chatable.users[0].avatar_template,
                  "tiny"
                );
              } else {
                return this.channel.chatable.users.length;
              }
            }

            get prefixCSSClass() {
              const activeUsers = this.chatService.presenceChannel.users;
              const user = this.channel.chatable.users[0];
              if (
                !!activeUsers?.findBy("id", user?.id) ||
                !!activeUsers?.findBy("username", user?.username)
              ) {
                return "active";
              }
              return "";
            }

            get suffixType() {
              return "icon";
            }

            get suffixValue() {
<<<<<<< HEAD
              return this.channel.tracking.unreadCount > 0 ? "circle" : "";
=======
              return this.chatChannelTrackingState?.unread_count > 0
                ? "circle"
                : "";
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
            }

            get suffixCSSClass() {
              return "urgent";
            }

            get hoverType() {
              return "icon";
            }

            get hoverValue() {
              return "times";
            }

            get hoverAction() {
              return (event) => {
                event.stopPropagation();
                event.preventDefault();
                this.chatService.unfollowChannel(this.channel);
              };
            }

            get hoverTitle() {
              return I18n.t("chat.direct_messages.leave");
            }

<<<<<<< HEAD
=======
            _userStatusHtml(status) {
              const emoji = escapeExpression(`:${status.emoji}:`);
              const title = this._userStatusTitle(status);
              return `<span class="user-status">${emojiUnescape(emoji, {
                title,
              })}</span>`;
            }

>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
            _userStatusTitle(status) {
              let title = `${escapeExpression(status.description)}`;

              if (status.ends_at) {
                const untilFormatted = until(
                  status.ends_at,
                  this.chatService.currentUser.user_option.timezone,
                  this.chatService.currentUser.locale
                );
                title += ` ${untilFormatted}`;
              }

              return title;
            }
          };

          const SidebarChatDirectMessagesSection = class extends BaseCustomSidebarSection {
            @service site;
<<<<<<< HEAD
            @service modal;
            @service router;

            @tracked
            userCanDirectMessage = this.chatService.userCanDirectMessage;
=======
            @service router;
            @tracked sectionLinks = [];
            @tracked userCanDirectMessage =
              this.chatService.userCanDirectMessage;
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

            constructor() {
              super(...arguments);

              if (container.isDestroyed) {
                return;
              }
              this.chatService = container.lookup("service:chat");
<<<<<<< HEAD
              this.chatChannelsManager = container.lookup(
                "service:chat-channels-manager"
              );
            }

            get sectionLinks() {
              return this.chatChannelsManager.truncatedDirectMessageChannels.map(
                (channel) =>
                  new SidebarChatDirectMessagesSectionLink({
                    channel,
                    chatService: this.chatService,
                  })
              );
=======
              this.chatService.appEvents.on(
                "chat:user-tracking-state-changed",
                this._refreshDirectMessageChannels
              );
              this._refreshDirectMessageChannels();
            }

            @bind
            willDestroy() {
              if (container.isDestroyed) {
                return;
              }
              this.chatService.appEvents.off(
                "chat:user-tracking-state-changed",
                this._refreshDirectMessageChannels
              );
            }

            @bind
            _refreshDirectMessageChannels() {
              const newSectionLinks = [];
              this.chatService.getChannels().then((channels) => {
                this.chatService
                  .truncateDirectMessageChannels(channels.directMessageChannels)
                  .forEach((channel) => {
                    newSectionLinks.push(
                      new SidebarChatDirectMessagesSectionLink({
                        channel,
                        chatService: this.chatService,
                      })
                    );
                  });
                this.sectionLinks = newSectionLinks;
              });
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
            }

            get name() {
              return "chat-dms";
            }

            get title() {
              return I18n.t("chat.direct_messages.title");
            }

            get text() {
              return I18n.t("chat.direct_messages.title");
            }

            get actions() {
              if (!this.userCanDirectMessage) {
                return [];
              }

              return [
                {
                  id: "startDm",
                  title: I18n.t("chat.direct_messages.new"),
                  action: () => {
<<<<<<< HEAD
                    this.modal.show(ChatModalNewMessage);
=======
                    this.router.transitionTo("chat.draft-channel");
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
                  },
                },
              ];
            }

            get actionsIcon() {
              return "plus";
            }

            get links() {
              return this.sectionLinks;
            }

            get displaySection() {
              return this.sectionLinks.length > 0 || this.userCanDirectMessage;
            }
          };

          return SidebarChatDirectMessagesSection;
<<<<<<< HEAD
        },
        "chat"
=======
        }
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      );
    });
  },
};
