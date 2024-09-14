import Joi from "joi";
import mongoose from "mongoose";

export const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 50,
  },
  isGold: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 50,
  },
});

export const Customer = mongoose.model("Customer", customerSchema);

export function validateCustomer(customer) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    phone: Joi.string().min(5).max(50).required(),
    isGold: Joi.boolean(),
  });

  return schema.validate(customer);
}
