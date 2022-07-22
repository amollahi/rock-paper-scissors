package es.amolla.game.config

import io.micrometer.core.aop.TimedAspect
import io.micrometer.core.instrument.MeterRegistry
import io.micrometer.core.instrument.Tag
import io.micrometer.core.instrument.Tags
import org.aspectj.lang.ProceedingJoinPoint
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import java.util.function.Function

@Configuration
class TimedConfiguration {
    var tagsBasedOnJoinPoint: Function<ProceedingJoinPoint, Iterable<Tag>>? = null

    @Bean
    fun timedAspect(registry: MeterRegistry): TimedAspect {
        registry.config().commonTags("app", "RockPaperScissorsRestAPI")
        tagsBasedOnJoinPoint = Function { pjp: ProceedingJoinPoint ->
            Tags.of(
                "class", pjp.staticPart.signature.declaringTypeName,
                "method", pjp.staticPart.signature.name
            )
        }
        return TimedAspect(registry!!, tagsBasedOnJoinPoint!!)
    }

}
