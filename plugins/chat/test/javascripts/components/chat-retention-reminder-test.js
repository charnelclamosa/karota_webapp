import ChatChannel from "discourse/plugins/chat/discourse/models/chat-channel";
<<<<<<< HEAD
import { setupRenderingTest } from "discourse/tests/helpers/component-test";
import hbs from "htmlbars-inline-precompile";
import I18n from "I18n";
import { module, test } from "qunit";
import { render } from "@ember/test-helpers";
=======
import { set } from "@ember/object";
import componentTest, {
  setupRenderingTest,
} from "discourse/tests/helpers/component-test";
import { exists, query } from "discourse/tests/helpers/qunit-helpers";
import hbs from "htmlbars-inline-precompile";
import I18n from "I18n";
import { module } from "qunit";
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

module(
  "Discourse Chat | Component | chat-retention-reminder",
  function (hooks) {
    setupRenderingTest(hooks);

<<<<<<< HEAD
    test("display retention info", async function (assert) {
      this.channel = ChatChannel.create({ chatable_type: "Category" });
      this.currentUser.set("needs_channel_retention_reminder", true);

      await render(hbs`<ChatRetentionReminder @channel={{this.channel}} />`);

      assert.dom(".chat-retention-reminder").includesText(
        I18n.t("chat.retention_reminders.public", {
          count: this.siteSettings.chat_channel_retention_days,
        })
      );
=======
    componentTest("Shows for public channels when user needs it", {
      template: hbs`{{chat-retention-reminder chatChannel=chatChannel}}`,

      async beforeEach() {
        this.set(
          "chatChannel",
          ChatChannel.create({ chatable_type: "Category" })
        );
        set(this.currentUser, "needs_channel_retention_reminder", true);
        this.siteSettings.chat_channel_retention_days = 100;
      },

      async test(assert) {
        assert.equal(
          query(".chat-retention-reminder-text").innerText.trim(),
          I18n.t("chat.retention_reminders.public", { days: 100 })
        );
      },
    });

    componentTest(
      "Doesn't show for public channels when user has dismissed it",
      {
        template: hbs`{{chat-retention-reminder chatChannel=chatChannel}}`,

        async beforeEach() {
          this.set(
            "chatChannel",
            ChatChannel.create({ chatable_type: "Category" })
          );
          set(this.currentUser, "needs_channel_retention_reminder", false);
          this.siteSettings.chat_channel_retention_days = 100;
        },

        async test(assert) {
          assert.notOk(exists(".chat-retention-reminder"));
        },
      }
    );

    componentTest("Shows for direct message channels when user needs it", {
      template: hbs`{{chat-retention-reminder chatChannel=chatChannel}}`,

      async beforeEach() {
        this.set(
          "chatChannel",
          ChatChannel.create({ chatable_type: "DirectMessage" })
        );
        set(this.currentUser, "needs_dm_retention_reminder", true);
        this.siteSettings.chat_dm_retention_days = 100;
      },

      async test(assert) {
        assert.equal(
          query(".chat-retention-reminder-text").innerText.trim(),
          I18n.t("chat.retention_reminders.dm", { days: 100 })
        );
      },
    });

    componentTest("Doesn't show for dm channels when user has dismissed it", {
      template: hbs`{{chat-retention-reminder chatChannel=chatChannel}}`,

      async beforeEach() {
        this.set(
          "chatChannel",
          ChatChannel.create({ chatable_type: "DirectMessage" })
        );
        set(this.currentUser, "needs_dm_retention_reminder", false);
        this.siteSettings.chat_dm_retention_days = 100;
      },

      async test(assert) {
        assert.notOk(exists(".chat-retention-reminder"));
      },
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    });
  }
);
