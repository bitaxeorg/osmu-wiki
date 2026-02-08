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

**POST**

* `/api/system/restart` Restart the system
* `/api/system/identify` Identify the device
* `/api/system/OTA` Update system firmware
* `/api/system/OTAWWW` Update AxeOS

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

**PATCH**

The PATCH functionality allows you to change settings on the Bitaxe. Some settings may require a restart, but many can be changed on-the-fly.

Change fan speed (when autofanspeed is disabled):

```bash
curl -X PATCH http://YOUR-BITAXE-IP/api/system \
     -H "Content-Type: application/json" \
     -d '{"fanspeed": 50}'
```

Enable automatic fan speed control:

```bash
curl -X PATCH http://YOUR-BITAXE-IP/api/system \
     -H "Content-Type: application/json" \
     -d '{"autofanspeed": 1}'
```

Set target temperature for automatic fan control:

```bash
curl -X PATCH http://YOUR-BITAXE-IP/api/system \
     -H "Content-Type: application/json" \
     -d '{"temptarget": 65}'
```

Update ASIC frequency (requires overclock enabled):

```bash
curl -X PATCH http://YOUR-BITAXE-IP/api/system \
     -H "Content-Type: application/json" \
     -d '{"frequency": 500}'
```

Update ASIC core voltage (requires overclock enabled):

```bash
curl -X PATCH http://YOUR-BITAXE-IP/api/system \
     -H "Content-Type: application/json" \
     -d '{"coreVoltage": 1200}'
```

Update stratum pool settings:

```bash
curl -X PATCH http://YOUR-BITAXE-IP/api/system \
     -H "Content-Type: application/json" \
     -d '{
       "stratumURL": "stratum+tcp://pool.example.com",
       "stratumPort": 3333,
       "stratumUser": "your_wallet.worker_name",
       "stratumPassword": "x"
     }'
```

Update WiFi settings:

```bash
curl -X PATCH http://YOUR-BITAXE-IP/api/system \
     -H "Content-Type: application/json" \
     -d '{
       "ssid": "YourWiFiNetwork",
       "wifiPass": "YourPassword",
       "hostname": "bitaxe"
     }'
```

Multiple settings can be updated in a single request:

```bash
curl -X PATCH http://YOUR-BITAXE-IP/api/system \
     -H "Content-Type: application/json" \
     -d '{
       "autofanspeed": 1,
       "temptarget": 60,
       "displayTimeout": 10,
       "statsFrequency": 120
     }'
```

---

### Available Settings

The following settings can be updated via PATCH requests to `/api/system`:

**Pool Configuration:**
- `stratumURL` - Primary stratum server URL (e.g., "stratum+tcp://pool.example.com")
- `stratumPort` - Primary stratum server port (1-65535)
- `stratumUser` - Username for primary stratum server
- `stratumPassword` - Password for primary stratum server
- `fallbackStratumURL` - Fallback stratum server URL
- `fallbackStratumPort` - Fallback stratum server port (1-65535)
- `fallbackStratumUser` - Username for fallback stratum server
- `fallbackStratumPassword` - Password for fallback stratum server
- `useFallbackStratum` - Force use of fallback stratum pool

**WiFi Configuration:**
- `ssid` - WiFi network SSID (1-32 characters)
- `wifiPass` - WiFi network password (8-63 characters)
- `hostname` - Device hostname (alphanumeric and hyphens only)

**ASIC Configuration:**
- `coreVoltage` - ASIC core voltage in millivolts (requires `overclockEnabled: 1`)
- `frequency` - ASIC frequency in MHz (requires `overclockEnabled: 1`)
- `overclockEnabled` - Enable custom voltage/frequency (0=disabled, 1=enabled)

**Fan Control:**
- `autofanspeed` - Automatic fan speed control (0=manual, 1=auto)
- `fanspeed` - Manual fan speed percentage when autofanspeed is disabled (0-100)
- `temptarget` - Target temperature in °C for automatic fan control (0-100)

**Display Settings:**
- `rotation` - Screen rotation (0, 90, 180, 270 degrees)
- `invertscreen` - Invert screen colors (0=normal, 1=inverted)
- `displayTimeout` - Display timeout in minutes (-1=always on, 0=always off, >0=timeout)

**Advanced Settings:**
- `overheat_mode` - Overheat protection mode (0=disabled)
- `statsFrequency` - Statistics logging frequency in seconds (0=disabled)

---

### Response Formats

The complete API specification with all response schemas is available in [openapi.yaml](https://github.com/bitaxeorg/ESP-Miner/blob/master/main/http_server/openapi.yaml).

#### `/api/system/info` Response

General information about the Bitaxe can be collected using `/api/system/info`, which provides the following data:

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

#### `/api/system/asic` Response

ASIC settings information can be retrieved using `/api/system/asic`, which returns:

```json
{
	"ASICModel": "BM1370",
	"deviceModel": "Gamma",
	"swarmColor": "purple",
	"asicCount": 1,
	"defaultFrequency": 490,
	"frequencyOptions": [400, 425, 450, 475, 485, 490, 500, 525, 550, 575],
	"defaultVoltage": 1200,
	"voltageOptions": [1100, 1150, 1200, 1250, 1300]
}
```

**ASIC Models:**
- `BM1366` - Used in Bitaxe Ultra
- `BM1368` - Used in Bitaxe Supra
- `BM1370` - Used in Bitaxe Gamma
- `BM1397` - Used in Bitaxe (original)

#### `/api/system/wifi/scan` Response

WiFi network scan results can be retrieved using `/api/system/wifi/scan`:

```json
{
	"networks": [
		{
			"ssid": "MyWiFiNetwork",
			"rssi": -65,
			"authmode": 3
		},
		{
			"ssid": "AnotherNetwork",
			"rssi": -72,
			"authmode": 4
		}
	]
}
```

**Authentication Modes:**
- `0` - OPEN (no security)
- `1` - WEP
- `2` - WPA_PSK
- `3` - WPA2_PSK
- `4` - WPA_WPA2_PSK
- `5` - WPA2_ENTERPRISE
- `6` - WPA3_PSK
- `7` - WPA2_WPA3_PSK
- `8` - WAPI_PSK
- `9` - OWE (Opportunistic Wireless Encryption)
- `10` - WPA3_ENT_192 (Enterprise Suite-B)

**RSSI Values:**
- `-30 dBm` - Excellent signal
- `-50 dBm` - Very good signal
- `-60 dBm` - Good signal
- `-67 dBm` - Fair signal
- `-70 dBm` - Weak signal
- `-80 dBm` - Very weak signal
- `-90 dBm` - Unusable signal

#### `/api/system/statistics` Response

System statistics can be retrieved using `/api/system/statistics`. This endpoint supports filtering by specific columns using the `columns` query parameter.

Available columns include:
- `hashrate`, `hashrate_1m`, `hashrate_10m`, `hashrate_1h` - Hashrate measurements
- `asicTemp`, `vrTemp` - Temperature readings
- `asicVoltage`, `voltage` - Voltage measurements
- `power`, `current` - Power consumption metrics
- `fanSpeed`, `fanRpm`, `fan2Rpm` - Fan speed information
- `wifiRssi` - WiFi signal strength
- `freeHeap` - Available memory
- `responseTime` - Pool response time

Response format:

```json
{
	"currentTimestamp": 1234567890,
	"labels": ["hashrate", "asicTemp", "power"],
	"statistics": [
		[1072.24, 60.5, 18.75],
		[1068.12, 61.0, 18.80]
	]
}
```

---

### HTTP Status Codes

The API returns standard HTTP status codes:

- `200 OK` - Request successful
- `400 Bad Request` - Invalid request parameters or settings
- `401 Unauthorized` - Client not in allowed network range
- `500 Internal Server Error` - Server error occurred

---

### Notes

- All API endpoints return JSON responses except for OTA update endpoints
- The `/api/system/statistics` endpoint requires data logging to be enabled (`statsFrequency` > 0)
- Some settings changes via PATCH may require a system restart to take effect
- WiFi and stratum password fields are write-only and will not be returned in GET responses
- Temperature values are returned in Celsius
- Voltage values are typically in millivolts for ASIC settings
- Power values are in watts
- Hashrate values are in GH/s (Gigahashes per second)