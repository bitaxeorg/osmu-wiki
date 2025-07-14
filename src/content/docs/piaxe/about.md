---
title: About Piaxe
logo: ./PiAxeLogo.svg
discordChannel: https://discord.com/channels/1091348375301013615/1167074832186355752
githubRepo: https://github.com/shufps/piaxe
---
The PiAxe is a Raspberry Pi mining HAT that is designed to be used with the PiAxe Miner software.
![PiAxe](./PiAxe.png)

## What is this?

ThePiAxe is a HAT that you can plug into your Raspberry Pi and by using the Pyminer software and a 12V DC Power supply you can run your BM1366 on your Raspberry Pi. The Hashrate achieves the same results as the Bitaxe Ultra around ~500GH/s.

## 🔋 Features

- **powered by 12V**
- **added TVS diode and fuses**
- **revised buck switching regulator circuit**
- **smallest components are 0805 size for easier manual assembly**
- **fully compatible with the PiAxe Miner software**
- **LM75 compatible temperature sensor**

## 🛠️ Hardware

The PiAxe's underlying hardware is the Raspberry Pi and it can be viewed as an extension to the Raspberry Pi and it's overall large number of different HAT's. Currently this HAT features a BM1366 ASIC and is controlled over the GPIO pinlet from the Pi.

## ⚙️ Guide

Currently there only exists 1 Build of the PiAxe. If you wish to build your own take a look at the [Building Guide](/tips/building-pcbs) and [Assembly Guide](/tips/assembly)

### Software

The PiAxe-Miner software can be found [here](https://github.com/shufps/piaxe-miner)

## 🎯 Goals

- [x] PiHAT
- [x] Using better IC size 0805 smalles
- [x] Using locked Voltage IC's
