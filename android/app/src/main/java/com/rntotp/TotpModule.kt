package com.rntotp

import android.annotation.SuppressLint
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableType
import com.facebook.react.bridge.WritableArray
import com.facebook.react.bridge.WritableNativeArray
import org.signal.argon2.Argon2
import org.signal.argon2.MemoryCost
import org.signal.argon2.Type
import org.signal.argon2.Version
import javax.crypto.Cipher
import javax.crypto.spec.SecretKeySpec

class TotpModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

  override fun getName() = "TotpModule"

  override fun getConstants(): MutableMap<String, Any> =
    hashMapOf(
      "ARGON2_VERSION_10" to ARGON2_VERSION_10,
      "ARGON2_VERSION_13" to ARGON2_VERSION_13,
      "ARGON2_TYPE_2D" to ARGON2_TYPE_2D,
      "ARGON2_TYPE_2ID" to ARGON2_TYPE_2ID
    )

  @SuppressLint("GetInstance")
  @ReactMethod
  fun transformAes256KdfKey(
    key: ReadableArray,
    rounds: Double,
    seed: ReadableArray,
    promise: Promise
  ) {
    try {
      val cipher = Cipher.getInstance("AES/ECB/NoPadding")
      val secretKey = SecretKeySpec(bytesFromArray(seed), "AES")
      var result = bytesFromArray(key)
      var iterations = rounds

      cipher.init(Cipher.ENCRYPT_MODE, secretKey)

      while (iterations-- > 0) {
        result = cipher.doFinal(result)
      }

      promise.resolve(arrayFromBytes(result))
    } catch (e: Exception) {
      promise.reject("transform_error", e)
    }
  }

  @ReactMethod
  fun transformArgon2KdfKey(
    key: ReadableArray,
    salt: ReadableArray,
    version: Int,
    type: Int,
    memory: Double,
    parallelism: Double,
    iterations: Double,
    promise: Promise
  ) {
    try {
      val argonVersion = when (version) {
        ARGON2_VERSION_10 -> Version.V10
        ARGON2_VERSION_13 -> Version.V13
        else -> {
          promise.reject("transform_error", "Invalid Argon2 version \"$version\"")
          return
        }
      }

      val argonType = when (type) {
        ARGON2_TYPE_2D -> Type.Argon2d
        ARGON2_TYPE_2ID -> Type.Argon2id
        else -> {
          promise.reject("transform_error", "Invalid Argon2 type \"$type\"")
          return
        }
      }

      val argon2 = Argon2.Builder(argonVersion)
        .type(argonType)
        .memoryCost(MemoryCost.KiB(memory.toInt()))
        .parallelism(parallelism.toInt())
        .iterations(iterations.toInt())
        .build()

      val result = argon2.hash(
        bytesFromArray(key),
        bytesFromArray(salt)
      )

      promise.resolve(arrayFromBytes(result.hash))
    } catch (e: Exception) {
      promise.reject("transform_error", e)
    }
  }

  companion object {
    const val ARGON2_VERSION_10 = 0x10
    const val ARGON2_VERSION_13 = 0x13
    const val ARGON2_TYPE_2D = 0
    const val ARGON2_TYPE_2ID = 2
  }

  @Throws(Exception::class)
  private fun bytesFromArray(array: ReadableArray): ByteArray {
    val size = array.size()
    val result = ByteArray(size)

    if (size < 1) {
      return result
    }

    for (i in 0 until size) {
      val type = array.getType(i)
      if (type != ReadableType.Number) {
        throw Exception("Invalid byte array")
      }

      result[i] = array.getInt(i).toByte()
    }

    return result
  }

  private fun arrayFromBytes(bytes: ByteArray?): WritableArray {
    val result = WritableNativeArray()

    bytes?.forEach { b ->
      result.pushInt(b.toInt())
    }

    return result
  }

}
