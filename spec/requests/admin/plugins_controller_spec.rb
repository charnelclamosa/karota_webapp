# frozen_string_literal: true

RSpec.describe Admin::PluginsController do
  fab!(:admin) { Fabricate(:admin) }
  fab!(:moderator) { Fabricate(:moderator) }
  fab!(:user) { Fabricate(:user) }

  describe "#index" do
    context "while logged in as an admin" do
      before { sign_in(admin) }

      it "returns plugins" do
        get "/admin/plugins.json"

        expect(response.status).to eq(200)
<<<<<<< HEAD
        expect(response.parsed_body.has_key?("plugins")).to eq(true)
=======
        expect(response.parsed_body.has_key?('plugins')).to eq(true)
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      end
    end

    context "when logged in as a moderator" do
      before { sign_in(moderator) }

      it "returns plugins" do
        get "/admin/plugins.json"

        expect(response.status).to eq(200)
<<<<<<< HEAD
        expect(response.parsed_body.has_key?("plugins")).to eq(true)
=======
        expect(response.parsed_body.has_key?('plugins')).to eq(true)
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      end
    end

    context "when logged in as a non-staff user" do
<<<<<<< HEAD
      before { sign_in(user) }
=======
      before  { sign_in(user) }
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

      it "denies access with a 404 response" do
        get "/admin/plugins.json"

        expect(response.status).to eq(404)
        expect(response.parsed_body["errors"]).to include(I18n.t("not_found"))
      end
    end
  end
end
