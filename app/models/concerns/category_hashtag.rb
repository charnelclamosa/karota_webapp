# frozen_string_literal: true

module CategoryHashtag
  extend ActiveSupport::Concern

  class_methods do
<<<<<<< HEAD
    ##
    # Finds any categories that match the provided slugs, supporting
    # the parent:child format for category slugs (only one level of
    # depth supported).
    #
    # @param {Array} category_slugs - Slug strings to look up, can also be in the parent:child format
    # @param {Array} categories - An array of Category models scoped to the user's guardian permissions.
    def query_loaded_from_slugs(category_slugs, categories)
      category_slugs
        .map(&:downcase)
        .map do |slug|
          slug_path = split_slug_path(slug)
          next if slug_path.blank?

          if SiteSetting.slug_generation_method == "encoded"
            slug_path.map! { |slug| CGI.escape(slug) }
          end
          parent_slug, child_slug = slug_path.last(2)
=======
    # TODO (martin) Remove this when enable_experimental_hashtag_autocomplete
    # becomes the norm, it is reimplemented below for CategoryHashtagDataSourcee
    def query_from_hashtag_slug(category_slug)
      slug_path = category_slug.split(SEPARATOR)
      return nil if slug_path.empty? || slug_path.size > 2

      slug_path.map! { |slug| CGI.escape(slug) } if SiteSetting.slug_generation_method == "encoded"
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

          # Category slugs can be in the parent:child format, if there
          # is no child then the "parent" part of the slug is just the
          # entire slug we look for.
          #
          # Otherwise if the child slug is present, we find the child
          # by its slug then find the parent by its slug and the child's
          # parent ID to make sure they match.
          if child_slug.present?
            categories.find do |cat|
              if cat.slug.casecmp?(child_slug) && cat.parent_category_id
                categories.find do |parent_category|
                  parent_category.id == cat.parent_category_id &&
                    parent_category.slug.casecmp?(parent_slug)
                end
              end
            end
          else
            categories.find { |cat| cat.slug.casecmp?(parent_slug) && cat.top_level? }
          end
        end
        .compact
    end

    def split_slug_path(slug)
      slug_path = slug.split(Category::SLUG_REF_SEPARATOR)
      return if slug_path.empty? || slug_path.size > 2
      slug_path
    end

    ##
    # Finds any categories that match the provided slugs, supporting
    # the parent:child format for category slugs (only one level of
    # depth supported).
    #
    # @param {Array} category_slugs - Slug strings to look up, can also be in the parent:child format
    # @param {Array} categories - An array of Category models scoped to the user's guardian permissions.
    def query_loaded_from_slugs(category_slugs, categories)
      category_slugs
        .map(&:downcase)
        .map do |slug|
          slug_path = slug.split(":")
          if SiteSetting.slug_generation_method == "encoded"
            slug_path.map! { |slug| CGI.escape(slug) }
          end
          parent_slug, child_slug = slug_path.last(2)

          # Category slugs can be in the parent:child format, if there
          # is no child then the "parent" part of the slug is just the
          # entire slug we look for.
          #
          # Otherwise if the child slug is present, we find the parent
          # by its slug then find the child by its slug and its parent's
          # ID to make sure they match.
          if child_slug.present?
            parent_category = categories.find { |cat| cat.slug.casecmp?(parent_slug) }
            if parent_category.present?
              categories.find do |cat|
                cat.slug.downcase == child_slug && cat.parent_category_id == parent_category.id
              end
            end
          else
            categories.find do |cat|
              cat.slug.downcase == parent_slug && cat.top_level?
            end
          end
        end
        .compact
    end
  end
end
