import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-05-28.basil',
});

async function main() {
    const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        line_items: [
            {
                price: 'price_1ReH7CQCTCYypKV7WGEcZMPe', // 🔁 Remplace avec ton vrai priceId
                quantity: 1,
            },
        ],
        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/cancel',
        customer_email: 'h.piedanna@gmail.com', // ou customer: 'cus_XXX' si tu veux tester un user existant
    });

    console.log('✅ Session URL:', session.url);
}

main().catch((err) => console.error(err));