<<<<<<< HEAD
=======
import { canDisplayCategory } from "discourse/lib/sidebar/helpers";
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
import SidebarCommonCategoriesSection from "discourse/components/sidebar/common/categories-section";
import Category from "discourse/models/category";

export default class SidebarAnonymousCategoriesSection extends SidebarCommonCategoriesSection {
  constructor() {
    super(...arguments);

<<<<<<< HEAD
    if (!this.siteSettings.default_navigation_menu_categories) {
=======
    if (!this.siteSettings.default_sidebar_categories) {
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      this.shouldSortCategoriesByDefault = false;
    }
  }

  get categories() {
<<<<<<< HEAD
    if (this.siteSettings.default_navigation_menu_categories) {
      return Category.findByIds(
        this.siteSettings.default_navigation_menu_categories
=======
    if (this.siteSettings.default_sidebar_categories) {
      return Category.findByIds(
        this.siteSettings.default_sidebar_categories
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
          .split("|")
          .map((categoryId) => parseInt(categoryId, 10))
      );
    } else {
<<<<<<< HEAD
      return this.topSiteCategories;
=======
      return this.site.categoriesList
        .filter((category) => {
          return (
            !category.parent_category_id &&
            canDisplayCategory(category.id, this.siteSettings)
          );
        })
        .slice(0, 5);
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    }
  }
}
