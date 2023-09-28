# frozen_string_literal: true

module PageObjects
  module Pages
    class Sidebar < PageObjects::Pages::Base
<<<<<<< HEAD
      PUBLIC_CHANNELS_SECTION_SELECTOR = ".sidebar-section[data-section-name='chat-channels']"
      DM_CHANNELS_SECTION_SELECTOR = ".sidebar-section[data-section-name='chat-dms']"

      def has_no_public_channels_section?
        has_no_css?(PUBLIC_CHANNELS_SECTION_SELECTOR)
      end

      def channels_section
        find(PUBLIC_CHANNELS_SECTION_SELECTOR)
      end

      def channels_section
        find(PUBLIC_CHANNELS_SECTION_SELECTOR)
      end

      def dms_section
        find(DM_CHANNELS_SECTION_SELECTOR)
      end

      def open_browse
        channels_section.find(".sidebar-section-header-button", visible: false).click
      end

      def open_channel(channel)
        find(".sidebar-section-link.channel-#{channel.id}").click
      end

      def remove_channel(channel)
        selector = ".sidebar-section-link.channel-#{channel.id}"
        find(selector).hover
        find(selector + " .sidebar-section-hover-button").click
      end

      def find_channel(channel)
        find(".sidebar-section-link.channel-#{channel.id}")
        self
      end

      def has_unread_channel?(channel)
        has_css?(".sidebar-section-link.channel-#{channel.id} .sidebar-section-link-suffix.unread")
      end

      def has_no_unread_channel?(channel)
        has_no_css?(
          ".sidebar-section-link.channel-#{channel.id} .sidebar-section-link-suffix.unread",
        )
=======
      def open_draft_channel
        find(".sidebar-section-chat-dms .sidebar-section-header-button", visible: false).click
      end

      def open_browse
        find(".sidebar-section-chat-channels .sidebar-section-header-button", visible: false).click
      end

      def open_channel(channel)
        find(".sidebar-section-link[href='/chat/channel/#{channel.id}/#{channel.slug}']").click
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      end
    end
  end
end
