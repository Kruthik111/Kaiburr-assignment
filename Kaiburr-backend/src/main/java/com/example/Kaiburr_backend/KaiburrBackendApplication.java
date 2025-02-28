package com.example.Kaiburr_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class KaiburrBackendApplication {

	public static void main(String[] args) {

		SpringApplication.run(KaiburrBackendApplication.class, args);
	}


//	@Bean
//	public WebMvcConfigurer configure(){
//		return new WebMvcConfigurer() {
//			@Override
//			public void addCorsMapppings(CorsRegistry reg){
//				reg.addMapping(("/*").allowedOrigins("*"));
//			}
//		};
//	}
}
