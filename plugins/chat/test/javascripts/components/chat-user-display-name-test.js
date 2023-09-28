<<<<<<< HEAD
import { setupRenderingTest } from "discourse/tests/helpers/component-test";
import { query } from "discourse/tests/helpers/qunit-helpers";
import hbs from "htmlbars-inline-precompile";
import { module, test } from "qunit";
import { render } from "@ember/test-helpers";
=======
import componentTest, {
  setupRenderingTest,
} from "discourse/tests/helpers/component-test";
import { query } from "discourse/tests/helpers/qunit-helpers";
import hbs from "htmlbars-inline-precompile";
import { module } from "qunit";
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

function displayName() {
  return query(".chat-user-display-name").innerText.trim();
}

module(
  "Discourse Chat | Component | chat-user-display-name | prioritize username in UX",
  function (hooks) {
    setupRenderingTest(hooks);

<<<<<<< HEAD
    test("username and no name", async function (assert) {
      this.siteSettings.prioritize_username_in_ux = true;
      this.set("user", { username: "bob", name: null });

      await render(hbs`<ChatUserDisplayName @user={{this.user}} />`);

      assert.strictEqual(displayName(), "bob");
    });

    test("username and name", async function (assert) {
      this.siteSettings.prioritize_username_in_ux = true;
      this.set("user", { username: "bob", name: "Bobcat" });

      await render(hbs`<ChatUserDisplayName @user={{this.user}} />`);

      assert.strictEqual(displayName(), "bob — Bobcat");
=======
    componentTest("username and no name", {
      template: hbs`{{chat-user-display-name user=user}}`,

      async beforeEach() {
        this.siteSettings.prioritize_username_in_ux = true;
        this.set("user", { username: "bob", name: null });
      },

      async test(assert) {
        assert.equal(displayName(), "bob");
      },
    });

    componentTest("username and name", {
      template: hbs`{{chat-user-display-name user=user}}`,

      async beforeEach() {
        this.siteSettings.prioritize_username_in_ux = true;
        this.set("user", { username: "bob", name: "Bobcat" });
      },

      async test(assert) {
        assert.equal(displayName(), "bob — Bobcat");
      },
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    });
  }
);

module(
  "Discourse Chat | Component | chat-user-display-name | prioritize name in UX",
  function (hooks) {
    setupRenderingTest(hooks);

<<<<<<< HEAD
    test("no name", async function (assert) {
      this.siteSettings.prioritize_username_in_ux = false;
      this.set("user", { username: "bob", name: null });

      await render(hbs`<ChatUserDisplayName @user={{this.user}} />`);

      assert.strictEqual(displayName(), "bob");
    });

    test("name and username", async function (assert) {
      this.siteSettings.prioritize_username_in_ux = false;
      this.set("user", { username: "bob", name: "Bobcat" });

      await render(hbs`<ChatUserDisplayName @user={{this.user}} />`);

      assert.strictEqual(displayName(), "Bobcat — bob");
=======
    componentTest("no name", {
      template: hbs`{{chat-user-display-name user=user}}`,

      async beforeEach() {
        this.siteSettings.prioritize_username_in_ux = false;
        this.set("user", { username: "bob", name: null });
      },

      async test(assert) {
        assert.equal(displayName(), "bob");
      },
    });

    componentTest("name and username", {
      template: hbs`{{chat-user-display-name user=user}}`,

      async beforeEach() {
        this.siteSettings.prioritize_username_in_ux = false;
        this.set("user", { username: "bob", name: "Bobcat" });
      },

      async test(assert) {
        assert.equal(displayName(), "Bobcat — bob");
      },
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    });
  }
);
