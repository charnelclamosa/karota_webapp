# frozen_string_literal: true

RSpec.describe GitUrl do
  it "handles the discourse github repo by ssh" do
    expect(GitUrl.normalize("git@github.com:discourse/discourse.git")).to eq(
<<<<<<< HEAD
      "ssh://git@github.com/discourse/discourse.git",
=======
      "ssh://git@github.com/discourse/discourse.git"
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    )
  end

  it "handles the discourse github repo by https" do
    expect(GitUrl.normalize("https://github.com/discourse/discourse.git")).to eq(
<<<<<<< HEAD
      "https://github.com/discourse/discourse.git",
=======
      "https://github.com/discourse/discourse.git"
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    )
  end
end
