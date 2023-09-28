# frozen_string_literal: true

class HashtagsController < ApplicationController
  requires_login

  def lookup
<<<<<<< HEAD
    render json: HashtagAutocompleteService.new(guardian).lookup(params[:slugs], params[:order])
=======
    if SiteSetting.enable_experimental_hashtag_autocomplete
      render json: HashtagAutocompleteService.new(guardian).lookup(params[:slugs], params[:order])
    else
      render json: HashtagAutocompleteService.new(guardian).lookup_old(params[:slugs])
    end
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  end

  def search
    params.require(:order)

    results = HashtagAutocompleteService.new(guardian).search(params[:term], params[:order])

    render json: success_json.merge(results: results)
  end
end
