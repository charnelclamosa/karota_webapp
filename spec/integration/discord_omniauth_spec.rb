# frozen_string_literal: true

<<<<<<< HEAD
describe "Discord OAuth2" do
=======
describe 'Discord OAuth2' do
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  let(:access_token) { "discord_access_token_448" }
  let(:client_id) { "abcdef11223344" }
  let(:client_secret) { "adddcccdddd99922" }
  let(:temp_code) { "discord_temp_code_544254" }

  fab!(:user1) { Fabricate(:user) }

  def setup_discord_email_stub(email, verified:)
<<<<<<< HEAD
    stub_request(:get, "https://discord.com/api/users/@me").with(
      headers: {
        "Authorization" => "Bearer #{access_token}",
      },
    ).to_return(
      status: 200,
      body:
        JSON.dump(
=======
    stub_request(:get, "https://discord.com/api/users/@me")
      .with(
        headers: {
          "Authorization" => "Bearer #{access_token}"
        }
      )
      .to_return(
        status: 200,
        body: JSON.dump(
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
          id: "80351110224678912",
          username: "Nelly",
          discriminator: "1337",
          avatar: "8342729096ea3675442027381ff50dfe",
          verified: verified,
          email: email,
          flags: 64,
          banner: "06c16474723fe537c283b8efa61a30c8",
<<<<<<< HEAD
          accent_color: 16_711_680,
          premium_type: 1,
          public_flags: 64,
        ),
      headers: {
        "Content-Type" => "application/json",
      },
    )
=======
          accent_color: 16711680,
          premium_type: 1,
          public_flags: 64
        ),
        headers: {
          "Content-Type" => "application/json"
        }
      )
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  end

  before do
    SiteSetting.enable_discord_logins = true
    SiteSetting.discord_client_id = client_id
    SiteSetting.discord_secret = client_secret

<<<<<<< HEAD
    stub_request(:post, "https://discord.com/api/oauth2/token").with(
      body:
        hash_including(
=======
    stub_request(:post, "https://discord.com/api/oauth2/token")
      .with(
        body: hash_including(
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
          "client_id" => client_id,
          "client_secret" => client_secret,
          "code" => temp_code,
          "grant_type" => "authorization_code",
<<<<<<< HEAD
          "redirect_uri" => "http://test.localhost/auth/discord/callback",
        ),
    ).to_return(
      status: 200,
      body:
        Rack::Utils.build_query(
          access_token: access_token,
          scope: "identify emails guilds",
          token_type: "Bearer",
          expires_in: 604_800,
          refresh_token: "D43f5y0ahjqew82jZ4NViEr2YafMKhue",
        ),
      headers: {
        "Content-Type" => "application/x-www-form-urlencoded",
      },
    )

    stub_request(:get, "https://discord.com/api/users/@me/guilds").with(
      headers: {
        "Authorization" => "Bearer #{access_token}",
      },
    ).to_return(
      status: 200,
      body:
        JSON.dump(
=======
          "redirect_uri" => "http://test.localhost/auth/discord/callback"
        )
      )
      .to_return(
        status: 200,
        body: Rack::Utils.build_query(
          access_token: access_token,
          scope: "identify emails guilds",
          token_type: "Bearer",
          expires_in: 604800,
          refresh_token: "D43f5y0ahjqew82jZ4NViEr2YafMKhue",
        ),
        headers: {
          "Content-Type" => "application/x-www-form-urlencoded"
        }
      )

    stub_request(:get, "https://discord.com/api/users/@me/guilds")
      .with(
        headers: {
          "Authorization" => "Bearer #{access_token}"
        }
      )
      .to_return(
        status: 200,
        body: JSON.dump(
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
          id: "80351110224678912",
          name: "1337 Krew",
          icon: "8342729096ea3675442027381ff50dfe",
          owner: true,
          permissions: "36953089",
<<<<<<< HEAD
          features: %w[COMMUNITY NEWS],
        ),
      headers: {
        "Content-Type" => "application/json",
      },
    )
=======
          features: ["COMMUNITY", "NEWS"]
        ),
        headers: {
          "Content-Type" => "application/json"
        }
      )
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  end

  it "doesn't sign in anyone if the email from discord is not verified" do
    post "/auth/discord"
    expect(response.status).to eq(302)
    expect(response.location).to start_with("https://discord.com/api/oauth2/authorize")

    setup_discord_email_stub(user1.email, verified: false)

<<<<<<< HEAD
    post "/auth/discord/callback", params: { state: session["omniauth.state"], code: temp_code }
=======
    post "/auth/discord/callback", params: {
      state: session["omniauth.state"],
      code: temp_code
    }
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

    expect(response.status).to eq(302)
    expect(response.location).to eq("http://test.localhost/")
    expect(session[:current_user_id]).to be_blank
  end

  it "signs in the user if the email from discord is verified and matches the user's email" do
    post "/auth/discord"
    expect(response.status).to eq(302)
    expect(response.location).to start_with("https://discord.com/api/oauth2/authorize")

    setup_discord_email_stub(user1.email, verified: true)

<<<<<<< HEAD
    post "/auth/discord/callback", params: { state: session["omniauth.state"], code: temp_code }
=======
    post "/auth/discord/callback", params: {
      state: session["omniauth.state"],
      code: temp_code
    }
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

    expect(response.status).to eq(302)
    expect(response.location).to eq("http://test.localhost/")
    expect(session[:current_user_id]).to eq(user1.id)
  end
end
