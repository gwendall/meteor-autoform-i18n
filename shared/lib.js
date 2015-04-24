var humanize = function(property) {
  return property
  .replace(/_/g, " ")
  .replace(/(\w+)/g, function(match) {
    return match.charAt(0).toUpperCase() + match.slice(1);
  });
};

var getKeys = function(jsonPath, key) {
  return TAPi18n.__([jsonPath, key].join("."), { returnObjectTrees: true }) || {};
}

SimpleSchema.prototype.i18n = function(jsonPath, defaults) {

  if (Meteor.isServer) return;

  defaults = defaults || {};
  defaults.placeholder = defaults.placeholder || "Type something...";
  defaults.firstOption = defaults.firstOption || "Select something...";

  var schema = this._schema;
  _.each(schema, function(value, key) {

    if (!value) return;
    var keys = getKeys(jsonPath, key);

    schema[key].autoform = schema[key].autoform || {};

    if (schema[key].autoform.placeholder || keys.placeholder) {
      console.log("Setting placeholder.", key);
      schema[key].autoform.placeholder = schema[key].autoform.placeholder || function() {
        return getKeys(jsonPath, key).placeholder || defaults.placeholder;
      };
    }

    if (schema[key].autoform.options || keys.options) {
      console.log("Setting options.", key);
      schema[key].autoform.options = schema[key].autoform.options || function() {
        return getKeys(jsonPath, key).options;
      }
    }

    if (schema[key].autoform.firstOption || keys.options) {
      console.log("Setting first option.", key);
      schema[key].autoform.firstOption = schema[key].autoform.firstOption || function() {
        return getKeys(jsonPath, key).placeholder || defaults.firstOption;
      }
    }

    if (schema[key].label || keys.label) {
      console.log("Setting label.", key);
      schema[key].label = schema[key].label || function() {
        return getKeys(jsonPath, key).label || humanize(key);
      };
    }

  });

}
