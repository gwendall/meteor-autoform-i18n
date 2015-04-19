Meteor Autoform i18n
====================

Internationalization for [aldeed:autoform](http://github.com/aldeed/meteor-autoform) powered by [tap:i18n](https://github.com/TAPevents/tap-i18n).  
This package automatically attaches reactive labels, input placeholders and select options to your forms created through Autoform.

Installation  
------------

``` sh
meteor add gwendall:autoform-i18n
```

Methods
-------

**Schema.i18n(json_path)**  
Binds a SimpleSchema object instance to i18n data.

Example
-------

**/i18n/en.i18n.json**  
``` json
{
  "schemas": {
    "posts": {
      "title": {
        "label": "Title",
        "placeholder": "Enter a title for your post"
      },
      "category": {
        "label": "Category",
        "placeholder": "Select a category",
        "options": {
          "announcements": "Announcements",
          "packages": "Packages",
          "ama": "AMA",
          "news": "News"
        }
      }
    }
  }
}

**/i18n/fr.i18n.json**  
``` json
{
  "schemas": {
    "posts": {
      "title": {
        "label": "Titre",
        "placeholder": "Veuillez saisir le titre de votre publication"
      },
      "category": {
        "label": "Categorie",
        "placeholder": "Choisissez une categorie",
        "options": {
          "announcements": "Annonces",
          "packages": "Paquets",
          "ama": "AMA",
          "news": "Nouvelles"
        }
      }
    }
  }
}

```
**/lib/collections/.js**  
``` javascript
Posts = new Mongo.Collection("posts");
Schema = new SimpleSchema({
  "title": {
    type: String
  },
  "category": {
    type: String
  }
});
Schema.i18n("schemas.posts");
```
