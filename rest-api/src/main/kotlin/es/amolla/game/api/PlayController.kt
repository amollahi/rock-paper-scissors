package es.amolla.game.api


import es.amolla.game.dto.PlayCommand
import es.amolla.game.dto.PlayResult
import es.amolla.game.services.PlayService
import io.micrometer.core.annotation.Timed
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController


@RestController
@RequestMapping("/api/play")
class PlayController @Autowired constructor(private val playService: PlayService) {

    private val log = LoggerFactory.getLogger(this.javaClass)


    @PostMapping
    @Timed(value = "playGameAction.time", percentiles = [0.5, 0.90])
    fun playGameAction(@RequestBody play: PlayCommand): PlayResult {
        return playService.getPlayResult(play)
    }


}
