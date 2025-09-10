---
title: Self-Hosting Public Pool
---

1. 💻 [Windows](#-windows) - TODO
2. 🍏 [MacOS](#-macos) - TODO
3. 🐧 [Linux](#-linux)

## 💻 Windows

## 🍏 MacOS

## 🐧 Linux

### Installing Bitcoin Core

- download latest release from https://bitcoin.org/en/download
  TODO: note about knots and btcd being usable as well
- extract everything in `bitcoin-XX.X/bin` to `/usr/local/bin`, and everything in `bitcoin-XX.X/share` to `/usr/local/share`

### Installing NodeJS

- ubuntu/debian: select the node.js runtime, your distro, and the latest lts version from https://nodesource.com/products/distributions
- arch: use nvm to install the latest lts

### Configuring Bitcoin

#### Bitcoin Core/Knots

MAYBE: have a community mining config?

#### btcd

### Getting and Starting Public-Pool

- `git clone https://github.com/benjamin-wilson/public-pool.git`
- `cd ./public-pool`
- install dependencies with `npm install`
- copy `.env.example` to `.env` and fill in `BTC_RPC_URL` and `BTC_RPC_COOKIEFILE`
- `npm start`
- point your miners to your _lan_ ip address
- profit (hopefully)
