# Differences between kubectl cordon & drain & taint

## kubectl cordon

`kubectl cordon` is used to mark a node as unschedulable. It won't evict pods from the node. And it won't affect the pods that are already running on the node.

```bash
kubectl cordon node
```

You can use `kubectl uncordon` to mark a node as schedulable again.

```bash
kubectl uncordon node
```

## kubectl drain

`kubectl drain` is used to mark a node as unschedulable and graceful evict all the pods from the node. It will wait for the pods to be evicted before marking the node as unschedulable.

If you want to stop the node and online it again, you can use the following command:

```bash
kubectl cordon node
kubectl drain node --ignore-daemonsets=true
kubectl uncordon node
```

## kubectl taint

`kubectl taint` is used to add or remove taints from a node. It won't evict pods from the node. And it won't affect the pods that are already running on the node.

```bash
kubectl taint node ubuntu-1 key=value:NoSchedule
```
