# frozen_string_literal: true

RSpec.describe UserBadgeSerializer do
<<<<<<< HEAD
  describe "#topic" do
=======
  describe '#topic' do
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    fab!(:user) { Fabricate(:user) }
    fab!(:admin) { Fabricate(:admin) }
    fab!(:post) { Fabricate(:post) }
    fab!(:badge) { Fabricate(:badge, show_posts: true) }
    fab!(:user_badge) { Fabricate(:user_badge, badge: badge, post_id: post.id) }
    let(:guardian) { Guardian.new(user_badge.user) }

<<<<<<< HEAD
    it "is not included in serialized object when badge has not been configured to show posts" do
=======
    it 'is not included in serialized object when badge has not been configured to show posts' do
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      badge.update!(show_posts: false)

      guardian = Guardian.new

<<<<<<< HEAD
      serialized =
        described_class.new(
          user_badge,
          scope: guardian,
          allowed_user_badge_topic_ids: guardian.can_see_topic_ids(topic_ids: [post.topic_id]),
        ).as_json
=======
      serialized = described_class.new(user_badge,
        scope: guardian,
        allowed_user_badge_topic_ids: guardian.can_see_topic_ids(topic_ids: [post.topic_id])
      ).as_json
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

      expect(serialized[:topics]).to eq(nil)
    end

<<<<<<< HEAD
    it "is not included in serialized object when user badge is not associated with a post" do
      user_badge.update!(post_id: nil)

      serialized =
        described_class.new(
          user_badge,
          scope: guardian,
          allowed_user_badge_topic_ids: guardian.can_see_topic_ids(topic_ids: [post.topic_id]),
        ).as_json
=======
    it 'is not included in serialized object when user badge is not associated with a post' do
      user_badge.update!(post_id: nil)

      serialized = described_class.new(user_badge,
        scope: guardian,
        allowed_user_badge_topic_ids: guardian.can_see_topic_ids(topic_ids: [post.topic_id])
      ).as_json
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

      expect(serialized[:topics]).to eq(nil)
    end

<<<<<<< HEAD
    it "is not included in serialized object when user badge is not associated with a topic" do
      post.topic.destroy!

      serialized =
        described_class.new(
          user_badge,
          scope: guardian,
          allowed_user_badge_topic_ids: guardian.can_see_topic_ids(topic_ids: [post.topic_id]),
        ).as_json
=======
    it 'is not included in serialized object when user badge is not associated with a topic' do
      post.topic.destroy!

      serialized = described_class.new(user_badge,
        scope: guardian,
        allowed_user_badge_topic_ids: guardian.can_see_topic_ids(topic_ids: [post.topic_id])
      ).as_json
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

      expect(serialized[:topics]).to eq(nil)
    end

<<<<<<< HEAD
    it "is not included in serialized object when allowed_user_badge_topic_ids option is not provided" do
=======
    it 'is not included in serialized object when allowed_user_badge_topic_ids option is not provided' do
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      serialized = described_class.new(user_badge, scope: guardian).as_json

      expect(serialized[:topics]).to eq(nil)
    end

<<<<<<< HEAD
    it "is not included in serialized object when topic id is not present in allowed_user_badge_topic_ids option" do
      serialized =
        described_class.new(
          user_badge,
          scope: guardian,
          allowed_user_badge_topic_ids: guardian.can_see_topic_ids(topic_ids: [post.topic_id + 1]),
        ).as_json
=======
    it 'is not included in serialized object when topic id is not present in allowed_user_badge_topic_ids option' do
      serialized = described_class.new(user_badge,
        scope: guardian,
        allowed_user_badge_topic_ids: guardian.can_see_topic_ids(topic_ids: [post.topic_id + 1])
      ).as_json
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

      expect(serialized[:topics]).to eq(nil)
    end

<<<<<<< HEAD
    it "is included in serialized object for admin scope even if allowed_user_badge_topic_ids option is not provided" do
=======
    it 'is included in serialized object for admin scope even if allowed_user_badge_topic_ids option is not provided' do
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      serialized = described_class.new(user_badge, scope: Guardian.new(admin)).as_json

      serialized_topic = serialized[:topics][0]

      expect(serialized_topic[:id]).to eq(post.topic_id)
      expect(serialized_topic[:title]).to eq(post.topic.title)
      expect(serialized_topic[:fancy_title]).to eq(post.topic.fancy_title)
      expect(serialized_topic[:slug]).to eq(post.topic.slug)
      expect(serialized_topic[:posts_count]).to eq(post.topic.reload.posts_count)
    end

<<<<<<< HEAD
    it "is included in serialized object when topic id is present in allowed_user_badge_topic_ids option" do
      serialized =
        described_class.new(
          user_badge,
          scope: guardian,
          allowed_user_badge_topic_ids: guardian.can_see_topic_ids(topic_ids: [post.topic_id]),
        ).as_json
=======
    it 'is included in serialized object when topic id is present in allowed_user_badge_topic_ids option' do
      serialized = described_class.new(user_badge,
        scope: guardian,
        allowed_user_badge_topic_ids: guardian.can_see_topic_ids(topic_ids: [post.topic_id])
      ).as_json
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

      serialized_topic = serialized[:topics][0]

      expect(serialized_topic[:id]).to eq(post.topic_id)
      expect(serialized_topic[:title]).to eq(post.topic.title)
      expect(serialized_topic[:fancy_title]).to eq(post.topic.fancy_title)
      expect(serialized_topic[:slug]).to eq(post.topic.slug)
      expect(serialized_topic[:posts_count]).to eq(post.topic.reload.posts_count)
    end
  end
end
