---
layout: post
title: "Automatically Clean Code"
slug: automatically-clean-code
date: 2013-07-28
categories: blog
tags:
---

Too often I've found myself going line by line through a source file removing trailing whitespace and converting tabs to spaces, so I put together a simple bash script to do it for me, and made it chainable so I can use a command like this to clean all python files in a folder:

{% highlight bash %}
find . -name "*.py" | src-clean
{% endhighlight %}

Here is the script:

{% gist 6098903 %}
