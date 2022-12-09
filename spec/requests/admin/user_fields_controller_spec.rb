# frozen_string_literal: true

RSpec.describe Admin::UserFieldsController do
  fab!(:admin) { Fabricate(:admin) }
  fab!(:moderator) { Fabricate(:moderator) }
  fab!(:user) { Fabricate(:user) }

<<<<<<< HEAD
  describe "#create" do
=======
  describe '#create' do
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    context "when logged in as an admin" do
      before { sign_in(admin) }

      it "creates a user field" do
        expect {
          post "/admin/customize/user_fields.json",
               params: {
                 user_field: {
                   name: "hello",
                   description: "hello desc",
                   field_type: "text",
                 },
               }

          expect(response.status).to eq(200)
        }.to change(UserField, :count).by(1)
      end

      it "creates a user field with options" do
        expect do
          post "/admin/customize/user_fields.json",
               params: {
                 user_field: {
                   name: "hello",
                   description: "hello desc",
                   field_type: "dropdown",
                   options: %w[a b c],
                 },
               }

          expect(response.status).to eq(200)
        end.to change(UserField, :count).by(1)

        expect(UserFieldOption.count).to eq(3)
      end
    end

    shared_examples "user field creation not allowed" do
      it "prevents creation with a 404 response" do
        expect do
<<<<<<< HEAD
          post "/admin/customize/user_fields.json",
               params: {
                 user_field: {
                   name: "hello",
                   description: "hello desc",
                   field_type: "text",
                 },
               }
=======
          post "/admin/customize/user_fields.json", params: {
            user_field: { name: 'hello', description: 'hello desc', field_type: 'text' }
          }
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
        end.not_to change { UserField.count }

        expect(response.status).to eq(404)
        expect(response.parsed_body["errors"]).to include(I18n.t("not_found"))
      end
    end

    context "when logged in as a moderator" do
      before { sign_in(moderator) }

      include_examples "user field creation not allowed"
    end

    context "when logged in as a non-staff user" do
<<<<<<< HEAD
      before { sign_in(user) }
=======
      before  { sign_in(user) }
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

      include_examples "user field creation not allowed"
    end
  end

<<<<<<< HEAD
  describe "#index" do
=======
  describe '#index' do
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    fab!(:user_field) { Fabricate(:user_field) }

    context "when logged in as an admin" do
      before { sign_in(admin) }

      it "returns a list of user fields" do
        get "/admin/customize/user_fields.json"
        expect(response.status).to eq(200)
        json = response.parsed_body
        expect(json["user_fields"]).to be_present
      end
    end

    shared_examples "user fields inaccessible" do
      it "denies access with a 404 response" do
        get "/admin/customize/user_fields.json"

        expect(response.status).to eq(404)
        expect(response.parsed_body["errors"]).to include(I18n.t("not_found"))
<<<<<<< HEAD
        expect(response.parsed_body["user_fields"]).to be_nil
=======
        expect(response.parsed_body['user_fields']).to be_nil
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      end
    end

    context "when logged in as a moderator" do
      before { sign_in(moderator) }

      include_examples "user fields inaccessible"
    end

    context "when logged in as a non-staff user" do
<<<<<<< HEAD
      before { sign_in(user) }
=======
      before  { sign_in(user) }
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

      include_examples "user fields inaccessible"
    end
  end

<<<<<<< HEAD
  describe "#destroy" do
=======
  describe '#destroy' do
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    fab!(:user_field) { Fabricate(:user_field) }

    context "when logged in as an admin" do
      before { sign_in(admin) }

      it "deletes the user field" do
        expect {
          delete "/admin/customize/user_fields/#{user_field.id}.json"
          expect(response.status).to eq(200)
        }.to change(UserField, :count).by(-1)
      end
    end

    shared_examples "user field deletion not allowed" do
      it "prevents deletion with a 404 response" do
<<<<<<< HEAD
        expect do delete "/admin/customize/user_fields/#{user_field.id}.json" end.not_to change {
          UserField.count
        }
=======
        expect do
          delete "/admin/customize/user_fields/#{user_field.id}.json"
        end.not_to change { UserField.count }
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

        expect(response.status).to eq(404)
        expect(response.parsed_body["errors"]).to include(I18n.t("not_found"))
      end
    end

    context "when logged in as a moderator" do
      before { sign_in(moderator) }

      include_examples "user field deletion not allowed"
    end

    context "when logged in as a non-staff user" do
<<<<<<< HEAD
      before { sign_in(user) }
=======
      before  { sign_in(user) }
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

      include_examples "user field deletion not allowed"
    end
  end

<<<<<<< HEAD
  describe "#update" do
=======
  describe '#update' do
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    fab!(:user_field) { Fabricate(:user_field) }

    context "when logged in as an admin" do
      before { sign_in(admin) }

      it "updates the user field" do
        put "/admin/customize/user_fields/#{user_field.id}.json",
            params: {
              user_field: {
                name: "fraggle",
                field_type: "confirm",
                description: "muppet",
              },
            }

        expect(response.status).to eq(200)
        user_field.reload
        expect(user_field.name).to eq("fraggle")
        expect(user_field.field_type).to eq("confirm")
      end

      it "updates the user field options" do
        put "/admin/customize/user_fields/#{user_field.id}.json",
            params: {
              user_field: {
                name: "fraggle",
                field_type: "dropdown",
                description: "muppet",
                options: %w[hello hello world],
              },
            }

        expect(response.status).to eq(200)
        user_field.reload
        expect(user_field.name).to eq("fraggle")
        expect(user_field.field_type).to eq("dropdown")
        expect(user_field.user_field_options.size).to eq(2)
      end

      it "keeps options when updating the user field" do
        put "/admin/customize/user_fields/#{user_field.id}.json",
            params: {
              user_field: {
                name: "fraggle",
                field_type: "dropdown",
                description: "muppet",
                options: %w[hello hello world],
                position: 1,
              },
            }

        expect(response.status).to eq(200)
        user_field.reload
        expect(user_field.user_field_options.size).to eq(2)

        put "/admin/customize/user_fields/#{user_field.id}.json",
            params: {
              user_field: {
                name: "fraggle",
                field_type: "dropdown",
                description: "muppet",
                position: 2,
              },
            }

        expect(response.status).to eq(200)
        user_field.reload
        expect(user_field.user_field_options.size).to eq(2)
      end

      it "removes directory column record if not public" do
        next_position = DirectoryColumn.maximum("position") + 1
        DirectoryColumn.create(
          user_field_id: user_field.id,
          enabled: false,
          type: DirectoryColumn.types[:user_field],
          position: next_position,
        )
        expect {
          put "/admin/customize/user_fields/#{user_field.id}.json",
              params: {
                user_field: {
                  show_on_profile: false,
                  show_on_user_card: false,
                  searchable: true,
                },
              }
        }.to change { DirectoryColumn.count }.by(-1)
      end
    end

    shared_examples "user field update not allowed" do
      it "prevents updates with a 404 response" do
        user_field.reload
        original_name = user_field.name

<<<<<<< HEAD
        put "/admin/customize/user_fields/#{user_field.id}.json",
            params: {
              user_field: {
                name: "fraggle",
                field_type: "confirm",
                description: "muppet",
              },
            }
=======
        put "/admin/customize/user_fields/#{user_field.id}.json", params: {
          user_field: { name: 'fraggle', field_type: 'confirm', description: 'muppet' }
        }
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

        expect(response.status).to eq(404)
        expect(response.parsed_body["errors"]).to include(I18n.t("not_found"))

        user_field.reload
        expect(user_field.name).to eq(original_name)
      end
    end

    context "when logged in as a moderator" do
      before { sign_in(moderator) }

      include_examples "user field update not allowed"
    end

    context "when logged in as a non-staff user" do
<<<<<<< HEAD
      before { sign_in(user) }
=======
      before  { sign_in(user) }
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

      include_examples "user field update not allowed"
    end
  end
end
