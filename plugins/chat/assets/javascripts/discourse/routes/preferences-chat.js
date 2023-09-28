import RestrictedUserRoute from "discourse/routes/restricted-user";
import { defaultHomepage } from "discourse/lib/utilities";
import { inject as service } from "@ember/service";

export default class PreferencesChatRoute extends RestrictedUserRoute {
  @service chat;
<<<<<<< HEAD
  @service router;
  @service siteSettings;
  @service currentUser;
=======
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

  showFooter = true;

  setupController(controller, user) {
<<<<<<< HEAD
    if (
      !this.siteSettings.chat_enabled ||
      (!user.can_chat && !this.currentUser?.admin)
    ) {
      return this.router.transitionTo(`discovery.${defaultHomepage()}`);
    }

=======
    if (!user?.can_chat) {
      return this.transitionTo(`discovery.${defaultHomepage()}`);
    }
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    controller.set("model", user);
  }
}
