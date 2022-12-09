# frozen_string_literal: true

class DefaultComposerCategoryValidator
  def initialize(opts = {})
    @opts = opts
  end

  def valid_value?(val)
    category_id = val.to_i
    unless SiteSetting.allow_uncategorized_topics
      return false if category_id == SiteSetting.uncategorized_category_id
    end
    true
  end

  def error_message
<<<<<<< HEAD
    I18n.t("site_settings.errors.invalid_uncategorized_category_setting")
=======
    I18n.t('site_settings.errors.invalid_uncategorized_category_setting')
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  end
end
