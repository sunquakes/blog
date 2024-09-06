# Get resources file after package jar

## Problem

There is a file resources/staic/index.html, It is normal in the ide environment to use the resources file. But when the jar package is deployed to the server, the resources file cannot be found.

Reported error: `java.io.FileNotFoundException: class path resource [static/index.html] cannot be opened because it does not exist`

## Add plugin to pom.xml

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-resources-plugin</artifactId>
    <configuration>
        <nonFilteredFileExtensions>
            <nonFilteredFileExtension>html</nonFilteredFileExtension>
        </nonFilteredFileExtensions>
    </configuration>
</plugin>
```

## Get the resources file inputStream

```java
String rsourcePath = "static/index.html";
InputStream is = this.getClass().getClassLoader().getResourceAsStream(rsourcePath);
```
