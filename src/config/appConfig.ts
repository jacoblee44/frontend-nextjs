import { env } from "./env";

export const appConfig = {
  appBaseUrl: env.Development ? "https://devapp.dayratework.com" : "https://devapp.dayratework.com", //http://localhost:4005

  socialLogins: {
    google: {
      clientId: "1002532873122-ehp221hp6klmf6pe6682jdsm7jqhsab2.apps.googleusercontent.com",
      clientSecret: "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",
    },
    facebook: {
      appId: "1300345707401459",
      secret: "026f90eaa15fd3e17f8ee05ea22c212b",
    },
    twitter: {
      apiKey: "RShfRgjpmOppXn42SG6ZvLOud",
      secretKey: "1yOxO5Rgw6vE9O0mjJ0uFi5j4tETtAMFz5LmWBzxh487vw9za5",
      bearerToken: "AAAAAAAAAAAAAAAAAAAAAKNUhgEAAAAAOryG7sh7Mk%2FFTIHUPZYez5KhRgU%3DaL8onwZKTrgo84UuNYMOYvYBWStLXzlcZSvlTj8AvCOS2jMPi0",
    },
  },
};