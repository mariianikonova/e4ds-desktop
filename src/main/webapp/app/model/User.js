Ext.define("E4desk.model.User",
{
  extend : "Ext.data.Model",
  fields : [ {
    name : "email",
    type : "string"
  }, {
    name : "name",
    type : "string"
  }, {
    name : "firstName",
    type : "string"
  }, {
    name : "locale",
    type : "string"
  }, {
    name : "enabled",
    type : "boolean"
  }, {
    name : "id",
    type : "int"
  } ],
  associations : [ {
    type : "hasMany",
    model : "E4desk.model.Role",
    associationKey : "roles",
    foreignKey : "user_id",
    name : "roles"
  } ],
  proxy : {
    type : "direct",
    api : {
      read : userService.read,
      destroy : userService.destroy
    },
    reader : {
      root : "records"
    }
  }
});