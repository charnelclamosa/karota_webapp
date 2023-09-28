# frozen_string_literal: true

<<<<<<< HEAD
describe "Admin Customize Themes", type: :system do
=======
describe 'Admin Customize Themes', type: :system, js: true do
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  fab!(:color_scheme) { Fabricate(:color_scheme) }
  fab!(:theme) { Fabricate(:theme) }
  fab!(:admin) { Fabricate(:admin) }

<<<<<<< HEAD
  before { sign_in(admin) }

  describe "when visiting the page to customize the theme" do
    it "should allow admin to update the color scheme of the theme" do
=======
  before do
    sign_in(admin)
  end

  describe 'when visiting the page to customize the theme' do
    it 'should allow admin to update the color scheme of the theme' do
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      visit("/admin/customize/themes/#{theme.id}")

      color_scheme_settings = find(".theme-settings__color-scheme")

      expect(color_scheme_settings).not_to have_css(".submit-edit")
      expect(color_scheme_settings).not_to have_css(".cancel-edit")

      color_scheme_settings.find(".color-palettes").click
      color_scheme_settings.find(".color-palettes-row[data-value='#{color_scheme.id}']").click
      color_scheme_settings.find(".submit-edit").click

<<<<<<< HEAD
      expect(color_scheme_settings.find(".setting-value")).to have_content(color_scheme.name)
=======
      expect(color_scheme_settings.find('.setting-value')).to have_content(color_scheme.name)
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      expect(color_scheme_settings).not_to have_css(".submit-edit")
      expect(color_scheme_settings).not_to have_css(".cancel-edit")

      expect(theme.reload.color_scheme_id).to eq(color_scheme.id)
    end
  end
<<<<<<< HEAD

  describe "when editing a local theme" do
    it "The saved value is present in the editor" do
      theme.set_field(target: "common", name: "head_tag", value: "console.log('test')", type_id: 0)
      theme.save!

      visit("/admin/customize/themes/#{theme.id}/common/head_tag/edit")

      ace_content = find(".ace_content")
      expect(ace_content.text).to eq("console.log('test')")
    end
  end
=======
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
end
