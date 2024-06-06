package com.rntotp

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import org.apache.commons.codec.binary.Base32
import java.nio.ByteBuffer
import javax.crypto.Mac
import javax.crypto.spec.SecretKeySpec

class TotpModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

  override fun getName() = "TotpModule"

  @ReactMethod
  fun generate(
      secret: String,
      algorithm: String,
      timeStep: Long,
      codeSize: Int,
      currentTime: Long,
  ): String {
    val key = Base32().decode(secret)
    val time = currentTime / timeStep
    val timeBytes = ByteBuffer.allocate(Long.SIZE_BYTES).putLong(time).array()

    val mac = Mac.getInstance(algorithm)
    mac.init(SecretKeySpec(key, algorithm))
    val hash = mac.doFinal(timeBytes)

    val offset = hash.last().toInt() and 0xf
    val binary = ((hash[offset].toInt() and 0x7f) shl 24) or
        ((hash[offset + 1].toInt() and 0xff) shl 16) or
        ((hash[offset + 2].toInt() and 0xff) shl 8) or
        (hash[offset + 3].toInt() and 0xff)

    val modulo = Math.pow(10.0, codeSize.toDouble()).toInt()
    val otp = binary % modulo

    return String.format("%0${codeSize}d", otp)
  }

}
