import { setDefaultOwner } from "discourse-common/lib/get-owner";
import User from "discourse/models/user";
import Site from "discourse/models/site";
import deprecated from "discourse-common/lib/deprecated";

export default {
  after: "sniff-capabilities",

  initialize(owner) {
    // This is required for Ember CLI tests to work
    setDefaultOwner(owner.__container__);

    window.Discourse = owner;

    Object.defineProperty(owner, "SiteSettings", {
      get() {
        deprecated(
          `use injected siteSettings instead of Discourse.SiteSettings`,
          {
            since: "2.8",
<<<<<<< HEAD:app/assets/javascripts/discourse/app/instance-initializers/inject-objects.js
            dropFrom: "3.2",
=======
            dropFrom: "2.9",
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream):app/assets/javascripts/discourse/app/initializers/inject-objects.js
            id: "discourse.global.site-settings",
          }
        );
        return owner.lookup("service:site-settings");
      },
    });
    Object.defineProperty(owner, "User", {
      get() {
        deprecated(
          `import discourse/models/user instead of using Discourse.User`,
          {
            since: "2.8",
<<<<<<< HEAD:app/assets/javascripts/discourse/app/instance-initializers/inject-objects.js
            dropFrom: "3.2",
=======
            dropFrom: "2.9",
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream):app/assets/javascripts/discourse/app/initializers/inject-objects.js
            id: "discourse.global.user",
          }
        );
        return User;
      },
    });
    Object.defineProperty(owner, "Site", {
      get() {
        deprecated(
          `import discourse/models/site instead of using Discourse.Site`,
          {
            since: "2.8",
<<<<<<< HEAD:app/assets/javascripts/discourse/app/instance-initializers/inject-objects.js
            dropFrom: "3.2",
=======
            dropFrom: "2.9",
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream):app/assets/javascripts/discourse/app/initializers/inject-objects.js
            id: "discourse.global.site",
          }
        );
        return Site;
      },
    });
  },

  teardown() {
    delete window.Discourse;
  },
};
