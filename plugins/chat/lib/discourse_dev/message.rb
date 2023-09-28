# frozen_string_literal: true

require "discourse_dev/record"
require "faker"

module DiscourseDev
  class Message < Record
<<<<<<< HEAD
    def initialize(channel_id: nil, count: nil, ignore_current_count: false)
      @channel_id = channel_id
      @ignore_current_count = ignore_current_count
      super(::Chat::Message, count&.to_i || 200)
    end

    def data
      if @channel_id
        channel = ::Chat::Channel.find(@channel_id)
      else
        channel = ::Chat::Channel.where(chatable_type: "Category").order("RANDOM()").first
      end

      return if !channel

      membership =
        ::Chat::UserChatChannelMembership.where(chat_channel: channel).order("RANDOM()").first
      user = membership.user

      { guardian: user.guardian, message: Faker::Lorem.paragraph, chat_channel_id: channel.id }
    end

    def create!
      Chat::CreateMessage.call(data)
=======
    def initialize
      super(::ChatMessage, 200)
    end

    def data
      if Faker::Boolean.boolean(true_ratio: 0.5)
        channel = ::ChatChannel.where(chatable_type: "DirectMessage").order("RANDOM()").first
        channel.user_chat_channel_memberships.update_all(following: true)
        user = channel.chatable.users.order("RANDOM()").first
      else
        membership = ::UserChatChannelMembership.order("RANDOM()").first
        channel = membership.chat_channel
        user = membership.user
      end

      { user: user, content: Faker::Lorem.paragraph, chat_channel: channel }
    end

    def create!
      Chat::ChatMessageCreator.create(data)
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    end
  end
end
