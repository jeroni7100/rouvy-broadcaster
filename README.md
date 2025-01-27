# Readme

Using [rouvy-packet-monitor](https://github.com/jeroni7100/rouvy-packet-monitor) to read and broadcast player state records.

This can be used as an add-on to [Pedal Games](https://pedalgames.online) to use power, cadence, speed, and distance from [Rouvy](https://rouvy.com) as input.

## Prerequisites

The app intercepts the UDP sent from the Rouvy game client to the Rouvy game server.

You must make the following OS specific setup of your computer:

### Windows

You must install [Npcap](https://nmap.org/npcap/) with WinPcap compatibility on your PC.

This will let the application capture network traffic (from next time you start it).

### macOS

Your user must have access rights to enable capture of network traffic. You can enable it with the following command in Terminal (it will give your user read access to the network devices `/dev/bpf*`):

``
sudo chmod o+r /dev/bpf*
`` 

This will let the application capture network traffic (from next time you start it).

## Use

Windows: Download and run the compiled executable from Releases or run it from code.

From code:

```
npm start
```

or 

```
node index.js
```

In Pedal Games, choose **Powerbroadcaster** as the data source


## Command line switches

None

## Packaging

Can be packaged into a standalone executable with

```
npm run pkg
```


## Example

client.js is a simple client processing the broadcasted packages.




# License

MIT

# Repository

https://github.com/jeroni7100/rouvy-broadcaster

Owner/maintainer: Jesper Rosenlund Nielsen ( @jeroni7100 / @zwfthcks/jeroni7100 )
