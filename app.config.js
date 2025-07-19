import 'dotenv/config';

export default {
  expo: {
    name: "twitter",
    slug: "twitter",
    version: "1.0.0",
    extra: {
      clerkPublishableKey: process.env.CLERK_PUBLISHABLE_KEY,
    },
  },
};
