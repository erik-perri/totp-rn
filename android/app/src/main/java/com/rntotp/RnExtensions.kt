package com.rntotp

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableType
import com.facebook.react.bridge.WritableArray
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.WritableNativeArray
import com.facebook.react.bridge.WritableNativeMap

fun ByteArray?.toWritableArray(): WritableArray {
  val result = WritableNativeArray()

  this?.forEach { b ->
    result.pushInt(b.toInt())
  }

  return result
}

@Throws(Exception::class)
fun Map<*, *>.toWritableMap(): WritableMap {
  val result = WritableNativeMap()

  for ((key, value) in this) {
    if (key !is String) {
      throw Exception("Invalid writable map. Unsupported map key \"$key\"")
    }

    when (value) {
      null -> result.putNull(key)
      is Boolean -> result.putBoolean(key, value)
      is Double -> result.putDouble(key, value)
      is Int -> result.putInt(key, value)
      is Map<*, *> -> result.putMap(key, value.toWritableMap())
      is String -> result.putString(key, value)
      else -> throw Exception("Invalid writable map. Unknown value type for \"$value\"")
    }
  }

  return result
}

@Throws(Exception::class)
fun ReadableArray.toByteArray(): ByteArray {
  val size = this.size()
  val result = ByteArray(size)

  if (size < 1) {
    return result
  }

  for (i in 0 until size) {
    val type = this.getType(i)
    if (type != ReadableType.Number) {
      throw Exception("Invalid byte array. Expected array of numbers, found ${type.name}.")
    }

    result[i] = this.getInt(i).toByte()
  }

  return result
}
