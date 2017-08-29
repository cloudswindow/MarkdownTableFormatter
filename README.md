# MarkdownTableFormatter
Format markdown table source include align row

## demo
demo source : ./src/test.md :


### before
```markdown
|管理接口 |              对象名称 |
|:--|:--:|
|ClassLoadingMXBean |    java.lang:type=ClassLoading |
|MemoryMXBean     |java.lang:type=Memory |
|ThreadMXBean           |java.lang:type=Threading |
|RuntimeMXBean        |java.lang:type=Runtime |
|OperatingSystemMXBean  |java.lang:type=OperatingSystem |
|MemoryManagerMXBean   |java.lang:type=MemoryManager|
```

### after:
 
run ./src/MarkdownTableFormatter.js  by node

```markdown
|管理接口                       |对象名称                       |
|:-----------------------------|:-----------------------------|
|ClassLoadingMXBean            |java.lang:type=ClassLoading   |
|MemoryMXBean                  |java.lang:type=Memory         |
|ThreadMXBean                  |java.lang:type=Threading      |
|RuntimeMXBean                 |java.lang:type=Runtime        |
|OperatingSystemMXBean         |java.lang:type=OperatingSystem|
|MemoryManagerMXBean           |java.lang:type=MemoryManager  |
```

