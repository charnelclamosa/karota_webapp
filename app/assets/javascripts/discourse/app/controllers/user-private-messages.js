import Controller, { inject as controller } from "@ember/controller";
import { action, computed } from "@ember/object";
import { inject as service } from "@ember/service";
import { alias, and, equal, readOnly } from "@ember/object/computed";
import { cached, tracked } from "@glimmer/tracking";
import I18n from "I18n";
import DiscourseURL from "discourse/lib/url";

const customUserNavMessagesDropdownRows = [];

export function registerCustomUserNavMessagesDropdownRow(
  routeName,
  name,
  icon
) {
  customUserNavMessagesDropdownRows.push({
    routeName,
    name,
    icon,
  });
}

export function resetCustomUserNavMessagesDropdownRows() {
  customUserNavMessagesDropdownRows.length = 0;
}

export default class extends Controller {
  @service router;
  @controller user;

  @tracked group;
  @tracked tagId;

  @alias("group.name") groupFilter;
  @and("user.viewingSelf", "currentUser.can_send_private_messages") showNewPM;
  @equal("currentParentRouteName", "userPrivateMessages.group") isGroup;
<<<<<<< HEAD
  @readOnly("user.viewingSelf") viewingSelf;
  @readOnly("router.currentRoute.parent.name") currentParentRouteName;
  @readOnly("site.can_tag_pms") pmTaggingEnabled;

  get messagesDropdownValue() {
    let value;

    const currentURL = this.router.currentURL.toLowerCase();
=======
  @equal("currentParentRouteName", "userPrivateMessages.user") isPersonal;
  @readOnly("user.viewingSelf") viewingSelf;
  @readOnly("router.currentRouteName") currentRouteName;
  @readOnly("router.currentRoute.parent.name") currentParentRouteName;
  @readOnly("site.can_tag_pms") pmTaggingEnabled;

  get messagesDropdownValue() {
    let value;

    for (let i = this.messagesDropdownContent.length - 1; i >= 0; i--) {
      const row = this.messagesDropdownContent[i];

      if (this.router.currentURL.includes(row.id)) {
        value = row.id;
        break;
      }
    }

    return value;
  }

  @cached
  get messagesDropdownContent() {
    const content = [
      {
        id: this.router.urlFor("userPrivateMessages.user", this.model.username),
        name: I18n.t("user.messages.inbox"),
      },
    ];

    this.model.groupsWithMessages.forEach((group) => {
      content.push({
        id: this.router.urlFor(
          "userPrivateMessages.group",
          this.model.username,
          group.name
        ),
        name: group.name,
        icon: "inbox",
      });
    });

    if (this.pmTaggingEnabled) {
      content.push({
        id: this.router.urlFor("userPrivateMessages.tags", this.model.username),
        name: I18n.t("user.messages.tags"),
        icon: "tags",
      });
    }

    customUserNavMessagesDropdownRows.forEach((row) => {
      content.push({
        id: this.router.urlFor(row.routeName, this.model.username),
        name: row.name,
        icon: row.icon,
      });
    });

    return content;
  }

  @computed(
    "pmTopicTrackingState.newIncoming.[]",
    "pmTopicTrackingState.statesModificationCounter",
    "group"
  )
  get newLinkText() {
    return this.#linkText("new");
  }

  @computed(
    "pmTopicTrackingState.newIncoming.[]",
    "pmTopicTrackingState.statesModificationCounter",
    "group"
  )
  get unreadLinkText() {
    return this.#linkText("unread");
  }

  #linkText(type) {
    const count = this.pmTopicTrackingState?.lookupCount(type) || 0;
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

    for (let i = this.messagesDropdownContent.length - 1; i >= 0; i--) {
      const row = this.messagesDropdownContent[i];

      if (
        currentURL.includes(
          row.id.toLowerCase().replace(this.router.rootURL, "/")
        )
      ) {
        value = row.id;
        break;
      }
    }
<<<<<<< HEAD

    return value;
  }

  @cached
  get messagesDropdownContent() {
    const usernameLower = this.model.username_lower;

    const content = [
      {
        id: this.router.urlFor("userPrivateMessages.user", usernameLower),
        name: I18n.t("user.messages.inbox"),
      },
    ];

    this.model.groupsWithMessages.forEach((group) => {
      content.push({
        id: this.router.urlFor(
          "userPrivateMessages.group",
          usernameLower,
          group.name
        ),
        name: group.name,
        icon: "inbox",
      });
    });

    if (this.pmTaggingEnabled) {
      content.push({
        id: this.router.urlFor("userPrivateMessages.tags", usernameLower),
        name: I18n.t("user.messages.tags"),
        icon: "tags",
      });
    }

    customUserNavMessagesDropdownRows.forEach((row) => {
      content.push({
        id: this.router.urlFor(row.routeName, usernameLower),
        name: row.name,
        icon: row.icon,
      });
    });

    return content;
  }

  @action
=======
  }

  @action
  changeGroupNotificationLevel(notificationLevel) {
    this.group.setNotification(notificationLevel, this.get("user.model.id"));
  }

  @action
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  onMessagesDropdownChange(item) {
    return DiscourseURL.routeTo(item);
  }
}
