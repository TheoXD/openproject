require 'rexml/document'

module Redmine
  module VERSION #:nodoc:
    MAJOR = 1
    MINOR = 1
    PATCH = 0
    TINY  = PATCH # Redmine compat
    
    # Branches:
    # * stable - released version
    # * master - stable development
    # * unstable - future development
    #
    # Source: https://www.chiliproject.org/projects/chiliproject/wiki/ChiliProject_Repository
    BRANCH = 'master'

    def self.revision
      revision = nil
      entries_path = "#{RAILS_ROOT}/.svn/entries"
      if File.readable?(entries_path)
        begin
          f = File.open(entries_path, 'r')
          entries = f.read
          f.close
     	  if entries.match(%r{^\d+})
     	    revision = $1.to_i if entries.match(%r{^\d+\s+dir\s+(\d+)\s})
     	  else
   	        xml = REXML::Document.new(entries)
   	        revision = xml.elements['wc-entries'].elements[1].attributes['revision'].to_i
   	      end
   	    rescue
   	      # Could not find the current revision
   	    end
 	  end
 	  revision
    end

    REVISION = self.revision
    ARRAY = [MAJOR, MINOR, PATCH, BRANCH, REVISION].compact
    STRING = ARRAY.join('.')
    
    def self.to_a; ARRAY end
    def self.to_s; STRING end    
    def self.to_semver
      [MAJOR, MINOR, PATCH].join('.')
    end
  end
end
