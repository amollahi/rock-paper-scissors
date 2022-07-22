package es.amolla.game.logging

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.EnableAspectJAutoProxy

@Configuration
@EnableAspectJAutoProxy
class LoggingAspectConfiguration {
    @Bean
    fun loggingAspect(): LoggingAspect {
        return LoggingAspect()
    }
}
