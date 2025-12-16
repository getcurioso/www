Play Store Data Safety — Curio TCG

This short guide lists recommended answers and notes for the Google Play Data Safety form for Curio TCG. Please verify each item against your app and backend before submitting to the Play Console.

1) Data categories (examples and recommended responses)

- Personal info
  - Examples: email address, username, user ID
  - Collected: YES
  - Shared with third-parties: YES (authentication providers, analytics as needed)
  - Purpose: app functionality, account management, communication

- Financial info
  - Examples: billing name/address; note: card numbers are not stored by the app if a third-party payment provider is used
  - Collected: YES/NO (mark YES only if you collect billing info)
  - Shared with third-parties: YES (payment provider such as Stripe/PayPal)
  - Purpose: payments, billing

- Messages
  - Examples: user-to-user messages, marketplace messages
  - Collected: YES
  - Shared with third-parties: NO (unless you use third-party moderation services)
  - Purpose: app functionality

- Photos / Media
  - Examples: images uploaded by users (card photos)
  - Collected: YES
  - Shared with third-parties: Depends (e.g., if you use CDN or moderation services)
  - Purpose: app functionality, content hosting

- Diagnostics
  - Examples: crash reports, performance metrics
  - Collected: YES
  - Shared with third-parties: YES (Sentry, Firebase Crashlytics)
  - Purpose: analytics, app stability

- Device & Network Info
  - Examples: IP address, device model, OS version
  - Collected: YES
  - Shared with third-parties: YES (analytics providers, hosting/CDN)
  - Purpose: analytics, fraud prevention, security

2) Purposes (select relevant values in Play Console)

- App functionality (required)
- Analytics
- Developer-provided advertising (if applicable)
- Fraud prevention & security
- Payments

3) Privacy & Security notes to include in the form

- Is data encrypted in transit? YES — All network traffic between the app and servers uses HTTPS/TLS.
- Can users request deletion? YES — Users can request deletion by emailing support@curiotcg.app or via in-app account deletion (if available).
- Is data encrypted at rest? Mention if you encrypt sensitive data at rest in your backend; otherwise say: Sensitive payment details are not stored by Curio TCG; payment providers store payment card information.

4) Third-party providers (examples — update to match your stack)

- Google Analytics / Google Tag Manager — analytics
- Firebase (Crashlytics, Remote Config) — crash reporting and analytics
- Sentry — crash reporting
- Stripe / PayPal — payments (if used)
- CDN / Hosting (DigitalOcean, AWS, Cloudflare, etc.) — storage and content delivery

5) Children’s policy

- Curio TCG is not directed to children under 13 (or the minimum age under local laws). If personal data of a child is discovered, Curio TCG will take steps to remove such data.

6) Practical checklist before submitting to Play Console

- Verify which providers you actively use and list them exactly.
- Confirm whether images or messages are shared to third-parties for moderation or content analysis.
- Confirm whether your backend stores any payment card data. If not, explicitly state that card details are handled by the payment provider.
- Confirm encryption-at-rest practices and include if applicable.
- Confirm the user deletion workflow and the contact email (support@curiotcg.app).

If you want, I can generate a completed set of Play Console field values based on the exact third-party services you use — tell me which providers you use and whether your backend stores billing or card data.
