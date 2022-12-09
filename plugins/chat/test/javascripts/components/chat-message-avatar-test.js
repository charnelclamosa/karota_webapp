<<<<<<< HEAD
import { setupRenderingTest } from "discourse/tests/helpers/component-test";
import hbs from "htmlbars-inline-precompile";
import { exists, query } from "discourse/tests/helpers/qunit-helpers";
import { module, test } from "qunit";
import { render } from "@ember/test-helpers";
import ChatMessage from "discourse/plugins/chat/discourse/models/chat-message";
import fabricators from "discourse/plugins/chat/discourse/lib/fabricators";
=======
import componentTest, {
  setupRenderingTest,
} from "discourse/tests/helpers/component-test";
import hbs from "htmlbars-inline-precompile";
import { exists, query } from "discourse/tests/helpers/qunit-helpers";
import { module } from "qunit";
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

module("Discourse Chat | Component | chat-message-avatar", function (hooks) {
  setupRenderingTest(hooks);

<<<<<<< HEAD
  test("chat_webhook_event", async function (assert) {
    this.message = ChatMessage.create(fabricators.channel(), {
      chat_webhook_event: { emoji: ":heart:" },
    });

    await render(hbs`<Chat::Message::Avatar @message={{this.message}} />`);

    assert.strictEqual(query(".chat-emoji-avatar .emoji").title, "heart");
  });

  test("user", async function (assert) {
    this.message = ChatMessage.create(fabricators.channel(), {
      user: { username: "discobot" },
    });

    await render(hbs`<Chat::Message::Avatar @message={{this.message}} />`);

    assert.true(exists('.chat-user-avatar [data-user-card="discobot"]'));
=======
  componentTest("chat_webhook_event", {
    template: hbs`{{chat-message-avatar message=message}}`,

    beforeEach() {
      this.set("message", { chat_webhook_event: { emoji: ":heart:" } });
    },

    async test(assert) {
      assert.equal(query(".chat-emoji-avatar .emoji").title, "heart");
    },
  });

  componentTest("user", {
    template: hbs`{{chat-message-avatar message=message}}`,

    beforeEach() {
      this.set("message", { user: { username: "discobot" } });
    },

    async test(assert) {
      assert.ok(exists('.chat-user-avatar [data-user-card="discobot"]'));
    },
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  });
});
