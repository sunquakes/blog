---
layout: post
title:  "Network bandwidth reduces redis speed"
description: ""
date:   2023-05-08 21:28:25 +0800
categories: default
permalink: /posts/ac79a746/
author: Shing 
tags: redis
---

Today when I pushed message to the redis list at a frequency of 400hz in Project A, and poped up message in Project B, the printing on the terminal in Project B was too slow. 
<!--more-->

Why?

Firstly, I checked the speed of consumer, it is normal, the redis list is always empty or less than 3 item.

Next I notice the producer's frequency was far less than 400hz, then I delete code step by step, when I delete the code for push message to the redis list, the frequency become normal.

### Test in the producter's node
- Run the following command in the producter's node termial.
```sh
redis-benchmark -t set -n 100000 -q -a "xxx" -h xxx.xxx.xxx.xxx -p xxxx 
```
-  Response from the redis server.
```sh
SET: 1386.19 requests per second
SET: 6042.30 requests per second
SET: 3402.52 requests per second
SET: 1163.06 requests per second
SET: 2050.44 requests per second
```

### Test in the redis container
- Run the following command in the redis container's termial.
```sh
redis-benchmark -t set -n 100000 -q -a "xxx" -p xxxx 
```
-  Response from the redis server.
```sh
SET: 161290.33 requests per second, p50=0.255 msec
```

It is obveriously, the network bandwide slows down the speed of push message to the redis server.
