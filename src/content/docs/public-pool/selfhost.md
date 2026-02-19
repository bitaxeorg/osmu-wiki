---
title: Self-Hosting Public Pool
---

bla bla overview here, something about being able to do this on your home pc but dedicated hardware is nice too (and especially note old pcs are perfectly fine)

## Installing Dependencies

TODO: `git` and `npm` lts

### 💻 Windows

### 🍏 MacOS

- use homebrew to install the latest node lts  
    the version needs to be specified

### 🐧 Linux

#### Debian, Ubuntu, and Derivatives
- install git with `apt install git`
- select the node.js runtime, your distro, and the latest lts version from https://nodesource.com/products/distributions

#### Arch and Derivatives
- install git with `pacman -S git`
- use your favorite aur helper to install the latest node lts, or install nvm, then use nvm to install and activate the latest node lts

## Installing Bitcoin Core

- download latest release from https://bitcoin.org/en/download
  TODO: note about knots and btcd being usable as well
- extract everything in `bitcoin-XX.X/bin` to `/usr/local/bin`, and everything in `bitcoin-XX.X/share` to `/usr/local/share`

## Setting up your Bitcoin node

### Bitcoin Core/Knots

MAYBE: have a community mining config?  
TODO: note about pruning, prefer 10-30gib of space for the chain  
    not everyone casually has 1 tib of free space
### btcd


## Setting up your private Public-Pool

- `git clone https://github.com/benjamin-wilson/public-pool.git`
- `cd ./public-pool`
- install dependencies with `npm install`
- copy `.env.example` to `.env` and fill in `BTC_RPC_URL` and `BTC_RPC_COOKIEFILE`
- `npm start`
- point your miners to your _lan_ ip address
- profit (hopefully)
