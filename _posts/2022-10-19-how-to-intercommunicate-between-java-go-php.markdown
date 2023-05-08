---
layout: post
title:  "How to intercommunicate between java/go/php"
date:   2022-10-19 19:20:20 +0800
author: Shing 
categories: rpc
permalink: /posts/29b4a523/
---

I have ever use an php framework named hyperf, php micro service framework implement jsonrpc 2.0, and feel it so cool.
<!--more-->
So I develop a java and a go component to communicate with it.

Each language has its own advantage. Java, my first language, has abundant library in maven central repository, which can save more time to concentrate to business logic. Otherwise, in big data area, there are many framework coded by java, such as spark and flink. PHP has flexible syntax, which can help us develop an web application quickly. Go is newer than other two language, support coroutine natively and make full use of cpu resource, its own net component can help us run a server easily.

For different businesses, perhaps only different language can perfectly meet the demands.

[Moonquakes](https://github.com/sunquakes/moonquakes) is a demo project. It show how to intercommunicate in springboot and go and hyperf.

In moonquakes, springboot use [jsonrpc4j](https://github.com/sunquakes/jsonrpc4j) to communicate with go and [Hyperf](https://github.com/hyperf/hyperf); [Hyperf](https://github.com/hyperf/hyperf) has own [jsonrpc component](https://www.hyperf.wiki/3.0/#/en/json-rpc) to communicate with go and springboot; The go framework use [jsonrpc4go](https://github.com/sunquakes/jsonrpc4go) to communicate with springboot and [Hyperf](https://github.com/hyperf/hyperf).

It can run by docker easily.

```shell
# Pull demo docker images from dockerhub.
docker pull sunquakes/moonquakes:latest
# Run docker container.
docker run -itd --name moonquakes sunquakes/moonquakes:latest /bin/bash
# View container logs after the container started.
docker logs moonquakes -f
```