const Joi = require("joi");

const ticketSchemas = {
  create: Joi.object({
    title: Joi.string().min(4).max(50).pattern(/^[a-zA-Z0-9\s]+$/).required(),
    description: Joi.string().min(10).max(200).required(),
    priority: Joi.string().valid('low', 'medium', 'high').required(),
  }),

  status_update: Joi.object({
    id: Joi.string().required(),
  }),

  list: Joi.object({
    search: Joi.string().allow("", null),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(5),
  }),
};

module.exports = ticketSchemas;
