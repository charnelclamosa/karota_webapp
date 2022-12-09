import Component from "@glimmer/component";
import { until } from "discourse/lib/formatter";
import { inject as service } from "@ember/service";

export default class UserStatusMessage extends Component {
  @service currentUser;

  get until() {
    if (!this.args.status.ends_at) {
      return;
    }

    const timezone = this.currentUser
<<<<<<< HEAD
      ? this.currentUser.user_option?.timezone
      : moment.tz.guess();

    return until(this.args.status.ends_at, timezone, this.currentUser?.locale);
=======
      ? this.currentUser.timezone
      : moment.tz.guess();

    return until(this.status.ends_at, timezone, this.currentUser?.locale);
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  }
}
