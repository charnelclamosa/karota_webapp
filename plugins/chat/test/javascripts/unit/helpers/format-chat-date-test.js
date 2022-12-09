import { module, test } from "qunit";
import hbs from "htmlbars-inline-precompile";
import { render } from "@ember/test-helpers";
import { setupRenderingTest } from "discourse/tests/helpers/component-test";
import { query } from "discourse/tests/helpers/qunit-helpers";
<<<<<<< HEAD
import fabricators from "discourse/plugins/chat/discourse/lib/fabricators";
=======
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

module("Discourse Chat | Unit | Helpers | format-chat-date", function (hooks) {
  setupRenderingTest(hooks);

  test("link to chat message", async function (assert) {
<<<<<<< HEAD
    const channel = fabricators.channel();
    this.message = fabricators.message({ channel });

    await render(hbs`{{format-chat-date this.message}}`);

    assert.equal(
      query(".chat-time").getAttribute("href"),
      `/chat/c/-/${channel.id}/${this.message.id}`
=======
    this.set("details", { chat_channel_id: 1 });
    this.set("message", { id: 1 });
    await render(hbs`{{format-chat-date this.message this.details}}`);

    assert.equal(
      query(".chat-time").getAttribute("href"),
      "/chat/channel/1/-?messageId=1"
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    );
  });
});
