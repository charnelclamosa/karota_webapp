import { inject as service } from "@ember/service";
import Controller from "@ember/controller";
<<<<<<< HEAD

export default class AdminPluginsController extends Controller {
  @service router;

  get adminRoutes() {
    return this.allAdminRoutes.filter((route) =>
      this.routeExists(route.full_location)
    );
  }

  get brokenAdminRoutes() {
    return this.allAdminRoutes.filter(
      (route) => !this.routeExists(route.full_location)
    );
  }

  get allAdminRoutes() {
    return this.model
      .filter((plugin) => plugin?.enabled)
      .map((plugin) => {
        return plugin.adminRoute;
      })
      .filter(Boolean);
  }

=======
import { inject as service } from "@ember/service";

export default Controller.extend({
  router: service(),

  get adminRoutes() {
    return this.allAdminRoutes.filter((r) => this.routeExists(r.full_location));
  },

  get brokenAdminRoutes() {
    return this.allAdminRoutes.filter(
      (r) => !this.routeExists(r.full_location)
    );
  },

  get allAdminRoutes() {
    return this.model
      .filter((p) => p?.enabled)
      .map((p) => {
        return p.admin_route;
      })
      .filter(Boolean);
  },

  @action
  toggleMenu() {
    const adminDetail = document.querySelector(".admin-detail");
    ["mobile-closed", "mobile-open"].forEach((state) => {
      adminDetail.classList.toggle(state);
    });
  },

>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  routeExists(routeName) {
    try {
      this.router.urlFor(routeName);
      return true;
    } catch (e) {
      return false;
    }
<<<<<<< HEAD
  }
}
=======
  },
});
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
