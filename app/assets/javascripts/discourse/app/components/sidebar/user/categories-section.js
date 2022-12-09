<<<<<<< HEAD
import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import { cached } from "@glimmer/tracking";

import { debounce } from "discourse-common/utils/decorators";
import Category from "discourse/models/category";
=======
import { inject as service } from "@ember/service";
import { action } from "@ember/object";
import Category from "discourse/models/category";
import { cached } from "@glimmer/tracking";

>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
import SidebarCommonCategoriesSection from "discourse/components/sidebar/common/categories-section";
import { hasDefaultSidebarCategories } from "discourse/lib/sidebar/helpers";
import SidebarEditNavigationMenuCategoriesModal from "discourse/components/sidebar/edit-navigation-menu/categories-modal";

export const REFRESH_COUNTS_APP_EVENT_NAME =
  "sidebar:refresh-categories-section-counts";

export default class SidebarUserCategoriesSection extends SidebarCommonCategoriesSection {
  @service appEvents;
  @service currentUser;
  @service modal;
  @service router;

  constructor() {
    super(...arguments);

    this.callbackId = this.topicTrackingState.onStateChange(() => {
      this._refreshCounts();
    });

    this.appEvents.on(REFRESH_COUNTS_APP_EVENT_NAME, this, this._refreshCounts);
  }

  willDestroy() {
    super.willDestroy(...arguments);

    this.topicTrackingState.offStateChange(this.callbackId);

    this.appEvents.off(
      REFRESH_COUNTS_APP_EVENT_NAME,
      this,
      this._refreshCounts
    );
  }

<<<<<<< HEAD
  // TopicTrackingState changes or plugins can trigger this function so we debounce to ensure we're not refreshing
  // unnecessarily.
  @debounce(300)
  _refreshCounts() {
    this.sectionLinks.forEach((sectionLink) => {
      sectionLink.refreshCounts();
    });
  }

  @cached
  get categories() {
    if (this.currentUser.sidebarCategoryIds?.length > 0) {
      return Category.findByIds(this.currentUser.sidebarCategoryIds);
    } else {
      return this.topSiteCategories;
    }
  }

  get shouldDisplayDefaultConfig() {
    return this.currentUser.admin && !this.hasDefaultSidebarCategories;
  }

  get hasDefaultSidebarCategories() {
    return hasDefaultSidebarCategories(this.siteSettings);
=======
  @cached
  get categories() {
    return Category.findByIds(this.currentUser.sidebarCategoryIds);
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  }

  /**
   * If a site has no default sidebar categories configured, show categories section if the user has categories configured.
   * Otherwise, hide the categories section from the sidebar for the user.
   *
   * If a site has default sidebar categories configured, always show categories section for the user.
   */
  get shouldDisplay() {
    if (this.hasDefaultSidebarCategories) {
      return true;
    } else {
      return this.categories.length > 0;
    }
  }

  get hasDefaultSidebarCategories() {
    return this.siteSettings.default_sidebar_categories.length > 0;
  }

  @action
  showModal() {
    this.modal.show(SidebarEditNavigationMenuCategoriesModal);
  }
}
