import { module, test } from "qunit";
<<<<<<< HEAD
import { getOwner } from "@ember/application";
import { ORIGINS } from "discourse/plugins/chat/discourse/services/chat-channel-info-route-origin-manager";
import { setupTest } from "ember-qunit";
=======
import { getOwner } from "discourse-common/lib/get-owner";
import { ORIGINS } from "discourse/plugins/chat/discourse/services/chat-channel-info-route-origin-manager";
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

module(
  "Discourse Chat | Unit | Service | chat-channel-info-route-origin-manager",
  function (hooks) {
<<<<<<< HEAD
    setupTest(hooks);

=======
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    hooks.beforeEach(function () {
      this.manager = getOwner(this).lookup(
        "service:chat-channel-info-route-origin-manager"
      );
    });

    hooks.afterEach(function () {
      this.manager.origin = null;
    });

    test(".origin", function (assert) {
      this.manager.origin = ORIGINS.channnel;
      assert.strictEqual(this.manager.origin, ORIGINS.channnel);
    });

    test(".isBrowse", function (assert) {
      this.manager.origin = ORIGINS.browse;
      assert.strictEqual(this.manager.isBrowse, true);

      this.manager.origin = null;
      assert.strictEqual(this.manager.isBrowse, false);

      this.manager.origin = ORIGINS.channel;
      assert.strictEqual(this.manager.isBrowse, false);
    });

    test(".isChannel", function (assert) {
      this.manager.origin = ORIGINS.channnel;
      assert.strictEqual(this.manager.isChannel, true);

      this.manager.origin = ORIGINS.browse;
      assert.strictEqual(this.manager.isChannel, false);

      this.manager.origin = null;
      assert.strictEqual(this.manager.isChannel, true);
    });
  }
);
