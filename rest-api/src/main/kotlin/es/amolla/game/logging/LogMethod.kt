package es.amolla.game.logging

import java.lang.annotation.Retention
import java.lang.annotation.RetentionPolicy

@Retention(RetentionPolicy.RUNTIME)
@Target(AnnotationTarget.FUNCTION, AnnotationTarget.PROPERTY_GETTER, AnnotationTarget.PROPERTY_SETTER)
annotation class LogMethod(val tipyLog: LogMethodType = LogMethodType.ALL, val logResult: Boolean = false, val logParameters: Boolean = false)
