# frozen_string_literal: true

if Discourse.allow_dev_populate?
<<<<<<< HEAD
  desc "Generates sample messages in channels"
  task "chat:message:populate", %i[channel_id count] => ["db:load_config"] do |_, args|
    DiscourseDev::Message.populate!(
      ignore_current_count: true,
      channel_id: args[:channel_id],
      count: args[:count],
    )
  end

  desc "Generates random channels from categories"
  task "chat:category_channel:populate" => ["db:load_config"] do |_, args|
    DiscourseDev::CategoryChannel.populate!(ignore_current_count: true)
  end

  desc "Creates a thread with sample messages in a channel"
  task "chat:thread:populate", %i[channel_id message_count] => ["db:load_config"] do |_, args|
    DiscourseDev::Thread.populate!(
      ignore_current_count: true,
      channel_id: args[:channel_id],
      message_count: args[:message_count],
    )
=======
  chat_task = Rake::Task["dev:populate"]
  chat_task.enhance do
    SiteSetting.chat_enabled = true
    DiscourseDev::PublicChannel.populate!
    DiscourseDev::DirectChannel.populate!
    DiscourseDev::Message.populate!
  end

  desc "Generates sample content for chat"
  task "chat:populate" => ["db:load_config"] do |_, args|
    DiscourseDev::PublicChannel.new.populate!(ignore_current_count: true)
    DiscourseDev::DirectChannel.new.populate!(ignore_current_count: true)
    DiscourseDev::Message.new.populate!(ignore_current_count: true)
  end

  desc "Generates sample messages in channels"
  task "chat:message:populate" => ["db:load_config"] do |_, args|
    DiscourseDev::Message.new.populate!(ignore_current_count: true)
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  end
end
