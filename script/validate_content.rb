#!/usr/bin/env ruby

require "yaml"
require "date"

ROOT = File.expand_path("..", __dir__)
TAXONOMY_PATH = File.join(ROOT, "_data", "tag_taxonomy.yml")
ARTICLE_DIRS = %w[_reviews _kien-thuc _nhat-ky _so-sanh].freeze

taxonomy = YAML.safe_load(File.read(TAXONOMY_PATH), aliases: true)
known_tags = taxonomy.fetch("tags").keys
known_collections = taxonomy.fetch("collections").keys
errors = []
articles = []

def front_matter(path)
  source = File.read(path)
  match = source.match(/\A---\s*\n(.*?)\n---\s*\n/m)
  return nil unless match

  YAML.safe_load(match[1], permitted_classes: [Date, Time], aliases: true) || {}
rescue Psych::SyntaxError => error
  { "__yaml_error" => error.message }
end

ARTICLE_DIRS.each do |directory|
  Dir.glob(File.join(ROOT, directory, "**", "*.{md,markdown,html}"), File::FNM_EXTGLOB).sort.each do |path|
    articles << [path, front_matter(path)]
  end
end

Dir.glob(File.join(ROOT, "**", "*.html")).sort.each do |path|
  next if path.include?("/_site/")
  next if path.include?("/_layouts/") || path.include?("/_includes/")

  data = front_matter(path)
  articles << [path, data] if data && data["content_type"] == "article"
end

articles.uniq { |path, _data| path }.each do |path, data|
  relative_path = path.delete_prefix("#{ROOT}/")
  if data.nil?
    errors << "#{relative_path}: missing YAML front matter"
    next
  end
  if data["__yaml_error"]
    errors << "#{relative_path}: invalid YAML (#{data['__yaml_error']})"
    next
  end
  next if data["published"] == false

  tags = data["tags"]
  if !tags.is_a?(Array) || tags.empty?
    errors << "#{relative_path}: published article must have canonical tags"
    next
  end

  unknown_tags = tags - known_tags
  errors << "#{relative_path}: unknown tags: #{unknown_tags.join(', ')}" unless unknown_tags.empty?

  mapped_collections = tags.flat_map do |tag|
    taxonomy.dig("tags", tag, "collections") || []
  end.uniq
  errors << "#{relative_path}: tags do not map to any collection" if mapped_collections.empty?
end

example_tags = %w[skincare wellness]
example_collections = example_tags.flat_map do |tag|
  taxonomy.dig("tags", tag, "collections") || []
end.uniq

unless example_collections.sort == %w[health skincare-beauty]
  errors << "taxonomy self-test: example tags must map to Skincare & Beauty and Health"
end

invalid_mappings = taxonomy.fetch("tags").flat_map do |tag, definition|
  Array(definition["collections"]).reject { |key| known_collections.include?(key) }.map do |key|
    "#{tag} -> #{key}"
  end
end
errors << "taxonomy contains unknown collection mappings: #{invalid_mappings.join(', ')}" unless invalid_mappings.empty?

if errors.empty?
  puts "Content taxonomy validation passed (#{articles.uniq { |path, _data| path }.size} published article source checked)."
  puts "Multi-collection mapping test passed: skincare + wellness -> skincare-beauty + health."
  exit 0
end

warn "Content taxonomy validation failed:"
errors.each { |error| warn "- #{error}" }
exit 1
