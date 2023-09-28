import { module, test } from "qunit";
import { setupTest } from "ember-qunit";
<<<<<<< HEAD
import { getOwner } from "@ember/application";
=======
import { getOwner } from "discourse-common/lib/get-owner";
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

module("Unit | Model | invite", function (hooks) {
  setupTest(hooks);

  test("create", function (assert) {
    const store = getOwner(this).lookup("service:store");
    assert.ok(
      store.createRecord("invite"),
      "it can be created without arguments"
    );
  });
});
