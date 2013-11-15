---
layout: post
title: "STM32 Development on the Mac"
slug: stm32-mac
date: 2013-11-08
category: blog
tags:
---

As part of Input Devices week in MAS.863 How To Make Almost Anything I wanted to work with the STM32 microcontroller, and had a STM32F3 Discovery board provided by the class. I spent almost two days trying to figure out how to compile and run programs on the device using my Mac. Frustrated by other guides to getting STM32 development working I decided to make my own.

<!-- more -->

Install homebrew if you don't have it already:

`ruby -e "$(curl -fsSL https://raw.github.com/mxcl/homebrew/go)"`

I wrote two simple homebrew formulae for the components needed to compile and run code on the STM32.
To access them you have to use `brew tap`:

`brew tap nitsky/stm32`

Now you can run the installers:

`brew install stlink arm-none-eabi-gcc`

This installs a GCC compiler for ARM along with STLink, a great utility which manages a connection with the STLink JTAG programmer. It broadcasts a gdb server on port 4242 that you can use to control the STM32.

Now everything is ready to load and run a program.

In one terminal tab, run `st-util`

In another terminal tab, run `arm-none-eabi-gdb`

In GDB you need to connect to the STLink server:

`(gdb) tar ext :4242`

Now you can load firmware and run it. If you are new to the STM32 I have a simple example project on GitHub.

`(gdb) load blink.elf`

`(gdb) run`

From here you can add breakpoints and stop and start execution.
