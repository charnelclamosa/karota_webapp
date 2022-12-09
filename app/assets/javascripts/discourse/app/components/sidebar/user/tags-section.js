<<<<<<< HEAD
=======
import { cached } from "@glimmer/tracking";
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
import Component from "@glimmer/component";
import { action } from "@ember/object";
import { cached } from "@glimmer/tracking";
import { inject as service } from "@ember/service";

import TagSectionLink from "discourse/lib/sidebar/user/tags-section/tag-section-link";
import PMTagSectionLink from "discourse/lib/sidebar/user/tags-section/pm-tag-section-link";
import { hasDefaultSidebarTags } from "discourse/lib/sidebar/helpers";
import SidebarEditNavigationMenuTagsModal from "discourse/components/sidebar/edit-navigation-menu/tags-modal";

export default class SidebarUserTagsSection extends Component {
  @service currentUser;
  @service modal;
  @service pmTopicTrackingState;
  @service router;
  @service site;
  @service siteSettings;
  @service topicTrackingState;

  constructor() {
    super(...arguments);

    this.callbackId = this.topicTrackingState.onStateChange(() => {
      this.sectionLinks.forEach((sectionLink) => {
        if (sectionLink.refreshCounts) {
          sectionLink.refreshCounts();
        }
      });
    });
  }

  willDestroy() {
    this.topicTrackingState.offStateChange(this.callbackId);
  }

  @cached
  get sectionLinks() {
    const links = [];

    let tags;

    if (this.currentUser.sidebarTags.length > 0) {
      tags = this.currentUser.sidebarTags;
    } else {
      tags = this.site.navigation_menu_site_top_tags || [];
    }

    for (const tag of tags) {
      if (tag.pm_only) {
        links.push(
          new PMTagSectionLink({
            tag,
            currentUser: this.currentUser,
          })
        );
      } else {
        links.push(
          new TagSectionLink({
            tag,
            topicTrackingState: this.topicTrackingState,
            currentUser: this.currentUser,
          })
        );
      }
    }

    return links;
  }

<<<<<<< HEAD
  get shouldDisplayDefaultConfig() {
    return this.currentUser.admin && !this.hasDefaultSidebarTags;
  }

  get hasDefaultSidebarTags() {
    return hasDefaultSidebarTags(this.siteSettings);
  }

=======
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  /**
   * If a site has no default sidebar tags configured, show tags section if the user has personal sidebar tags configured.
   * Otherwise, hide the tags section from the sidebar for the user.
   *
   * If a site has default sidebar tags configured, always display the tags section.
   */
  get shouldDisplay() {
    if (this.hasDefaultSidebarTags) {
      return true;
    } else {
      return this.currentUser.sidebarTags.length > 0;
    }
  }

  get hasDefaultSidebarTags() {
    return this.siteSettings.default_sidebar_tags.length > 0;
  }

  @action
  showModal() {
    this.modal.show(SidebarEditNavigationMenuTagsModal);
  }
}
