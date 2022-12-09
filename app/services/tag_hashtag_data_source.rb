# frozen_string_literal: true

# Used as a data source via HashtagAutocompleteService to provide tag
# results when looking up a tag slug via markdown or searching for
# tags via the # autocomplete character.
class TagHashtagDataSource
<<<<<<< HEAD
  def self.enabled?
    SiteSetting.tagging_enabled
  end

=======
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  def self.icon
    "tag"
  end

<<<<<<< HEAD
  def self.type
    "tag"
  end

  def self.tag_to_hashtag_item(tag, guardian)
    topic_count_column = Tag.topic_count_column(guardian)

    tag =
      Tag.new(
        tag.slice(:id, :name, :description).merge(topic_count_column => tag[:count]),
      ) if tag.is_a?(Hash)

    HashtagAutocompleteService::HashtagItem.new.tap do |item|
      item.text = tag.name
      item.secondary_text = "x#{tag.public_send(topic_count_column)}"
=======
  def self.tag_to_hashtag_item(tag, include_count: false)
    tag = Tag.new(tag.slice(:id, :name, :description).merge(topic_count: tag[:count])) if tag.is_a?(
      Hash,
    )

    HashtagAutocompleteService::HashtagItem.new.tap do |item|
      if include_count
        item.text = "#{tag.name} x #{tag.topic_count}"
      else
        item.text = tag.name
      end
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      item.description = tag.description
      item.slug = tag.name
      item.relative_url = tag.url
      item.icon = icon
<<<<<<< HEAD
      item.id = tag.id
    end
  end
  private_class_method :tag_to_hashtag_item

  def self.lookup(guardian, slugs)
    DiscourseTagging
      .filter_visible(Tag.where_name(slugs), guardian)
      .map { |tag| tag_to_hashtag_item(tag, guardian) }
  end

  def self.search(
    guardian,
    term,
    limit,
    condition = HashtagAutocompleteService.search_conditions[:contains]
  )
=======
    end
  end

  def self.lookup(guardian, slugs)
    return [] if !SiteSetting.tagging_enabled
    DiscourseTagging
      .filter_visible(Tag.where_name(slugs), guardian)
      .map { |tag| tag_to_hashtag_item(tag) }
  end

  def self.search(guardian, term, limit)
    return [] if !SiteSetting.tagging_enabled

>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    tags_with_counts, _ =
      DiscourseTagging.filter_allowed_tags(
        guardian,
        term: term,
<<<<<<< HEAD
        term_type:
          (
            if condition == HashtagAutocompleteService.search_conditions[:starts_with]
              DiscourseTagging.term_types[:starts_with]
            else
              DiscourseTagging.term_types[:contains]
            end
          ),
        with_context: true,
        limit: limit,
=======
        with_context: true,
        limit: limit,
        for_input: true,
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
        order_search_results: true,
      )

    TagsController
<<<<<<< HEAD
      .tag_counts_json(tags_with_counts, guardian)
      .take(limit)
      .map do |tag|
        # We want the actual ID here not the `name` as tag_counts_json gives us.
        tag[:id] = tags_with_counts.find { |t| t.name == tag[:name] }.id
        tag_to_hashtag_item(tag, guardian)
      end
  end

  def self.search_sort(search_results, _)
    search_results.sort_by { |item| item.text.downcase }
  end

  def self.search_without_term(guardian, limit)
=======
      .tag_counts_json(tags_with_counts)
      .take(limit)
      .map { |tag| tag_to_hashtag_item(tag, include_count: true) }
  end

  def self.search_sort(search_results, _)
    search_results.sort_by { |result| result.text.downcase }
  end

  def self.search_without_term(guardian, limit)
    return [] if !SiteSetting.tagging_enabled

>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    tags_with_counts, _ =
      DiscourseTagging.filter_allowed_tags(
        guardian,
        with_context: true,
        limit: limit,
<<<<<<< HEAD
=======
        for_input: true,
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
        order_popularity: true,
        excluded_tag_names: DiscourseTagging.muted_tags(guardian.user),
      )

    TagsController
<<<<<<< HEAD
      .tag_counts_json(tags_with_counts, guardian)
      .take(limit)
      .map { |tag| tag_to_hashtag_item(tag, guardian) }
=======
      .tag_counts_json(tags_with_counts)
      .take(limit)
      .map { |tag| tag_to_hashtag_item(tag, include_count: true) }
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  end
end
