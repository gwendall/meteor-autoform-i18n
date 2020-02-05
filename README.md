```diff
- NOTE: This package is not maintained anymore.
- If you want to help, please reach out to gwendall.esnault@gmail.com
```

Meteor Autoform i18n
====================

Internationalization for [aldeed:autoform](http://github.com/aldeed/meteor-autoform) powered by [tap:i18n](https://github.com/TAPevents/tap-i18n).  
This package automatically attaches reactive labels, input placeholders and select options to your forms created through Autoform.  

UPDATE: To get reactively translated error messages in Autoform, additionally use [gwendall:simple-schema-i18n](https://github.com/gwendall/meteor-simple-schema-i18n).  

Installation  
------------

``` sh
meteor add gwendall:autoform-i18n
```

How-to
------

**1. Create an i18n file with your translations**  

\*.i18n.json files contain the values that the package will apply to your schema. For each schema field, you can pass the following values:

- ``label [String]``: Will be set as a label in your autoform
- ``placeholder [String]``: Will be set as a text input / textarea placeholder or select first option, depending on your input type
- ``options [Object]``: Will be the options available in your selects, radioboxes or checkboxes for the given field.

If you explicitely define ``label``, ``placeholder`` or ``options`` for some your schema fields, the package will not overwrite them with translations. Don't declare them for the package to perform the translation.

**2. Define a simple-schema for your collection and call Schema.i18n(json_path)**  

``json_path`` is the path allowing the package to find your translations for this schema in your i18n files.  
NOTE: Call Schema.i18n(json_path) in a Meteor.startup hook to make sure your translation files are available to the package.

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
```  

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
Meteor.startup(function() {
  Schema.i18n("schemas.posts");
  Posts.attachSchema(Schema);
});
```

**/client/tpl.html**  
``` html
<template name="postForm">
  {{> quickForm collection="Posts" id="insertPostForm" type="insert"}}
</template>
```

Advanced Example with array
---------------------------

**/i18n/en.i18n.json** 
``` json
{
    "schemas": {
        "contacts": {
            "firstname": {
                "label": "First name"
            },
            "lastname": {
                "label": "Last name"
            },
            "phones": {
                "label": "Phone",
                "$": {
                   "number": { "label": "Number"},
                   "type": {
                      "label": "Type",
                      "placeholder": "Select a type ...",
                      "options": {
                          "mobile": "Mobile",
                          "office": "Office",
                          "private": "Private",
                          "fax": "Fax",
                          "other": "Other"
                      }
                  }
            }
        }
    }
}
```

**/i18n/fr.i18n.json** 
``` json
{
    "schemas": {
        "contacts": {
            "firstname": {
                "label": "Prénom"
            },
            "lastname": {
                "label": "Nom"
            },
            "phones": {
                "label": "Téléphone",
                "$": {
                   "number": { "label": "Numéro"},
                   "type": {
                      "label": "Type",
                      "placeholder": "Choissisez un type",
                      "options": {
                          "mobile": "Mobile",
                          "office": "Bureau",
                          "private": "Privé",
                          "fax": "Fax",
                          "other": "Autre"
                      }
                  }
            }
        }
    }
}
```

**/lib/collections/.js**  
``` javascript
Contacts = new Meteor.Collection("contacts");

var Schema = new SimpleSchema({
    firstname: { type: String, max: 200 },
    lastname: { type: String, max: 200 },
    phones: { type: [Object], optional: true },
    "phones.$.number": { type: String },
    "phones.$.type": { type: String }
});

Meteor.startup(function() {
    Schema.i18n("schemas.contacts");
    Contacts.attachSchema(Schema);
});
```

**/client/tpl.html**  
``` html
<template name="contactForm">
  {{> quickForm collection="Contacts" id="insertContactForm" type="insert"}}
</template>
```

Schema inclusion Example
------------------------

**/i18n/en.i18n.json** 
``` json
{
  "schemas": {
     "cars": {
        "name": {
          "label": "Name"
        },
        "details": {
          "with": {"label": "Width"}
        }
     }
  }
}
```

**/i18n/fr.i18n.json** 
``` json
{
  "schemas": {
     "cars": {
        "name": {
          "label": "Nom"
        },
        "details": {
          "with": {"label": "Largeur"}
        }
     }
  }
}
```

**/lib/collections/.js**  
``` javascript
CarDetailsSchema = new SimpleSchema({
  width: {
    type: Number
  }
});

CarsSchema = new SimpleSchema({
  name: {
    type: String
  },
  details: {
    type: CarDetailsSchema
  }
});

Cars = new Mongo.Collection('cars');

Meteor.startup(function() {
  CarsSchema.i18n('schemas.cars');
  Cars.attatchSchema(CarsSchema);
});
```
