<<<<<<< HEAD
import { tagName } from "@ember-decorators/component";
=======
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
import Component from "@ember/component";
import { action } from "@ember/object";
import discourseComputed from "discourse-common/utils/decorators";

<<<<<<< HEAD
@tagName("")
export default class AdminPenaltySimilarUsers extends Component {
  @discourseComputed("penaltyType")
=======
export default Component.extend({
  tagName: "",

  @discourseComputed("type")
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  penaltyField(penaltyType) {
    if (penaltyType === "suspend") {
      return "can_be_suspended";
    } else if (penaltyType === "silence") {
      return "can_be_silenced";
    }
<<<<<<< HEAD
  }
=======
  },
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

  @action
  selectUserId(userId, event) {
    if (!this.selectedUserIds) {
      return;
    }

    if (event.target.checked) {
      this.selectedUserIds.pushObject(userId);
    } else {
      this.selectedUserIds.removeObject(userId);
    }
<<<<<<< HEAD
  }
}
=======
  },
});
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
