---
title: Bitaxe API Endpoints
logo: ./bitaxe-logo.svg
discordChannel: https://discord.com/channels/1091348375301013615/1094385604982210633
githubRepo: https://github.com/skot/bitaxe/tree/axeTester
---

The Bitaxe features the following endpoints:

example api endpoint http://bitaxe-ip/api/system/info

**GET:**

`/api/system/info`
`/api/swarm/info`

**POST:**

`/api/system/restart`

`/api/system/OTA`

`/api/system/OTAWWW`

**PATCH:**

`/api/system/`

---

General Information about the Bitaxe can be gathered using the `/api/system/info` which will display you with some information as follows:

```{
    "power": 58.35174560546875,
    "voltage": 11906.25,
    "current": 16281.25,
    "temp": 58.0,
    "vrTemp": 45,
    "maxPower": 40,
    "nominalVoltage": 12,
    "hashRate": 2372.7583341893742,
    "bestDiff":	"4.29G",
    "bestNonceDiff": 4292734826,
    "bestSessionDiff": "3.83M",
    "bestSessionNonceDiff":	3828108,
    "stratumDiff": 1000,
    "isUsingFallbackStratum": 0,
    "isPSRAMAvailable":	1,
    "freeHeap": 178368,
    "coreVoltage": 1200,
    "coreVoltageActual": 1194,
    "frequency": 525,
    "ssid": "Haus1",
    "macAddr":	"C0-FA-38-6A-6E-B2",
    "hostname":	"bitaxe",
    "wifiStatus": "Connected!",
    "wifiRSSI":	-44,
    "apEnabled": 0,
    "sharesAccepted": 19739,
    "sharesRejected": 6,
    "sharesRejectedReasons": [{
			"message": "Above target",
			"count": 6
	}],
    "uptimeSeconds": 212115,
    "asicCount": 1,
    "smallCoreCount": 894,
    "ASICModel": "BM1366",
    "stratumURL": "public-pool.io",
    "fallbackStratumURL": "solo.ckpool.org",
    "stratumPort": 21496,
    "fallbackStratumPort": 3333,
    "stratumUser": "bc1qnp980s5fpp8l94p5cvttmtdqy8rvrq74qly2yrfmzkdsntqzlc5qkc4rkq.bitaxe",
    "fallbackStratumUser": "bc1qnp980s5fpp8l94p5cvttmtdqy8rvrq74qly2yrfmzkdsntqzlc5qkc4rkq.bitaxe",
    "version": "v2.6.0",
    "idfVersion": "v5.4",
    "boardVersion": "302",
    "runningPartition": "factory",
    "flipscreen": 1,
    "overheat_mode": 0,
    "overclockEnabled":	0,
    "invertscreen": 0,
    "invertfanpolarity": 1,
    "autofanspeed": 0,
    "fanspeed": 35,
    "fanrpm": 5515
}
```

---

With POST command is it possible to restart the Bitaxe:

example:
`curl -X POST http://bitaxeip/api/system/restart`

---

The PATCH functionallity allows it to change settings on the Bitaxe.

Some settings still require a restart but changing the fanspeed can be achieve live:

```
curl -X PATCH http://yourbitaxe/api/system \
     -H "Content-Type: application/json" \
     -d '{"fanspeed": "desired_speed_value"}'
```
