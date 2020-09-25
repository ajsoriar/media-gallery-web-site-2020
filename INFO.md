# Configuration

## Site

./config/config_SITE.js

## Debug

./config/config_DEBUG.js

## Data

./data/*.json

### Gallery options

``` json
{
    "galleryConfig": {
        "id": 7,
        "type": null,
        "name": "LANDING-GALLERY",
        "title": "Demo gallery",
        "description": "Description text",
        "background": {
            "color": "red",
            "video":{
                "src": "https:/www.subidote.com/video/sources/demo2/mp4/robot-and-cloud-pink-to-cyan.mp4",
                "size":{
                    "w": 1024,
                    "h": 740
                }
            }
        },
        "tags": [
            { "id": null, "label": "All"},
            { "id": null, "label": "data.3.root.json"},
            { "id": 2, "label": "Smart TV", "info": null, "atachToList": true },
            { "id": 3, "label": "WEB", "info": null, "atachToList": true },
            { "id": 4, "label": "Demo", "info": null, "atachToList": true },
            { "id": 5, "label": "Profesional", "info": null, "atachToList": true },
            { "id": "COMERCIAL", "label": "Commercial"},
            { "id": "FILM", "label": "Film"},
            { "id": "VACATION", "label": "Vacation"},
            { "id": "PERSONAL", "label": "Personal"}
        ],
        "itemTypes": ["IMAGE", "VIDEO", "AUDIO", "FOLDER", "GALLERY", "GALLERY-PREVIEW"],
        "debug": true
    },
    "items": [
        ...
    ]
}
```

### Image options

``` json
{
    "id": 65,
    "type": "VIDEO",
    "dataFile": null,
    "description": "This is the description text of this VideoItem",
    "name": "Video item",
    "title": "Video item",
    "tags": ["LOL", "VIDEO"],
    "thumbnail": {
        "image": {
            "size": {
                "w": 250,
                "h": 160
            },
            "src": "http://www.riabop.com/demo/images/column_200x250.gif"
        },
        "frame": {
            "__development_info_1": "Get the aspect ratio from here. Use a cropStrategy and the aspect ratio to crop and render the image in the column.",
            "size": {
                "w": 320,
                "h": 240
            }
        },
        "color": "blue",
        "cropStrategy": null,
        "__development_info_2": "This image is the placeholder in the gallery",
        "__development_info_3": "cropStrategies: FILL-THE-FRAME"
    },
    "target": {
        "type": "VIDEO",
        "development_info": "This image is the placeholder of the video",
        "size": {
            "w": 1920,
            "h": 1080
        },
        "src": "http://www.riabop.com/demo/images/column_200x250.gif",
        "color": "pink",
        "image": {
            "src": "http://www.riabop.com/demo/images/background-100x100.png",
            "size": {
                "w": 600,
                "h": 450
            }
        },
        "video": {
            "size": {
                "w": 1920,
                "h": 1080
            },
            "src": "https:/www.subidote.com/video/sources/demo2/mp4/videobg-1280x720.mp4",
            "type": "VIDEO",
            "color": "purple"
        }
    },
    "header": {
        "title": "This is a header 2",
        "date": "2020"
    },
    "footer": {
        "title": "Gallery about you and me",
        "date": "2020"
    },
    "hover": {
        "border": false,
        "zoom": true,
        "translucent": false,
        "overlay": true,
        "banner": false,
        "shadow": false,
        "overlayText": false
    }
}
```
