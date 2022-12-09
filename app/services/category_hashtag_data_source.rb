# frozen_string_literal: true

# Used as a data source via HashtagAutocompleteService to provide category
# results when looking up a category slug via markdown or searching for
# categories via the # autocomplete character.
class CategoryHashtagDataSource
<<<<<<< HEAD
  def self.enabled?
    true
  end

=======
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  def self.icon
    "folder"
  end

<<<<<<< HEAD
  def self.type
    "category"
  end

=======
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  def self.category_to_hashtag_item(category)
    HashtagAutocompleteService::HashtagItem.new.tap do |item|
      item.text = category.name
      item.slug = category.slug
      item.description = category.description_text
      item.icon = icon
      item.relative_url = category.url
<<<<<<< HEAD
      item.id = category.id

      # Single-level category heirarchy should be enough to distinguish between
      # categories here.
      item.ref = category.slug_ref
=======

      # Single-level category heirarchy should be enough to distinguish between
      # categories here.
      item.ref =
        if category.parent_category_id
          "#{category.parent_category.slug}:#{category.slug}"
        else
          category.slug
        end
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    end
  end

  def self.lookup(guardian, slugs)
<<<<<<< HEAD
    user_categories =
      Category
        .secured(guardian)
        .includes(:parent_category)
        .order("parent_category_id ASC NULLS FIRST, id ASC")
=======
    user_categories = Category.secured(guardian).includes(:parent_category)
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    Category
      .query_loaded_from_slugs(slugs, user_categories)
      .map { |category| category_to_hashtag_item(category) }
  end

<<<<<<< HEAD
  def self.search(
    guardian,
    term,
    limit,
    condition = HashtagAutocompleteService.search_conditions[:contains]
  )
    base_search =
      Category
        .secured(guardian)
        .select(:id, :parent_category_id, :slug, :name, :description)
        .includes(:parent_category)

    if condition == HashtagAutocompleteService.search_conditions[:starts_with]
      base_search = base_search.where("LOWER(slug) LIKE :term", term: "#{term}%")
    elsif condition == HashtagAutocompleteService.search_conditions[:contains]
      base_search =
        base_search.where("LOWER(name) LIKE :term OR LOWER(slug) LIKE :term", term: "%#{term}%")
    else
      raise Discourse::InvalidParameters.new("Unknown search condition: #{condition}")
    end

    base_search.take(limit).map { |category| category_to_hashtag_item(category) }
=======
  def self.search(guardian, term, limit)
    Category
      .secured(guardian)
      .includes(:parent_category)
      .where("LOWER(name) LIKE :term OR LOWER(slug) LIKE :term", term: "%#{term}%")
      .take(limit)
      .map { |category| category_to_hashtag_item(category) }
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  end

  def self.search_sort(search_results, term)
    if term.present?
      search_results.sort_by { |item| [item.slug == term ? 0 : 1, item.text.downcase] }
    else
      search_results.sort_by { |item| item.text.downcase }
    end
  end

  def self.search_without_term(guardian, limit)
    Category
      .includes(:parent_category)
      .secured(guardian)
<<<<<<< HEAD
      .where(
        "categories.id NOT IN (#{
          CategoryUser
            .muted_category_ids_query(guardian.user, include_direct: true)
            .select("categories.id")
            .to_sql
        })",
=======
      .joins(
        "LEFT JOIN category_users ON category_users.user_id = #{guardian.user.id}
        AND category_users.category_id = categories.id",
      )
      .where(
        "category_users.notification_level IS NULL OR category_users.notification_level != ?",
        CategoryUser.notification_levels[:muted],
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      )
      .order(topic_count: :desc)
      .take(limit)
      .map { |category| category_to_hashtag_item(category) }
  end
end
