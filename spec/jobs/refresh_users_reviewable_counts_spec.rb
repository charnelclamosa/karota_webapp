# frozen_string_literal: true

RSpec.describe Jobs::RefreshUsersReviewableCounts do
  fab!(:admin) { Fabricate(:admin) }
  fab!(:moderator) { Fabricate(:moderator) }
  fab!(:user) { Fabricate(:user) }

  fab!(:group) { Fabricate(:group) }
  fab!(:topic) { Fabricate(:topic) }
<<<<<<< HEAD
  fab!(:reviewable1) do
    Fabricate(:reviewable, reviewable_by_group: group, reviewable_by_moderator: true, topic: topic)
  end
=======
  fab!(:reviewable1) { Fabricate(:reviewable, reviewable_by_group: group, reviewable_by_moderator: true, topic: topic) }
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

  fab!(:reviewable2) { Fabricate(:reviewable, reviewable_by_moderator: false) }
  fab!(:reviewable3) { Fabricate(:reviewable, reviewable_by_moderator: true) }

  before do
    SiteSetting.enable_category_group_moderation = true
    group.add(user)
    topic.category.update!(reviewable_by_group: group)
    Group.refresh_automatic_groups!
  end

<<<<<<< HEAD
  describe "#execute" do
    it "publishes reviewable counts for the members of the specified groups" do
      messages =
        MessageBus.track_publish do
          described_class.new.execute(group_ids: [Group::AUTO_GROUPS[:staff]])
        end
=======
  describe '#execute' do
    it "publishes reviewable counts for the members of the specified groups" do
      messages = MessageBus.track_publish do
        described_class.new.execute(group_ids: [Group::AUTO_GROUPS[:staff]])
      end
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      expect(messages.size).to eq(2)

      moderator_message = messages.find { |m| m.user_ids == [moderator.id] }
      expect(moderator_message.channel).to eq("/reviewable_counts/#{moderator.id}")

      admin_message = messages.find { |m| m.user_ids == [admin.id] }
      expect(moderator_message.channel).to eq("/reviewable_counts/#{moderator.id}")

<<<<<<< HEAD
      messages = MessageBus.track_publish { described_class.new.execute(group_ids: [group.id]) }
=======
      messages = MessageBus.track_publish do
        described_class.new.execute(group_ids: [group.id])
      end
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      expect(messages.size).to eq(1)

      user_message = messages.find { |m| m.user_ids == [user.id] }
      expect(user_message.channel).to eq("/reviewable_counts/#{user.id}")
    end

    it "published counts respect reviewables visibility" do
<<<<<<< HEAD
      messages =
        MessageBus.track_publish do
          described_class.new.execute(group_ids: [Group::AUTO_GROUPS[:staff], group.id])
        end
=======
      messages = MessageBus.track_publish do
        described_class.new.execute(group_ids: [Group::AUTO_GROUPS[:staff], group.id])
      end
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      expect(messages.size).to eq(3)

      admin_message = messages.find { |m| m.user_ids == [admin.id] }
      moderator_message = messages.find { |m| m.user_ids == [moderator.id] }
      user_message = messages.find { |m| m.user_ids == [user.id] }

      expect(admin_message.channel).to eq("/reviewable_counts/#{admin.id}")
<<<<<<< HEAD
      expect(admin_message.data).to eq(reviewable_count: 3, unseen_reviewable_count: 3)

      expect(moderator_message.channel).to eq("/reviewable_counts/#{moderator.id}")
      expect(moderator_message.data).to eq(reviewable_count: 2, unseen_reviewable_count: 2)

      expect(user_message.channel).to eq("/reviewable_counts/#{user.id}")
      expect(user_message.data).to eq(reviewable_count: 1, unseen_reviewable_count: 1)
=======
      expect(admin_message.data).to eq(
        reviewable_count: 3,
        unseen_reviewable_count: 3
      )

      expect(moderator_message.channel).to eq("/reviewable_counts/#{moderator.id}")
      expect(moderator_message.data).to eq(
        reviewable_count: 2,
        unseen_reviewable_count: 2
      )

      expect(user_message.channel).to eq("/reviewable_counts/#{user.id}")
      expect(user_message.data).to eq(
        reviewable_count: 1,
        unseen_reviewable_count: 1
      )
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    end
  end
end
