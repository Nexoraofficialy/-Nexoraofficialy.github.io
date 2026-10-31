# NEXT A COLLECTION — Premium E-commerce Starter

## Files
- `index.html` — page structure
- `style.css` — premium responsive styling
- `script.js` — product catalogue, variants, cart and checkout structure

## Run
Extract the ZIP and open `index.html` in a browser. For best results, serve the folder with a local web server.

## Included
- Premium navy + champagne-gold visual identity and typography
- Homepage hero/banner and editorial sections
- Responsive product catalogue with category filters and search
- Product detail modal with size and colour selection
- Shopping bag overlay with item variants and quantity controls
- Cart persistence using browser localStorage
- Razorpay Checkout integration structure

## Before launch
The catalogue contains demo products, prices and Unsplash image URLs. Replace them with your actual inventory and licensed product photography. Connect newsletter form to an email service.

### Razorpay production requirements
This starter intentionally does not process live payments until configured:
1. Create a backend endpoint `/api/create-razorpay-order` that validates product IDs and prices on the server and creates an order using Razorpay's API.
2. Replace `YOUR_RAZORPAY_KEY_ID` in `script.js` with your public Razorpay Key ID.
3. Keep the Razorpay Key Secret on the server only. Never add it to HTML or frontend JavaScript.
4. Implement `/api/verify-razorpay-payment` and verify the payment signature server-side before marking an order as paid.
5. Add HTTPS, order storage, stock management, shipping, returns/refunds, privacy policy and terms.

The frontend expects the order endpoint to return `{ "id": "order_...", "amount": 12345, "currency": "INR" }`. The `amount` is in paise.
