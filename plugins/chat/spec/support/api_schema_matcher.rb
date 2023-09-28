# frozen_string_literal: true

RSpec::Matchers.define :match_response_schema do |schema|
  match do |object|
    schema_directory = "#{Dir.pwd}/plugins/chat/spec/support/api/schemas"
    schema_path = "#{schema_directory}/#{schema}.json"

    begin
      JSON::Validator.validate!(schema_path, object, strict: true)
    rescue JSON::Schema::ValidationError => e
      puts "-- Printing response body after validation error\n"
<<<<<<< HEAD
      pp object # rubocop:disable Lint/Debugger
=======
      pp object
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      raise e
    end
  end
end
