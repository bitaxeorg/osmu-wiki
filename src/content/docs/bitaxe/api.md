---
title: Bitaxe API Endpoints
logo: ./bitaxe-logo.svg
discordChannel: https://discord.com/channels/1091348375301013615/1094385604982210633
githubRepo: https://github.com/skot/bitaxe/tree/axeTester
---

The Bitaxe features the following endpoints:

**GET**

* `/api/system/info` Get system information
* `/api/system/asic` Get ASIC settings information
* `/api/system/statistics` Get system statistics (data logging should be activated)
* `/api/system/statistics/dashboard` Get system statistics for dashboard
* `/api/system/wifi/scan` Scan for available WiFi networks
* `/api/theme` Get current theme settings

**POST**

* `/api/system/restart` Restart the system
* `/api/system/identify` Identify the device
* `/api/system/OTA` Update system firmware
* `/api/system/OTAWWW` Update AxeOS
* `/api/theme` Update theme settings

**PATCH**

* `/api/system` Update system settings

---

### Examples

**GET**

Get system information:

```bash
curl http://YOUR-BITAXE-IP/api/system/info
```

Get ASIC settings information:

```bash
curl http://YOUR-BITAXE-IP/api/system/asic
```

Get system statistics (data logging should be activated):

```bash
curl http://YOUR-BITAXE-IP/api/system/statistics
```

You can filter statistics by specific columns using the `columns` query parameter:

```bash
curl "http://YOUR-BITAXE-IP/api/system/statistics?columns=hashrate,hashrate_1m,hashrate_10m,hashrate_1h,asicTemp,vrTemp,power"
```

Get dashboard statistics:

```bash
curl http://YOUR-BITAXE-IP/api/system/statistics/dashboard
```

Get available WiFi networks:

```bash
curl http://YOUR-BITAXE-IP/api/system/wifi/scan
```

Get current theme settings:

```bash
curl http://YOUR-BITAXE-IP/api/theme
```

**POST**

Restart the system:

```bash
curl -X POST http://YOUR-BITAXE-IP/api/system/restart
```

Identify the device (let it say Hi!):

```bash
curl -X POST http://YOUR-BITAXE-IP/api/system/identify
```

Update system firmware:

```bash
curl -X POST \
     -H "Content-Type: application/octet-stream" \
     --data-binary "@esp-miner.bin" \
     http://YOUR-BITAXE-IP/api/system/OTA
```

Update AxeOS web interface:

```bash
curl -X POST \
     -H "Content-Type: application/octet-stream" \
     --data-binary "@www.bin" \
     http://YOUR-BITAXE-IP/api/system/OTAWWW
```

Update theme settings:

```bash
curl -X POST http://YOUR-BITAXE-IP/api/theme \
     -H "Content-Type: application/json" \
     -d '{"theme": "dark", "colors": {...}}'
```

**PATCH**

The PATCH functionality allows you to change settings on the Bitaxe.

Some settings still require a restart but changing the fanspeed can be achieved live:

```bash
curl -X PATCH http://YOUR-BITAXE-IP/api/system \
     -H "Content-Type: application/json" \
     -d '{"fanspeed": 50}'
```

---

### Response

The file [openapi.yaml](https://github.com/bitaxeorg/ESP-Miner/blob/master/main/http_server/openapi.yaml) contains response values for each API endpoint.
For example, general information about the Bitaxe can be collected using the `/api/system/info`, which provides the following data:

```
{
	"power":	18.7522583,
	"voltage":	5093.75,
	"current":	12015.625,
	"temp":	60.125,
	"temp2":	-1,
	"vrTemp":	62,
	"maxPower":	40,
	"nominalVoltage":	5,
	"hashRate":	1072.2407227,
	"hashRate_1m":	1088.9354248,
	"hashRate_10m":	1072.3271484,
	"hashRate_1h":	1071.8736572,
	"expectedHashrate":	1071,
	"errorPercentage":	0,
	"bestDiff":	49224525,
	"bestSessionDiff":	2038368,
	"poolDifficulty":	1000,
	"isUsingFallbackStratum":	1,
	"poolAddrFamily":	2,
	"isPSRAMAvailable":	1,
	"freeHeap":	8212708,
	"freeHeapInternal":	104027,
	"freeHeapSpiram":	8140652,
	"coreVoltage":	1150,
	"coreVoltageActual":	1144,
	"frequency":	525,
	"ssid":	"HomeNET",
	"macAddr":	"10:F5:12:33:BB:F0",
	"hostname":	"bitaxe",
	"ipv4":	"10.1.10.111",
	"ipv6":	"FE80::F2F5:BDFF:FE44:B2F0",
	"wifiStatus":	"Connected!",
	"wifiRSSI":	-44,
	"apEnabled":	0,
	"sharesAccepted":	4768,
	"sharesRejected":	13,
	"sharesRejectedReasons":	[{
			"message":	"Stale",
			"count":	13
		}],
	"uptimeSeconds":	18574,
	"smallCoreCount":	2040,
	"ASICModel":	"BM1370",
	"stratumURL":	"public-pool.io",
	"stratumPort":	21496,
	"stratumUser":	"bc1qnp980s5fpp8l94p5cvttmtdqy8rvrq74qly2yrfmzkdsntqzlc5qkc4rkq.bitaxe",
	"stratumSuggestedDifficulty":	1000,
	"stratumExtranonceSubscribe":	0,
	"fallbackStratumURL":	"solo.ckpool.org",
	"fallbackStratumPort":	3333,
	"fallbackStratumUser":	"bc1qnp980s5fpp8l94p5cvttmtdqy8rvrq74qly2yrfmzkdsntqzlc5qkc4rkq.bitaxe",
	"fallbackStratumSuggestedDifficulty":	1000,
	"fallbackStratumExtranonceSubscribe":	0,
	"responseTime":	188.482,
	"version":	"v2.12.2",
	"axeOSVersion":	"v2.12.2",
	"idfVersion":	"v5.5.1",
	"boardVersion":	"601",
	"resetReason":	"Software reset via esp_restart",
	"runningPartition":	"factory",
	"overheat_mode":	0,
	"overclockEnabled":	0,
	"display":	"SSD1306 (128x32)",
	"rotation":	0,
	"invertscreen":	0,
	"displayTimeout":	-1,
	"autofanspeed":	1,
	"fanspeed":	48.4200668,
	"manualFanSpeed":	100,
	"minFanSpeed":	25,
	"temptarget":	60,
	"fanrpm":	3915,
	"fan2rpm":	0,
	"statsFrequency":	0,
	"blockFound":	0,
	"blockHeight":	931409,
	"scriptsig":	"...._i.F.W...ckpool./solo.ckpool.org/",
	"networkDifficulty":	146472570619930,
	"hashrateMonitor":	{
		"asics":	[{
				"total":	1072.2407227,
				"domains":	[273.5812073, 276.209198, 268.4890747, 252.1910095],
				"errorCount":	1415
			}]
	}
}
```