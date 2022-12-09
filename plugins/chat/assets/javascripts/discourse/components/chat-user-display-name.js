<<<<<<< HEAD
import Component from "@glimmer/component";
import { formatUsername } from "discourse/lib/utilities";
import { inject as service } from "@ember/service";

export default class ChatUserDisplayName extends Component {
  @service siteSettings;

=======
import Component from "@ember/component";
import { computed } from "@ember/object";
import { formatUsername } from "discourse/lib/utilities";

export default class ChatUserDisplayName extends Component {
  tagName = "";
  user = null;

  @computed
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  get shouldPrioritizeNameInUx() {
    return !this.siteSettings.prioritize_username_in_ux;
  }

<<<<<<< HEAD
  get hasValidName() {
    return this.args.user?.name && this.args.user.name.trim().length > 0;
  }

  get formattedUsername() {
    return formatUsername(this.args.user?.username);
  }

=======
  @computed("user.name")
  get hasValidName() {
    return this.user?.name && this.user?.name.trim().length > 0;
  }

  @computed("user.username")
  get formattedUsername() {
    return formatUsername(this.user?.username);
  }

  @computed("shouldPrioritizeNameInUx", "hasValidName")
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  get shouldShowNameFirst() {
    return this.shouldPrioritizeNameInUx && this.hasValidName;
  }

<<<<<<< HEAD
=======
  @computed("shouldPrioritizeNameInUx", "hasValidName")
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  get shouldShowNameLast() {
    return !this.shouldPrioritizeNameInUx && this.hasValidName;
  }
}
