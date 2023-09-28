# frozen_string_literal: true

<<<<<<< HEAD
RSpec.describe "Navigation", type: :system do
=======
RSpec.describe "Navigation", type: :system, js: true do
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  fab!(:category) { Fabricate(:category) }
  fab!(:topic) { Fabricate(:topic) }
  fab!(:post) { Fabricate(:post, topic: topic) }
  fab!(:user) { Fabricate(:admin) }
  fab!(:category_channel) { Fabricate(:category_channel) }
  fab!(:category_channel_2) { Fabricate(:category_channel) }
  let(:chat_page) { PageObjects::Pages::Chat.new }
<<<<<<< HEAD
  let(:sidebar_page) { PageObjects::Pages::Sidebar.new }
=======
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

  before do
    chat_system_bootstrap(user, [category_channel, category_channel_2])
    sign_in(user)
<<<<<<< HEAD
    SiteSetting.navigation_menu = "legacy"
  end

  it "uses chat (not core) sidebar" do
    visit("/chat")

    expect(page).to have_css(".channels-list")
    expect(page).to have_no_css("#d-sidebar")
  end

  context "when sidebar is enabled as the navigation menu" do
    before { SiteSetting.navigation_menu = "sidebar" }
=======
  end

  context "when sidebar is enabled as the navigation menu" do
    before do
      SiteSetting.navigation_menu = "sidebar"
    end
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

    it "uses core sidebar" do
      visit("/chat")

      expect(page).to have_css("#d-sidebar")
<<<<<<< HEAD
      expect(page).to have_no_css(".channels-list")
=======
      expect(page).to_not have_css(".channels-list")
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    end

    context "when visiting on mobile" do
      it "has no sidebar" do
        visit("/?mobile_view=1")
        chat_page.visit_channel(category_channel_2)

<<<<<<< HEAD
        expect(page).to have_no_css("#d-sidebar")
      end
    end

    context "when public channels are disabled" do
      before { SiteSetting.enable_public_channels = false }

      it "has public channels section" do
        visit("/")

        expect(sidebar_page).to have_no_public_channels_section
      end
    end
=======
        expect(page).to_not have_css("#d-sidebar")
      end
    end
  end

  it "uses chat sidebar" do
    visit("/chat")

    expect(page).to have_css(".channels-list")
    expect(page).to_not have_css("#d-sidebar")
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  end

  context "when visiting on mobile" do
    it "has no sidebar" do
      visit("/?mobile_view=1")
      chat_page.visit_channel(category_channel_2)

<<<<<<< HEAD
      expect(page).to have_no_css(".channels-list")
=======
      expect(page).to_not have_css(".channels-list")
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    end
  end
end
