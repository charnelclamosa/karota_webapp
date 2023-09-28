import { setupRenderingTest } from "discourse/tests/helpers/component-test";
import { exists } from "discourse/tests/helpers/qunit-helpers";
import hbs from "htmlbars-inline-precompile";
<<<<<<< HEAD
import fabricators from "discourse/plugins/chat/discourse/lib/fabricators";
=======
import fabricators from "../helpers/fabricators";
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
import { module, test } from "qunit";
import { render } from "@ember/test-helpers";

module("Discourse Chat | Component | chat-channel-metadata", function (hooks) {
  setupRenderingTest(hooks);

<<<<<<< HEAD
  test("displays last message created at", async function (assert) {
    let lastMessageSentAt = moment().subtract(1, "day").format();
    this.channel = fabricators.directMessageChannel();
    this.channel.lastMessage = fabricators.message({
      channel: this.channel,
      created_at: lastMessageSentAt,
    });

=======
  test("displays last message sent at", async function (assert) {
    let lastMessageSentAt = moment().subtract(1, "day");
    this.channel = fabricators.directMessageChatChannel({
      last_message_sent_at: lastMessageSentAt,
    });
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    await render(hbs`<ChatChannelMetadata @channel={{this.channel}} />`);

    assert.dom(".chat-channel-metadata__date").hasText("Yesterday");

    lastMessageSentAt = moment();
<<<<<<< HEAD
    this.channel.lastMessage.createdAt = lastMessageSentAt;
=======
    this.channel.set("last_message_sent_at", lastMessageSentAt);
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    await render(hbs`<ChatChannelMetadata @channel={{this.channel}} />`);

    assert
      .dom(".chat-channel-metadata__date")
      .hasText(lastMessageSentAt.format("LT"));
  });

  test("unreadIndicator", async function (assert) {
<<<<<<< HEAD
    this.channel = fabricators.directMessageChannel();
    this.channel.tracking.unreadCount = 1;

=======
    this.channel = fabricators.directMessageChatChannel();
    this.currentUser.set("chat_channel_tracking_state", {
      [this.channel.id]: { unread_count: 1 },
    });
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    this.unreadIndicator = true;
    await render(
      hbs`<ChatChannelMetadata @channel={{this.channel}} @unreadIndicator={{this.unreadIndicator}}/>`
    );

<<<<<<< HEAD
    assert.true(exists(".chat-channel-unread-indicator"));
=======
    assert.ok(exists(".chat-channel-unread-indicator"));
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

    this.unreadIndicator = false;
    await render(
      hbs`<ChatChannelMetadata @channel={{this.channel}} @unreadIndicator={{this.unreadIndicator}}/>`
    );

<<<<<<< HEAD
    assert.false(exists(".chat-channel-unread-indicator"));
=======
    assert.notOk(exists(".chat-channel-unread-indicator"));
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  });
});
