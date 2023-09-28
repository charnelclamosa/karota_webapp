import Component from "@glimmer/component";
import { cached } from "@glimmer/tracking";
import { inject as service } from "@ember/service";

import Category from "discourse/models/category";
import CategorySectionLink from "discourse/lib/sidebar/user/categories-section/category-section-link";
import { canDisplayCategory } from "discourse/lib/sidebar/helpers";
<<<<<<< HEAD

export const TOP_SITE_CATEGORIES_TO_SHOW = 5;
=======
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

export default class SidebarCommonCategoriesSection extends Component {
  @service topicTrackingState;
  @service siteSettings;
  @service site;

  shouldSortCategoriesByDefault = true;

  /**
   * Override in child
   *
   * @returns {Object[]} An array of Category objects
   */
  get categories() {}

<<<<<<< HEAD
  get topSiteCategories() {
    return this.site.categoriesList
      .filter((category) => {
        return (
          !category.parent_category_id &&
          canDisplayCategory(category.id, this.siteSettings)
        );
      })
      .slice(0, TOP_SITE_CATEGORIES_TO_SHOW);
  }

=======
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  get sortedCategories() {
    if (!this.shouldSortCategoriesByDefault) {
      return this.categories;
    }

<<<<<<< HEAD
    let categories = [...this.site.categories];

    if (!this.siteSettings.fixed_category_positions) {
      categories.sort((a, b) => a.name.localeCompare(b.name));
=======
    let categories = this.site.categories;

    if (!this.siteSettings.fixed_category_positions) {
      categories = categories.sort((a, b) => a.name.localeCompare(b.name));
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    }

    const categoryIds = this.categories.map((category) => category.id);

    return Category.sortCategories(categories).reduce(
      (filteredCategories, category) => {
        if (
          categoryIds.includes(category.id) &&
          canDisplayCategory(category.id, this.siteSettings)
        ) {
          filteredCategories.push(category);
        }

        return filteredCategories;
      },
      []
    );
  }

  @cached
  get sectionLinks() {
    return this.sortedCategories.map((category) => {
      return new CategorySectionLink({
        category,
        topicTrackingState: this.topicTrackingState,
        currentUser: this.currentUser,
      });
    });
  }
}
