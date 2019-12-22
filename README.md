# Project Aya: the globally-distributed waifu repository

Project Aya is a part-dApp, part booru service. It uses Ethereum and IPFS for its CDN which where the Frontend wraps around.

For now nothing is not yet in stone here but if you wanna check the roadmap, check out our issues.


## Understanding the layout

We have two subsystems seperated into directories.

- `ethereum` handles the IPFS part. It runs normally on the rinkeby network.
- `frontend` is where the magic mostly happens, it contains the API gateway and the site itself.

You'll need to have a working local EVM and Node.js with Yarn to run this project.


## Copyright

Copyright &copy; 2019 Ayane Satomi, Ovyerus, et al. Licensed under MIT.