package com.example.adamdev.zoznamzamestnancov;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class ZoznamzamestnancovApplication {

	public static void main(String[] args) {
        SpringApplication.run(ZoznamzamestnancovApplication.class, args);
	}

    @GetMapping
    public String helloWorld() {
        return "Hello World!";
    }

}
