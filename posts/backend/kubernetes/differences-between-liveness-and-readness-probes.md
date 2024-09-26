# Differences between Liveness and Readness Probes

## Liveness Probe

`Liveness Probe` is used to check if the container is still alive. If the container is not alive, Kubernetes will restart it.

```yaml
livenessProbe:
  httpGet:
    path: /healthz
    port: 8080
  initialDelaySeconds: 5
  periodSeconds: 10
```

## Readness Probe

`Readness Probe` is used to check if the container is ready to serve requests. If the container is not ready, Kubernetes will not send requests to it.

```yaml
readinessProbe:
  httpGet:
    path: /readyz
    port: 8080
  initialDelaySeconds: 10
  periodSeconds: 5
```

## Key Differences Between Liveness and Readiness Probes

| Feature                 | Liveness Probe                                                       | Readiness Probe                                                            |
| ----------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Purpose                 | Check if the application is "alive" or stuck.                        | Check if the application is "ready" to serve traffic.                      |
| Action on Failure       | Kubernetes will restart the container if the probe fails repeatedly. | Kubernetes stops routing traffic to the container but doesn't restart it.  |
| Use Case                | Detect unresponsive applications (e.g., deadlocks, crashes).         | Ensure only healthy and ready containers handle traffic.                   |
| Restart Behavior        | Yes, the container is restarted.                                     | No, the container is not restarted, just temporarily removed from service. |
| Examples                | Application stuck in a deadlock, memory leaks, crashes.              | Application loading config files, warming up caches.                       |
| Impact on Pod's Traffic | No impact unless the container restarts.                             | Traffic will stop being routed to the pod if readiness fails.              |
