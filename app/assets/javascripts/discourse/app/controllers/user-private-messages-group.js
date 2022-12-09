import I18n from "I18n";
import Controller, { inject as controller } from "@ember/controller";
<<<<<<< HEAD
import { action, computed } from "@ember/object";
=======
import { computed } from "@ember/object";
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

export default class extends Controller {
  @controller user;

  get viewingSelf() {
    return this.user.viewingSelf;
  }

  @computed(
    "pmTopicTrackingState.newIncoming.[]",
<<<<<<< HEAD
    "pmTopicTrackingState.statesModificationCounter",
    "pmTopicTrackingState.isTracking"
=======
    "pmTopicTrackingState.statesModificationCounter"
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  )
  get newLinkText() {
    return this.#linkText("new");
  }

  @computed(
    "pmTopicTrackingState.newIncoming.[]",
<<<<<<< HEAD
    "pmTopicTrackingState.statesModificationCounter",
    "pmTopicTrackingState.isTracking"
=======
    "pmTopicTrackingState.statesModificationCounter"
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  )
  get unreadLinkText() {
    return this.#linkText("unread");
  }

<<<<<<< HEAD
  get navigationControlsButton() {
    return document.getElementById("navigation-controls__button");
  }

  #linkText(type) {
    const count = this.pmTopicTrackingState?.lookupCount(type, {
      inboxFilter: "group",
      groupName: this.group.name,
=======
  #linkText(type) {
    const count = this.pmTopicTrackingState?.lookupCount(type, {
      inboxFilter: "group",
      groupName: this.groupName,
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    });

    if (count === 0) {
      return I18n.t(`user.messages.${type}`);
    } else {
      return I18n.t(`user.messages.${type}_with_count`, { count });
    }
  }
<<<<<<< HEAD

  @action
  changeGroupNotificationLevel(notificationLevel) {
    this.group.setNotification(notificationLevel, this.get("user.model.id"));
  }
=======
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
}
