import Stripe from 'stripe';
import * as dotenv from 'dotenv';
import * as path from 'path';

async function bootstrap() {

    console.log(process.cwd());

    dotenv.config({ path: path.resolve(process.cwd(), '../.env') });
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
        apiVersion: '2025-05-28.basil',
    });

    const session = await stripe.checkout.sessions.create(
        {
            mode: "subscription",
            billing_address_collection: "required",
            line_items: [
                {
                    price: "price_1ReH7CQCTCYypKV7WGEcZMPe",
                    quantity: 1,
                },
            ],
            success_url: `http://localhost:3000/success/{CHECKOUT_SESSION_ID}`,
            cancel_url: `http://localhost:3000/cancel`,
            custom_fields: [
                {
                    key: "pseudo",
                    label: {
                        type: "custom",
                        custom: "Pseudo",
                    },
                    type: "text",
                    text: {
                        minimum_length: 1,
                        maximum_length: 50,
                    },
                    optional: false,
                },
            ],
        });

    console.log('👉 URL Checkout:', session.url);
}

bootstrap();