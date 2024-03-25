const config = {
  facebookApp: {
    appId: process.env.WEBHOOK_FACEBOOK_APP_ID,
    appSecret: process.env.WEBHOOK_FACEBOOK_APP_SECRET,
    pageId: process.env.WEBHOOK_FACEBOOK_PAGE_ID,
    pageAccessToken: process.env.WEBHOOK_FACEBOOK_PAGE_ACCESS_TOKEN,
    verifyToken: process.env.WEBHOOK_FACEBOOK_VERIFY_TOKEN,
    appApi: 'https://graph.facebook.com/v17.0',
  },
  socialAuth: {
    facebookCallbackUrl: process.env.AUTH_FACEBOOK_CALLBACK_URL,
    instagramCallbackUrl: process.env.AUTH_INSTAGRAM_CALLBACK_URL,
    instagramClientId: process.env.AUTH_INSTAGRAM_CLIENTID,
    instagramSecret: process.env.AUTH_INSTAGRAM_SECRET,
    facebookClientId: process.env.AUTH_FACEBOOK_CLIENTID,
    facebookSecret: process.env.AUTH_FACEBOOK_SECRET,
  },
};

export default config;
