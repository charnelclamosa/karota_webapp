import DiscourseRoute from "discourse/routes/discourse";

<<<<<<< HEAD
export default class AdminLogsScreenedEmailsRoute extends DiscourseRoute {
=======
export default DiscourseRoute.extend({
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  setupController() {
    return this.controllerFor("adminLogsScreenedEmails").show();
  }
}
