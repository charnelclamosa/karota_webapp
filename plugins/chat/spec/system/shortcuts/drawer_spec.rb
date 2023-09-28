# frozen_string_literal: true

<<<<<<< HEAD
RSpec.describe "Shortcuts | drawer", type: :system do
  fab!(:user_1) { Fabricate(:admin) }
  fab!(:channel_1) { Fabricate(:chat_channel) }
  fab!(:channel_2) { Fabricate(:chat_channel) }

  let(:chat_page) { PageObjects::Pages::Chat.new }
  let(:channel_page) { PageObjects::Pages::ChatChannel.new }
  let(:drawer_page) { PageObjects::Pages::ChatDrawer.new }

  before do
    chat_system_bootstrap(user_1, [channel_1, channel_2])
=======
RSpec.describe "Navigation", type: :system, js: true do
  fab!(:user_1) { Fabricate(:admin) }
  fab!(:category_channel_1) { Fabricate(:category_channel) }
  fab!(:category_channel_2) { Fabricate(:category_channel) }
  let(:chat_page) { PageObjects::Pages::Chat.new }
  let(:chat_drawer_page) { PageObjects::Pages::ChatDrawer.new }

  before do
    chat_system_bootstrap(user_1, [category_channel_1, category_channel_2])
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    sign_in(user_1)
  end

  context "when drawer is closed" do
    before { visit("/") }

    context "when pressing dash" do
      it "opens the drawer" do
<<<<<<< HEAD
        page.send_keys("-")

        expect(chat_page).to have_drawer
=======
        find("body").send_keys("-")

        expect(page).to have_css(".chat-drawer.is-expanded")
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      end
    end
  end

  context "when drawer is opened" do
    before do
      visit("/")
      chat_page.open_from_header
    end

    context "when pressing escape" do
<<<<<<< HEAD
      context "when the composer is not focused" do
        it "closes the drawer" do
          expect(chat_page).to have_drawer

          drawer_page.open_channel(channel_1)
          page.send_keys(:tab) # ensures we focus out of input
          page.send_keys(:escape)

          expect(chat_page).to have_no_drawer
        end
      end

      context "when the composer is focused" do
        it "blurs the input" do
          expect(chat_page).to have_drawer

          drawer_page.open_channel(channel_1)
          channel_page.composer.input.click

          page.send_keys(:escape)

          expect(chat_page).to have_drawer
        end
      end
    end

    context "when pressing a letter" do
      it "doesn’t intercept the event" do
        drawer_page.open_channel(channel_1)
        page.send_keys(:tab) # simple way to ensure composer is not focused
        page.send_keys("e")

        expect(channel_page.composer.value).to eq("")
      end
    end

    context "when using Up/Down arrows" do
      it "navigates through the channels" do
        drawer_page.open_channel(channel_1)

        expect(chat_page).to have_drawer(channel_id: channel_1.id)

        page.send_keys(%i[alt arrow_down])

        expect(chat_page).to have_drawer(channel_id: channel_2.id)

        page.send_keys(%i[alt arrow_down])

        expect(chat_page).to have_drawer(channel_id: channel_1.id)

        page.send_keys(%i[alt arrow_up])

        expect(chat_page).to have_drawer(channel_id: channel_2.id)
=======
      it "opens the drawer" do
        expect(page).to have_css(".chat-drawer.is-expanded")

        chat_drawer_page.open_channel(category_channel_1)
        find(".chat-composer-input").send_keys(:escape)

        expect(page).to_not have_css(".chat-drawer.is-expanded")
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      end
    end
  end
end
