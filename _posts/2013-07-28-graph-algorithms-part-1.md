---
layout: post
title: "Graph Algorithms Part 1"
slug: graph-algorithms-part-1
date: 2013-07-28
categories: blog
tags: algorithms
---

This post is the first in a series covering a simple, code-first explanation of graph algorithms that I wish were available when I was taking MIT's introductory algorithms class, 6.006. The class is taught from more of a mathematical and theoretical perspective than I was comfortable with, and I would have benefited from actually seeing the code first, rather than a bunch of symbols, because I realized later that the algorithms are actually much easier to understand than the math made it seem. I'll be using python because it makes everything easy to understand.

#### What is a graph?

First, what is a graph? A series of points, called nodes, connected by lines, called edges. The edges may or may not have weights, which are values associated with the edge. I'll use as an example a graph which represents train routes between cities.

![graph of train routes]({{ site.url }}/static/assets/graph-algorithms/graph.png)

The nodes in this graph are the cities, the edges are the train routes, and the edge weights are the distances (in miles) of those routes.

#### Graph Representation

The easiest way to represent a graph in python is with a dictionary. The keys are node names, and the values are a dictionary of edges, where the keys are the destination nodes and the values are the edge weights. Here is the graph from above in python:

{% highlight python %}
graph = {
    "boston": { "nyc": 214, },
    "nyc": { "boston": 214, "sf": 2905, "miami": 1276 },
    "sf": { "boston": 3097, "la": 381 },
    "miami": {}
    "la": {}
}
{% endhighlight %}

Here are a few ways you can query this graph.

`graph["boston"]["nyc"]` will get the distance by train from Boston to New York.

`"boston" in graph` will check if there is a city named `"boston"` in the graph.

`"sf" in graph["boston"]` will check if there is a train directly between Boston and San Francisco. In this graph, it will return `False`.

#### Graph Search

The most basic graph algorithms are Breadth-First and Depth-First Search (BFS and DFS), two ways to explore a graph from a given node. The procedure for both is simple:

1. Keep a list of nodes to explore, initially just the starting node
2. While the list is not empty, remove and process the next node in the list
3. Add the node's neighbors to the list, and continue

Breadth-First and Depth-First search differ only in the rule they employ to choose which node in the list to process next. Depth-First keeps its list of nodes in a queue.


