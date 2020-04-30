# Project Aya [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FClarityCafe%2FAya.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2FClarityCafe%2FAya?ref=badge_shield)

Project Aya is not your typical image board. It's designed to be simple, minimal, and only focus on what matters most - the images.

Aya was created to leverage the current trend with web development - which is the serverless web application trend. It allows websites to be more efficient with cost and ultimately would future-proof the platform by splitting a what would be a monolithic system for the API into a series of split functions that only executes when needed.

We also made the UI much more simpler and modern compared to contemporaries, giving it a more professional, but simple look that is easy to get on to.

![image](https://user-images.githubusercontent.com/14976516/80306028-3c7f4d80-87f3-11ea-8a62-6fe12ac7353c.png)

And to top it off, we don't rely on S3 or any vendor-specific object storage, we use [IPFS](https://ipfs.io) to host our content, this makes sure your images are available, even if Project Aya goes down.

## Contributing

For now, we're still in early stages, but we accept contributions both small and large. Keep in mind we already have the UI designed (just not implemented yet), so if you want to change something in the UI, consult [Ayane Satomi](https://github.com/sr229) - the project proponent, if you want to change something (opening an issue before doing something with the UI's overall look and feel works as well).

If you want to test what works currently, follow the instructions below.

You will need the following first to get started:

- SauceNAO API Key
- MongoDB Database URL (a local one would work!)
- Redis connection URL
- Reddit OAuth secrets

you will need to set them as environment variables (we make use of environment variables heavily so we can deploy on Vercel) - consult `lib/database.ts` and `lib/sourceLookup.ts` for the environment variable naming.

With that done, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. Hopefully nothing breaks. If it does, go ahead and open an [issue](https://github.com/ClarityCafe/Aya/issues/new) because that's clearly not intended.

## Deploy on Vercel

The easiest way to deploy Aya is to use the [Vercel Platform](https://zeit.co/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out Vercel's [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Copyright

Copyright &copy; 2019 Ayane Satomi, Ovyerus, et al. Licensed under MIT.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/zeit/next.js/tree/canary/packages/create-next-app).

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FClarityCafe%2FAya.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2FClarityCafe%2FAya?ref=badge_large)
