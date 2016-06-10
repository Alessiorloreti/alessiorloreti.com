require 'flickraw'
class Lightbox < Liquid::Tag

  def initialize(tag_name, markup, tokens)
     super
     @markup = markup
     @id   = markup.split(' ')[0]
     @size = markup.split(' ')[1]
     @gallery = markup.split(' ')[2]
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


    "<div class='image'><a data-lightbox='gallery' data-title='#{title}' href=#{src}><div class='gallery_image' style='background-image:url(#{src});'></div></a></div>"

  end
end

Liquid::Template.register_tag('lightbox', Lightbox)
