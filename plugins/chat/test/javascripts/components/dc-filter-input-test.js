import { setupRenderingTest } from "discourse/tests/helpers/component-test";
import { exists } from "discourse/tests/helpers/qunit-helpers";
import hbs from "htmlbars-inline-precompile";
import { fillIn, render, triggerEvent } from "@ember/test-helpers";
import { module, test } from "qunit";

module("Discourse Chat | Component | dc-filter-input", function (hooks) {
  setupRenderingTest(hooks);

  test("Left icon", async function (assert) {
    await render(hbs`<DcFilterInput @icons={{hash left="bell"}} />`);

<<<<<<< HEAD
    assert.true(exists(".d-icon-bell.-left"));
=======
    assert.ok(exists(".d-icon-bell.-left"));
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  });

  test("Right icon", async function (assert) {
    await render(hbs`<DcFilterInput @icons={{hash right="bell"}} />`);

<<<<<<< HEAD
    assert.true(exists(".d-icon-bell.-right"));
=======
    assert.ok(exists(".d-icon-bell.-right"));
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  });

  test("Class attribute", async function (assert) {
    await render(hbs`<DcFilterInput @class="foo" />`);

<<<<<<< HEAD
    assert.true(exists(".dc-filter-input-container.foo"));
=======
    assert.ok(exists(".dc-filter-input-container.foo"));
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  });

  test("Html attributes", async function (assert) {
    await render(hbs`<DcFilterInput data-foo="1" placeholder="bar" />`);

<<<<<<< HEAD
    assert.true(exists('.dc-filter-input[data-foo="1"]'));
    assert.true(exists('.dc-filter-input[placeholder="bar"]'));
=======
    assert.ok(exists('.dc-filter-input[data-foo="1"]'));
    assert.ok(exists('.dc-filter-input[placeholder="bar"]'));
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  });

  test("Filter action", async function (assert) {
    this.set("value", null);
    this.set("action", (event) => {
      this.set("value", event.target.value);
    });
    await render(hbs`<DcFilterInput @filterAction={{this.action}} />`);
    await fillIn(".dc-filter-input", "foo");

<<<<<<< HEAD
    assert.strictEqual(this.value, "foo");
=======
    assert.equal(this.value, "foo");
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  });

  test("Focused state", async function (assert) {
    await render(hbs`<DcFilterInput @filterAction={{this.action}} />`);
    await triggerEvent(".dc-filter-input", "focusin");

<<<<<<< HEAD
    assert.true(exists(".dc-filter-input-container.is-focused"));

    await triggerEvent(".dc-filter-input", "focusout");

    assert.false(exists(".dc-filter-input-container.is-focused"));
=======
    assert.ok(exists(".dc-filter-input-container.is-focused"));

    await triggerEvent(".dc-filter-input", "focusout");

    assert.notOk(exists(".dc-filter-input-container.is-focused"));
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  });
});
