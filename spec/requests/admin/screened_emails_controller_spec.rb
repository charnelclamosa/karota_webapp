# frozen_string_literal: true

RSpec.describe Admin::ScreenedEmailsController do
  fab!(:admin) { Fabricate(:admin) }
  fab!(:moderator) { Fabricate(:moderator) }
  fab!(:user) { Fabricate(:user) }
  fab!(:screened_email) { Fabricate(:screened_email) }

<<<<<<< HEAD
  describe "#index" do
=======
  describe '#index' do
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    shared_examples "screened emails accessible" do
      it "returns screened emails" do
        get "/admin/logs/screened_emails.json"

        expect(response.status).to eq(200)
        json = response.parsed_body
        expect(json.size).to eq(1)
      end
    end

    context "when logged in as an admin" do
      before { sign_in(admin) }

      include_examples "screened emails accessible"
    end

    context "when logged in as a moderator" do
      before { sign_in(moderator) }

      include_examples "screened emails accessible"
    end

    context "when logged in as a non-staff user" do
<<<<<<< HEAD
      before { sign_in(user) }
=======
      before  { sign_in(user) }
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

      it "denies access with a 404 response" do
        get "/admin/logs/screened_emails.json"

        expect(response.status).to eq(404)
        expect(response.parsed_body["errors"]).to include(I18n.t("not_found"))
      end
    end
  end

  describe "#destroy" do
    shared_examples "screened email deletion possible" do
      it "deletes screened email" do
<<<<<<< HEAD
        expect do delete "/admin/logs/screened_emails/#{screened_email.id}.json" end.to change {
          ScreenedEmail.count
        }.by(-1)
=======
        expect do
          delete "/admin/logs/screened_emails/#{screened_email.id}.json"
        end.to change { ScreenedEmail.count }.by(-1)
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

        expect(response.status).to eq(200)
      end
    end

    context "when logged in as an admin" do
      before { sign_in(admin) }

      include_examples "screened email deletion possible"
    end

    context "when logged in as a moderator" do
      before { sign_in(moderator) }

      include_examples "screened email deletion possible"
    end

    context "when logged in as a non-staff user" do
<<<<<<< HEAD
      before { sign_in(user) }
=======
      before  { sign_in(user) }
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

      it "prevents deletion with a 404 response" do
        delete "/admin/logs/screened_emails/#{screened_email.id}.json"

        expect(response.status).to eq(404)
        expect(response.parsed_body["errors"]).to include(I18n.t("not_found"))
      end
    end
  end
end
