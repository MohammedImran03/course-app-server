import express from "express";
const router = express.Router();
import stripe from 'stripe';
const stripeInstance = stripe('sk_test_51OuEqlSBQwTu3SdvMiUxrJ1x5eC5nDESdMA7SAwehkFkaabJ8hEavopdROukpefBZet0pWZb5h9vPJkWKPZQ1VAU00QPr2pRwb');

router.post('/intents', async (req, res) => {
    try {
console.log('paymentmethod');
      const paymentIntent = await stripeInstance.paymentIntents.create({
        amount: req.body.amount *100, 
        currency: 'inr',
        payment_method_types: [ 'card' ],
      });
      console.log(paymentIntent);
      res.json({ paymentIntent: paymentIntent.client_secret });
    } catch (e) {
      res.status(400).json({
        error: e.message,
      });
    }
  });

export const Paymentrouter = router;