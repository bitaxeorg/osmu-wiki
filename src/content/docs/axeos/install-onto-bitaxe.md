---
title: How to install AxeOS on a BitAxe
---
This page will guide you through the process of installing AxeOS onto your Bitaxe.

## 1. Connect your BitAxe to your PC
If you don't have a BitAxe with USB connectivity make sure to establish a serial connection with either a JTAG ESP-Prog device or a USB-to-UART bridge.

Otherwise, just plug your BitAxe into your PC with a USB-cable

## 2. BitAxeTool
OSMU built [BitAxeTool](https://github.com/johnny9/bitaxetool) to make the installation process very easy. You can install it onto your system through pip. If you do not have pip installed, check this [guide](https://pip.pypa.io/en/stable/installation/).

Run in your terminal:
```bash
pip install --upgrade bitaxetool
```

## 3. Pre-Configuration

Starting with v2.0.0, the AxeOS firmware requires some basic manufacturing data to be flashed in the NVS partition.

Create a file called `config.cvs` and copy the content of [this file](https://github.com/skot/ESP-Miner/blob/master/config.cvs.example) into it. You have to modify
- `asicfrequency`
- `asicvoltage`
- `asicmodel`
- `devicemodel`
- and `boardversion`.

The following are recommendations but you must have all values in your `config.cvs` file to flash properly.

```csv title="config.cvs (for Bitaxe 100 'Max')"
key,type,encoding,value
main,namespace,,
asicfrequency,data,u16,475
asicvoltage,data,u16,1400
asicmodel,data,string,BM1397
devicemodel,data,string,max
boardversion,data,string,2.2
```
```csv title="config.cvs (for Bitaxe 200 'Ultra')"
key,type,encoding,value
main,namespace,,
asicfrequency,data,u16,485
asicvoltage,data,u16,1320
asicmodel,data,string,BM1366
devicemodel,data,string,ultra
boardversion,data,string,0.11
```

Save the file, we need it in the next step.

## 4. Flash
Download the latest firmware from the [release page](https://github.com/skot/ESP-Miner/releases) or [compile it yourself](/axeos/compile). It should look like `esp-miner-factory-vX.X.X.bin`. Now you can finally flash your BitAxe! To do so type into a system terminal:
```bash /{[^{}]*\}/
bitaxetool --config {path-to-config} --firmware {path-to-firmware}
```
before executing the command replace
- `{path-to-config}` with the path to the config file from the [previous step](#3-pre-configuration)
- `{path-to-firmware}` with the path to the firmware you downloaded or compiled

BitAxeTool should now flash your BitAxe successfully.

## 5. Linux Troubleshooting

On Linux, you may encounter a few errors when trying to flash with BitAxeTool, depending on how you installed the tool. These include:

- `Permission denied` 
- `Failed to connect` 
- `The port is busy or doesn't exist`
-  `bitaxetool: command not found`

Example command: 
```bash
bitaxetool --config config.cvs --firmware esp-miner-factory-v2.0.7.bin
```

Example output:
```
Flashing firmware: esp-miner-factory-v2.0.7.bin
Flashing config: config.cvs
esptool.py v4.7.0
Found 1 serial ports
Serial port /dev/ttyACM0
/dev/ttyACM0 failed to connect: Could not open /dev/ttyACM0, the port is busy or doesn't exist.
([Errno 13] could not open port /dev/ttyACM0: [Errno 13] Permission denied: '/dev/ttyACM0')
```

In the above scenario, BitAxeTool does not have permission to access the port. To fix this, run the command again with `sudo`, e.g.:
```bash
sudo bitaxetool --config config.cvs --firmware esp-miner-factory-v2.0.7.bin
```

BitAxeTool should now flash your BitAxe successfully. 

If you encounter the error `sudo: bitaxetool: command not found`, it's likely that you have installed BitAxeTool in a virtual environment, using Conda, etc. The root (sudo) user may not find your command because the PATH environment variable for the root does not include the directory where BitAxeTool is located.

To resolve this, you can specify that you want to use the current environment's 'PATH' with sudo:

```bash
sudo -E env "PATH=$PATH" <command> [arguments]
```

Example command:
```bash
sudo -E env "PATH=$PATH" bitaxetool --config config.cvs --firmware esp-miner-factory-v2.0.7.bin
```

Output example of successful flash:

```
Flashing firmware: esp-miner-factory-v2.0.7.bin
Flashing config: config.cvs
esptool.py v4.7.0
Found 1 serial ports
Serial port /dev/ttyACM0
Connecting...
Detecting chip type... ESP32-S3
Chip is ESP32-S3 (QFN56) (revision v0.2)
Features: WiFi, BLE, Embedded PSRAM 8MB (AP_3v3)
Crystal is 40MHz
MAC: ec:da:3b:94:df:70
Uploading stub...
Running stub...
Stub running...
Configuring flash size...
Flash will be erased from 0x00000000 to 0x00f11fff...
Compressed 15802368 bytes to 953425...
Wrote 15802368 bytes (953425 compressed) at 0x00000000 in 51.4 seconds (effective 2460.5 kbit/s)...
Hash of data verified.

Leaving...
Hard resetting via RTS pin...

Creating NVS binary with version: V2 - Multipage Blob Support Enabled

Created NVS binary: ===> /tmp/bitaxe_config.bin
esptool.py v4.7.0
Found 1 serial ports
Serial port /dev/ttyACM0
Connecting...
Detecting chip type... ESP32-S3
Chip is ESP32-S3 (QFN56) (revision v0.2)
Features: WiFi, BLE, Embedded PSRAM 8MB (AP_3v3)
Crystal is 40MHz
MAC: ec:da:3b:94:df:70
Uploading stub...
Running stub...
Stub running...
Configuring flash size...
Flash will be erased from 0x00009000 to 0x0000efff...
Compressed 24576 bytes to 601...
Wrote 24576 bytes (601 compressed) at 0x00009000 in 0.2 seconds (effective 885.2 kbit/s)...
Hash of data verified.

Leaving...
Hard resetting via RTS pin...
```
