const Joi = require("joi");
const contactSchemas = require("./schemas/ticket");
const moment = require("moment");
const _ = require("lodash");


function validateTicket(body, type) {
  const schema = contactSchemas[type];

  if (!schema) {
    return { error: new Error(`Validation schema for '${type}' not found.`), data: null };
  }

  const { error, value } = schema.validate(body, {
    abortEarly: false,     
    allowUnknown: false,   
    stripUnknown: true     
  });

  if (error) {
    return {
      error,
      data: null
    };
  }

  return {
    error: null,
    data: value  
  };
}

module.exports = {
  validateTicket
};
