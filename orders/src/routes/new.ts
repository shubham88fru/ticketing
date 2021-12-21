import express, { Request, Response } from 'express';
import {
  NotFoundError,
  requireAuth,
  validateRequest,
  BadRequestError,
} from '@wolvtickets/common';
import { body } from 'express-validator';
import mongoose from 'mongoose';

import { Ticket } from '../models/ticket';
import { Order } from '../models/order';

const router = express.Router();

router.post(
  '/api/orders/',
  requireAuth,
  [
    body('ticketId')
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage('TicketId must be provided'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { ticketId } = req.body;

    // Find the ticket the user is trying to order.
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      throw new NotFoundError();
    }

    // Make sure that this ticket is not already reserved.
    // Run query to look at all orders and find an order
    // where the ticket it the ticket we just found *AND* the order's
    // status is *NOT* cancelled.
    // If we find an order from that means the ticket *IS* reserved.
    const isReserved = await ticket.isReserved();
    if (isReserved) {
      throw new BadRequestError('Ticket is already reserved.');
    }
    // Calculate an expiration date for this order.

    // Build the order and save it to the database.

    //Publish an event saying that an order was created.

    res.send({});
  }
);

export { router as newOrderRouter };
