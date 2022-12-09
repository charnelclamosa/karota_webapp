# frozen_string_literal: true

require "rails_helper"

describe "API keys scoped to chat#create_message" do
  before do
    SiteSetting.chat_enabled = true
    SiteSetting.chat_allowed_groups = Group::AUTO_GROUPS[:everyone]
  end

  fab!(:admin) { Fabricate(:admin) }
  fab!(:chat_channel) { Fabricate(:category_channel) }
  fab!(:chat_channel_2) { Fabricate(:category_channel) }

  let(:chat_api_key) do
    key = ApiKey.create!
    ApiKeyScope.create!(resource: "chat", action: "create_message", api_key_id: key.id)
    key
  end

  let(:chat_channel_2_api_key) do
    key = ApiKey.create!
    ApiKeyScope.create!(
      resource: "chat",
      action: "create_message",
      api_key_id: key.id,
      allowed_parameters: {
        "chat_channel_id" => [chat_channel_2.id.to_s],
      },
    )
    key
  end

  it "cannot hit any other endpoints" do
    get "/admin/users/list/active.json",
        headers: {
          "Api-Key" => chat_api_key.key,
          "Api-Username" => admin.username,
        }
    expect(response.status).to eq(404)

    get "/latest.json", headers: { "Api-Key" => chat_api_key.key, "Api-Username" => admin.username }
    expect(response.status).to eq(403)
  end

  it "can create chat messages" do
<<<<<<< HEAD
    Chat::UserChatChannelMembership.create(user: admin, chat_channel: chat_channel, following: true)
=======
    UserChatChannelMembership.create(user: admin, chat_channel: chat_channel, following: true)
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    expect {
      post "/chat/#{chat_channel.id}.json",
           headers: {
             "Api-Key" => chat_api_key.key,
             "Api-Username" => admin.username,
           },
           params: {
             message: "asdfasdf asdfasdf",
           }
<<<<<<< HEAD
    }.to change { Chat::Message.where(chat_channel: chat_channel).count }.by(1)
=======
    }.to change { ChatMessage.where(chat_channel: chat_channel).count }.by(1)
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    expect(response.status).to eq(200)
  end

  it "cannot post in a channel it is not scoped for" do
<<<<<<< HEAD
    Chat::UserChatChannelMembership.create(user: admin, chat_channel: chat_channel, following: true)
=======
    UserChatChannelMembership.create(user: admin, chat_channel: chat_channel, following: true)
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    expect {
      post "/chat/#{chat_channel.id}.json",
           headers: {
             "Api-Key" => chat_channel_2_api_key.key,
             "Api-Username" => admin.username,
           },
           params: {
             message: "asdfasdf asdfasdf",
           }
<<<<<<< HEAD
    }.not_to change { Chat::Message.where(chat_channel: chat_channel).count }
=======
    }.not_to change { ChatMessage.where(chat_channel: chat_channel).count }
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    expect(response.status).to eq(403)
  end

  it "can only post in scoped channels" do
<<<<<<< HEAD
    Chat::UserChatChannelMembership.create(
      user: admin,
      chat_channel: chat_channel_2,
      following: true,
    )
=======
    UserChatChannelMembership.create(user: admin, chat_channel: chat_channel_2, following: true)
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    expect {
      post "/chat/#{chat_channel_2.id}.json",
           headers: {
             "Api-Key" => chat_channel_2_api_key.key,
             "Api-Username" => admin.username,
           },
           params: {
             message: "asdfasdf asdfasdf",
           }
<<<<<<< HEAD
    }.to change { Chat::Message.where(chat_channel: chat_channel_2).count }.by(1)
=======
    }.to change { ChatMessage.where(chat_channel: chat_channel_2).count }.by(1)
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    expect(response.status).to eq(200)
  end
end
