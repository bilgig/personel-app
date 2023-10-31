package com.example.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/hello")
public class HelloWorldController {
    @GetMapping("/say")
    public String sayHello(){
        return "hello world";
    }
    @PostMapping("/post")
    public String postHello(){
        return "hello wold! post";
    }
}
