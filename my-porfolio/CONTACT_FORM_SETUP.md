# Secure Contact Form Setup

This guide explains how to set up the secure contact form modal on your portfolio.

## Overview

- The contact form is a modal that opens when visitors click the email icon in the header
- Your email address is **never exposed** in the frontend code
- Form submissions are handled by EmailJS, which connects to your Gmail or Outlook account
- `.env.local` file keeps sensitive data out of version control (it's in `.gitignore`)

## Setup Steps

### 1. Create a Free EmailJS Account

1. Go to [emailjs.com](https://www.emailjs.com)
2. Click "Sign Up Free" and create an account
3. Verify your email address
4. Log in to your dashboard

### 2. Add Your Email Service (Gmail or Outlook)

#### For Gmail:
1. In EmailJS dashboard, go to **Email Services**
2. Click **Add Service**
3. Select **Gmail**
4. Click **Connect with Gmail**
5. Authorize EmailJS to use your Gmail account
6. Copy your **Service ID** (looks like: `service_abc123def456`)

#### For Outlook/Other Email:
1. Follow similar steps but select your email provider
2. Enter your email credentials if prompted

### 3. Create an Email Template

1. In EmailJS dashboard, go to **Email Templates**
2. Click **Create New Template**
3. Set the template content:

**Email Subject:**
```
New Contact Form Message from {{from_name}}
```

**Email Content (HTML):**
```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .header {
            background-color: rgb(199, 224, 189);
            padding: 20px;
            border-radius: 8px 8px 0 0;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            color: rgb(56, 87, 35);
            font-size: 24px;
        }
        .content {
            background-color: white;
            padding: 20px;
            border-radius: 0 0 8px 8px;
        }
        .field {
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 1px solid #eee;
        }
        .field:last-child {
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
        }
        .label {
            font-weight: bold;
            color: rgb(56, 87, 35);
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 5px;
        }
        .value {
            color: #333;
            font-size: 16px;
            word-wrap: break-word;
            white-space: pre-wrap;
        }
        .footer {
            text-align: center;
            font-size: 12px;
            color: #999;
            padding: 20px;
            background-color: #f5f5f5;
            border-radius: 0 0 8px 8px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📧 New Contact Message</h1>
        </div>
        
        <div class="content">
            <div class="field">
                <div class="label">From</div>
                <div class="value">{{from_name}}</div>
            </div>
            
            <div class="field">
                <div class="label">Email</div>
                <div class="value"><a href="mailto:{{from_email}}">{{from_email}}</a></div>
            </div>
            
            <div class="field">
                <div class="label">Message</div>
                <div class="value">{{message}}</div>
            </div>
        </div>
        
        <div class="footer">
            <p>This message was sent from your portfolio contact form.</p>
        </div>
    </div>
</body>
</html>
```

4. Copy your **Template ID** (looks like: `template_abc123def456`)

### 4. Get Your Public Key

1. In EmailJS dashboard, go to **Account**
2. Copy your **Public Key** (looks like: `abc123def456ghi789...`)

### 5. Configure Environment Variables

Open `.env.local` in your project root and update it with the values from steps 2-4:

```
REACT_APP_EMAILJS_SERVICE_ID=service_abc123def456
REACT_APP_EMAILJS_TEMPLATE_ID=template_abc123def456
REACT_APP_EMAILJS_PUBLIC_KEY=abc123def456ghi789...
REACT_APP_CONTACT_EMAIL=your-email@example.com
```

Replace with your actual values from the EmailJS dashboard.

### 6. Test the Form

1. Start your development server: `npm start`
2. Click the email icon in the header
3. Fill out the contact form and submit
4. Check your email inbox for the message (may take a few seconds)

## How It Works

1. **Security**: 
   - Your email credentials are never in frontend code
   - Environment variables in `.env.local` are Git-ignored
   - EmailJS handles secure authentication

2. **Form Submission**:
   - User fills out form and clicks Send
   - EmailJS sends the message using your connected email account
   - You receive it in your inbox like a normal email
   - User sees a success message

3. **Free Tier Limits**:
   - EmailJS free tier: 200 emails/month
   - No credit card required
   - Upgrade anytime if you need more

## Files Changed

- **src/components/ContactModal.js** - Contact form modal with EmailJS integration
- **src/components/PageHeader.js** - Email icon now opens modal
- **.env.local** - Environment variables (not committed to Git)
- **package.json** - Added `@emailjs/browser` dependency

## Component Props

### ContactModal

```javascript
<ContactModal 
  isOpen={boolean}        // Whether modal is visible
  onClose={function}      // Callback when modal closes
/>
```

## Styling

The modal uses Tailwind CSS and matches your website's color scheme:
- Clean white modal on dark overlay
- Blue submit button
- Responsive design (works on mobile and desktop)
- Focus states for accessibility

## Troubleshooting

**Form submissions not working?**
- Check browser console (F12) for error messages
- Verify all three ID values in `.env.local` are correct
- Restart your development server after changing `.env.local`
- Ensure your Gmail/email account is connected in EmailJS

**Not receiving emails?**
- Check spam/junk folder
- Log into EmailJS dashboard → Email Services to verify your account is active
- Make sure template variables match: `{{from_name}}`, `{{from_email}}`, `{{message}}`, `{{to_email}}`

**"EmailJS not configured" error?**
- One or more environment variables are missing
- Double-check `.env.local` has all four values
- No typos in variable names (they're case-sensitive)

**Rate limiting (too many emails)?**
- Free tier allows 200 emails/month
- Upgrade plan if you exceed this
- Or implement a simple rate limiter on your form

## Environment Variables Reference

| Variable | Source | Example |
|----------|--------|---------|
| `REACT_APP_EMAILJS_SERVICE_ID` | EmailJS Account → Services | `service_abc123` |
| `REACT_APP_EMAILJS_TEMPLATE_ID` | EmailJS Account → Templates | `template_abc123` |
| `REACT_APP_EMAILJS_PUBLIC_KEY` | EmailJS Account → Account Settings | `abc123def456...` |
| `REACT_APP_CONTACT_EMAIL` | Your email address | `you@example.com` |

## Security Notes

✅ Email is never exposed in HTML/JS source code
✅ Email never committed to Git (in `.gitignore`)
✅ EmailJS handles secure authentication
✅ HTTPS encryption in transit
✅ No email harvesting bots can access your address
✅ Free tier (no credit card required)

## Alternative Options

If you want to switch backends:
- **Formspree** - Simple form forwarding service
- **Netlify Forms** - If hosting on Netlify
- **Your own API** - Node.js/Firebase backend for maximum control
