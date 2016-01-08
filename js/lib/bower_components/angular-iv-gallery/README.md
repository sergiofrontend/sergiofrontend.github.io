# Angular Gallery
[![Build Status](https://travis-ci.org/codonist/angular-gallery.svg?branch=master)](https://travis-ci.org/codonist/angular-gallery)

This project is a angular directive for image/video gallery. It works out of the box with [laravel framework](http://laravel.com/) pagination and [pusher.com](https://pusher.com/) service.

## Demo
[Check out the simple demo here!](http://demo.codehedonist.net/gallery-demo) This demo does not show the pusher functionality. For more info about the integration with pusher.com service, please read the usage below.

## Features
* Load resources into gallery based on the received JSON data
* Work directly with laravel framework pagination data format and pusher.com service
* Responsive layout using bootstrap

## Feedback
If you find a bug, welcome to create an issue. Thanks.

## Installation
1. Use bower to install: `bower install angular-iv-gallery`
2. Include `angular-gallery.min.js` into your html
3. Add `angularGallery` module as a dependency into your angular app 

## Usage

```
<angular-gallery gallery-data-url="yourGalleryDataUrl"
                 pusher-key="yourPusherAPIKey"
                 pusher-channel="yourPusherChannel"
                 pusher-event="yourPusherEvent"
                 pushed-data-name="pushedDataName"></angular-gallery>
```

`gallery-data-url`: the url to retrieve gallery contents and pagination info from your server. For example, if you use laravel with its pagination, after you call your url set in the `gallery-data-url`, you probably get something like:

```
{
    total: 13,
    per_page: 12,
    current_page: 1,
    last_page: 2,
    next_page_url: "?page=2",
    prev_page_url: null,
    from: 1,
    to: 12, 
    data: [
        {
            id: 1,
            href: "inventory/video1.mp4",
            title: "video1",
            type: "video/mp4",
            thumbnail: "inventory/video1.thumbnail.jpg",
            poster: "inventory/video1.jpg",
            created_at: "2015-08-29 02:57:42",
            updated_at: "2015-08-29 02:57:42"
        },
        {
            id: 2,
            href: "inventory/photo1.jpg",
            title: "photo1",
            type: "image/jpeg",
            thumbnail: "inventory/photo1.thumbnail.jpg",
            poster: "inventory/photo1.jpg",
            created_at: "2015-08-29 02:58:28",
            updated_at: "2015-08-29 02:58:28"
        },

        ...

          ]
}
```

The directive will parse the contents and the pagination info based on this kind of JSON data.

`pusher-key`: if you use pusher.com service to push new gallery content to the client, you can set your pusher api key here

`pusher-channel`: the pusher.com channel you want to subscribe

`pusher-event`: the pusher event you want to bind

`pushed-data-name`: the attribute name of the data you want in the pushed JSON data. For instance, if a new item is added into gallery and the pushed data from pusher.com is something like:

```
{
    newItem: {
        id: 10,
        href: "inventory/photo8.jpg",
        title: "photo8",
        type: "image/jpeg",
        thumbnail: "inventory/photo8.thumbnail.jpg",
        poster: "inventory/photo8.jpg",
        created_at: "2015-08-29 03:01:30",
        updated_at: "2015-08-29 03:01:30"
    }
}
```

Then you should set `pushed-data-name` to `newItem`.

As the above JSON data shows, the directive currently accepts the following attributes for the image/video resource:

`id`: the resource id

`href`: the url for the resource

`title`: the title for the resource

`type`: the mime type of the resource

`thumbnail`: the url of the thumbnail for the resource shown in the gallery

`poster`: the url of the poster for the video resource

## CONTRIBUTING
See CONTRIBUTING.md

## License
MIT
