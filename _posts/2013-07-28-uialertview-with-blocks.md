---
layout: post
title: "UIAlertView with Blocks"
slug: uialertview-with-blocks
date: 2013-07-28
category: blog
tags:
---

UIAlertView predates the introduction of Objective-C blocks so it implements callbacks using delegation. This works reasonably well for a single alert view in a view controller, but what happens when you have multiple? How do you distinguish between the different alert views? The common solution is to use tags, and the have a conditional in the delegate method.

<!-- more -->

```objc
UIAlertView *continueAlertView = [[UIAlerView alloc] initWithTitle:@"Continue?"
                                                          message:nil
                                                         delegate:self
                                                cancelButtonTitle:@"Cancel"
                                                otherButtonTitles:@"OK", nil];
continueAlertView.tag = 0;
[continueAlertView show];

UIAlertView *errorAlertView = [[UIAlerView alloc] initWithTitle:@"Error"
                                                        message:nil
                                                       delegate:self
                                              cancelButtonTitle:nil
                                              otherButtonTitles:@"OK", nil];
errorAlertView.tag = 1;
[errorAlertView show];
```

```objc
- (void)alertView:(UIAlertView *)alertView clickedButtonAtIndex:(NSInteger)buttonIndex
{
    // handle continue alert view
    if (alertView.tag == 0) {
        if (buttonIndex == 0)
            doSomething();
        else if (buttonIndex == 1)
            doSomethingElse();
    // handle error alert view
    } else if (alertView.tag == 0) {
        doSomething();
    }
}
```

Clearly this doesn't scale nicely, and code gets muddled together. It is also a headache to make variables defined where the alert is created accessible to the delegate call. To fix this, I created a simple category of UIAlertView that uses an internal wrapper class to mask the delegate and use a callback block. Here's what the same code looks like now:

```objc
[UIAlertView showWithTitle:@"Continue?"
                   message:nil
         cancelButtonTitle:@"Cancel"
         otherButtonTitles:@[@"OK"]
                completion:^(UIAlertView *alertView, NSInteger buttonIndex) {

                    if (buttonIndex == 0)
                        doSomething();
                    else if (buttonIndex == 1)
                        doSomethingElse();

                }];
[UIAlertView showWithTitle:@"Error"
                   message:nil
         cancelButtonTitle:nil
         otherButtonTitles:@[@"OK"]
                completion:^(UIAlertView *alertView, NSInteger buttonIndex) {
                    doSomething();
                }];
```

Here is the implementation which you can add to your project:

{% gist 5833223 %}
