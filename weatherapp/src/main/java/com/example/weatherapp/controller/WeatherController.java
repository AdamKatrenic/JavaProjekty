package com.example.weatherapp.controller;

import com.example.weatherapp.service.WeatherService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Controller
public class WeatherController {

    private final WeatherService weatherService;
    private final List<Map<String, Object>> citiesWeather = new ArrayList<>();

    public WeatherController(WeatherService weatherService) {
        this.weatherService = weatherService;
    }

    @GetMapping("/")
    public String index(Model model) {
        model.addAttribute("citiesWeather", citiesWeather);
        return "index";
    }

    @PostMapping("/weather")
    public String addCity(@RequestParam("city") String city, Model model) {
        Map<String, Object> weatherData = weatherService.getWeather(city);
        if (weatherData != null && weatherData.get("main") != null) {
            citiesWeather.add(weatherData);
        }
        model.addAttribute("citiesWeather", citiesWeather);
        return "index";
    }
}
