# Fixed worker node pods continuously restarting

## Symptoms

The pods (kube-proxy, kube-flannel etc.) on the worker nodes are continuously restarting.

## Troubleshooting

### Getting the kubelet logs

Run the following command to get the kubelet logs.

```shell
journalctl -u kubelet -n 50
```

Get the kubelet logs like below.

```text
Jul 19 20:54:58 ubuntu-2 kubelet[914]: I0719 20:54:58.445104     914 scope.go:117] "RemoveContainer" containerID="c980604863760f6c8aa7a170ac8048a8697406227fc45de6665c82f15a59ed6b"
Jul 19 20:54:58 ubuntu-2 kubelet[914]: E0719 20:54:58.447705     914 pod_workers.go:1298] "Error syncing pod, skipping" err="failed to \"StartContainer\" for \"nfs-client-provisioner\" with CrashLoopBackOff: \"back-off 5m0s restarting failed container=nfs-client-provisioner pod=nfs-client-provisioner-56f77ff677-wkfmq_default(80ce594f-dfaa-40fd-ae06-032ec1187193)\"" pod="default/nfs-client-provisioner-56f77ff677-wkfmq" podUID="80ce594f-dfaa-40fd-ae06-032ec1187193"
Jul 19 20:55:00 ubuntu-2 kubelet[914]: I0719 20:55:00.469490     914 scope.go:117] "RemoveContainer" containerID="3ac56c206e3c50f52e23fdc9be8b48ff73a571892b67d671be60ea30dda48779"
Jul 19 20:55:00 ubuntu-2 kubelet[914]: E0719 20:55:00.470155     914 pod_workers.go:1298] "Error syncing pod, skipping" err="failed to \"StartContainer\" for \"kube-flannel\" with CrashLoopBackOff: \"back-off 5m0s restarting failed container=kube-flannel pod=kube-flannel-ds-clzm5_kube-flannel(cc7493a8-5af2-41b1-91bd-4eba1a673c73)\"" pod="kube-flannel/kube-flannel-ds-clzm5" podUID="cc7493a8-5af2-41b1-91bd-4eba1a673c73"
Jul 19 20:55:02 ubuntu-2 kubelet[914]: I0719 20:55:02.469881     914 scope.go:117] "RemoveContainer" containerID="02aa454caa1b18ab4d677476847c7d4dad11763848ac9790ae54ce6735610314"
Jul 19 20:55:02 ubuntu-2 kubelet[914]: E0719 20:55:02.473190     914 pod_workers.go:1298] "Error syncing pod, skipping" err="failed to \"StartContainer\" for \"kube-proxy\" with CrashLoopBackOff: \"back-off 5m0s restarting failed container=kube-proxy pod=kube-proxy-pmxs7_kube-system(790ba9bd-b211-4463-a6cf-07600d898af5)\"" pod="kube-system/kube-proxy-pmxs7" podUID="790ba9bd-b211-4463-a6cf-07600d898af5"
Jul 19 20:55:10 ubuntu-2 kubelet[914]: I0719 20:55:10.446340     914 scope.go:117] "RemoveContainer" containerID="c980604863760f6c8aa7a170ac8048a8697406227fc45de6665c82f15a59ed6b"
Jul 19 20:55:10 ubuntu-2 kubelet[914]: E0719 20:55:10.448695     914 pod_workers.go:1298] "Error syncing pod, skipping" err="failed to \"StartContainer\" for \"nfs-client-provisioner\" with CrashLoopBackOff: \"back-off 5m0s restarting failed container=nfs-client-provisioner pod=nfs-client-provisioner-56f77ff677-wkfmq_default(80ce594f-dfaa-40fd-ae06-032ec1187193)\"" pod="default/nfs-client-provisioner-56f77ff677-wkfmq" podUID="80ce594f-dfaa-40fd-ae06-032ec1187193"
Jul 19 20:55:12 ubuntu-2 kubelet[914]: I0719 20:55:12.469335     914 scope.go:117] "RemoveContainer" containerID="3ac56c206e3c50f52e23fdc9be8b48ff73a571892b67d671be60ea30dda48779"
Jul 19 20:55:12 ubuntu-2 kubelet[914]: E0719 20:55:12.470784     914 pod_workers.go:1298] "Error syncing pod, skipping" err="failed to \"StartContainer\" for \"kube-flannel\" with CrashLoopBackOff: \"back-off 5m0s restarting failed container=kube-flannel pod=kube-flannel-ds-clzm5_kube-flannel(cc7493a8-5af2-41b1-91bd-4eba1a673c73)\"" pod="kube-flannel/kube-flannel-ds-clzm5" podUID="cc7493a8-5af2-41b1-91bd-4eba1a673c73"
Jul 19 20:55:16 ubuntu-2 kubelet[914]: I0719 20:55:16.471671     914 scope.go:117] "RemoveContainer" containerID="02aa454caa1b18ab4d677476847c7d4dad11763848ac9790ae54ce6735610314"
Jul 19 20:55:16 ubuntu-2 kubelet[914]: E0719 20:55:16.473426     914 pod_workers.go:1298] "Error syncing pod, skipping" err="failed to \"StartContainer\" for \"kube-proxy\" with CrashLoopBackOff: \"back-off 5m0s restarting failed container=kube-proxy pod=kube-proxy-pmxs7_kube-system(790ba9bd-b211-4463-a6cf-07600d898af5)\"" pod="kube-system/kube-proxy-pmxs7" podUID="790ba9bd-b211-4463-a6cf-07600d898af5"
```

### Geting the flannel logs and details

Run the following command to get the flannel logs and details.

```shell
kubectl -n kube-flannel logs kube-flannel-ds-clzm5
kubectl -n kube-flannel describe pod kube-flannel-ds-clzm5
```

Getting the flannel logs and details like below and no obvious error.

```text
I0719 14:29:39.299159       1 iptables.go:51] Starting flannel in iptables mode...
W0719 14:29:39.299716       1 main.go:540] no subnet found for key: FLANNEL_IPV6_NETWORK in file: /run/flannel/subnet.env
W0719 14:29:39.299944       1 main.go:540] no subnet found for key: FLANNEL_IPV6_SUBNET in file: /run/flannel/subnet.env
I0719 14:29:39.299999       1 iptables.go:125] Setting up masking rules
I0719 14:29:39.316656       1 iptables.go:226] Changing default FORWARD chain policy to ACCEPT
I0719 14:29:39.320241       1 main.go:396] Wrote subnet file to /run/flannel/subnet.env
I0719 14:29:39.320315       1 main.go:400] Running backend.
I0719 14:29:39.321136       1 vxlan_network.go:65] watching for new subnet leases
I0719 14:29:39.321169       1 subnet.go:152] Batch elem [0] is { lease.Event{Type:0, Lease:lease.Lease{EnableIPv4:true, EnableIPv6:false, Subnet:ip.IP4Net{IP:0xaf40000, PrefixLen:0x18}, IPv6Subnet:ip.IP6Net{IP:(*ip.IP6)(nil), PrefixLen:0x0}, Attrs:lease.LeaseAttrs{PublicIP:0xade0125, PublicIPv6:(*ip.IP6)(nil), BackendType:"vxlan", BackendData:json.RawMessage{0x7b, 0x22, 0x56, 0x4e, 0x49, 0x22, 0x3a, 0x31, 0x2c, 0x22, 0x56, 0x74, 0x65, 0x70, 0x4d, 0x41, 0x43, 0x22, 0x3a, 0x22, 0x32, 0x61, 0x3a, 0x30, 0x37, 0x3a, 0x30, 0x39, 0x3a, 0x38, 0x30, 0x3a, 0x38, 0x61, 0x3a, 0x62, 0x36, 0x22, 0x7d}, BackendV6Data:json.RawMessage(nil)}, Expiration:time.Date(1, time.January, 1, 0, 0, 0, 0, time.UTC), Asof:0}} }
I0719 14:29:39.321359       1 vxlan_network.go:100] Received Subnet Event with VxLan: BackendType: vxlan, PublicIP: 10.222.1.37, PublicIPv6: (nil), BackendData: {"VNI":1,"VtepMAC":"2a:07:09:80:8a:b6"}, BackendV6Data: (nil)
I0719 14:29:39.342062       1 iptables.go:372] bootstrap done
I0719 14:29:39.342769       1 main.go:421] Waiting for all goroutines to exit
I0719 14:29:39.348649       1 iptables.go:372] bootstrap done
```

```text
  Normal  Scheduled       7m28s                  default-scheduler  Successfully assigned kube-flannel/kube-flannel-ds-clzm5 to ubuntu-2
  Normal  Pulled          5m54s (x2 over 7m28s)  kubelet            Container image "docker.io/flannel/flannel:v0.25.4" already present on machine
  Normal  Created         5m54s (x2 over 7m28s)  kubelet            Created container install-cni
  Normal  Started         5m54s (x2 over 7m28s)  kubelet            Started container install-cni
  Normal  Pulled          5m53s (x2 over 7m27s)  kubelet            Container image "docker.io/flannel/flannel:v0.25.4" already present on machine
  Normal  Created         5m53s (x2 over 7m27s)  kubelet            Created container kube-flannel
  Normal  Started         5m53s (x2 over 7m27s)  kubelet            Started container kube-flannel
  Normal  Pulled          4m36s (x3 over 7m28s)  kubelet            Container image "docker.io/flannel/flannel-cni-plugin:v1.4.1-flannel1" already present on machine
  Normal  Created         4m36s (x3 over 7m28s)  kubelet            Created container install-cni-plugin
  Normal  Started         4m36s (x3 over 7m28s)  kubelet            Started container install-cni-plugin
  Normal  SandboxChanged  4m36s (x2 over 5m55s)  kubelet            Pod sandbox changed, it will be killed and re-created.
  Normal  Killing         83s (x4 over 5m57s)    kubelet            Stopping container kube-flannel
```

### Getting the kube-proxy logs and details

Run the following command one by one.

```shell
kubectl -n kube-system logs kube-proxy-pmxs7
kubectl -n kube-system describe pod kube-proxy-pmxs7
```

Getting the following details.

```text
I0719 14:55:06.895690       1 server.go:1062] "Successfully retrieved node IP(s)" IPs=["10.222.1.171"]
I0719 14:55:06.908056       1 conntrack.go:119] "Set sysctl" entry="net/netfilter/nf_conntrack_max" value=131072
I0719 14:55:06.908155       1 conntrack.go:59] "Setting nf_conntrack_max" nfConntrackMax=131072
I0719 14:55:06.908378       1 conntrack.go:119] "Set sysctl" entry="net/netfilter/nf_conntrack_tcp_timeout_established" value=86400
I0719 14:55:06.908490       1 conntrack.go:119] "Set sysctl" entry="net/netfilter/nf_conntrack_tcp_timeout_close_wait" value=3600
I0719 14:55:07.033936       1 server.go:659] "kube-proxy running in dual-stack mode" primary ipFamily="IPv4"
I0719 14:55:07.072362       1 server_linux.go:233] "Using ipvs Proxier"
I0719 14:55:07.075398       1 server_linux.go:511] "Detect-local-mode set to ClusterCIDR, but no cluster CIDR for family" ipFamily="IPv6"
I0719 14:55:07.075432       1 server_linux.go:528] "Defaulting to no-op detect-local"
I0719 14:55:07.076058       1 proxier.go:358] "IPVS scheduler not specified, use rr by default"
I0719 14:55:07.076526       1 proxier.go:358] "IPVS scheduler not specified, use rr by default"
I0719 14:55:07.076558       1 ipset.go:119] "Ipset name truncated" ipSetName="KUBE-6-LOAD-BALANCER-SOURCE-CIDR" truncatedName="KUBE-6-LOAD-BALANCER-SOURCE-CID"
I0719 14:55:07.076569       1 ipset.go:119] "Ipset name truncated" ipSetName="KUBE-6-NODE-PORT-LOCAL-SCTP-HASH" truncatedName="KUBE-6-NODE-PORT-LOCAL-SCTP-HAS"
I0719 14:55:07.077296       1 server.go:872] "Version info" version="v1.30.2"
I0719 14:55:07.077317       1 server.go:874] "Golang settings" GOGC="" GOMAXPROCS="" GOTRACEBACK=""
I0719 14:55:07.078893       1 config.go:192] "Starting service config controller"
I0719 14:55:07.078912       1 shared_informer.go:313] Waiting for caches to sync for service config
I0719 14:55:07.079243       1 config.go:101] "Starting endpoint slice config controller"
I0719 14:55:07.079352       1 config.go:319] "Starting node config controller"
I0719 14:55:07.079365       1 shared_informer.go:313] Waiting for caches to sync for node config
I0719 14:55:07.079656       1 shared_informer.go:313] Waiting for caches to sync for endpoint slice config
I0719 14:55:07.179641       1 shared_informer.go:320] Caches are synced for node config
I0719 14:55:07.179670       1 shared_informer.go:320] Caches are synced for service config
I0719 14:55:07.179677       1 shared_informer.go:320] Caches are synced for endpoint slice config
```

```text
  Normal   Scheduled       32m                   default-scheduler  Successfully assigned kube-system/kube-proxy-pmxs7 to ubuntu-2
  Normal   Pulled          32m                   kubelet            Container image "registry.k8s.io/kube-proxy:v1.30.2" already present on machine
  Normal   Created         32m                   kubelet            Created container kube-proxy
  Normal   Started         32m                   kubelet            Started container kube-proxy
  Warning  NodeNotReady    5m57s                 node-controller    Node is not ready
  Normal   Pulled          103s (x3 over 4m29s)  kubelet            Container image "registry.k8s.io/kube-proxy:v1.30.2" already present on machine
  Normal   Created         103s (x3 over 4m29s)  kubelet            Created container kube-proxy
  Normal   Started         103s (x3 over 4m29s)  kubelet            Started container kube-proxy
  Normal   Killing         29s (x3 over 3m24s)   kubelet            Stopping container kube-proxy
  Normal   SandboxChanged  28s (x4 over 4m30s)   kubelet            Pod sandbox changed, it will be killed and re-created.
  Warning  BackOff         1s (x9 over 3m23s)    kubelet            Back-off restarting failed container kube-proxy in pod kube-proxy-pmxs7_kube-system(fe9c886e-1f73-4f68-8a34-35eb5f3fdb04)

```

## Finding the root cause

I can not get the cause from the logs, so I try to find the root cause step by step. First, I try to check the configuration, kubelet, subnet.env etc.

When I check the containerd config.toml, I found my worker node cgroup is not set to systemd.

```toml
...
   [plugins."io.containerd.grpc.v1.cri".containerd.runtimes.runc.options]
            BinaryName = ""
            CriuImagePath = ""
            CriuPath = ""
            CriuWorkPath = ""
            IoGid = 0
            IoUid = 0
            NoNewKeyring = false
            NoPivotRoot = false
            Root = ""
            ShimCgroup = ""
            SystemdCgroup = false
...
```

Change the `SystemdCgroup` to `true` and restart the containerd service.

```shell
sudo systemctl restart containerd
```

All the pods are running now.
