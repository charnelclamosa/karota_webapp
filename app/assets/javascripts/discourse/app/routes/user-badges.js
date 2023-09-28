import DiscourseRoute from "discourse/routes/discourse";
import UserBadge from "discourse/models/user-badge";
import ViewingActionType from "discourse/mixins/viewing-action-type";
import I18n from "I18n";

export default DiscourseRoute.extend(ViewingActionType, {
  templateName: "user/badges",

  model() {
    return UserBadge.findByUsername(
      this.modelFor("user").get("username_lower"),
      { grouped: true }
    );
  },

  setupController() {
    this._super(...arguments);
    this.viewingActionType(-1);
  },

<<<<<<< HEAD
  titleToken() {
    return I18n.t("badges.title");
=======
  renderTemplate() {
    this.render("user/badges");
  },

  @action
  didTransition() {
    this.controllerFor("application").set("showFooter", true);
    return true;
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  },
});
