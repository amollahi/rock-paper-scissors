package es.amolla.game.services

import es.amolla.game.dto.Action
import es.amolla.game.dto.PlayResultType
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test


class PlayServiceTest {
    private val playService = PlayService(UtilsService())

    @Test
    fun checkPlayerPlaysRockVsComputer() {
        Assertions.assertEquals(PlayResultType.DRAW, playService.getPlayerVsComputerResult(Action.ROCK, Action.ROCK).result)
        Assertions.assertEquals(PlayResultType.LOSE, playService.getPlayerVsComputerResult(Action.ROCK, Action.PAPER).result)
        Assertions.assertEquals(PlayResultType.WIN, playService.getPlayerVsComputerResult(Action.ROCK, Action.SCISSORS).result)
    }

    @Test
    fun checkPlayerPlaysPaperVsComputer() {
        Assertions.assertEquals(PlayResultType.WIN, playService.getPlayerVsComputerResult(Action.PAPER, Action.ROCK).result)
        Assertions.assertEquals(PlayResultType.DRAW, playService.getPlayerVsComputerResult(Action.PAPER, Action.PAPER).result)
        Assertions.assertEquals(PlayResultType.LOSE, playService.getPlayerVsComputerResult(Action.PAPER, Action.SCISSORS).result)
    }

    @Test
    fun checkPlayerPlaysScissorsVsComputer() {
        Assertions.assertEquals(PlayResultType.LOSE, playService.getPlayerVsComputerResult(Action.SCISSORS, Action.ROCK).result)
        Assertions.assertEquals(PlayResultType.WIN, playService.getPlayerVsComputerResult(Action.SCISSORS, Action.PAPER).result)
        Assertions.assertEquals(PlayResultType.DRAW, playService.getPlayerVsComputerResult(Action.SCISSORS, Action.SCISSORS).result)
    }

}
