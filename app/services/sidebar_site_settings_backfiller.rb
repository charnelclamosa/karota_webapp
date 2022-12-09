# frozen_string_literal: true

# A service class that backfills the changes to the default sidebar categories and tags site settings.
#
# When a category/tag is removed from the site settings, the `SidebarSectionLink` records associated with the category/tag
# are deleted.
#
# When a category/tag is added to the site settings, a `SidebarSectionLink` record for the associated category/tag are
# created for all users that do not already have a `SidebarSectionLink` record for the category/tag.
class SidebarSiteSettingsBackfiller
  def initialize(setting_name, previous_value:, new_value:)
    @setting_name = setting_name

    @linkable_klass, previous_ids, new_ids =
      case setting_name
<<<<<<< HEAD
      when "default_navigation_menu_categories"
        [Category, previous_value.split("|"), new_value.split("|")]
      when "default_navigation_menu_tags"
=======
      when "default_sidebar_categories"
        [
          Category,
          previous_value.split("|"),
          new_value.split("|")
        ]
      when "default_sidebar_tags"
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
        klass = Tag

        [
          klass,
          klass.where(name: previous_value.split("|")).pluck(:id),
<<<<<<< HEAD
          klass.where(name: new_value.split("|")).pluck(:id),
        ]
      else
        raise "Invalid setting_name"
=======
          klass.where(name: new_value.split("|")).pluck(:id)
        ]
      else
        raise 'Invalid setting_name'
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      end

    @added_ids = new_ids - previous_ids
    @removed_ids = previous_ids - new_ids
  end

  def backfill!
    DistributedMutex.synchronize("backfill_sidebar_site_settings_#{@setting_name}") do
<<<<<<< HEAD
      SidebarSectionLink.where(
        linkable_type: @linkable_klass.to_s,
        linkable_id: @removed_ids,
      ).delete_all

      User
        .real
        .where(staged: false)
        .select(:id)
        .find_in_batches do |users|
          rows = []

          users.each do |user|
            @added_ids.each do |linkable_id|
              rows << {
                user_id: user[:id],
                linkable_type: @linkable_klass.to_s,
                linkable_id: linkable_id,
              }
            end
          end

          SidebarSectionLink.insert_all(rows) if rows.present?
        end
=======
      SidebarSectionLink.where(linkable_type: @linkable_klass.to_s, linkable_id: @removed_ids).delete_all

      User.real.where(staged: false).select(:id).find_in_batches do |users|
        rows = []

        users.each do |user|
          @added_ids.each do |linkable_id|
            rows << { user_id: user[:id], linkable_type: @linkable_klass.to_s, linkable_id: linkable_id }
          end
        end

        SidebarSectionLink.insert_all(rows) if rows.present?
      end
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    end
  end

  def number_of_users_to_backfill
    select_statements = []

<<<<<<< HEAD
    select_statements.push(<<~SQL) if @removed_ids.present?
=======
    if @removed_ids.present?
      select_statements.push(<<~SQL)
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      SELECT
        sidebar_section_links.user_id
      FROM sidebar_section_links
      WHERE sidebar_section_links.linkable_type = '#{@linkable_klass.to_s}'
      AND sidebar_section_links.linkable_id IN (#{@removed_ids.join(",")})
      SQL
<<<<<<< HEAD
=======
    end
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

    if @added_ids.present?
      # Returns the ids of users that will receive the new additions by excluding the users that already have the additions
      # Note that we want to avoid doing a left outer join against the "sidebar_section_links" table as PG will end up having
      # to do a full table join for both tables first which is less efficient and can be slow on large sites.
      select_statements.push(<<~SQL)
      SELECT
        users.id
      FROM users
      WHERE users.id NOT IN (
        SELECT
<<<<<<< HEAD
          DISTINCT(sidebar_section_links.user_id)
=======
          sidebar_section_links.user_id
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
        FROM sidebar_section_links
        WHERE sidebar_section_links.linkable_type = '#{@linkable_klass.to_s}'
        AND sidebar_section_links.linkable_id IN (#{@added_ids.join(",")})
      ) AND users.id > 0 AND NOT users.staged
      SQL
    end

<<<<<<< HEAD
    return 0 if select_statements.blank?

=======
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    DB.query_single(<<~SQL)[0]
    SELECT
      COUNT(*)
    FROM (#{select_statements.join("\nUNION DISTINCT\n")}) AS user_ids
    SQL
  end
end
