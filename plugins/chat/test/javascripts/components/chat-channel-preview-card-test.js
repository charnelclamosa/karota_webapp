import { setupRenderingTest } from "discourse/tests/helpers/component-test";
import { exists, query } from "discourse/tests/helpers/qunit-helpers";
import hbs from "htmlbars-inline-precompile";
import { render } from "@ember/test-helpers";
import { module, test } from "qunit";
<<<<<<< HEAD
import fabricators from "discourse/plugins/chat/discourse/lib/fabricators";
=======
import fabricators from "../helpers/fabricators";
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

module(
  "Discourse Chat | Component | chat-channel-preview-card",
  function (hooks) {
    setupRenderingTest(hooks);

    hooks.beforeEach(function () {
<<<<<<< HEAD
      this.set("channel", fabricators.channel({ chatable_type: "Category" }));

      this.channel.description = "Important stuff is announced here.";
      this.channel.title = "announcements";
      this.channel.meta = { can_join_chat_channel: true };
=======
      this.set(
        "channel",
        fabricators.chatChannel({ chatable_type: "Category" })
      );
      this.channel.setProperties({
        description: "Important stuff is announced here.",
        title: "announcements",
      });
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      this.currentUser.set("has_chat_enabled", true);
      this.siteSettings.chat_enabled = true;
    });

    test("channel title", async function (assert) {
<<<<<<< HEAD
      await render(hbs`<ChatChannelPreviewCard @channel={{this.channel}} />`);

      assert.strictEqual(
=======
      await render(hbs`{{chat-channel-preview-card channel=channel}}`);

      assert.equal(
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
        query(".chat-channel-title__name").innerText,
        this.channel.title,
        "it shows the channel title"
      );

<<<<<<< HEAD
      assert.true(
=======
      assert.ok(
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
        exists(query(".chat-channel-title__category-badge")),
        "it shows the category hashtag badge"
      );
    });

    test("channel description", async function (assert) {
<<<<<<< HEAD
      await render(hbs`<ChatChannelPreviewCard @channel={{this.channel}} />`);

      assert.strictEqual(
=======
      await render(hbs`{{chat-channel-preview-card channel=channel}}`);

      assert.equal(
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
        query(".chat-channel-preview-card__description").innerText,
        this.channel.description,
        "the channel description is shown"
      );
    });

    test("no channel description", async function (assert) {
<<<<<<< HEAD
      this.channel.description = null;

      await render(hbs`<ChatChannelPreviewCard @channel={{this.channel}} />`);

      assert.false(
=======
      this.channel.set("description", null);

      await render(hbs`{{chat-channel-preview-card channel=channel}}`);

      assert.notOk(
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
        exists(".chat-channel-preview-card__description"),
        "no line is left for the channel description if there is none"
      );

<<<<<<< HEAD
      assert.true(
=======
      assert.ok(
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
        exists(".chat-channel-preview-card.-no-description"),
        "it adds a modifier class for styling"
      );
    });

    test("join", async function (assert) {
<<<<<<< HEAD
      await render(hbs`<ChatChannelPreviewCard @channel={{this.channel}} />`);

      assert.true(
=======
      await render(hbs`{{chat-channel-preview-card channel=channel}}`);

      assert.ok(
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
        exists(".toggle-channel-membership-button.-join"),
        "it shows the join channel button"
      );
    });

    test("browse all", async function (assert) {
<<<<<<< HEAD
      await render(hbs`<ChatChannelPreviewCard @channel={{this.channel}} />`);

      assert.true(
=======
      await render(hbs`{{chat-channel-preview-card channel=channel}}`);

      assert.ok(
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
        exists(".chat-channel-preview-card__browse-all"),
        "it shows a link to browse all channels"
      );
    });

    test("closed channel", async function (assert) {
<<<<<<< HEAD
      this.channel.status = "closed";
      await render(hbs`<ChatChannelPreviewCard @channel={{this.channel}} />`);

      assert.false(
=======
      this.channel.set("status", "closed");
      await render(hbs`{{chat-channel-preview-card channel=channel}}`);

      assert.notOk(
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
        exists(".chat-channel-preview-card__join-channel-btn"),
        "it does not show the join channel button"
      );
    });
  }
);
