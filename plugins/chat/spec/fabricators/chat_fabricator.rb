# frozen_string_literal: true

<<<<<<< HEAD
Fabricator(:chat_channel, class_name: "Chat::Channel") do
=======
Fabricator(:chat_channel) do
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  name do
    sequence(:name) do |n|
      random_name = [
        "Gaming Lounge",
        "Music Lodge",
        "Random",
        "Politics",
        "Sports Center",
        "Kino Buffs",
      ].sample
      "#{random_name} #{n}"
    end
  end
  chatable { Fabricate(:category) }
  type do |attrs|
<<<<<<< HEAD
    if attrs[:chatable_type] == "Category" || attrs[:chatable]&.is_a?(Category)
      "CategoryChannel"
    else
      "DirectMessageChannel"
    end
=======
    attrs[:chatable_type] == "Category" || attrs[:chatable]&.is_a?(Category) ? "CategoryChannel" : "DirectMessageChannel"
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  end
  status { :open }
end

<<<<<<< HEAD
Fabricator(:category_channel, from: :chat_channel) {}

Fabricator(:private_category_channel, from: :category_channel) do
  transient :group
  chatable { |attrs| Fabricate(:private_category, group: attrs[:group] || Group[:staff]) }
end

Fabricator(:direct_message_channel, from: :chat_channel) do
  transient :users, following: true, with_membership: true
=======
Fabricator(:category_channel, from: :chat_channel, class_name: :category_channel) {}

Fabricator(:direct_message_channel, from: :chat_channel, class_name: :direct_message_channel) do
  transient :users
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  chatable do |attrs|
    Fabricate(:direct_message, users: attrs[:users] || [Fabricate(:user), Fabricate(:user)])
  end
  status { :open }
<<<<<<< HEAD
  name nil
  after_create do |channel, attrs|
    if attrs[:with_membership]
      channel.chatable.users.each do |user|
        membership = channel.add(user)
        membership.update!(following: false) if attrs[:following] == false
      end
    end
  end
end

Fabricator(:chat_message, class_name: "Chat::Message") do
  transient use_service: false

  initialize_with do |transients|
    Fabricate(
      transients[:use_service] ? :chat_message_with_service : :chat_message_without_service,
      **to_params,
    )
  end
end

Fabricator(:chat_message_without_service, class_name: "Chat::Message") do
  user
  chat_channel
  message { Faker::Lorem.paragraph_by_chars(number: 500) }

  after_build { |message, attrs| message.cook }
  after_create { |message, attrs| message.create_mentions }
end

Fabricator(:chat_message_with_service, class_name: "Chat::CreateMessage") do
  transient :chat_channel,
            :user,
            :message,
            :in_reply_to,
            :thread,
            :upload_ids,
            :incoming_chat_webhook

  initialize_with do |transients|
    channel =
      transients[:chat_channel] || transients[:thread]&.channel ||
        transients[:in_reply_to]&.chat_channel || Fabricate(:chat_channel)
    user = transients[:user] || Fabricate(:user)
    Group.refresh_automatic_groups!
    channel.add(user)

    resolved_class.call(
      chat_channel_id: channel.id,
      guardian: user.guardian,
      message: transients[:message] || Faker::Lorem.paragraph_by_chars(number: 500),
      thread_id: transients[:thread]&.id,
      in_reply_to_id: transients[:in_reply_to]&.id,
      upload_ids: transients[:upload_ids],
      incoming_chat_webhook: transients[:incoming_chat_webhook],
    ).message
  end
end

Fabricator(:chat_mention, class_name: "Chat::Mention") do
  transient read: false
  transient high_priority: true
  transient identifier: :direct_mentions

  user { Fabricate(:user) }
  chat_message { Fabricate(:chat_message) }
end

Fabricator(:chat_message_reaction, class_name: "Chat::MessageReaction") do
  chat_message { Fabricate(:chat_message) }
  user { Fabricate(:user) }
  emoji { %w[+1 tada heart joffrey_facepalm].sample }
  after_build do |chat_message_reaction|
    chat_message_reaction.chat_message.chat_channel.add(chat_message_reaction.user)
  end
end

Fabricator(:chat_message_revision, class_name: "Chat::MessageRevision") do
=======
end

Fabricator(:chat_message) do
  chat_channel
  user
  message "Beep boop"
  cooked { |attrs| ChatMessage.cook(attrs[:message]) }
  cooked_version ChatMessage::BAKED_VERSION
end

Fabricator(:chat_mention) do
  chat_message { Fabricate(:chat_message) }
  user { Fabricate(:user) }
  notification { Fabricate(:notification) }
end

Fabricator(:chat_message_reaction) do
  chat_message { Fabricate(:chat_message) }
  user { Fabricate(:user) }
  emoji { %w[+1 tada heart joffrey_facepalm].sample }
end

Fabricator(:chat_upload) do
  chat_message { Fabricate(:chat_message) }
  upload { Fabricate(:upload) }
end

Fabricator(:chat_message_revision) do
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  chat_message { Fabricate(:chat_message) }
  old_message { "something old" }
  new_message { "something new" }
  user { |attrs| attrs[:chat_message].user }
end

<<<<<<< HEAD
Fabricator(:chat_reviewable_message, class_name: "Chat::ReviewableMessage") do
  reviewable_by_moderator true
  type "ReviewableChatMessage"
  created_by { Fabricate(:user) }
=======
Fabricator(:reviewable_chat_message) do
  reviewable_by_moderator true
  type "ReviewableChatMessage"
  created_by { Fabricate(:user) }
  target_type "ChatMessage"
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  target { Fabricate(:chat_message) }
  reviewable_scores { |p| [Fabricate.build(:reviewable_score, reviewable_id: p[:id])] }
end

<<<<<<< HEAD
Fabricator(:direct_message, class_name: "Chat::DirectMessage") do
  users { [Fabricate(:user), Fabricate(:user)] }
end

Fabricator(:chat_webhook_event, class_name: "Chat::WebhookEvent") do
=======
Fabricator(:direct_message) { users { [Fabricate(:user), Fabricate(:user)] } }

Fabricator(:chat_webhook_event) do
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  chat_message { Fabricate(:chat_message) }
  incoming_chat_webhook do |attrs|
    Fabricate(:incoming_chat_webhook, chat_channel: attrs[:chat_message].chat_channel)
  end
end

<<<<<<< HEAD
Fabricator(:incoming_chat_webhook, class_name: "Chat::IncomingWebhook") do
=======
Fabricator(:incoming_chat_webhook) do
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  name { sequence(:name) { |i| "#{i + 1}" } }
  key { sequence(:key) { |i| "#{i + 1}" } }
  chat_channel { Fabricate(:chat_channel, chatable: Fabricate(:category)) }
end

<<<<<<< HEAD
Fabricator(:user_chat_channel_membership, class_name: "Chat::UserChatChannelMembership") do
=======
Fabricator(:user_chat_channel_membership) do
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  user
  chat_channel
  following true
end

Fabricator(:user_chat_channel_membership_for_dm, from: :user_chat_channel_membership) do
  user
  chat_channel
  following true
  desktop_notification_level 2
  mobile_notification_level 2
end
<<<<<<< HEAD

Fabricator(:chat_draft, class_name: "Chat::Draft") do
  user
  chat_channel

  transient :value, "chat draft message"
  transient :uploads, []
  transient :reply_to_msg

  data do |attrs|
    { value: attrs[:value], replyToMsg: attrs[:reply_to_msg], uploads: attrs[:uploads] }.to_json
  end
end

Fabricator(:chat_thread, class_name: "Chat::Thread") do
  before_create do |thread, transients|
    thread.original_message_user = original_message.user
    thread.channel = original_message.chat_channel
  end

  transient :with_replies, :channel, :original_message_user, :old_om, use_service: false

  original_message do |attrs|
    Fabricate(
      :chat_message,
      chat_channel: attrs[:channel] || Fabricate(:chat_channel),
      user: attrs[:original_message_user] || Fabricate(:user),
      use_service: attrs[:use_service],
    )
  end

  after_create do |thread, transients|
    attrs = { thread_id: thread.id }

    # Sometimes we  make this older via created_at so any messages fabricated for this thread
    # afterwards are not created earlier in time than the OM.
    attrs[:created_at] = 1.week.ago if transients[:old_om]

    thread.original_message.update!(**attrs)
    thread.add(thread.original_message_user)

    if transients[:with_replies]
      Fabricate.times(
        transients[:with_replies],
        :chat_message,
        thread: thread,
        use_service: transients[:use_service],
      )
    end
  end
end

Fabricator(:user_chat_thread_membership, class_name: "Chat::UserChatThreadMembership") do
  user
  after_create do |membership|
    Chat::UserChatChannelMembership.find_or_create_by!(
      user: membership.user,
      chat_channel: membership.thread.channel,
    ).update!(following: true)
  end
end
=======
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
