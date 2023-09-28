<<<<<<< HEAD
import { setupRenderingTest } from "discourse/tests/helpers/component-test";
import hbs from "htmlbars-inline-precompile";
import { exists } from "discourse/tests/helpers/qunit-helpers";
import { module, test } from "qunit";
import { render } from "@ember/test-helpers";
=======
import componentTest, {
  setupRenderingTest,
} from "discourse/tests/helpers/component-test";
import hbs from "htmlbars-inline-precompile";
import { exists } from "discourse/tests/helpers/qunit-helpers";
import { module } from "qunit";
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

module("Discourse Chat | Component | chat-message-text", function (hooks) {
  setupRenderingTest(hooks);

<<<<<<< HEAD
  test("yields", async function (assert) {
    this.set("cooked", "<p></p>");

    await render(hbs`
      <ChatMessageText @cooked={{this.cooked}} @uploads={{this.uploads}}>
        <div class="yield-me"></div>
      </ChatMessageText>
    `);

    assert.true(exists(".yield-me"));
  });

  test("shows collapsed", async function (assert) {
    this.set(
      "cooked",
      '<div class="youtube-onebox lazy-video-container" data-video-id="WaT_rLGuUr8" data-video-title="Japanese Katsu Curry (Pork Cutlet)" data-provider-name="youtube"/>'
    );

    await render(
      hbs`<ChatMessageText @cooked={{this.cooked}} @uploads={{this.uploads}} />`
    );

    assert.true(exists(".chat-message-collapser"));
  });

  test("does not collapse a non-image onebox", async function (assert) {
    this.set("cooked", '<p><a href="http://cat1.com" class="onebox"></a></p>');

    await render(hbs`<ChatMessageText @cooked={{this.cooked}} />`);

    assert.false(exists(".chat-message-collapser"));
  });

  test("shows edits - regular message", async function (assert) {
    this.set("cooked", "<p></p>");

    await render(
      hbs`<ChatMessageText @cooked={{this.cooked}} @edited={{true}} />`
    );

    assert.true(exists(".chat-message-edited"));
  });

  test("shows edits - collapsible message", async function (assert) {
    this.set(
      "cooked",
      '<div class="youtube-onebox lazy-video-container"></div>'
    );

    await render(
      hbs`<ChatMessageText @cooked={{this.cooked}} @edited={{true}} />`
    );

    assert.true(exists(".chat-message-edited"));
=======
  componentTest("yields", {
    template: hbs`{{#chat-message-text cooked=cooked uploads=uploads}} <div class="yield-me"></div> {{/chat-message-text}}`,

    beforeEach() {
      this.set("cooked", "<p></p>");
    },

    async test(assert) {
      assert.ok(exists(".yield-me"));
    },
  });

  componentTest("shows collapsed", {
    template: hbs`{{chat-message-text cooked=cooked uploads=uploads}}`,

    beforeEach() {
      this.set(
        "cooked",
        '<div class="onebox lazyYT lazyYT-container" data-youtube-id="WaT_rLGuUr8" data-youtube-title="Japanese Katsu Curry (Pork Cutlet)"/>'
      );
    },

    async test(assert) {
      assert.ok(exists(".chat-message-collapser"));
    },
  });

  componentTest("does not collapse a non-image onebox", {
    template: hbs`{{chat-message-text cooked=cooked}}`,

    beforeEach() {
      this.set(
        "cooked",
        '<p><a href="http://cat1.com" class="onebox"></a></p>'
      );
    },

    async test(assert) {
      assert.notOk(exists(".chat-message-collapser"));
    },
  });

  componentTest("shows edits - regular message", {
    template: hbs`{{chat-message-text cooked=cooked edited=true}}`,

    beforeEach() {
      this.set("cooked", "<p></p>");
    },

    async test(assert) {
      assert.ok(exists(".chat-message-edited"));
    },
  });

  componentTest("shows edits - collapsible message", {
    template: hbs`{{chat-message-text cooked=cooked edited=true}}`,

    beforeEach() {
      this.set("cooked", '<div class="onebox lazyYT-container"></div>');
    },

    async test(assert) {
      assert.ok(exists(".chat-message-edited"));
    },
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  });
});
