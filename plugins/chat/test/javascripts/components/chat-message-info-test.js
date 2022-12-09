import Bookmark from "discourse/models/bookmark";
<<<<<<< HEAD
import { setupRenderingTest } from "discourse/tests/helpers/component-test";
import hbs from "htmlbars-inline-precompile";
import { exists, query } from "discourse/tests/helpers/qunit-helpers";
import I18n from "I18n";
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
import I18n from "I18n";
import { module } from "qunit";
import User from "discourse/models/user";
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

module("Discourse Chat | Component | chat-message-info", function (hooks) {
  setupRenderingTest(hooks);

<<<<<<< HEAD
  const template = hbs`
    <Chat::Message::Info @message={{this.message}} @show={{true}} />
  `;

  test("chat_webhook_event", async function (assert) {
    this.message = fabricators.message({
      chat_webhook_event: { username: "discobot" },
    });

    await render(template);

    assert.strictEqual(
      query(".chat-message-info__username").innerText.trim(),
      this.message.chatWebhookEvent.username
    );
    assert.strictEqual(
      query(".chat-message-info__bot-indicator").textContent.trim(),
      I18n.t("chat.bot")
    );
  });

  test("user", async function (assert) {
    this.message = fabricators.message({
      user: { username: "discobot" },
    });

    await render(template);

    assert.strictEqual(
      query(".chat-message-info__username").innerText.trim(),
      this.message.user.username
    );
  });

  test("date", async function (assert) {
    this.message = fabricators.message({
      user: { username: "discobot" },
      created_at: moment(),
    });

    await render(template);

    assert.true(exists(".chat-message-info__date"));
  });

  test("bookmark (with reminder)", async function (assert) {
    this.message = fabricators.message({
      user: { username: "discobot" },
      bookmark: Bookmark.create({
        reminder_at: moment(),
        name: "some name",
      }),
    });

    await render(template);

    assert.true(
      exists(".chat-message-info__bookmark .d-icon-discourse-bookmark-clock")
    );
  });

  test("bookmark (no reminder)", async function (assert) {
    this.message = ChatMessage.create(fabricators.channel(), {
      user: { username: "discobot" },
      bookmark: Bookmark.create({
        name: "some name",
      }),
    });

    await render(template);

    assert.true(exists(".chat-message-info__bookmark .d-icon-bookmark"));
  });

  test("user status", async function (assert) {
    const status = { description: "off to dentist", emoji: "tooth" };
    this.message = fabricators.message({ user: { status } });

    await render(template);

    assert.true(exists(".chat-message-info__status .user-status-message"));
  });

  test("flag status", async function (assert) {
    this.message = fabricators.message({
      user: { username: "discobot" },
      user_flag_status: 0,
    });

    await render(template);

    assert
      .dom(".chat-message-info__flag > .svg-icon-title")
      .hasAttribute("title", I18n.t("chat.you_flagged"));
  });

  test("reviewable", async function (assert) {
    this.message = fabricators.message({
      user: { username: "discobot" },
      user_flag_status: 0,
    });

    await render(template);

    assert
      .dom(".chat-message-info__flag > .svg-icon-title")
      .hasAttribute("title", I18n.t("chat.you_flagged"));
  });

  test("with username classes", async function (assert) {
    this.message = fabricators.message({
      user: {
        username: "discobot",
        admin: true,
        moderator: true,
        new_user: true,
        primary_group_name: "foo",
      },
    });

    await render(template);

    assert.dom(".chat-message-info__username.is-staff").exists();
    assert.dom(".chat-message-info__username.is-admin").exists();
    assert.dom(".chat-message-info__username.is-moderator").exists();
    assert.dom(".chat-message-info__username.is-new-user").exists();
    assert.dom(".chat-message-info__username.group--foo").exists();
  });

  test("without username classes", async function (assert) {
    this.message = fabricators.message({
      user: { username: "discobot" },
    });

    await render(template);

    assert.dom(".chat-message-info__username.is-staff").doesNotExist();
    assert.dom(".chat-message-info__username.is-admin").doesNotExist();
    assert.dom(".chat-message-info__username.is-moderator").doesNotExist();
    assert.dom(".chat-message-info__username.is-new-user").doesNotExist();
    assert.dom(".chat-message-info__username.group--foo").doesNotExist();
=======
  componentTest("chat_webhook_event", {
    template: hbs`{{chat-message-info message=message}}`,

    beforeEach() {
      this.set("message", { chat_webhook_event: { username: "discobot" } });
    },

    async test(assert) {
      assert.equal(
        query(".chat-message-info__username").innerText.trim(),
        this.message.chat_webhook_event.username
      );
      assert.equal(
        query(".chat-message-info__bot-indicator").textContent.trim(),
        I18n.t("chat.bot")
      );
    },
  });

  componentTest("user", {
    template: hbs`{{chat-message-info message=message}}`,

    beforeEach() {
      this.set("message", { user: { username: "discobot" } });
    },

    async test(assert) {
      assert.equal(
        query(".chat-message-info__username").innerText.trim(),
        this.message.user.username
      );
    },
  });

  componentTest("date", {
    template: hbs`{{chat-message-info message=message}}`,

    beforeEach() {
      this.set("message", {
        user: { username: "discobot" },
        created_at: moment(),
      });
    },

    async test(assert) {
      assert.ok(exists(".chat-message-info__date"));
    },
  });

  componentTest("bookmark (with reminder)", {
    template: hbs`{{chat-message-info message=message}}`,

    beforeEach() {
      this.set("message", {
        user: { username: "discobot" },
        bookmark: Bookmark.create({
          reminder_at: moment(),
          name: "some name",
        }),
      });
    },

    async test(assert) {
      assert.ok(
        exists(".chat-message-info__bookmark .d-icon-discourse-bookmark-clock")
      );
    },
  });

  componentTest("bookmark (no reminder)", {
    template: hbs`{{chat-message-info message=message}}`,

    beforeEach() {
      this.set("message", {
        user: { username: "discobot" },
        bookmark: Bookmark.create({
          name: "some name",
        }),
      });
    },

    async test(assert) {
      assert.ok(exists(".chat-message-info__bookmark .d-icon-bookmark"));
    },
  });

  componentTest("user status", {
    template: hbs`{{chat-message-info message=message}}`,

    beforeEach() {
      const status = { description: "off to dentist", emoji: "tooth" };
      this.set("message", { user: User.create({ status }) });
    },

    async test(assert) {
      assert.ok(exists(".chat-message-info__status .user-status-message"));
    },
  });

  componentTest("reviewable", {
    template: hbs`{{chat-message-info message=message}}`,

    beforeEach() {
      this.set("message", {
        user: { username: "discobot" },
        user_flag_status: 0,
      });
    },

    async test(assert) {
      assert.equal(
        query(".chat-message-info__flag > .svg-icon-title").title,
        I18n.t("chat.you_flagged")
      );

      this.set("message", {
        user: { username: "discobot" },
        reviewable_id: 1,
      });

      assert.equal(
        query(".chat-message-info__flag a .svg-icon-title").title,
        I18n.t("chat.flagged")
      );
    },
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  });
});
