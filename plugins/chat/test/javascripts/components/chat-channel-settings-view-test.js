<<<<<<< HEAD
import ChatChannel from "discourse/plugins/chat/discourse/models/chat-channel";
import { setupRenderingTest } from "discourse/tests/helpers/component-test";
import hbs from "htmlbars-inline-precompile";
import I18n from "I18n";
import { module, test } from "qunit";
import { render } from "@ember/test-helpers";

module(
  "Discourse Chat | Component | chat-channel-settings-view",
  function (hooks) {
    setupRenderingTest(hooks);

    test("display retention info", async function (assert) {
      this.set("channel", ChatChannel.create({ chatable_type: "Category" }));

      await render(hbs`<ChatChannelSettingsView @channel={{this.channel}} />`);

      assert.dom(".chat-retention-info").hasText(
        I18n.t("chat.retention_reminders.public", {
          count: this.siteSettings.chat_channel_retention_days,
        })
      );
=======
import componentTest, {
  setupRenderingTest,
} from "discourse/tests/helpers/component-test";
import hbs from "htmlbars-inline-precompile";
import fabricators from "../helpers/fabricators";
import selectKit from "discourse/tests/helpers/select-kit-helper";
import pretender from "discourse/tests/helpers/create-pretender";
import { CHATABLE_TYPES } from "discourse/plugins/chat/discourse/models/chat-channel";
import { module } from "qunit";

function membershipFixture(id, options = {}) {
  options = Object.assign(
    {},
    {
      muted: false,
      following: true,
    },
    options
  );

  return {
    following: options.following,
    muted: options.muted,
    desktop_notification_level: "mention",
    mobile_notification_level: "mention",
    chat_channel_id: id,
    chatable_type: "Category",
    user_count: 2,
  };
}

module(
  "Discourse Chat | Component | chat-channel-settings-view | Public channel - regular user",
  function (hooks) {
    setupRenderingTest(hooks);

    componentTest("saving desktop notifications", {
      template: hbs`{{chat-channel-settings-view channel=channel}}`,

      beforeEach() {
        this.set("channel", fabricators.chatChannel());
      },

      async test(assert) {
        pretender.put(
          `/chat/api/chat_channels/${this.channel.id}/notifications_settings.json`,
          () => {
            return [
              200,
              { "Content-Type": "application/json" },
              membershipFixture(this.channel.id),
            ];
          }
        );

        const sk = selectKit(
          ".channel-settings-view__desktop-notification-level-selector"
        );
        await sk.expand();
        await sk.selectRowByValue("mention");

        assert.equal(sk.header().value(), "mention");
      },
    });

    componentTest("saving mobile notifications", {
      template: hbs`{{chat-channel-settings-view channel=channel}}`,

      beforeEach() {
        this.set("channel", fabricators.chatChannel());
      },

      async test(assert) {
        pretender.put(
          `/chat/api/chat_channels/${this.channel.id}/notifications_settings.json`,
          () => {
            return [
              200,
              { "Content-Type": "application/json" },
              membershipFixture(this.channel.id),
            ];
          }
        );

        const sk = selectKit(
          ".channel-settings-view__mobile-notification-level-selector"
        );
        await sk.expand();
        await sk.selectRowByValue("mention");

        assert.equal(sk.header().value(), "mention");
      },
    });

    componentTest("muted", {
      template: hbs`{{chat-channel-settings-view channel=channel}}`,

      beforeEach() {
        this.set("channel", fabricators.chatChannel());
      },

      async test(assert) {
        pretender.put(
          `/chat/api/chat_channels/${this.channel.id}/notifications_settings.json`,
          () => {
            return [
              200,
              { "Content-Type": "application/json" },
              membershipFixture(this.channel.id, { muted: false }),
            ];
          }
        );

        const sk = selectKit(".channel-settings-view__muted-selector");
        await sk.expand();
        await sk.selectRowByName("Off");

        assert.equal(sk.header().value(), "false");
      },
    });

    componentTest("hide channel wide mentions", {
      template: hbs`{{chat-channel-settings-view channel=channel}}`,

      beforeEach() {
        this.set("channel", fabricators.chatChannel());
      },

      async test(assert) {
        assert
          .dom(".channel-settings-view__channel-wide-mentions-selector")
          .doesNotExist();
      },
    });

    componentTest("hide channel auto join", {
      template: hbs`{{chat-channel-settings-view channel=channel}}`,

      beforeEach() {
        this.set("channel", fabricators.chatChannel());
      },

      async test(assert) {
        assert.dom(".channel-settings-view__auto-join-selector").doesNotExist();
      },
    });
  }
);

module(
  "Discourse Chat | Component | chat-channel-settings-view | Direct Message channel - regular user",
  function (hooks) {
    setupRenderingTest(hooks);

    componentTest("saving desktop notifications", {
      template: hbs`{{chat-channel-settings-view channel=channel}}`,

      beforeEach() {
        this.set(
          "channel",
          fabricators.chatChannel({
            chatable_type: CHATABLE_TYPES.directMessageChannel,
          })
        );
      },

      async test(assert) {
        pretender.put(
          `/chat/api/chat_channels/${this.channel.id}/notifications_settings.json`,
          () => {
            return [
              200,
              { "Content-Type": "application/json" },
              membershipFixture(this.channel.id),
            ];
          }
        );

        const sk = selectKit(
          ".channel-settings-view__desktop-notification-level-selector"
        );
        await sk.expand();
        await sk.selectRowByValue("mention");

        assert.equal(sk.header().value(), "mention");
      },
    });

    componentTest("saving mobile notifications", {
      template: hbs`{{chat-channel-settings-view channel=channel}}`,

      beforeEach() {
        this.set(
          "channel",
          fabricators.chatChannel({
            chatable_type: CHATABLE_TYPES.directMessageChannel,
          })
        );
      },
      async test(assert) {
        pretender.put(
          `/chat/api/chat_channels/${this.channel.id}/notifications_settings.json`,
          () => {
            return [
              200,
              { "Content-Type": "application/json" },
              membershipFixture(this.channel.id),
            ];
          }
        );

        const sk = selectKit(
          ".channel-settings-view__mobile-notification-level-selector"
        );
        await sk.expand();
        await sk.selectRowByValue("mention");

        assert.equal(sk.header().value(), "mention");
      },
    });

    componentTest("muted", {
      template: hbs`{{chat-channel-settings-view channel=channel}}`,

      beforeEach() {
        this.set(
          "channel",
          fabricators.chatChannel({
            chatable_type: CHATABLE_TYPES.directMessageChannel,
          })
        );
      },

      async test(assert) {
        pretender.put(
          `/chat/api/chat_channels/${this.channel.id}/notifications_settings.json`,
          () => {
            return [
              200,
              { "Content-Type": "application/json" },
              membershipFixture(this.channel.id, { muted: false }),
            ];
          }
        );

        const sk = selectKit(".channel-settings-view__muted-selector");
        await sk.expand();
        await sk.selectRowByName("Off");

        assert.equal(sk.header().value(), "false");
      },
    });

    componentTest("hide channel wide mentions", {
      template: hbs`{{chat-channel-settings-view channel=channel}}`,

      beforeEach() {
        this.set(
          "channel",
          fabricators.chatChannel({
            chatable_type: CHATABLE_TYPES.directMessageChannel,
          })
        );
      },

      async test(assert) {
        assert
          .dom(".channel-settings-view__channel-wide-mentions-selector")
          .doesNotExist();
      },
    });

    componentTest("hide channel auto join", {
      template: hbs`{{chat-channel-settings-view channel=channel}}`,

      beforeEach() {
        this.set(
          "channel",
          fabricators.chatChannel({
            chatable_type: CHATABLE_TYPES.directMessageChannel,
          })
        );
      },

      async test(assert) {
        assert.dom(".channel-settings-view__auto-join-selector").doesNotExist();
      },
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    });
  }
);
