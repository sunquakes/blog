# Fixed ingress nginx 404 error

## First create deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  creationTimestamp: null
  labels:
    app: nginx-deploy
  name: nginx-deploy
spec:
  replicas: 2
  selector:
    matchLabels:
      app: nginx-deploy
  strategy: {}
  template:
    metadata:
      creationTimestamp: null
      labels:
        app: nginx-deploy
    spec:
      containers:
        - image: nginx
          name: nginx
          imagePullPolicy: IfNotPresent
          resources: {}
status: {}
```

## Expose deployment

```yaml
apiVersion: v1
kind: Service
metadata:
  creationTimestamp: null
  labels:
    app: nginx-deploy
  name: nginx-svc
spec:
  ports:
    - port: 80
      protocol: TCP
      targetPort: 80
  selector:
    app: nginx-deploy
  type: NodePort
status:
  loadBalancer: {}
```

## Create ingress

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  creationTimestamp: null
  name: nginx-ing
spec:
  ingressClassName: nginx
  rules:
    - host: venusquakes.com
      http:
        paths:
          - backend:
              service:
                name: nginx-svc
                port:
                  number: 80
            path: /nginx
            pathType: Prefix
status:
  loadBalancer: {}
```

## Problem

The venusquakes.com domain is already configured to point to the Kubernetes cluster. When I request the URL `http://venusquakes.com/nginx`, I get a 404 error from nginx.

## Solution

Add the following annotation to the ingress resource:

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  creationTimestamp: null
  name: nginx-ing
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  ingressClassName: nginx
  rules:
    - host: venusquakes.com
      http:
        paths:
          - backend:
              service:
                name: nginx-svc
                port:
                  number: 80
            path: /nginx
            pathType: Prefix
status:
  loadBalancer: {}
```

nginx.ingress.kubernetes.io/rewrite-target: Target URI where the traffic must be redirected

More info: https://kubernetes.github.io/ingress-nginx/examples/rewrite/
