import { test } from "qunit";
import { click, visit } from "@ember/test-helpers";
import {
  acceptance,
  exists,
  query,
  updateCurrentUser,
} from "discourse/tests/helpers/qunit-helpers";

acceptance("User Preferences - Second Factor Backup", function (needs) {
  needs.user();

  needs.pretender((server, helper) => {
    server.post("/u/second_factors.json", () => {
      return helper.response({
        success: "OK",
        totps: [{ id: 1, name: "one of them" }],
      });
    });

    server.put("/u/second_factors_backup.json", () => {
      return helper.response({
        backup_codes: ["dsffdsd", "fdfdfdsf", "fddsds"],
      });
    });

    server.get("/u/eviltrout/activity.json", () => {
      return helper.response({});
    });
  });

  test("second factor backup", async function (assert) {
    updateCurrentUser({ second_factor_enabled: true });
    await visit("/u/eviltrout/preferences/second-factor");
<<<<<<< HEAD
    await click(".new-second-factor-backup");

    assert.ok(
      exists(".second-factor-backup-edit-modal"),
      "shows the 2fa backup panel"
    );

    await click(".second-factor-backup-edit-modal .btn-primary");
=======
    await click(".edit-2fa-backup");

    assert.ok(
      exists(".second-factor-backup-preferences"),
      "shows the 2fa backup panel"
    );

    await click(".second-factor-backup-preferences .btn-primary");
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

    assert.ok(exists(".backup-codes-area"), "shows backup codes");
  });

  test("delete backup codes", async function (assert) {
    updateCurrentUser({ second_factor_enabled: true });
    await visit("/u/eviltrout/preferences/second-factor");
<<<<<<< HEAD

    // create backup codes
    await click(".new-second-factor-backup");
    await click(".second-factor-backup-edit-modal .btn-primary");
    await click(".second-factor-backup-edit-modal .modal-close");

    await click(".two-factor-backup-dropdown .select-kit-header");
    await click("li[data-name='Disable'");
=======
    await click(".edit-2fa-backup");
    await click(".second-factor-backup-preferences .btn-primary");
    await click(".modal-close");
    await click(".pref-second-factor-backup .btn-danger");
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    assert.strictEqual(
      query("#dialog-title").innerText.trim(),
      "Deleting backup codes"
    );
  });
});
