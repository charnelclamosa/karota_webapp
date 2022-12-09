# frozen_string_literal: true

RSpec.describe DetailedUserBadgeSerializer do
<<<<<<< HEAD
  describe "#topic_id and #topic_title attributes" do
=======
  describe '#topic_id and #topic_title attributes' do
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    fab!(:user) { Fabricate(:user) }
    fab!(:admin) { Fabricate(:admin) }
    fab!(:post) { Fabricate(:post) }
    fab!(:badge) { Fabricate(:badge, show_posts: true) }
    fab!(:user_badge) { Fabricate(:user_badge, badge: badge, post_id: post.id) }
    let(:guardian) { Guardian.new(user_badge.user) }

<<<<<<< HEAD
    it "does not include attributes in serialized object when badge has not been configured to show posts" do
=======
    it 'does not include attributes in serialized object when badge has not been configured to show posts' do
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      badge.update!(show_posts: false)

      guardian = Guardian.new

<<<<<<< HEAD
      serialized =
        described_class.new(
          user_badge,
          scope: guardian,
          allowed_user_badge_topic_ids: guardian.can_see_topic_ids(topic_ids: [post.topic_id]),
          root: false,
        ).as_json
=======
      serialized = described_class.new(user_badge,
        scope: guardian,
        allowed_user_badge_topic_ids: guardian.can_see_topic_ids(topic_ids: [post.topic_id]),
        root: false,
      ).as_json
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

      expect(serialized[:topic_id]).to eq(nil)
      expect(serialized[:topic_title]).to eq(nil)
    end

<<<<<<< HEAD
    it "does not include attributes in serialized object when user badge is not associated with a post" do
      user_badge.update!(post_id: nil)

      serialized =
        described_class.new(
          user_badge,
          scope: guardian,
          allowed_user_badge_topic_ids: guardian.can_see_topic_ids(topic_ids: [post.topic_id]),
          root: false,
        ).as_json
=======
    it 'does not include attributes in serialized object when user badge is not associated with a post' do
      user_badge.update!(post_id: nil)

      serialized = described_class.new(user_badge,
        scope: guardian,
        allowed_user_badge_topic_ids: guardian.can_see_topic_ids(topic_ids: [post.topic_id]),
        root: false
      ).as_json
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

      expect(serialized[:topic_id]).to eq(nil)
      expect(serialized[:topic_title]).to eq(nil)
    end

<<<<<<< HEAD
    it "does not include attributes in serialized object when user badge is not associated with a topic" do
      post.topic.destroy!

      serialized =
        described_class.new(
          user_badge,
          scope: guardian,
          allowed_user_badge_topic_ids: guardian.can_see_topic_ids(topic_ids: [post.topic_id]),
          root: false,
        ).as_json
=======
    it 'does not include attributes in serialized object when user badge is not associated with a topic' do
      post.topic.destroy!

      serialized = described_class.new(user_badge,
        scope: guardian,
        allowed_user_badge_topic_ids: guardian.can_see_topic_ids(topic_ids: [post.topic_id]),
        root: false
      ).as_json
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

      expect(serialized[:topic_id]).to eq(nil)
      expect(serialized[:topic_title]).to eq(nil)
    end

<<<<<<< HEAD
    it "does not include attributes in serialized object when allowed_user_badge_topic_ids option is not provided" do
=======
    it 'does not include attributes in serialized object when allowed_user_badge_topic_ids option is not provided' do
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      serialized = described_class.new(user_badge, scope: guardian, root: false).as_json

      expect(serialized[:topic_id]).to eq(nil)
      expect(serialized[:topic_title]).to eq(nil)
    end

<<<<<<< HEAD
    it "does not included attributes in serialized object when topic id is not present in allowed_user_badge_topic_ids option" do
      serialized =
        described_class.new(
          user_badge,
          scope: guardian,
          allowed_user_badge_topic_ids: guardian.can_see_topic_ids(topic_ids: [post.topic_id + 1]),
          root: false,
        ).as_json
=======
    it 'does not included attributes in serialized object when topic id is not present in allowed_user_badge_topic_ids option' do
      serialized = described_class.new(user_badge,
        scope: guardian,
        allowed_user_badge_topic_ids: guardian.can_see_topic_ids(topic_ids: [post.topic_id + 1]),
        root: false
      ).as_json
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

      expect(serialized[:topic_id]).to eq(nil)
      expect(serialized[:topic_title]).to eq(nil)
    end

<<<<<<< HEAD
    it "includes attributes in serialized object for admin scope even if allowed_user_badge_topic_ids option is not provided" do
=======
    it 'includes attributes in serialized object for admin scope even if allowed_user_badge_topic_ids option is not provided' do
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      serialized = described_class.new(user_badge, scope: Guardian.new(admin), root: false).as_json

      expect(serialized[:topic_id]).to eq(post.topic_id)
      expect(serialized[:topic_title]).to eq(post.topic.title)
    end

<<<<<<< HEAD
    it "includes attributes in serialized object when topic id is present in allowed_user_badge_topic_ids option" do
      serialized =
        described_class.new(
          user_badge,
          scope: guardian,
          allowed_user_badge_topic_ids: guardian.can_see_topic_ids(topic_ids: [post.topic_id]),
          root: false,
        ).as_json
=======
    it 'includes attributes in serialized object when topic id is present in allowed_user_badge_topic_ids option' do
      serialized = described_class.new(user_badge,
        scope: guardian,
        allowed_user_badge_topic_ids: guardian.can_see_topic_ids(topic_ids: [post.topic_id]),
        root: false
      ).as_json
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

      expect(serialized[:topic_id]).to eq(post.topic_id)
      expect(serialized[:topic_title]).to eq(post.topic.title)
    end
  end
end
