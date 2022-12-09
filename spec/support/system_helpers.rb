# frozen_string_literal: true
require "highline/import"

module SystemHelpers
<<<<<<< HEAD
  PLATFORM_KEY_MODIFIER = RUBY_PLATFORM =~ /darwin/i ? :meta : :control

=======
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  def pause_test
    result =
      ask(
        "\n\e[33mTest paused, press enter to resume, type `d` and press enter to start debugger.\e[0m",
      )
<<<<<<< HEAD
    binding.pry if result == "d" # rubocop:disable Lint/Debugger
=======
    byebug if result == "d" # rubocop:disable Lint/Debugger
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    self
  end

  def sign_in(user)
    visit File.join(
            GlobalSetting.relative_url_root || "",
            "/session/#{user.encoded_username}/become.json?redirect=false",
          )

    expect(page).to have_content("Signed in to #{user.encoded_username} successfully")
  end

  # Uploads a theme from a directory.
  #
  # @param set_theme_as_default [Boolean] Whether to set the uploaded theme as the default theme for the site. Defaults to true.
  #
  # @return [Theme] The uploaded theme model given by `models/theme.rb`.
  #
  # @example Upload a theme and set it as default
  #   upload_theme("/path/to/theme")
  def upload_theme(set_theme_as_default: true)
    theme = RemoteTheme.import_theme_from_directory(theme_dir_from_caller)

    if theme.component
      raise "Uploaded theme is a theme component, please use the `upload_theme_component` method instead."
    end

    theme.set_default! if set_theme_as_default
    theme
  end

  # Uploads a theme component from a directory.
  #
  # @param parent_theme_id [Integer] The ID of the theme to add the theme component to. Defaults to `SiteSetting.default_theme_id`.
  #
  # @return [Theme] The uploaded theme model given by `models/theme.rb`.
  #
  # @example Upload a theme component
  #   upload_theme_component("/path/to/theme_component")
  #
  # @example Upload a theme component and add it to a specific theme
  #   upload_theme_component("/path/to/theme_component", parent_theme_id: 123)
  def upload_theme_component(parent_theme_id: SiteSetting.default_theme_id)
    theme = RemoteTheme.import_theme_from_directory(theme_dir_from_caller)

    if !theme.component
      raise "Uploaded theme is not a theme component, please use the `upload_theme` method instead."
    end

    Theme.find(parent_theme_id).child_themes << theme
    theme
  end

  def setup_system_test
    SiteSetting.login_required = false
    SiteSetting.has_login_hint = false
    SiteSetting.content_security_policy = false
    SiteSetting.force_hostname = Capybara.server_host
    SiteSetting.port = Capybara.server_port
    SiteSetting.external_system_avatars_enabled = false
    SiteSetting.disable_avatar_education_message = true
    SiteSetting.enable_user_tips = false
    SiteSetting.splash_screen = false
    SiteSetting.allowed_internal_hosts =
      (
        SiteSetting.allowed_internal_hosts.to_s.split("|") +
          MinioRunner.config.minio_urls.map { |url| URI.parse(url).host }
      ).join("|")
  end

  def try_until_success(timeout: Capybara.default_max_wait_time, frequency: 0.01)
    start ||= Time.zone.now
    backoff ||= frequency
    yield
<<<<<<< HEAD
  rescue RSpec::Expectations::ExpectationNotMetError,
         Capybara::ExpectationNotMet,
         Capybara::ElementNotFound
=======
  rescue RSpec::Expectations::ExpectationNotMetError
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    raise if Time.zone.now >= start + timeout.seconds
    sleep backoff
    backoff += frequency
    retry
  end

<<<<<<< HEAD
  def wait_for_attribute(
    element,
    attribute,
    value,
    timeout: Capybara.default_max_wait_time,
    frequency: 0.01
  )
    try_until_success(timeout: timeout, frequency: frequency) do
      expect(element[attribute.to_sym]).to eq(value)
    end
  end

  # Waits for an element to stop animating up to timeout seconds,
  # then raises a Capybara error if it does not stop.
  #
  # This is based on getBoundingClientRect, where Y is the distance
  # from the top of the element to the top of the viewport, and X
  # is the distance from the leftmost edge of the element to the
  # left of the viewport. The viewpoint origin (0, 0) is at the
  # top left of the page.
  #
  # Once X and Y stop changing based on the current vs previous position,
  # then we know the animation has stopped and the element is stabilised,
  # at which point we can click on it without fear of Capybara mis-clicking.
  #
  # c.f. https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
  def wait_for_animation(element, timeout: Capybara.default_max_wait_time)
    old_element_x = nil
    old_element_y = nil

    try_until_success(timeout: timeout) do
      current_element_x = element.rect.x
      current_element_y = element.rect.y

      stopped_moving = current_element_x == old_element_x && current_element_y == old_element_y

      old_element_x = current_element_x
      old_element_y = current_element_y

      raise Capybara::ExpectationNotMet if !stopped_moving
    end
  end

  def resize_window(width: nil, height: nil)
    original_size = page.driver.browser.manage.window.size
    page.driver.browser.manage.window.resize_to(
      width || original_size.width,
      height || original_size.height,
    )
=======
  def resize_window(width: nil, height: nil)
    original_size = page.driver.browser.manage.window.size
    page.driver.browser.manage.window.resize_to(width || original_size.width, height || original_size.height)
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    yield
  ensure
    page.driver.browser.manage.window.resize_to(original_size.width, original_size.height)
  end
<<<<<<< HEAD

  def using_browser_timezone(timezone, &example)
    previous_browser_timezone = ENV["TZ"]

    ENV["TZ"] = timezone

    using_session(timezone) do |session|
      freeze_time(&example)
      session.quit
    end

    ENV["TZ"] = previous_browser_timezone
  end

  # When using parallelism, Capybara's `using_session` method can cause
  # intermittent failures as two sessions can be created with the same name
  # in different tests and be run at the same time.
  def using_session(name, &block)
    Capybara.using_session(name.to_s + self.method_name, &block)
  end

  def select_text_range(selector, start = 0, offset = 5)
    js = <<-JS
      const node = document.querySelector(arguments[0]).childNodes[0];
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(node);
      range.setStart(node, arguments[1]);
      range.setEnd(node, arguments[1] + arguments[2]);
      selection.removeAllRanges();
      selection.addRange(range);
    JS

    page.execute_script(js, selector, start, offset)
  end

  def setup_s3_system_test(enable_secure_uploads: false, enable_direct_s3_uploads: true)
    SiteSetting.enable_s3_uploads = true

    SiteSetting.s3_upload_bucket = "discoursetest"
    SiteSetting.enable_upload_debug_mode = true

    SiteSetting.s3_access_key_id = MinioRunner.config.minio_root_user
    SiteSetting.s3_secret_access_key = MinioRunner.config.minio_root_password
    SiteSetting.s3_endpoint = MinioRunner.config.minio_server_url

    SiteSetting.enable_direct_s3_uploads = enable_direct_s3_uploads
    SiteSetting.secure_uploads = enable_secure_uploads

    MinioRunner.start
  end

  def skip_unless_s3_system_specs_enabled!
    skip("(martin) temporarily skipping minio tests because of parralel binary issues")

    if !ENV["CI"] && !ENV["RUN_S3_SYSTEM_SPECS"]
      skip(
        "S3 system specs are disabled in this environment, set CI=1 or RUN_S3_SYSTEM_SPECS=1 to enable them.",
      )
    end
  end

  private

  def theme_dir_from_caller
    caller.each do |line|
      if (split = line.split(%r{/spec/system/.+_spec.rb})).length > 1
        return split.first
      end
    end
  end
=======
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
end
