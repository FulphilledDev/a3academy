const express = require('express')
const app = express()
const cors = require('cors')

require('dotenv').config('./config/.env')


app.use(express.static('public'))
app.use(express.json())

app.use(cors({
    origin: 'http://localhost:5500'
}))

//////////////////////////////

// Var for stripe private key

//////////////////////////////

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

//////////////////////////////

// Store Items

//////////////////////////////

const storeItems = new Map([
    [1, {
        priceInCents: 30000, 
        name: 'Athlete Circle - Installments'
    }],
    [2, {
        priceInCents: 150000, 
        name: 'Athlete Circle - One Time'
    }],
    [3, {
        priceInCents: 80000, 
        name: 'A3 Life Coaching Cert - Installments'
    }],
    [4, {
        priceInCents: 400000, 
        name: 'A3 Life Coaching Cert - One Time'
    }],
])
// Keep all information for items (price, name) on server in some location
// --> This is generally a database or JSON file...
// --> That way you can just send the id from the client to the server
// Example: "Buy item 1 once, and buy item 2 twice"
// --> We dont actually send the PRICE from the client because if we do, ANYONE can send $0 price from client by...
// ----> hacking into code, change to $0 price and get everything for free

//////////////////////////////

// Stripe Checkout Session

//////////////////////////////

app.post('/create-checkout-session', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            success_url: `${process.env.PUBLIC_URL}/index.html`,
            cancel_url: `${process.env.PUBLIC_URL}/index.html`,
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: req.body.items.map(item => {
                const storeItem = storeItems.get(item.id)
                return {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: storeItem.name
                        },
                        unit_amount: storeItem.priceInCents
                    },
                    quantity: req.body.quantity, // item.quantity
                }
            })
        })
        res.json({ id: session.id })// url: session.url
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
})

app.use('/', mainRoutes)

app.listen(process.env.PORT, () => {
    console.log('Server is up and running')
})