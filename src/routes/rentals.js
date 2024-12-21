import mongoose from "mongoose";
import express from "express";

import { Rental, validateRental } from "../models/rental.js";
import { Movie } from "../models/movies.js";
import { Customer } from "../models/customers.js";

const rentals = express.Router();

rentals.get("/", async (_req, res) => {
  const rentals = await Rental.find().sort({ dateOut: "desc" });
  res.send(rentals);
});

rentals.post("/", async (req, res) => {
  const { error } = validateRental(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Invalid customer.");

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send("Invalid movie.");

  if (movie.numberInStock === 0)
    return res.status(400).send("Movie not in stock.");

  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      isGold: customer.isGold === true ? true : false,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });

  async function addRental() {
    const session = await mongoose.startSession();

    session.startTransaction();
    try {
      await rental.save({ session });
      await movie.updateOne({ $inc: { numberInStock: -1 } }, { session });
      await session.commitTransaction();
      session.endSession();
      console.log("Rental saved");
      res.send(rental);
    } catch (err) {
      await session.abortTransaction();
      session.endSession();
      console.log(err.message)
      return res.status(500).send("Something went wrong");
    }
  }

  addRental();
});

rentals.get("/:id", async (req, res) => {
  const rental = await Rental.findById(req.params.id);

  if (!rental)
    return res.status(404).send("The rental with the given ID was not found.");

  res.send(rental);
});

export default rentals;
