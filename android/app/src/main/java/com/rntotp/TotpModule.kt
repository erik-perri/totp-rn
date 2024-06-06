package com.rntotp

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import java.nio.ByteBuffer
import java.sql.Time
import javax.crypto.Mac
import javax.crypto.spec.SecretKeySpec
import kotlin.math.pow

class TotpModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

  override fun getName() = "TotpModule"

  @ReactMethod
  fun generate(
      secret: String,
      algorithm: String,
      timeStep: Long,
      codeSize: Int,
      initialTime: Long,
      currentTime: Long,
  ): String {
    val key = secret.toByteArray()
    val time = (currentTime - initialTime) / timeStep
    val timeBytes = ByteBuffer.allocate(Long.SIZE_BYTES).putLong(time).array()

    val mac = Mac.getInstance(algorithm)
    mac.init(SecretKeySpec(key, algorithm))
    val hash = mac.doFinal(timeBytes)

    val offset = hash.last().toInt() and 0xf
    val binary = ((hash[offset].toInt() and 0x7f) shl 24) or
        ((hash[offset + 1].toInt() and 0xff) shl 16) or
        ((hash[offset + 2].toInt() and 0xff) shl 8) or
        (hash[offset + 3].toInt() and 0xff)

    val modulo = 10.0.pow(codeSize.toDouble()).toInt()
    val otp = binary % modulo

    return "%0${codeSize}d".format(otp)
  }

}
