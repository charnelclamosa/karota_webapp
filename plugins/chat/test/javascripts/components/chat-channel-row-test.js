import { module, test } from "qunit";
import { setupRenderingTest } from "discourse/tests/helpers/component-test";
import { render } from "@ember/test-helpers";
import { hbs } from "ember-cli-htmlbars";
<<<<<<< HEAD
import fabricators from "discourse/plugins/chat/discourse/lib/fabricators";
=======
import fabricators from "../helpers/fabricators";
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

module("Discourse Chat | Component | chat-channel-row", function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
<<<<<<< HEAD
    this.categoryChatChannel = fabricators.channel();
    this.directMessageChannel = fabricators.directMessageChannel();
=======
    this.categoryChatChannel = fabricators.chatChannel();
    this.directMessageChatChannel = fabricators.directMessageChatChannel();
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  });

  test("links to correct channel", async function (assert) {
    await render(hbs`<ChatChannelRow @channel={{this.categoryChatChannel}} />`);

    assert
      .dom(".chat-channel-row")
<<<<<<< HEAD
      .hasAttribute(
        "href",
        `/chat/c/${this.categoryChatChannel.slugifiedTitle}/${this.categoryChatChannel.id}`
      );
=======
      .hasAttribute("href", `/chat/channel/${this.categoryChatChannel.id}/-`);
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  });

  test("allows tabbing", async function (assert) {
    await render(hbs`<ChatChannelRow @channel={{this.categoryChatChannel}} />`);

    assert.dom(".chat-channel-row").hasAttribute("tabindex", "0");
  });

  test("channel data attrite tabbing", async function (assert) {
    await render(hbs`<ChatChannelRow @channel={{this.categoryChatChannel}} />`);

    assert
      .dom(".chat-channel-row")
      .hasAttribute(
        "data-chat-channel-id",
        this.categoryChatChannel.id.toString()
      );
  });

  test("renders correct channel title", async function (assert) {
    await render(hbs`<ChatChannelRow @channel={{this.categoryChatChannel}} />`);

    assert.dom(".chat-channel-title").hasText(this.categoryChatChannel.title);
  });

  test("renders correct channel metadata", async function (assert) {
<<<<<<< HEAD
    this.categoryChatChannel.lastMessage = fabricators.message({
      created_at: moment().toISOString(),
    });
=======
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    await render(hbs`<ChatChannelRow @channel={{this.categoryChatChannel}} />`);

    assert
      .dom(".chat-channel-metadata")
      .hasText(
<<<<<<< HEAD
        moment(this.categoryChatChannel.lastMessage.createdAt).format("h:mm A")
=======
        moment(this.categoryChatChannel.last_message_sent_at).format("l")
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      );
  });

  test("renders membership toggling button when necessary", async function (assert) {
    this.site.desktopView = false;

    await render(hbs`<ChatChannelRow @channel={{this.categoryChatChannel}}/>`);

    assert.dom(".toggle-channel-membership-button").doesNotExist();

<<<<<<< HEAD
    this.categoryChatChannel.currentUserMembership.following = true;
=======
    this.categoryChatChannel.current_user_membership.following = true;
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

    await render(hbs`<ChatChannelRow @channel={{this.categoryChatChannel}} />`);

    assert.dom(".toggle-channel-membership-button").doesNotExist();

    this.site.desktopView = true;

    await render(
      hbs`<ChatChannelRow @channel={{this.categoryChatChannel}} @options={{hash leaveButton=true}}/>`
    );

    assert.dom(".toggle-channel-membership-button").exists();
  });

  test("focused channel has correct class", async function (assert) {
    await render(hbs`<ChatChannelRow @channel={{this.categoryChatChannel}} />`);

    assert.dom(".chat-channel-row").doesNotHaveClass("focused");

    this.categoryChatChannel.focused = true;

    await render(hbs`<ChatChannelRow @channel={{this.categoryChatChannel}} />`);

    assert.dom(".chat-channel-row").hasClass("focused");
  });

  test("muted channel has correct class", async function (assert) {
    await render(hbs`<ChatChannelRow @channel={{this.categoryChatChannel}} />`);

    assert.dom(".chat-channel-row").doesNotHaveClass("muted");

<<<<<<< HEAD
    this.categoryChatChannel.currentUserMembership.muted = true;
=======
    this.categoryChatChannel.current_user_membership.muted = true;
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

    await render(hbs`<ChatChannelRow @channel={{this.categoryChatChannel}} />`);

    assert.dom(".chat-channel-row").hasClass("muted");
  });

  test("leaveButton options adds correct class", async function (assert) {
    await render(hbs`<ChatChannelRow @channel={{this.categoryChatChannel}} />`);

    assert.dom(".chat-channel-row").doesNotHaveClass("can-leave");

    await render(
      hbs`<ChatChannelRow @channel={{this.categoryChatChannel}} @options={{hash leaveButton=true}} />`
    );

    assert.dom(".chat-channel-row").hasClass("can-leave");
  });

  test("active channel adds correct class", async function (assert) {
    await render(hbs`<ChatChannelRow @channel={{this.categoryChatChannel}} />`);

    assert.dom(".chat-channel-row").doesNotHaveClass("active");

    this.owner
      .lookup("service:chat")
      .set("activeChannel", { id: this.categoryChatChannel.id });

    await render(hbs`<ChatChannelRow @channel={{this.categoryChatChannel}} />`);

    assert.dom(".chat-channel-row").hasClass("active");
  });

  test("unreads adds correct class", async function (assert) {
    await render(hbs`<ChatChannelRow @channel={{this.categoryChatChannel}} />`);

    assert.dom(".chat-channel-row").doesNotHaveClass("has-unread");

<<<<<<< HEAD
    this.categoryChatChannel.tracking.unreadCount = 1;
=======
    this.owner
      .lookup("service:current-user")
      .set("chat_channel_tracking_state", {
        [this.categoryChatChannel.id]: { unread_count: 1 },
      });
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

    await render(hbs`<ChatChannelRow @channel={{this.categoryChatChannel}} />`);

    assert.dom(".chat-channel-row").hasClass("has-unread");
  });

  test("user status with category channel", async function (assert) {
    await render(hbs`<ChatChannelRow @channel={{this.categoryChatChannel}} />`);

    assert.dom(".user-status-message").doesNotExist();
  });

  test("user status with direct message channel", async function (assert) {
<<<<<<< HEAD
    this.directMessageChannel.chatable = fabricators.directMessage({
      users: [fabricators.user()],
    });
    const status = { description: "Off to dentist", emoji: "tooth" };
    this.directMessageChannel.chatable.users[0].status = status;

    await render(
      hbs`<ChatChannelRow @channel={{this.directMessageChannel}} />`
=======
    const status = { description: "Off to dentist", emoji: "tooth" };
    this.directMessageChatChannel.chatable.users[0].status = status;

    await render(
      hbs`<ChatChannelRow @channel={{this.directMessageChatChannel}} />`
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    );

    assert.dom(".user-status-message").exists();
  });

  test("user status with direct message channel and multiple users", async function (assert) {
    const status = { description: "Off to dentist", emoji: "tooth" };
<<<<<<< HEAD
    this.directMessageChannel.chatable.users[0].status = status;

    this.directMessageChannel.chatable.users.push({
=======
    this.directMessageChatChannel.chatable.users[0].status = status;

    this.directMessageChatChannel.chatable.users.push({
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      id: 2,
      username: "bill",
      name: null,
      avatar_template: "/letter_avatar_proxy/v3/letter/t/31188e/{size}.png",
    });

    await render(
<<<<<<< HEAD
      hbs`<ChatChannelRow @channel={{this.directMessageChannel}} />`
=======
      hbs`<ChatChannelRow @channel={{this.directMessageChatChannel}} />`
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    );

    assert.dom(".user-status-message").doesNotExist();
  });
});
