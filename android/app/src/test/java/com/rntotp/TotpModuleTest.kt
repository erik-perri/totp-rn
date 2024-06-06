package com.rntotp

import android.content.Context
import com.facebook.react.bridge.ReactApplicationContext
import org.junit.Assert.assertEquals
import org.junit.Test
import org.junit.runner.RunWith
import org.mockito.junit.MockitoJUnitRunner
import org.mockito.kotlin.mock

data class TestCase(
    val expected: String,
    val secret: String,
    val algorithm: String,
    val timeStep: Long,
    val codeSize: Int,
    val initialTime: Long,
    val currentTime: Long
)

@RunWith(MockitoJUnitRunner::class)
class TotpModuleTest {
  @Test
  fun testGenerateProducesExpectedResults() {
    val testCases = arrayOf(
        TestCase(
            expected = "94287082",
            secret = "12345678901234567890",
            algorithm = "HmacSHA1",
            timeStep = 30,
            codeSize = 8,
            initialTime = 0,
            currentTime = 59,
        ),
        TestCase(
            expected = "46119246",
            secret = "12345678901234567890123456789012",
            algorithm = "HmacSHA256",
            timeStep = 30,
            codeSize = 8,
            initialTime = 0,
            currentTime = 59,
        ),
        TestCase(
            expected = "90693936",
            secret = "1234567890123456789012345678901234567890123456789012345678901234",
            algorithm = "HmacSHA512",
            timeStep = 30,
            codeSize = 8,
            initialTime = 0,
            currentTime = 59,
        ),

        TestCase(
            expected = "07081804",
            secret = "12345678901234567890",
            algorithm = "HmacSHA1",
            timeStep = 30,
            codeSize = 8,
            initialTime = 0,
            currentTime = 1111111109,
        ),
        TestCase(
            expected = "68084774",
            secret = "12345678901234567890123456789012",
            algorithm = "HmacSHA256",
            timeStep = 30,
            codeSize = 8,
            initialTime = 0,
            currentTime = 1111111109,
        ),
        TestCase(
            expected = "25091201",
            secret = "1234567890123456789012345678901234567890123456789012345678901234",
            algorithm = "HmacSHA512",
            timeStep = 30,
            codeSize = 8,
            initialTime = 0,
            currentTime = 1111111109,
        ),

        TestCase(
            expected = "14050471",
            secret = "12345678901234567890",
            algorithm = "HmacSHA1",
            timeStep = 30,
            codeSize = 8,
            initialTime = 0,
            currentTime = 1111111111,
        ),
        TestCase(
            expected = "67062674",
            secret = "12345678901234567890123456789012",
            algorithm = "HmacSHA256",
            timeStep = 30,
            codeSize = 8,
            initialTime = 0,
            currentTime = 1111111111,
        ),
        TestCase(
            expected = "99943326",
            secret = "1234567890123456789012345678901234567890123456789012345678901234",
            algorithm = "HmacSHA512",
            timeStep = 30,
            codeSize = 8,
            initialTime = 0,
            currentTime = 1111111111,
        ),

        TestCase(
            expected = "89005924",
            secret = "12345678901234567890",
            algorithm = "HmacSHA1",
            timeStep = 30,
            codeSize = 8,
            initialTime = 0,
            currentTime = 1234567890,
        ),
        TestCase(
            expected = "91819424",
            secret = "12345678901234567890123456789012",
            algorithm = "HmacSHA256",
            timeStep = 30,
            codeSize = 8,
            initialTime = 0,
            currentTime = 1234567890,
        ),
        TestCase(
            expected = "93441116",
            secret = "1234567890123456789012345678901234567890123456789012345678901234",
            algorithm = "HmacSHA512",
            timeStep = 30,
            codeSize = 8,
            initialTime = 0,
            currentTime = 1234567890,
        ),

        TestCase(
            expected = "69279037",
            secret = "12345678901234567890",
            algorithm = "HmacSHA1",
            timeStep = 30,
            codeSize = 8,
            initialTime = 0,
            currentTime = 2000000000,
        ),
        TestCase(
            expected = "90698825",
            secret = "12345678901234567890123456789012",
            algorithm = "HmacSHA256",
            timeStep = 30,
            codeSize = 8,
            initialTime = 0,
            currentTime = 2000000000,
        ),
        TestCase(
            expected = "38618901",
            secret = "1234567890123456789012345678901234567890123456789012345678901234",
            algorithm = "HmacSHA512",
            timeStep = 30,
            codeSize = 8,
            initialTime = 0,
            currentTime = 2000000000,
        ),

        TestCase(
            expected = "65353130",
            secret = "12345678901234567890",
            algorithm = "HmacSHA1",
            timeStep = 30,
            codeSize = 8,
            initialTime = 0,
            currentTime = 20000000000,
        ),
        TestCase(
            expected = "77737706",
            secret = "12345678901234567890123456789012",
            algorithm = "HmacSHA256",
            timeStep = 30,
            codeSize = 8,
            initialTime = 0,
            currentTime = 20000000000,
        ),
        TestCase(
            expected = "47863826",
            secret = "1234567890123456789012345678901234567890123456789012345678901234",
            algorithm = "HmacSHA512",
            timeStep = 30,
            codeSize = 8,
            initialTime = 0,
            currentTime = 20000000000,
        ),
    )

    val totp = TotpModule(ReactApplicationContext(mock<Context>()))

    for (testCase in testCases) {
      assertEquals(
          testCase.expected,
          totp.generate(
              testCase.secret,
              testCase.algorithm,
              testCase.timeStep,
              testCase.codeSize,
              testCase.initialTime,
              testCase.currentTime
          )
      )
    }
  }
}
