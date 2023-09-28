<<<<<<< HEAD
import { setupRenderingTest } from "discourse/tests/helpers/component-test";
import { exists } from "discourse/tests/helpers/qunit-helpers";
import hbs from "htmlbars-inline-precompile";
import { module, test } from "qunit";
import { render } from "@ember/test-helpers";
=======
import componentTest, {
  setupRenderingTest,
} from "discourse/tests/helpers/component-test";
import { exists } from "discourse/tests/helpers/qunit-helpers";
import hbs from "htmlbars-inline-precompile";
import { module } from "qunit";
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

module("Discourse Chat | Component | chat-emoji-avatar", function (hooks) {
  setupRenderingTest(hooks);

<<<<<<< HEAD
  test("uses an emoji as avatar", async function (assert) {
    this.set("emoji", ":otter:");

    await render(hbs`<ChatEmojiAvatar @emoji={{this.emoji}} />`);

    assert.true(
      exists(
        `.chat-emoji-avatar .chat-emoji-avatar-container .emoji[title=otter]`
      )
    );
=======
  componentTest("uses an emoji as avatar", {
    template: hbs`{{chat-emoji-avatar emoji=emoji}}`,

    async beforeEach() {
      this.set("emoji", ":otter:");
    },

    async test(assert) {
      assert.ok(
        exists(
          `.chat-emoji-avatar .chat-emoji-avatar-container .emoji[title=otter]`
        )
      );
    },
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  });
});
