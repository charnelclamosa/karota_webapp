import { setupRenderingTest } from "discourse/tests/helpers/component-test";
import { exists, query } from "discourse/tests/helpers/qunit-helpers";
import hbs from "htmlbars-inline-precompile";
<<<<<<< HEAD
import fabricators from "discourse/plugins/chat/discourse/lib/fabricators";
=======
import fabricators from "../helpers/fabricators";
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
import { render } from "@ember/test-helpers";
import { module, test } from "qunit";
import I18n from "I18n";

module("Discourse Chat | Component | chat-channel-card", function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
<<<<<<< HEAD
    this.channel = fabricators.channel();
    this.channel.description =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
  });

  test("escapes channel title", async function (assert) {
    this.channel.title = "<div class='xss'>evil</div>";

    await render(hbs`<ChatChannelCard @channel={{this.channel}} />`);

    assert.false(exists(".xss"));
  });

  test("escapes channel description", async function (assert) {
    this.channel.description = "<div class='xss'>evil</div>";

    await render(hbs`<ChatChannelCard @channel={{this.channel}} />`);

    assert.false(exists(".xss"));
  });

  test("Closed channel", async function (assert) {
    this.channel.status = "closed";
    await render(hbs`<ChatChannelCard @channel={{this.channel}} />`);

    assert.true(exists(".chat-channel-card.-closed"));
  });

  test("Archived channel", async function (assert) {
    this.channel.status = "archived";
    await render(hbs`<ChatChannelCard @channel={{this.channel}} />`);

    assert.true(exists(".chat-channel-card.-archived"));
  });

  test("Muted channel", async function (assert) {
    this.channel.currentUserMembership.muted = true;
    this.channel.currentUserMembership.following = true;
    await render(hbs`<ChatChannelCard @channel={{this.channel}} />`);

    assert.strictEqual(
=======
    this.set("channel", fabricators.chatChannel());
    this.channel.set(
      "description",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    );
  });

  test("escapes channel title", async function (assert) {
    this.channel.set("title", "<div class='xss'>evil</div>");

    await render(hbs`{{chat-channel-card channel=channel}}`);

    assert.notOk(exists(".xss"));
  });

  test("escapes channel description", async function (assert) {
    this.channel.set("description", "<div class='xss'>evil</div>");

    await render(hbs`{{chat-channel-card channel=channel}}`);

    assert.notOk(exists(".xss"));
  });

  test("Closed channel", async function (assert) {
    this.channel.set("status", "closed");
    await render(hbs`{{chat-channel-card channel=channel}}`);

    assert.ok(exists(".chat-channel-card.-closed"));
  });

  test("Archived channel", async function (assert) {
    this.channel.set("status", "archived");
    await render(hbs`{{chat-channel-card channel=channel}}`);

    assert.ok(exists(".chat-channel-card.-archived"));
  });

  test("Muted channel", async function (assert) {
    this.channel.current_user_membership.set("muted", true);
    this.channel.current_user_membership.set("following", true);
    await render(hbs`{{chat-channel-card channel=channel}}`);

    assert.equal(
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      query(".chat-channel-card__tag.-muted").textContent.trim(),
      I18n.t("chat.muted")
    );
  });

  test("Joined channel", async function (assert) {
<<<<<<< HEAD
    this.channel.currentUserMembership.following = true;
    await render(hbs`<ChatChannelCard @channel={{this.channel}} />`);

    assert.strictEqual(
=======
    this.channel.current_user_membership.set("following", true);
    await render(hbs`{{chat-channel-card channel=channel}}`);

    assert.equal(
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      query(".chat-channel-card__tag.-joined").textContent.trim(),
      I18n.t("chat.joined")
    );

<<<<<<< HEAD
    assert.true(exists(".toggle-channel-membership-button.-leave"));
  });

  test("Joinable channel", async function (assert) {
    await render(hbs`<ChatChannelCard @channel={{this.channel}} />`);

    assert.true(exists(".chat-channel-card__join-btn"));
  });

  test("Memberships count", async function (assert) {
    this.channel.membershipsCount = 4;
    await render(hbs`<ChatChannelCard @channel={{this.channel}} />`);

    assert.strictEqual(
=======
    assert.ok(exists(".toggle-channel-membership-button.-leave"));
  });

  test("Joinable channel", async function (assert) {
    await render(hbs`{{chat-channel-card channel=channel}}`);

    assert.ok(exists(".chat-channel-card__join-btn"));
  });

  test("Memberships count", async function (assert) {
    this.channel.set("memberships_count", 4);
    await render(hbs`{{chat-channel-card channel=channel}}`);

    assert.equal(
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      query(".chat-channel-card__members").textContent.trim(),
      I18n.t("chat.channel.memberships_count", { count: 4 })
    );
  });

  test("No description", async function (assert) {
<<<<<<< HEAD
    this.channel.description = null;
    await render(hbs`<ChatChannelCard @channel={{this.channel}} />`);

    assert.false(exists(".chat-channel-card__description"));
  });

  test("Description", async function (assert) {
    await render(hbs`<ChatChannelCard @channel={{this.channel}} />`);

    assert.strictEqual(
=======
    this.channel.set("description", null);
    await render(hbs`{{chat-channel-card channel=channel}}`);

    assert.notOk(exists(".chat-channel-card__description"));
  });

  test("Description", async function (assert) {
    await render(hbs`{{chat-channel-card channel=channel}}`);

    assert.equal(
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      query(".chat-channel-card__description").textContent.trim(),
      this.channel.description
    );
  });

  test("Name", async function (assert) {
<<<<<<< HEAD
    await render(hbs`<ChatChannelCard @channel={{this.channel}} />`);

    assert.strictEqual(
=======
    await render(hbs`{{chat-channel-card channel=channel}}`);

    assert.equal(
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      query(".chat-channel-card__name").innerText.trim(),
      this.channel.title
    );
  });

  test("Settings button", async function (assert) {
<<<<<<< HEAD
    await render(hbs`<ChatChannelCard @channel={{this.channel}} />`);

    assert.true(exists(".chat-channel-card__setting"));
  });

  test("Read restricted chatable", async function (assert) {
    this.channel.chatable.read_restricted = true;
    await render(hbs`<ChatChannelCard @channel={{this.channel}} />`);

    assert.true(exists(".d-icon-lock"));
    assert.strictEqual(
=======
    await render(hbs`{{chat-channel-card channel=channel}}`);

    assert.ok(exists(".chat-channel-card__setting"));
  });

  test("Read restricted chatable", async function (assert) {
    this.channel.set("chatable.read_restricted", true);
    await render(hbs`{{chat-channel-card channel=channel}}`);

    assert.ok(exists(".d-icon-lock"));
    assert.equal(
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      query(".chat-channel-card").style.borderLeftColor,
      "rgb(213, 99, 83)"
    );
  });
});
