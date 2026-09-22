#!/usr/bin/env ruby

require "pathname"

build_root = Pathname.new(ARGV.fetch(0, "_site")).expand_path
broken = []

build_root.glob("**/*.html").each do |file|
  html = file.read
  html.scan(/(?:href|src)=["']([^"']+)["']/i).flatten.each do |raw_target|
    next if raw_target.empty?
    next if raw_target.start_with?("#", "mailto:", "tel:", "data:", "javascript:")
    next if raw_target.start_with?("http://", "https://", "//")

    clean_target = raw_target.split(/[?#]/, 2).first
    next if clean_target.nil? || clean_target.empty?

    candidate = if clean_target.start_with?("/")
      build_root.join(clean_target.delete_prefix("/"))
    else
      file.dirname.join(clean_target).cleanpath
    end

    next if candidate.file? || candidate.join("index.html").file?

    broken << [file.relative_path_from(build_root), raw_target]
  end
end

if broken.empty?
  puts "Internal link and asset check passed."
  exit 0
end

warn "Broken internal links or assets:"
broken.each { |source, target| warn "- #{source}: #{target}" }
exit 1
