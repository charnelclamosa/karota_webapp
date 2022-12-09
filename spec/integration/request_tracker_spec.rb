# frozen_string_literal: true

<<<<<<< HEAD
RSpec.describe "request tracker" do
=======
RSpec.describe 'request tracker' do
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  let(:api_key) do
    Fabricate(
      :api_key,
      user: Fabricate.build(:user),
<<<<<<< HEAD
      api_key_scopes: [ApiKeyScope.new(resource: "users", action: "show")],
=======
      api_key_scopes: [ApiKeyScope.new(resource: 'users', action: 'show')]
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    )
  end

  let(:user_api_key) do
<<<<<<< HEAD
    Fabricate(:user_api_key, scopes: [Fabricate.build(:user_api_key_scope, name: "session_info")])
=======
    Fabricate(:user_api_key, scopes: [Fabricate.build(:user_api_key_scope, name: 'session_info')])
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  end

  before do
    CachedCounting.reset
    CachedCounting.enable
    ApplicationRequest.enable
  end

  after do
    ApplicationRequest.disable
    CachedCounting.reset
    CachedCounting.disable
  end

<<<<<<< HEAD
  context "when using an api key" do
    it "is counted as an API request" do
=======
  context 'when using an api key' do
    it 'is counted as an API request' do
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      get "/u/#{api_key.user.username}.json", headers: { HTTP_API_KEY: api_key.key }
      expect(response.status).to eq(200)

      CachedCounting.flush
      expect(ApplicationRequest.http_total.first.count).to eq(1)
      expect(ApplicationRequest.http_2xx.first.count).to eq(1)
      expect(ApplicationRequest.api.first.count).to eq(1)
    end
  end

<<<<<<< HEAD
  context "when using an user api key" do
    it "is counted as a user API request" do
      get "/session/current.json", headers: { HTTP_USER_API_KEY: user_api_key.key }
=======
  context 'when using an user api key' do
    it 'is counted as a user API request' do
      get '/session/current.json', headers: { HTTP_USER_API_KEY: user_api_key.key }
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      expect(response.status).to eq(200)

      CachedCounting.flush
      expect(ApplicationRequest.http_total.first.count).to eq(1)
      expect(ApplicationRequest.http_2xx.first.count).to eq(1)
      expect(ApplicationRequest.user_api.first.count).to eq(1)
    end
  end
end
