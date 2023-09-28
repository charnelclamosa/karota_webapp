# frozen_string_literal: true

RSpec.describe Admin::EmbeddableHostsController do
  fab!(:admin) { Fabricate(:admin) }
  fab!(:moderator) { Fabricate(:moderator) }
  fab!(:user) { Fabricate(:user) }
  fab!(:embeddable_host) { Fabricate(:embeddable_host) }

<<<<<<< HEAD
  describe "#create" do
=======
  describe '#create' do
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    context "when logged in as an admin" do
      before { sign_in(admin) }

      it "logs embeddable host create" do
        post "/admin/embeddable_hosts.json", params: { embeddable_host: { host: "test.com" } }

        expect(response.status).to eq(200)
        expect(
          UserHistory.where(
            acting_user_id: admin.id,
            action: UserHistory.actions[:embeddable_host_create],
          ).exists?,
        ).to eq(true)
      end
    end

    shared_examples "embeddable host creation not allowed" do
      it "prevents embeddable host creation with a 404 response" do
<<<<<<< HEAD
        post "/admin/embeddable_hosts.json", params: { embeddable_host: { host: "test.com" } }
=======
        post "/admin/embeddable_hosts.json", params: {
          embeddable_host: { host: "test.com" }
        }
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

        expect(response.status).to eq(404)
        expect(response.parsed_body["errors"]).to include(I18n.t("not_found"))
      end
    end

    context "when logged in as a moderator" do
      before { sign_in(moderator) }

      include_examples "embeddable host creation not allowed"
    end

    context "when logged in as a non-staff user" do
<<<<<<< HEAD
      before { sign_in(user) }
=======
      before  { sign_in(user) }
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

      include_examples "embeddable host creation not allowed"
    end
  end

<<<<<<< HEAD
  describe "#update" do
=======
  describe '#update' do
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    context "when logged in as an admin" do
      before { sign_in(admin) }

      it "logs embeddable host update" do
        category = Fabricate(:category)

        put "/admin/embeddable_hosts/#{embeddable_host.id}.json",
            params: {
              embeddable_host: {
                host: "test.com",
                category_id: category.id,
              },
            }

        expect(response.status).to eq(200)

        history_exists =
          UserHistory.where(
            acting_user_id: admin.id,
            action: UserHistory.actions[:embeddable_host_update],
            new_value: "category_id: #{category.id}, host: test.com",
          ).exists?

        expect(history_exists).to eq(true)
      end
    end

    shared_examples "embeddable host update not allowed" do
      it "prevents updates with a 404 response" do
        category = Fabricate(:category)

<<<<<<< HEAD
        put "/admin/embeddable_hosts/#{embeddable_host.id}.json",
            params: {
              embeddable_host: {
                host: "test.com",
                category_id: category.id,
              },
            }
=======
        put "/admin/embeddable_hosts/#{embeddable_host.id}.json", params: {
          embeddable_host: { host: "test.com", class_name: "test-class", category_id: category.id }
        }
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

        expect(response.status).to eq(404)
        expect(response.parsed_body["errors"]).to include(I18n.t("not_found"))
      end
    end

    context "when logged in as a moderator" do
      before { sign_in(moderator) }

      include_examples "embeddable host update not allowed"
    end

    context "when logged in as a non-staff user" do
      before { sign_in(user) }

      include_examples "embeddable host update not allowed"
    end
  end

<<<<<<< HEAD
  describe "#destroy" do
=======
  describe '#destroy' do
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    context "when logged in as an admin" do
      before { sign_in(admin) }

      it "logs embeddable host destroy" do
        delete "/admin/embeddable_hosts/#{embeddable_host.id}.json", params: {}

        expect(response.status).to eq(200)
        expect(
          UserHistory.where(
            acting_user_id: admin.id,
            action: UserHistory.actions[:embeddable_host_destroy],
          ).exists?,
        ).to eq(true)
      end
    end

    shared_examples "embeddable host deletion not allowed" do
      it "prevents deletion with a 404 response" do
        delete "/admin/embeddable_hosts/#{embeddable_host.id}.json", params: {}

        expect(response.status).to eq(404)
        expect(response.parsed_body["errors"]).to include(I18n.t("not_found"))
      end
    end

    context "when logged in as a moderator" do
      before { sign_in(moderator) }

      include_examples "embeddable host deletion not allowed"
    end

    context "when logged in as a non-staff user" do
      before { sign_in(user) }

      include_examples "embeddable host deletion not allowed"
    end
  end
end
