package com.example.weatherapp.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Map;

@Service
public class WeatherService {

    private final String API_KEY = "9bb5642030d35a8a7f2a4ceba5c3054c";
    private final String BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

    private final RestTemplate restTemplate = new RestTemplate();

    public Map<String, Object> getWeather(String city) {
        try {
            String url = UriComponentsBuilder.fromHttpUrl(BASE_URL)
                    .queryParam("q", city)
                    .queryParam("appid", API_KEY)
                    .queryParam("units", "metric")
                    .toUriString();

            Map<String, Object> response = restTemplate.getForObject(url, Map.class);
            return response;
        } catch (Exception e) {
            System.out.println("Chyba pri volaní API: " + e.getMessage());
            return null; // vrátime null, aby kontrolér vedel, že niečo nevyšlo
        }
    }
}
