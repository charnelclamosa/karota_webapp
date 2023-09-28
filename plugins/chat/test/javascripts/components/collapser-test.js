<<<<<<< HEAD
import { setupRenderingTest } from "discourse/tests/helpers/component-test";
import { click, render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";
import { exists, visible } from "discourse/tests/helpers/qunit-helpers";
import { module, test } from "qunit";
=======
import componentTest, {
  setupRenderingTest,
} from "discourse/tests/helpers/component-test";
import { click } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";
import { exists, query, visible } from "discourse/tests/helpers/qunit-helpers";
import { module } from "qunit";
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
import { htmlSafe } from "@ember/template";

module("Discourse Chat | Component | collapser", function (hooks) {
  setupRenderingTest(hooks);

<<<<<<< HEAD
  test("renders header", async function (assert) {
    this.set("header", htmlSafe(`<div class="cat">tomtom</div>`));

    await render(hbs`<Collapser @header={{this.header}} />`);

    assert.true(exists(".cat"));
  });

  test("collapses and expands yielded body", async function (assert) {
    await render(hbs`
      <Collapser>
        <div class="cat">body text</div>
      </Collapser>
    `);

    const openButton = ".chat-message-collapser-closed";
    const closeButton = ".chat-message-collapser-opened";
    const body = ".cat";

    assert.true(visible(body));

    await click(closeButton);
    assert.false(visible(body));

    await click(openButton);
    assert.true(visible(body));
=======
  componentTest("renders header", {
    template: hbs`{{collapser header=header}}`,

    beforeEach() {
      this.set("header", htmlSafe("<div class='cat'>tomtom</div>"));
    },

    async test(assert) {
      const element = query(".cat");

      assert.ok(exists(element));
    },
  });

  componentTest("collapses and expands yielded body", {
    template: hbs`{{#collapser}}<div class='cat'>body text</div>{{/collapser}}`,

    test: async function (assert) {
      const openButton = ".chat-message-collapser-closed";
      const closeButton = ".chat-message-collapser-opened";
      const body = ".cat";

      assert.ok(visible(body));
      await click(closeButton);

      assert.notOk(visible(body));

      await click(openButton);

      assert.ok(visible(body));
    },
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  });
});
