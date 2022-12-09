import RestrictedUserRoute from "discourse/routes/restricted-user";
import Category from "discourse/models/category";

export default RestrictedUserRoute.extend({
  setupController(controller, user) {
    const props = {
      model: user,
      selectedSidebarCategories: Category.findByIds(user.sidebarCategoryIds),
<<<<<<< HEAD:app/assets/javascripts/discourse/app/routes/preferences-navigation-menu.js
      newSidebarLinkToFilteredList: user.sidebarLinkToFilteredList,
      newSidebarShowCountOfNewItems: user.sidebarShowCountOfNewItems,
=======
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream):app/assets/javascripts/discourse/app/routes/preferences-sidebar.js
    };

    if (this.siteSettings.tagging_enabled) {
      props.selectedSidebarTagNames = user.sidebarTagNames;
    }

    controller.setProperties(props);
  },
});
