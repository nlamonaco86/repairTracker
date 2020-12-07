require('dotenv').config();
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
const YOUR_DOMAIN = 'http://localhost:8080';

module.exports = (app) => {
    app.post('/api/payment/stripe/create-session', async (req, res) => {
        // When passing decimal cost values to stripe, it must be set to decimal and calculated this way
        let cost = req.body.cost * 100
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: req.body.item,
                            images: ['https://i.ibb.co/yk1DV7F/payment.jpg'],
                        },
                        unit_amount_decimal: cost,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${YOUR_DOMAIN}/success`,
            cancel_url: `${YOUR_DOMAIN}/cancel`,
        });
        res.json({ id: session.id });
    });

};