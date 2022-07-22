package es.amolla.game.logging

import org.aspectj.lang.JoinPoint
import org.aspectj.lang.ProceedingJoinPoint
import org.aspectj.lang.annotation.AfterThrowing
import org.aspectj.lang.annotation.Around
import org.aspectj.lang.annotation.Aspect
import org.aspectj.lang.annotation.Pointcut
import org.slf4j.LoggerFactory
import org.springframework.web.context.request.RequestContextHolder
import org.springframework.web.context.request.ServletRequestAttributes
import java.time.Duration
import java.time.Instant
import java.util.*


@Aspect
class LoggingAspect {
    private val log = LoggerFactory.getLogger(LoggingAspect::class.java)


    @Pointcut(
        "within(@org.springframework.stereotype.Repository *)" +
                " || within(@org.springframework.stereotype.Service *)" +
                " || within(@org.springframework.web.bind.annotation.RestController *)"
    )
    fun springBeanPointcut() {
    }

    @get:Pointcut("within(@org.springframework.web.bind.annotation.RestController *)")
    val isRestController: Unit
        get() {}


    @Pointcut("within(es.amolla.game..*)")
    fun applicationPackagePointcut() {
    }


    @AfterThrowing(pointcut = "applicationPackagePointcut() && springBeanPointcut()", throwing = "e")
    fun logAfterThrowing(joinPoint: JoinPoint, e: Throwable) {
        val objects = arrayOf<Any?>(
            joinPoint.signature.declaringTypeName,
            joinPoint.signature.name,  //            Arrays.toString(joinPoint.getArgs()),
            if (e.cause != null) e.cause else "NULL", e.message,
            e
        )
        val STR = """
             Exception  in {}.{}()
             with cause = '{}' and exception = '{}'
             """.trimIndent()
        if (e is RuntimeException) {
            log.warn(STR, *objects)
        } else {
            log.error(STR, *objects)
        }
    }

    @AfterThrowing(value = "@annotation(logMethod)", throwing = "e")
    fun logMethodDetailExcepcion(joinPoint: JoinPoint, logMethod: LogMethod, e: Throwable) {
        if (Arrays.asList(
                LogMethodType.ALL,
                LogMethodType.ONLY_EXCEPTIONS
            ).contains(logMethod.tipyLog)
        ) {
            val objects = arrayOf<Any?>(
                joinPoint.signature.declaringTypeName,
                joinPoint.signature.name,
                if (logMethod.logParameters) Arrays.toString(joinPoint.args) else "$\$NO_LOG$$",
                if (e.cause != null) e.cause else "NULL", e.message,
                e
            )
            val STR = "LogMethod$\$Exception  in {}.{}()\nArgs= \'{}\' \nwith cause = \'{}\' and exception = \'{}\'"
            if (e is RuntimeException) {
                log.warn(STR, *objects)
            } else {
                log.error(STR, *objects)
            }
        }
    }

    @Around("@annotation(logMethod)")
    @Throws(Throwable::class)
    fun logMethodDetail(joinPoint: ProceedingJoinPoint, logMethod: LogMethod): Any? {
        val from = Instant.now()
        if (Arrays.asList(
                LogMethodType.ALL,
                LogMethodType.ONLY_REQUESTS
            ).contains(logMethod.tipyLog)
            && log.isInfoEnabled
        ) {
            log.info(
                "LogMethod$\$ENTER of user[{}]: {}.{}() with argument[s] = {}",
                joinPoint.signature.declaringTypeName,
                joinPoint.signature.name,
                if (logMethod.logParameters) Arrays.toString(joinPoint.args) else "$\$NO_LOG$$"
            )
        }
        val result = joinPoint.proceed()
        if (Arrays.asList(
                LogMethodType.ALL,
                LogMethodType.ONLY_REQUESTS
            ).contains(logMethod.tipyLog)
            && log.isInfoEnabled
        ) {
            val to = Instant.now()
            log.info(
                "LogMethod$\$EXIT: {}.{}() [{} ms] with result = {}",
                joinPoint.signature.declaringTypeName,
                joinPoint.signature.name,
                Duration.between(from, to).toMillis(),
                if (logMethod.logResult) result else "$\$NO_LOG$$"
            )
        }
        return result
    }


    @Around("applicationPackagePointcut() && springBeanPointcut()")
    @Throws(Throwable::class)
    fun logAround(joinPoint: ProceedingJoinPoint): Any? {
        if (log.isTraceEnabled) {
            log.trace(
                "Enter of user[{}]: {}.{}() with argument[s] = {}",
                joinPoint.signature.declaringTypeName,
                joinPoint.signature.name,
                Arrays.toString(joinPoint.args)
            )
        }
        return try {
            val result = joinPoint.proceed()
            if (log.isTraceEnabled) {
                log.trace(
                    "Exit of user[{}]: {}.{}() with result = {}",
                    joinPoint.signature.declaringTypeName,
                    joinPoint.signature.name,
                    result
                )
            }
            result
        } catch (e: IllegalArgumentException) {
            log.error(
                "Illegal argument : {}.{}()",  //                Arrays.toString(joinPoint.getArgs()),
                joinPoint.signature.declaringTypeName, joinPoint.signature.name
            )
            throw e
        }
    }

    @Around("isRestController()")
    @Throws(Throwable::class)
    fun logApiCall(joinPoint: ProceedingJoinPoint): Any? {
        val request = (RequestContextHolder.currentRequestAttributes() as ServletRequestAttributes)
            .request
        if (log.isDebugEnabled) {
            log.info(
                "REQUEST : {} {} with argument[s] = {}",
                request.method,
                request.requestURI,
                Arrays.toString(joinPoint.args)
            )
        } else if (log.isInfoEnabled) {
            log.info(
                "REQUEST: {} {}",
                request.method,
                request.requestURI
            )
        }
        val from = Instant.now()
        return try {
            joinPoint.proceed()
        } finally {
            if (log.isInfoEnabled) {
                val to = Instant.now()
                log.info(
                    "END OF REQUEST : {} {} [{} ms]",
                    request.method,
                    request.requestURI,
                    Duration.between(from, to).toMillis()
                )
            }
        }
    }
}
