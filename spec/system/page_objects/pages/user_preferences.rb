# frozen_string_literal: true

module PageObjects
  module Pages
    class UserPreferences < PageObjects::Pages::Base
      def visit(user)
        page.visit("/u/#{user.username}/preferences")
        self
      end

<<<<<<< HEAD
      def click_interface_tab
        click_link "Interface"
        self
      end

=======
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      def click_secondary_navigation_menu_scroll_right
        find(".horizontal-overflow-nav__scroll-right").click
      end

      def click_secondary_navigation_menu_scroll_left
        find(".horizontal-overflow-nav__scroll-left").click
      end

<<<<<<< HEAD
      INTERFACE_LINK_CSS_SELECTOR = ".user-nav__preferences-tracking"
=======
      INTERFACE_LINK_CSS_SELECTOR = ".nav-tracking"
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

      def has_interface_link_visible?
        horizontal_secondary_link_visible?(INTERFACE_LINK_CSS_SELECTOR, visible: true)
      end

      def has_interface_link_not_visible?
        horizontal_secondary_link_visible?(INTERFACE_LINK_CSS_SELECTOR, visible: false)
      end

<<<<<<< HEAD
      ACCOUNT_LINK_CSS_SELECTOR = ".user-nav__preferences-account"
=======
      ACCOUNT_LINK_CSS_SELECTOR = ".nav-account"
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

      def has_account_link_visible?
        horizontal_secondary_link_visible?(ACCOUNT_LINK_CSS_SELECTOR, visible: true)
      end

      def has_account_link_not_visible?
        horizontal_secondary_link_visible?(ACCOUNT_LINK_CSS_SELECTOR, visible: false)
      end

      private

      def horizontal_secondary_link_visible?(selector, visible: true)
<<<<<<< HEAD
        within(".user-navigation-secondary") { page.has_selector?(selector, visible: visible) }
=======
        within(".user-navigation-secondary") do
          page.has_selector?(selector, visible: visible)
        end
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      end
    end
  end
end
