package es.amolla.game.services

import es.amolla.game.logging.LogMethod
import io.micrometer.core.annotation.Timed
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service
import java.time.Instant
import kotlin.random.Random


@Service
class UtilsService {
    private val log = LoggerFactory.getLogger(this.javaClass)

    @LogMethod
    @Timed(value = "waitRandomTime.time", percentiles = [0.5, 0.9])
    fun waitRandomTime() {
        val until = Instant.now().plusMillis((Random.nextInt(1, 10)) * 17L)
        var iterations = 0
        while (Instant.now().isBefore(until)) {
            iterations++
            log.trace("WaitRandomTime Iteration {}", iterations)
            Thread.sleep(Random.nextInt(1, 3).toLong())
        }
        log.info("Finish waitRandomTime");
    }
}
