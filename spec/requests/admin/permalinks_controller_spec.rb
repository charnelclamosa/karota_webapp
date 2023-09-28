# frozen_string_literal: true

RSpec.describe Admin::PermalinksController do
  fab!(:admin) { Fabricate(:admin) }
  fab!(:moderator) { Fabricate(:moderator) }
  fab!(:user) { Fabricate(:user) }
<<<<<<< HEAD

  describe "#index" do
    context "when logged in as an admin" do
      before { sign_in(admin) }

      it "filters url" do
        Fabricate(:permalink, url: "/forum/23")
        Fabricate(:permalink, url: "/forum/98")
        Fabricate(:permalink, url: "/discuss/topic/45")
        Fabricate(:permalink, url: "/discuss/topic/76")

        get "/admin/permalinks.json", params: { filter: "topic" }

=======

  describe '#index' do
    context "when logged in as an admin" do
      before { sign_in(admin) }

      it 'filters url' do
        Fabricate(:permalink, url: "/forum/23")
        Fabricate(:permalink, url: "/forum/98")
        Fabricate(:permalink, url: "/discuss/topic/45")
        Fabricate(:permalink, url: "/discuss/topic/76")

        get "/admin/permalinks.json", params: { filter: "topic" }

>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
        expect(response.status).to eq(200)
        result = response.parsed_body
        expect(result.length).to eq(2)
      end

<<<<<<< HEAD
      it "filters external url" do
=======
      it 'filters external url' do
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
        Fabricate(:permalink, external_url: "http://google.com")
        Fabricate(:permalink, external_url: "http://wikipedia.org")
        Fabricate(:permalink, external_url: "http://www.discourse.org")
        Fabricate(:permalink, external_url: "http://try.discourse.org")

        get "/admin/permalinks.json", params: { filter: "discourse" }

        expect(response.status).to eq(200)
        result = response.parsed_body
        expect(result.length).to eq(2)
      end

<<<<<<< HEAD
      it "filters url and external url both" do
=======
      it 'filters url and external url both' do
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
        Fabricate(:permalink, url: "/forum/23", external_url: "http://google.com")
        Fabricate(:permalink, url: "/discourse/98", external_url: "http://wikipedia.org")
        Fabricate(:permalink, url: "/discuss/topic/45", external_url: "http://discourse.org")
        Fabricate(:permalink, url: "/discuss/topic/76", external_url: "http://try.discourse.org")

        get "/admin/permalinks.json", params: { filter: "discourse" }

        expect(response.status).to eq(200)
        result = response.parsed_body
        expect(result.length).to eq(3)
      end
    end

    shared_examples "permalinks inaccessible" do
      it "denies access with a 404 response" do
        get "/admin/permalinks.json", params: { filter: "topic" }

        expect(response.status).to eq(404)
        expect(response.parsed_body["errors"]).to include(I18n.t("not_found"))
      end
    end

    context "when logged in as a moderator" do
      before { sign_in(moderator) }

      include_examples "permalinks inaccessible"
    end

    context "when logged in as a non-staff user" do
<<<<<<< HEAD
      before { sign_in(user) }
=======
      before  { sign_in(user) }
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

      include_examples "permalinks inaccessible"
    end
  end

  describe "#create" do
    context "when logged in as an admin" do
      before { sign_in(admin) }

      it "works for topics" do
        topic = Fabricate(:topic)

<<<<<<< HEAD
        post "/admin/permalinks.json",
             params: {
               url: "/topics/771",
               permalink_type: "topic_id",
               permalink_type_value: topic.id,
             }

        expect(response.status).to eq(200)
        expect(Permalink.last).to have_attributes(
          url: "topics/771",
          topic_id: topic.id,
          post_id: nil,
          category_id: nil,
          tag_id: nil,
        )
=======
        post "/admin/permalinks.json", params: {
          url: "/topics/771",
          permalink_type: "topic_id",
          permalink_type_value: topic.id
        }

        expect(response.status).to eq(200)
        expect(Permalink.last).to have_attributes(url: "topics/771", topic_id: topic.id, post_id: nil, category_id: nil, tag_id: nil)
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      end

      it "works for posts" do
        some_post = Fabricate(:post)

<<<<<<< HEAD
        post "/admin/permalinks.json",
             params: {
               url: "/topics/771/8291",
               permalink_type: "post_id",
               permalink_type_value: some_post.id,
             }

        expect(response.status).to eq(200)
        expect(Permalink.last).to have_attributes(
          url: "topics/771/8291",
          topic_id: nil,
          post_id: some_post.id,
          category_id: nil,
          tag_id: nil,
        )
=======
        post "/admin/permalinks.json", params: {
          url: "/topics/771/8291",
          permalink_type: "post_id",
          permalink_type_value: some_post.id
        }

        expect(response.status).to eq(200)
        expect(Permalink.last).to have_attributes(url: "topics/771/8291", topic_id: nil, post_id: some_post.id, category_id: nil, tag_id: nil)
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      end

      it "works for categories" do
        category = Fabricate(:category)

<<<<<<< HEAD
        post "/admin/permalinks.json",
             params: {
               url: "/forums/11",
               permalink_type: "category_id",
               permalink_type_value: category.id,
             }

        expect(response.status).to eq(200)
        expect(Permalink.last).to have_attributes(
          url: "forums/11",
          topic_id: nil,
          post_id: nil,
          category_id: category.id,
          tag_id: nil,
        )
=======
        post "/admin/permalinks.json", params: {
          url: "/forums/11",
          permalink_type: "category_id",
          permalink_type_value: category.id
        }

        expect(response.status).to eq(200)
        expect(Permalink.last).to have_attributes(url: "forums/11", topic_id: nil, post_id: nil, category_id: category.id, tag_id: nil)
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      end

      it "works for tags" do
        tag = Fabricate(:tag)

<<<<<<< HEAD
        post "/admin/permalinks.json",
             params: {
               url: "/forums/12",
               permalink_type: "tag_name",
               permalink_type_value: tag.name,
             }

        expect(response.status).to eq(200)
        expect(Permalink.last).to have_attributes(
          url: "forums/12",
          topic_id: nil,
          post_id: nil,
          category_id: nil,
          tag_id: tag.id,
        )
=======
        post "/admin/permalinks.json", params: {
          url: "/forums/12",
          permalink_type: "tag_name",
          permalink_type_value: tag.name
        }

        expect(response.status).to eq(200)
        expect(Permalink.last).to have_attributes(url: "forums/12", topic_id: nil, post_id: nil, category_id: nil, tag_id: tag.id)
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      end
    end

    shared_examples "permalink creation not allowed" do
      it "prevents creation with a 404 response" do
        topic = Fabricate(:topic)

        expect do
<<<<<<< HEAD
          post "/admin/permalinks.json",
               params: {
                 url: "/topics/771",
                 permalink_type: "topic_id",
                 permalink_type_value: topic.id,
               }
=======
          post "/admin/permalinks.json", params: {
            url: "/topics/771",
            permalink_type: "topic_id",
            permalink_type_value: topic.id
          }
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
        end.not_to change { Permalink.count }

        expect(response.status).to eq(404)
        expect(response.parsed_body["errors"]).to include(I18n.t("not_found"))
      end
    end

    context "when logged in as a moderator" do
      before { sign_in(moderator) }

      include_examples "permalink creation not allowed"
    end

    context "when logged in as a non-staff user" do
<<<<<<< HEAD
      before { sign_in(user) }
=======
      before  { sign_in(user) }
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

      include_examples "permalink creation not allowed"
    end
  end
end
