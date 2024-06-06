package com.rntotp

import android.content.Context
import com.facebook.react.bridge.ReactApplicationContext
import org.junit.Assert.assertEquals
import org.junit.Test
import org.junit.runner.RunWith
import org.mockito.junit.MockitoJUnitRunner
import org.mockito.kotlin.mock

@RunWith(MockitoJUnitRunner::class)
class TotpModuleTest {
  @Test
  fun generate() {
    val totp = TotpModule(ReactApplicationContext(mock<Context>()))

    assertEquals(
        "089951",
        totp.generate(
            "ON2G64BANRXW623JNZTQ",
            "HmacSHA1",
            30,
            6,
            1546302000,
        ),
    )

    assertEquals(
        "034311",
        totp.generate(
            "ON2G64BANRXW623JNZTQ",
            "HmacSHA1",
            60,
            6,
            1546302000,
        ),
    )

    assertEquals(
        "888153900",
        totp.generate(
            "NEQHGYLJMQQHG5DPOA",
            "HmacSHA1",
            30,
            9,
            1546302000,
        ),
    )

    assertEquals(
        "107983685",
        totp.generate(
            "NEQHGYLJMQQHG5DPOA",
            "HmacSHA1",
            60,
            9,
            1546302000,
        ),
    )
  }
}
