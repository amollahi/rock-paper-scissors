package es.amolla.game.services

import es.amolla.game.dto.Action
import es.amolla.game.dto.PlayCommand
import es.amolla.game.dto.PlayResult
import es.amolla.game.dto.PlayResultType
import es.amolla.game.logging.LogMethod
import io.micrometer.core.annotation.Timed
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service
import java.time.Instant
import kotlin.random.Random


@Service
class PlayService(val utilsService: UtilsService) {
    private val log = LoggerFactory.getLogger(this.javaClass)


    @Timed(value = "getPlayResult.time", percentiles = [0.5, 0.9])
    @LogMethod(logResult = true, logParameters = true)
    fun getPlayResult(playCommand: PlayCommand): PlayResult {
        this.utilsService.waitRandomTime()
        return this.getPlayerVsComputerResult(playCommand.action, randomComputerAction())
    }

    private fun randomComputerAction(): Action {
        return Action.values().get(Random(Instant.now().toEpochMilli()).nextInt(Action.values().size))
    }


    fun getPlayerVsComputerResult(playerAction: Action, computerAction: Action): PlayResult {
        if (playerAction == computerAction) {
            return PlayResult(PlayResultType.DRAW, computerAction)
        }

        if (Action.ROCK == playerAction && Action.SCISSORS == computerAction ||
            Action.PAPER == playerAction && Action.ROCK == computerAction ||
            Action.SCISSORS == playerAction && Action.PAPER == computerAction
        ) {
            return PlayResult(PlayResultType.WIN, computerAction)
        }

        return PlayResult(PlayResultType.LOSE, computerAction)
    }


}
