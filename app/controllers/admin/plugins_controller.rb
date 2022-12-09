# frozen_string_literal: true

class Admin::PluginsController < Admin::StaffController
<<<<<<< HEAD
=======

>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  def index
    render_serialized(Discourse.visible_plugins, AdminPluginSerializer, root: "plugins")
  end
end
