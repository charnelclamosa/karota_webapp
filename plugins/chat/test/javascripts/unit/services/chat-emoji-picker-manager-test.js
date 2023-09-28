import { module, test } from "qunit";
<<<<<<< HEAD
import { getOwner } from "@ember/application";
import pretender from "discourse/tests/helpers/create-pretender";
import { settled } from "@ember/test-helpers";
import { setupTest } from "ember-qunit";
=======
import { getOwner } from "discourse-common/lib/get-owner";
import pretender from "discourse/tests/helpers/create-pretender";
import { settled } from "@ember/test-helpers";
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

function emojisReponse() {
  return { favorites: [{ name: "sad" }] };
}

module(
  "Discourse Chat | Unit | Service | chat-emoji-picker-manager",
  function (hooks) {
<<<<<<< HEAD
    setupTest(hooks);

=======
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    hooks.beforeEach(function () {
      pretender.get("/chat/emojis.json", () => {
        return [200, {}, emojisReponse()];
      });

      this.manager = getOwner(this).lookup("service:chat-emoji-picker-manager");
    });

    hooks.afterEach(function () {
      this.manager.close();
    });

<<<<<<< HEAD
=======
    test("startFromMessageReactionList", async function (assert) {
      const callback = () => {};
      this.manager.startFromMessageReactionList({ id: 1 }, false, callback);

      assert.ok(this.manager.loading);
      assert.ok(this.manager.opened);
      assert.strictEqual(this.manager.context, "chat-message");
      assert.strictEqual(this.manager.callback, callback);
      assert.deepEqual(this.manager.visibleSections, [
        "favorites",
        "smileys_&_emotion",
      ]);
      assert.strictEqual(this.manager.lastVisibleSection, "favorites");

      await settled();

      assert.deepEqual(this.manager.emojis, emojisReponse());
      assert.strictEqual(this.manager.loading, false);
    });

    test("startFromMessageActions", async function (assert) {
      const callback = () => {};
      this.manager.startFromMessageReactionList({ id: 1 }, false, callback);

      assert.ok(this.manager.loading);
      assert.ok(this.manager.opened);
      assert.strictEqual(this.manager.context, "chat-message");
      assert.strictEqual(this.manager.callback, callback);
      assert.deepEqual(this.manager.visibleSections, [
        "favorites",
        "smileys_&_emotion",
      ]);
      assert.strictEqual(this.manager.lastVisibleSection, "favorites");

      await settled();

      assert.deepEqual(this.manager.emojis, emojisReponse());
      assert.strictEqual(this.manager.loading, false);
    });

>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    test("addVisibleSections", async function (assert) {
      this.manager.addVisibleSections(["favorites", "objects"]);

      assert.deepEqual(this.manager.visibleSections, [
        "favorites",
        "smileys_&_emotion",
        "objects",
      ]);
    });

    test("sections", async function (assert) {
      assert.deepEqual(this.manager.sections, []);

<<<<<<< HEAD
      this.manager.open({});
=======
      this.manager.startFromComposer(() => {});
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

      assert.deepEqual(this.manager.sections, []);

      await settled();

      assert.deepEqual(this.manager.sections, ["favorites"]);
    });

<<<<<<< HEAD
    test("open", async function (assert) {
      this.manager.open({ context: "chat-composer" });

      assert.ok(this.manager.loading);
      assert.ok(this.manager.picker);
      assert.strictEqual(this.manager.picker.context, "chat-composer");
=======
    test("startFromComposer", async function (assert) {
      const callback = () => {};
      this.manager.startFromComposer(callback);

      assert.ok(this.manager.loading);
      assert.ok(this.manager.opened);
      assert.strictEqual(this.manager.context, "chat-composer");
      assert.strictEqual(this.manager.callback, callback);
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      assert.deepEqual(this.manager.visibleSections, [
        "favorites",
        "smileys_&_emotion",
      ]);
      assert.strictEqual(this.manager.lastVisibleSection, "favorites");

      await settled();

      assert.deepEqual(this.manager.emojis, emojisReponse());
      assert.strictEqual(this.manager.loading, false);
    });

    test("closeExisting", async function (assert) {
<<<<<<< HEAD
      this.manager.open({ context: "channel-composer", trigger: "foo" });
      this.manager.addVisibleSections("objects");
      this.manager.lastVisibleSection = "objects";
      this.manager.open({ context: "thread-composer", trigger: "bar" });

      assert.strictEqual(
        this.manager.picker.context,
        "thread-composer",
        "it resets the picker to latest picker"
=======
      const callback = () => {
        return;
      };

      this.manager.startFromComposer(() => {});
      this.manager.addVisibleSections("objects");
      this.manager.lastVisibleSection = "objects";
      this.manager.startFromComposer(callback);

      assert.strictEqual(
        this.manager.callback,
        callback,
        "it resets the callback to latest picker"
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      );
      assert.deepEqual(
        this.manager.visibleSections,
        ["favorites", "smileys_&_emotion"],
        "it resets sections"
      );
      assert.strictEqual(
        this.manager.lastVisibleSection,
        "favorites",
        "it resets last visible section"
      );
    });

<<<<<<< HEAD
    test("close", async function (assert) {
      this.manager.open({ context: "channel-composer" });

      assert.ok(this.manager.picker);
=======
    test("didSelectEmoji", async function (assert) {
      let value;
      const callback = (emoji) => {
        value = emoji.name;
      };
      this.manager.startFromComposer(callback);
      this.manager.didSelectEmoji({ name: "joy" });

      assert.notOk(this.manager.callback);
      assert.strictEqual(value, "joy");

      await settled();

      assert.notOk(this.manager.opened, "it closes the picker after selection");
    });

    test("close", async function (assert) {
      this.manager.startFromComposer(() => {});

      assert.ok(this.manager.opened);
      assert.ok(this.manager.callback);
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

      this.manager.addVisibleSections("objects");
      this.manager.lastVisibleSection = "objects";
      this.manager.close();

<<<<<<< HEAD
      assert.ok(this.manager.closing);
      assert.ok(this.manager.picker);

      await settled();

      assert.notOk(this.manager.picker);
=======
      assert.notOk(this.manager.callback);
      assert.ok(this.manager.closing);
      assert.ok(this.manager.opened);

      await settled();

      assert.notOk(this.manager.opened);
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      assert.notOk(this.manager.closing);
      assert.deepEqual(
        this.manager.visibleSections,
        ["favorites", "smileys_&_emotion"],
        "it resets visible sections"
      );
      assert.strictEqual(
        this.manager.lastVisibleSection,
        "favorites",
        "it resets last visible section"
      );
    });
  }
);
