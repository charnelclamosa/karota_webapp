<<<<<<< HEAD
import { setupRenderingTest } from "discourse/tests/helpers/component-test";
import hbs from "htmlbars-inline-precompile";
import { module, test } from "qunit";
import { render } from "@ember/test-helpers";
import fabricators from "discourse/plugins/chat/discourse/lib/fabricators";

function containerSelector(user, options = {}) {
  let onlineSelector = ":not(.is-online)";
  if (options.online) {
    onlineSelector = ".is-online";
  }

  return `.chat-user-avatar${onlineSelector} .chat-user-avatar__container[data-user-card=${user.username}] .avatar[title=${user.username}]`;
}

module("Discourse Chat | Component | <Chat::UserAvatar />", function (hooks) {
  setupRenderingTest(hooks);

  test("user is not online", async function (assert) {
    this.user = fabricators.user();
    this.chat = { presenceChannel: { users: [] } };

    await render(
      hbs`<Chat::UserAvatar @chat={{this.chat}} @user={{this.user}} />`
    );

    assert.dom(containerSelector(this.user, { online: false })).exists();
  });

  test("user is online", async function (assert) {
    this.user = fabricators.user();
    this.chat = {
      presenceChannel: { users: [{ id: this.user.id }] },
    };

    await render(
      hbs`<Chat::UserAvatar @chat={{this.chat}} @user={{this.user}} />`
    );

    assert.dom(containerSelector(this.user, { online: true })).exists();
  });

  test("showPresence=false", async function (assert) {
    this.user = fabricators.user();
    this.chat = {
      presenceChannel: { users: [{ id: this.user.id }] },
    };

    await render(
      hbs`<Chat::UserAvatar @showPresence={{false}} @chat={{this.chat}} @user={{this.user}} />`
    );

    assert.dom(containerSelector(this.user, { online: false })).exists();
=======
import componentTest, {
  setupRenderingTest,
} from "discourse/tests/helpers/component-test";
import { exists } from "discourse/tests/helpers/qunit-helpers";
import hbs from "htmlbars-inline-precompile";
import { module } from "qunit";

const user = {
  id: 1,
  username: "markvanlan",
  name: null,
  avatar_template: "/letter_avatar_proxy/v4/letter/m/48db29/{size}.png",
};

module("Discourse Chat | Component | chat-user-avatar", function (hooks) {
  setupRenderingTest(hooks);

  componentTest("user is not online", {
    template: hbs`{{chat-user-avatar chat=chat user=user}}`,

    async beforeEach() {
      this.set("user", user);
      this.set("chat", { presenceChannel: { users: [] } });
    },

    async test(assert) {
      assert.ok(
        exists(
          `.chat-user-avatar .chat-user-avatar-container[data-user-card=${user.username}] .avatar[title=${user.username}]`
        )
      );
      assert.notOk(exists(".chat-user-avatar.is-online"));
    },
  });

  componentTest("user is online", {
    template: hbs`{{chat-user-avatar chat=chat user=user}}`,

    async beforeEach() {
      this.set("user", user);
      this.set("chat", {
        presenceChannel: { users: [{ id: user.id }] },
      });
    },

    async test(assert) {
      assert.ok(
        exists(
          `.chat-user-avatar .chat-user-avatar-container[data-user-card=${user.username}] .avatar[title=${user.username}]`
        )
      );
      assert.ok(exists(".chat-user-avatar.is-online"));
    },
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  });
});
