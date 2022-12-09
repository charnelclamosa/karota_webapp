# frozen_string_literal: true

require "rails_helper"

<<<<<<< HEAD
describe Jobs::Chat::AutoJoinUsers do
  subject(:job) { described_class.new }

=======
describe Jobs::AutoJoinUsers do
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  it "works" do
    Jobs.run_immediately!
    channel = Fabricate(:category_channel, auto_join_users: true)
    user = Fabricate(:user, last_seen_at: 1.minute.ago, active: true)

<<<<<<< HEAD
    membership = Chat::UserChatChannelMembership.find_by(user: user, chat_channel: channel)
    expect(membership).to be_nil

    job.execute({})

    membership = Chat::UserChatChannelMembership.find_by(user: user, chat_channel: channel)
=======
    membership = UserChatChannelMembership.find_by(user: user, chat_channel: channel)
    expect(membership).to be_nil

    subject.execute({})

    membership = UserChatChannelMembership.find_by(user: user, chat_channel: channel)
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    expect(membership.following).to eq(true)
  end
end
