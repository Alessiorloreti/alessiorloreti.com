require 'flickraw'
class FlickrImage < Liquid::Tag

  def initialize(tag_name, markup, tokens)
     super
     @markup = markup
     @id   = markup.split(' ')[0]
     @size = markup.split(' ')[1]
     @gallery = markup.split(' ')[2] == "gallery"
  end

  def render(context)

    FlickRaw.api_key        = context.registers[:site].config["flickr"]["api_key"]
    FlickRaw.shared_secret  = context.registers[:site].config["flickr"]["api_secret"]

    info = flickr.photos.getInfo(:photo_id => @id)

    server        = info['server']
    farm          = info['farm']
    id            = info['id']
    secret        = info['secret']
    title         = info['title']
    description   = info['description']
    size          = "_#{@size}" if @size
    src           = "http://farm#{farm}.static.flickr.com/#{server}/#{id}_#{secret}#{size}.jpg"
    page_url      = info['urls'][0]["_content"]
    img_tag       = "<img src='#{src}' title='#{title}'/>"

    if @gallery
        "<div class='item'><div class='fill' style='background-image:url(#{src});'></div></div>"
    else
      img_tag
    end

  end
end

Liquid::Template.register_tag('flickr_image', FlickrImage)
