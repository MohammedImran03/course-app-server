import express from "express";
const router = express.Router();
import stripe from 'stripe'; // Corrected import statement
const stripeInstance = stripe('sk_test_51OuEqlSBQwTu3SdvMiUxrJ1x5eC5nDESdMA7SAwehkFkaabJ8hEavopdROukpefBZet0pWZb5h9vPJkWKPZQ1VAU00QPr2pRwb');

router.post('/intents', async (req, res) => {
    try {
        const {name,email}=req.body;
        console.log('paymentmethod'); 
        const customer=await stripeInstance.customers.create({
            name,
            email,
        });
        // const ephemeralKey=await stripeInstance.ephemeralKeys.create({
        //   issuing_card: 'ic_1ITi6XKYfU8ZP6raDAXem8ql',
        // },
        //     {apiVersion : '2023-10-16',});
        // automatic_payment_methods
        const total=parseInt(req.body.amount * 100);
        const paymentIntent = await stripeInstance.paymentIntents.create({
            amount: total, 
            currency: 'inr',
            customer:customer.id,
            automatic_payment_methods:{
                enabled : true,
            },
        });
        console.log(paymentIntent);
        res.json({ 
            paymentIntentdata:paymentIntent,
            paymentIntent: paymentIntent.client_secret,
            // ephemeralKey_Secret:ephemeralKey.secret,
            customer:customer.id,
            // publishableKey:'sk_test_51OuEqlSBQwTu3SdvMiUxrJ1x5eC5nDESdMA7SAwehkFkaabJ8hEavopdROukpefBZet0pWZb5h9vPJkWKPZQ1VAU00QPr2pRwb'        
        });
    } catch (e) {
        console.log(e);
        res.status(400).json({
            error: e.message,
        });
    }
});

export const Paymentrouter = router;
