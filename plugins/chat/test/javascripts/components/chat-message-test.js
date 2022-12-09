<<<<<<< HEAD
import { render } from "@ember/test-helpers";
import { exists } from "discourse/tests/helpers/qunit-helpers";
import { setupRenderingTest } from "discourse/tests/helpers/component-test";
import hbs from "htmlbars-inline-precompile";
import { module, test } from "qunit";
import fabricators from "discourse/plugins/chat/discourse/lib/fabricators";
=======
import User from "discourse/models/user";
import { render, waitFor } from "@ember/test-helpers";
import ChatMessage from "discourse/plugins/chat/discourse/models/chat-message";
import { exists } from "discourse/tests/helpers/qunit-helpers";
import { setupRenderingTest } from "discourse/tests/helpers/component-test";
import hbs from "htmlbars-inline-precompile";
import ChatChannel from "discourse/plugins/chat/discourse/models/chat-channel";
import { module, test } from "qunit";
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

module("Discourse Chat | Component | chat-message", function (hooks) {
  setupRenderingTest(hooks);

<<<<<<< HEAD
  const template = hbs`
    <ChatMessage @message={{this.message}} />
  `;

  test("Message with edits", async function (assert) {
    this.message = fabricators.message({ edited: true });
    await render(template);

    assert.true(exists(".chat-message-edited"), "has the correct css class");
  });

  test("Deleted message", async function (assert) {
    this.message = fabricators.message({
      user: this.currentUser,
      deleted_at: moment(),
    });
    await render(template);

    assert.true(
      exists(".chat-message-text.-deleted .chat-message-expand"),
      "has the correct css class and expand button within"
=======
  function generateMessageProps(messageData = {}) {
    const chatChannel = ChatChannel.create({
      chatable: { id: 1 },
      chatable_type: "Category",
      id: 9,
      title: "Site",
      last_message_sent_at: "2021-11-08T21:26:05.710Z",
      current_user_membership: {
        unread_count: 0,
        muted: false,
      },
    });
    return {
      message: ChatMessage.create(
        Object.assign(
          {
            id: 178,
            message: "from deleted user",
            cooked: "<p>from deleted user</p>",
            excerpt: "<p>from deleted user</p>",
            created_at: "2021-07-22T08:14:16.950Z",
            flag_count: 0,
            user: User.create({ username: "someguy", id: 1424 }),
            edited: false,
          },
          messageData
        )
      ),
      canInteractWithChat: true,
      details: {
        can_delete_self: true,
        can_delete_others: true,
        can_flag: true,
        user_silenced: false,
        can_moderate: true,
      },
      chatChannel,
      setReplyTo: () => {},
      replyMessageClicked: () => {},
      editButtonClicked: () => {},
      afterExpand: () => {},
      selectingMessages: false,
      onStartSelectingMessages: () => {},
      onSelectMessage: () => {},
      bulkSelectMessages: () => {},
      afterReactionAdded: () => {},
      onHoverMessage: () => {},
    };
  }

  const template = hbs`{{chat-message
      message=message
      canInteractWithChat=canInteractWithChat
      details=this.details
      chatChannel=chatChannel
      setReplyTo=setReplyTo
      replyMessageClicked=replyMessageClicked
      editButtonClicked=editButtonClicked
      selectingMessages=selectingMessages
      onStartSelectingMessages=onStartSelectingMessages
      onSelectMessage=onSelectMessage
      bulkSelectMessages=bulkSelectMessages
      onHoverMessage=onHoverMessage
      afterReactionAdded=reStickScrollIfNeeded
    }}`;

  test("Message with edits", async function (assert) {
    this.setProperties(generateMessageProps({ edited: true }));
    await render(template);
    assert.ok(
      exists(".chat-message-edited"),
      "has the correct edited css class"
    );
  });

  test("Deleted message", async function (assert) {
    this.setProperties(generateMessageProps({ deleted_at: moment() }));
    await render(template);
    assert.ok(
      exists(".chat-message-deleted .chat-message-expand"),
      "has the correct deleted css class and expand button within"
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    );
  });

  test("Hidden message", async function (assert) {
<<<<<<< HEAD
    this.message = fabricators.message({ hidden: true });
    await render(template);

    assert.true(
      exists(".chat-message-text.-hidden .chat-message-expand"),
      "has the correct css class and expand button within"
    );
  });

  test("Message with reply", async function (assert) {
    this.message = fabricators.message({ inReplyTo: fabricators.message() });
    await render(template);

    assert.true(
      exists(".chat-message-container.has-reply"),
      "has the correct css class"
=======
    this.setProperties(generateMessageProps({ hidden: true }));
    await render(template);
    assert.ok(
      exists(".chat-message-hidden .chat-message-expand"),
      "has the correct hidden css class and expand button within"
    );
  });

  test("Message marked as visible", async function (assert) {
    this.setProperties(generateMessageProps());

    await render(template);
    await waitFor("div[data-visible=true]");

    assert.ok(
      exists(".chat-message-container[data-visible=true]"),
      "message is marked as visible"
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    );
  });
});
