# Install NFS in ubuntu-22.04

## Install NFS Server

### Install NFS Kernel Server

```bash
sudo apt update
sudo apt install nfs-kernel-server
```

### Create NFS Directory

```bash
sudo mkdir -p /srv/nfs/share
sudo chown nobody:nogroup /srv/nfs/share
sudo chmod 777 /srv/nfs/share
```

### Edit /etc/exports (Replace 10.222.1.0/24 with your subnet)

```bash
echo '/srv/nfs/share 10.222.1.0/24(rw,sync,no_subtree_check)' | sudo tee -a /etc/exports
sudo exportfs -a
```

### Enable NFS Service

```bash
sudo systemctl enable nfs-kernel-server
sudo systemctl start nfs-kernel-server
```

### Adjust ufw rules (Replace 10.222.1.0/24 with your subnet)

```bash
sudo ufw allow from 10.222.1.0/24 to any port nfs
sudo ufw enable
sudo ufw status
```

## Install NFS Client

### Install the NFS-Common Package

```bash
sudo apt update
sudo apt install nfs-common
```

### Create Mount Point

```bash
sudo mkdir -p /srv/nfs/clientshare
```

### Mount NFS Share

```bash
sudo mount 10.222.1.171:/srv/nfs/share /srv/nfs/clientshare
```

### Verify Mount

Create a file in the server directory.

```bash
cd /srv/nfs/share
touch file1.txt file2.txt file3.txt
```

Check the file in the client directory.

```bash
ls -l /srv/nfs/clientshare
```
