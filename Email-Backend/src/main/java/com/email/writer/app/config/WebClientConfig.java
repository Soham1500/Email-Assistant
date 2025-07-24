package com.email.writer.app.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {  // ✅ match file name
    @Bean
    public WebClient.Builder webClientBuilder() {
        return WebClient.builder();
    }
}
