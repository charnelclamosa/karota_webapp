# frozen_string_literal: true

module GitUrl
  class << self
<<<<<<< HEAD
    SSH_REGEXP = /\A(\w+@\w+(\.\w+)*):(.*)\z/
=======
    SSH_REGEXP = /(\w+@(\w+\.)*\w+):(.*)/
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

    def normalize(url)
      if m = SSH_REGEXP.match(url)
        url = "ssh://#{m[1]}/#{m[3]}"
      end

      if url.start_with?("https://github.com/") && !url.end_with?(".git")
<<<<<<< HEAD
        url = url.gsub(%r{/\z}, "")
=======
        url = url.gsub(/\/$/, '')
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
        url += ".git"
      end

      url
    end
  end
end
