<<<<<<< HEAD
import { setupRenderingTest } from "discourse/tests/helpers/component-test";
import { exists, query } from "discourse/tests/helpers/qunit-helpers";
import hbs from "htmlbars-inline-precompile";
import I18n from "I18n";
import { click, render } from "@ember/test-helpers";
import { module, test } from "qunit";
=======
import componentTest, {
  setupRenderingTest,
} from "discourse/tests/helpers/component-test";
import { exists, query } from "discourse/tests/helpers/qunit-helpers";
import hbs from "htmlbars-inline-precompile";
import I18n from "I18n";
import { click } from "@ember/test-helpers";
import { module } from "qunit";
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

module("Discourse Chat | Component | chat-composer-upload", function (hooks) {
  setupRenderingTest(hooks);

<<<<<<< HEAD
  test("file - uploading in progress", async function (assert) {
    this.set("upload", {
      progress: 50,
      extension: ".pdf",
      fileName: "test.pdf",
    });

    await render(hbs`<ChatComposerUpload @upload={{this.upload}} />`);

    assert.true(exists(".upload-progress[value=50]"));
    assert.strictEqual(
      query(".uploading").innerText.trim(),
      I18n.t("uploading")
    );
  });

  test("image - uploading in progress", async function (assert) {
    this.set("upload", {
      extension: ".png",
      progress: 78,
      fileName: "test.png",
    });

    await render(hbs`<ChatComposerUpload @upload={{this.upload}} />`);

    assert.true(exists(".d-icon-far-image"));
    assert.true(exists(".upload-progress[value=78]"));
    assert.strictEqual(
      query(".uploading").innerText.trim(),
      I18n.t("uploading")
    );
  });

  test("image - preprocessing upload in progress", async function (assert) {
    this.set("upload", {
      extension: ".png",
      progress: 78,
      fileName: "test.png",
      processing: true,
    });

    await render(hbs`<ChatComposerUpload @upload={{this.upload}} />`);

    assert.strictEqual(
      query(".processing").innerText.trim(),
      I18n.t("processing")
    );
  });

  test("file - upload complete", async function (assert) {
    this.set("upload", {
      type: ".pdf",
      original_filename: "some file.pdf",
      extension: "pdf",
    });

    await render(
      hbs`<ChatComposerUpload @isDone={{true}} @upload={{this.upload}} />`
    );

    assert.true(exists(".d-icon-file-alt"));
    assert.strictEqual(query(".file-name").innerText.trim(), "some file.pdf");
    assert.strictEqual(query(".extension-pill").innerText.trim(), "pdf");
  });

  test("image - upload complete", async function (assert) {
    this.set("upload", {
      type: ".png",
      original_filename: "bar_image.png",
      extension: "png",
      short_path: "/images/avatar.png",
    });

    await render(
      hbs`<ChatComposerUpload @isDone={{true}} @upload={{this.upload}} />`
    );

    assert.true(exists("img.preview-img[src='/images/avatar.png']"));
  });

  test("removing completed upload", async function (assert) {
    this.set("uploadRemoved", false);
    this.set("removeUpload", () => {
      this.set("uploadRemoved", true);
    });
    this.set("upload", {
      type: ".png",
      original_filename: "bar_image.png",
      extension: "png",
      short_path: "/images/avatar.png",
    });

    await render(
      hbs`<ChatComposerUpload @isDone={{true}} @upload={{this.upload}} @onCancel={{fn this.removeUpload this.upload}} />`
    );

    await click(".chat-composer-upload__remove-btn");
    assert.strictEqual(this.uploadRemoved, true);
  });

  test("cancelling in progress upload", async function (assert) {
    this.set("uploadRemoved", false);
    this.set("removeUpload", () => {
      this.set("uploadRemoved", true);
    });
    this.set("upload", {
      type: ".png",
      original_filename: "bar_image.png",
      extension: "png",
      short_path: "/images/avatar.png",
    });

    await render(
      hbs`<ChatComposerUpload @upload={{this.upload}} @onCancel={{fn this.removeUpload this.upload}} />`
    );

    await click(".chat-composer-upload__remove-btn");
    assert.strictEqual(this.uploadRemoved, true);
=======
  componentTest("file - uploading in progress", {
    template: hbs`{{chat-composer-upload upload=upload}}`,

    beforeEach() {
      this.set("upload", {
        progress: 50,
        extension: ".pdf",
        fileName: "test.pdf",
      });
    },

    async test(assert) {
      assert.ok(exists(".upload-progress[value=50]"));
      assert.strictEqual(
        query(".uploading").innerText.trim(),
        I18n.t("uploading")
      );
    },
  });

  componentTest("image - uploading in progress", {
    template: hbs`{{chat-composer-upload upload=upload}}`,

    beforeEach() {
      this.set("upload", {
        extension: ".png",
        progress: 78,
        fileName: "test.png",
      });
    },

    async test(assert) {
      assert.ok(exists(".d-icon-far-image"));
      assert.ok(exists(".upload-progress[value=78]"));
      assert.strictEqual(
        query(".uploading").innerText.trim(),
        I18n.t("uploading")
      );
    },
  });

  componentTest("image - preprocessing upload in progress", {
    template: hbs`{{chat-composer-upload upload=upload}}`,

    beforeEach() {
      this.set("upload", {
        extension: ".png",
        progress: 78,
        fileName: "test.png",
        processing: true,
      });
    },

    async test(assert) {
      assert.strictEqual(
        query(".processing").innerText.trim(),
        I18n.t("processing")
      );
    },
  });

  componentTest("file - upload complete", {
    template: hbs`{{chat-composer-upload isDone=true upload=upload}}`,

    beforeEach() {
      this.set("upload", {
        type: ".pdf",
        original_filename: "some file.pdf",
        extension: "pdf",
      });
    },

    async test(assert) {
      assert.ok(exists(".d-icon-file-alt"));
      assert.strictEqual(query(".file-name").innerText.trim(), "some file.pdf");
      assert.strictEqual(query(".extension-pill").innerText.trim(), "pdf");
    },
  });

  componentTest("image - upload complete", {
    template: hbs`{{chat-composer-upload isDone=true upload=upload}}`,

    beforeEach() {
      this.set("upload", {
        type: ".png",
        original_filename: "bar_image.png",
        extension: "png",
        short_path: "/images/avatar.png",
      });
    },

    async test(assert) {
      assert.ok(exists("img.preview-img[src='/images/avatar.png']"));
      assert.strictEqual(query(".file-name").innerText.trim(), "bar_image.png");
      assert.strictEqual(query(".extension-pill").innerText.trim(), "png");
    },
  });

  componentTest("removing completed upload", {
    template: hbs`{{chat-composer-upload isDone=true upload=upload onCancel=(action "removeUpload" upload)}}`,

    beforeEach() {
      this.set("uploadRemoved", false);
      this.set("actions", {
        removeUpload: () => {
          this.set("uploadRemoved", true);
        },
      });
      this.set("upload", {
        type: ".png",
        original_filename: "bar_image.png",
        extension: "png",
        short_path: "/images/avatar.png",
      });
    },

    async test(assert) {
      await click(".remove-upload");
      assert.strictEqual(this.uploadRemoved, true);
    },
  });

  componentTest("cancelling in progress upload", {
    template: hbs`{{chat-composer-upload upload=upload onCancel=(action "removeUpload" upload)}}`,

    beforeEach() {
      this.set("uploadRemoved", false);
      this.set("actions", {
        removeUpload: () => {
          this.set("uploadRemoved", true);
        },
      });
      this.set("upload", {
        type: ".png",
        original_filename: "bar_image.png",
        extension: "png",
        short_path: "/images/avatar.png",
      });
    },

    async test(assert) {
      await click(".remove-upload");
      assert.strictEqual(this.uploadRemoved, true);
    },
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  });
});
