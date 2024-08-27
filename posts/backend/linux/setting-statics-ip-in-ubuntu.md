# Setting static IP in Ubuntu-22.04

## Get current network configuration

```bash
ifconfig
```

## Edit `/etc/netplan/00-installer-config.yaml`

- Open file

```bash
sudo vim /etc/netplan/00-installer-config.yaml
```

- Edit file as the following content

```yaml
network:
  ethernets:
    ens33:
      dhcp4: true
    ens34:
      addresses:
        - 10.222.1.37/24
      routes:
        - to: default
          via: 10.222.1.1
      nameservers:
        addresses: [114.114.114.114, 8.8.8.8]
      dhcp4: no
  version: 2
```

## Apply network configuration

```bash
sudo netplan apply
```
