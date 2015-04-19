SimpleSchema.prototype.i18n = function(namespace) {

  if (Meteor.isServer) return;
  var schema = this._schema;
  Meteor.startup(function() {
    _.each(schema, function(value, key) {
      if (!value) return;
      schema[key].label = function() {
        return TAPi18n.__([namespace, key, "label"].join(".")) || key;
      }
      schema[key].autoform = schema[key].autoform || {};
      schema[key].autoform.placeholder = function() {
        return TAPi18n.__([namespace, key, "placeholder"].join(".")) || "Type something...";
      }
      var options = TAPi18n.__([namespace, key, "options"].join("."), { returnObjectTrees: true });
      if (!_.isObject(options)) return;
      schema[key].autoform.options = function() {
        return TAPi18n.__([namespace, key, "options"].join("."), { returnObjectTrees: true });
      }
      schema[key].autoform.firstOption = function() {
        return TAPi18n.__([namespace, key, "placeholder"].join("."));
      }
    });
  });

}
