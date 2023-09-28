import PreloadStore from "discourse/lib/preload-store";
import { TrackedObject } from "@ember-compat/tracked-built-ins";
<<<<<<< HEAD
import { disableImplicitInjections } from "discourse/lib/implicit-injections";
=======
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

@disableImplicitInjections
export default class SiteSettingsService {
  static isServiceFactory = true;

  static create() {
    return new TrackedObject(PreloadStore.get("siteSettings"));
  }
}
