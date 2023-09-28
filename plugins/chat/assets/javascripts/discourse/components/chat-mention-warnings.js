import Component from "@glimmer/component";
import I18n from "I18n";
import { htmlSafe } from "@ember/template";
import { inject as service } from "@ember/service";
<<<<<<< HEAD
import getURL from "discourse-common/lib/get-url";
=======
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

export default class ChatMentionWarnings extends Component {
  @service siteSettings;
  @service currentUser;
<<<<<<< HEAD
  @service chatComposerWarningsTracker;

  get unreachableGroupMentions() {
    return this.chatComposerWarningsTracker.unreachableGroupMentions;
  }

  get overMembersLimitGroupMentions() {
    return this.chatComposerWarningsTracker.overMembersLimitGroupMentions;
  }

  get hasTooManyMentions() {
    return this.chatComposerWarningsTracker.tooManyMentions;
  }

  get channelWideMentionDisallowed() {
    return this.chatComposerWarningsTracker.channelWideMentionDisallowed;
  }

  get mentionsCount() {
    return this.chatComposerWarningsTracker.mentionsCount;
  }

  get unreachableGroupMentionsCount() {
    return this.unreachableGroupMentions.length;
  }

  get overMembersLimitMentionsCount() {
    return this.overMembersLimitGroupMentions.length;
=======

  get unreachableGroupMentionsCount() {
    return this.args?.unreachableGroupMentions.length;
  }

  get overMembersLimitMentionsCount() {
    return this.args?.overMembersLimitGroupMentions.length;
  }

  get hasTooManyMentions() {
    return this.args?.tooManyMentions;
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  }

  get hasUnreachableGroupMentions() {
    return this.unreachableGroupMentionsCount > 0;
  }

  get hasOverMembersLimitGroupMentions() {
    return this.overMembersLimitMentionsCount > 0;
  }

  get warningsCount() {
    return (
      this.unreachableGroupMentionsCount + this.overMembersLimitMentionsCount
    );
  }

  get show() {
    return (
      this.hasTooManyMentions ||
<<<<<<< HEAD
      this.channelWideMentionDisallowed ||
=======
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      this.hasUnreachableGroupMentions ||
      this.hasOverMembersLimitGroupMentions
    );
  }

  get listStyleClass() {
    if (this.hasTooManyMentions) {
      return "chat-mention-warnings-list__simple";
    }

    if (this.warningsCount > 1) {
      return "chat-mention-warnings-list__multiple";
    } else {
      return "chat-mention-warnings-list__simple";
    }
  }

  get warningHeaderText() {
<<<<<<< HEAD
    if (this.mentionsCount <= this.warningsCount || this.hasTooManyMentions) {
=======
    if (
      this.args?.mentionsCount <= this.warningsCount ||
      this.hasTooManyMentions
    ) {
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      return I18n.t("chat.mention_warning.groups.header.all");
    } else {
      return I18n.t("chat.mention_warning.groups.header.some");
    }
  }

  get tooManyMentionsBody() {
    if (!this.hasTooManyMentions) {
      return;
    }

<<<<<<< HEAD
    if (this.currentUser.admin) {
      return htmlSafe(
        I18n.t("chat.mention_warning.too_many_mentions_admin", {
          count: this.siteSettings.max_mentions_per_chat_message,
          siteSettingUrl: getURL(
            "/admin/site_settings/category/plugins?filter=max_mentions_per_chat_message"
          ),
        })
      );
    } else {
      return htmlSafe(
        I18n.t("chat.mention_warning.too_many_mentions", {
          count: this.siteSettings.max_mentions_per_chat_message,
        })
      );
    }
=======
    let notificationLimit = I18n.t(
      "chat.mention_warning.groups.notification_limit"
    );

    if (this.currentUser.staff) {
      notificationLimit = htmlSafe(
        `<a 
          target="_blank" 
          href="/admin/site_settings/category/plugins?filter=max_mentions_per_chat_message"
        >
          ${notificationLimit}
        </a>`
      );
    }

    const settingLimit = I18n.t("chat.mention_warning.mentions_limit", {
      count: this.siteSettings.max_mentions_per_chat_message,
    });

    return htmlSafe(
      I18n.t("chat.mention_warning.too_many_mentions", {
        notification_limit: notificationLimit,
        limit: settingLimit,
      })
    );
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  }

  get unreachableBody() {
    if (!this.hasUnreachableGroupMentions) {
      return;
    }

<<<<<<< HEAD
    switch (this.unreachableGroupMentionsCount) {
      case 1:
        return I18n.t("chat.mention_warning.groups.unreachable_1", {
          group: this.unreachableGroupMentions[0],
        });
      case 2:
        return I18n.t("chat.mention_warning.groups.unreachable_2", {
          group1: this.unreachableGroupMentions[0],
          group2: this.unreachableGroupMentions[1],
        });
      default:
        return I18n.t("chat.mention_warning.groups.unreachable_multiple", {
          group: this.unreachableGroupMentions[0],
          count: this.unreachableGroupMentionsCount - 1,
        });
=======
    if (this.unreachableGroupMentionsCount <= 2) {
      return I18n.t("chat.mention_warning.groups.unreachable", {
        group: this.args.unreachableGroupMentions[0],
        group_2: this.args.unreachableGroupMentions[1],
        count: this.unreachableGroupMentionsCount,
      });
    } else {
      return I18n.t("chat.mention_warning.groups.unreachable_multiple", {
        group: this.args.unreachableGroupMentions[0],
        count: this.unreachableGroupMentionsCount - 1, //N others
      });
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    }
  }

  get overMembersLimitBody() {
    if (!this.hasOverMembersLimitGroupMentions) {
      return;
    }

<<<<<<< HEAD
    return htmlSafe(
      I18n.messageFormat("chat.mention_warning.groups.too_many_members_MF", {
        groupCount: this.overMembersLimitMentionsCount,
        isAdmin: this.currentUser.admin,
        siteSettingUrl: getURL(
          "/admin/site_settings/category/plugins?filter=max_users_notified_per_group_mention"
        ),
        notificationLimit:
          this.siteSettings.max_users_notified_per_group_mention,
        group1: this.overMembersLimitGroupMentions[0],
        group2: this.overMembersLimitGroupMentions[1],
      })
    );
=======
    let notificationLimit = I18n.t(
      "chat.mention_warning.groups.notification_limit"
    );

    if (this.currentUser.staff) {
      notificationLimit = htmlSafe(
        `<a 
          target="_blank" 
          href="/admin/site_settings/category/plugins?filter=max_users_notified_per_group_mention"
        >
          ${notificationLimit}
        </a>`
      );
    }

    const settingLimit = I18n.t("chat.mention_warning.groups.users_limit", {
      count: this.siteSettings.max_users_notified_per_group_mention,
    });

    if (this.hasOverMembersLimitGroupMentions <= 2) {
      return htmlSafe(
        I18n.t("chat.mention_warning.groups.too_many_members", {
          group: this.args.overMembersLimitGroupMentions[0],
          group_2: this.args.overMembersLimitGroupMentions[1],
          count: this.overMembersLimitMentionsCount,
          notification_limit: notificationLimit,
          limit: settingLimit,
        })
      );
    } else {
      return htmlSafe(
        I18n.t("chat.mention_warning.groups.too_many_members_multiple", {
          group: this.args.overMembersLimitGroupMentions[0],
          count: this.overMembersLimitMentionsCount - 1, //N others
          notification_limit: notificationLimit,
          limit: settingLimit,
        })
      );
    }
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  }
}
