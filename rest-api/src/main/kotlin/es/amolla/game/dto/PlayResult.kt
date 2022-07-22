package es.amolla.game.dto

import java.util.*

data class PlayResult(
    val result: PlayResultType,
    val computerAction: Action
) {
    val id: UUID = UUID.randomUUID()
}


