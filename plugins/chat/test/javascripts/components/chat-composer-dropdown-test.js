<<<<<<< HEAD
import { setupRenderingTest } from "discourse/tests/helpers/component-test";
import { exists } from "discourse/tests/helpers/qunit-helpers";
import hbs from "htmlbars-inline-precompile";
import { click, render } from "@ember/test-helpers";
import { module, test } from "qunit";
=======
import componentTest, {
  setupRenderingTest,
} from "discourse/tests/helpers/component-test";
import { exists } from "discourse/tests/helpers/qunit-helpers";
import hbs from "htmlbars-inline-precompile";
import { click } from "@ember/test-helpers";
import { module } from "qunit";
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

module("Discourse Chat | Component | chat-composer-dropdown", function (hooks) {
  setupRenderingTest(hooks);

<<<<<<< HEAD
  test("buttons", async function (assert) {
    this.set("buttons", [{ id: "foo", icon: "times", action: () => {} }]);

    await render(hbs`<ChatComposerDropdown @buttons={{this.buttons}} />`);
    await click(".chat-composer-dropdown__trigger-btn");

    assert.true(exists(".chat-composer-dropdown__item.foo"));
    assert.true(
      exists(".chat-composer-dropdown__action-btn.foo .d-icon-times")
    );
=======
  componentTest("buttons", {
    template: hbs`{{chat-composer-dropdown buttons=buttons}}`,

    async beforeEach() {
      this.set("buttons", [{ id: "foo", icon: "times", action: () => {} }]);
    },

    async test(assert) {
      await click(".chat-composer-dropdown__trigger-btn");

      assert.ok(exists(".chat-composer-dropdown__item.foo"));
      assert.ok(
        exists(".chat-composer-dropdown__action-btn.foo .d-icon-times")
      );
    },
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  });
});
