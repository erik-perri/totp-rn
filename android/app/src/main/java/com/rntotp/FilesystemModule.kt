package com.rntotp

import android.app.Activity
import android.content.Intent
import android.database.Cursor
import android.net.Uri
import android.provider.OpenableColumns
import androidx.core.net.toUri
import com.facebook.react.bridge.BaseActivityEventListener
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableArray
import java.io.InputStream
import java.io.OutputStream

class FilesystemModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName() = "FilesystemModule"

  private var documentPromise: Promise? = null
  private val contentResolver = reactContext.applicationContext.contentResolver

  private val activityEventListener = object : BaseActivityEventListener() {
    override fun onActivityResult(
      activity: Activity,
      requestCode: Int,
      resultCode: Int,
      data: Intent?
    ) {
      val promise = documentPromise ?: return

      documentPromise = null

      if (requestCode == EVENT_CODE_CREATE_DOCUMENT || requestCode == EVENT_CODE_OPEN_DOCUMENT) {
        handleDocumentActivityResult(resultCode, data, promise)
      } else {
        promise.reject("unknown_request_code", "Unknown request code \"$requestCode\" received.")
      }
    }
  }

  init {
    reactContext.addActivityEventListener(activityEventListener)
  }

  @ReactMethod
  fun createDocumentFile(defaultFileName: String, mimeType: String, promise: Promise) {
    if (documentPromise != null) {
      promise.reject("busy", "A document request is already in progress.")
      return
    }

    val activity = currentActivity

    if (activity == null) {
      promise.reject("no_activity", "An activity is not available.")
      return
    }

    val intent = Intent(Intent.ACTION_CREATE_DOCUMENT).apply {
      addCategory(Intent.CATEGORY_OPENABLE)
      setType(mimeType)
      putExtra(Intent.EXTRA_TITLE, defaultFileName)
    }

    documentPromise = promise

    activity.startActivityForResult(intent, EVENT_CODE_CREATE_DOCUMENT)
  }

  @ReactMethod
  fun getInternalFile(fileName: String, promise: Promise) {
    val file = reactApplicationContext.filesDir.resolve(fileName)
    val uri = file.toUri()

    val result = mapOf(
      "name" to uriDisplayName(uri),
      "uri" to uri.toString()
    )

    promise.resolve(result.toWritableMap())
  }

  @ReactMethod
  fun openDocumentFile(mimeType: String, promise: Promise) {
    if (documentPromise != null) {
      promise.reject("busy", "A document request is already in progress.")
      return
    }

    val activity = currentActivity

    if (activity == null) {
      promise.reject("no_activity", "An activity is not available.")
      return
    }

    val intent = Intent(Intent.ACTION_OPEN_DOCUMENT).apply {
      addCategory(Intent.CATEGORY_OPENABLE)
      setType(mimeType)
    }

    documentPromise = promise

    activity.startActivityForResult(intent, EVENT_CODE_OPEN_DOCUMENT)
  }

  @ReactMethod
  fun readFile(uri: String, promise: Promise) {
    val contentUri = Uri.parse(uri)
    val inputStream: InputStream?

    try {
      inputStream = contentResolver.openInputStream(contentUri)
    } catch (e: Exception) {
      promise.reject("file_open", "Failed to open file for reading.", e)
      return
    }

    if (inputStream == null) {
      promise.reject("input_stream", "No input stream available.")
      return
    }

    try {
      val fileBytes = inputStream.readBytes()
      promise.resolve(fileBytes.toWritableArray())
    } catch (e: Exception) {
      promise.reject("file_read", "Failed to read file.", e)
    } finally {
      inputStream.close()
    }
  }

  @ReactMethod
  fun writeFile(uri: String, content: ReadableArray, promise: Promise) {
    val contentUri = Uri.parse(uri)
    val outputStream: OutputStream?

    try {
      outputStream = contentResolver.openOutputStream(contentUri)
    } catch (e: Exception) {
      promise.reject("file_open", "Failed to open file for writing.", e)
      return
    }

    if (outputStream == null) {
      promise.reject("output_stream", "No output stream available.")
      return
    }

    try {
      outputStream.write(content.toByteArray())
      promise.resolve(null)
    } catch (e: Exception) {
      promise.reject("file_write", "Failed to write to file.", e)
    } finally {
      outputStream.close()
    }
  }

  companion object {
    const val EVENT_CODE_CREATE_DOCUMENT = 0x1000
    const val EVENT_CODE_OPEN_DOCUMENT = 0x1001
  }

  private fun handleDocumentActivityResult(
    resultCode: Int,
    data: Intent?,
    promise: Promise
  ) {
    try {
      if (resultCode == Activity.RESULT_CANCELED) {
        promise.resolve(null)
        return
      }

      if (resultCode != Activity.RESULT_OK) {
        promise.reject(
          "document_activity_result",
          "Unexpected document activity result \"$resultCode\"."
        )
        return
      }

      val uri = data?.data
      if (uri == null) {
        promise.reject("document_missing_uri", "No URI returned from document activity.")
        return
      }

      val result = mapOf(
        "name" to uriDisplayName(uri),
        "uri" to uri.toString()
      )

      val takeFlags: Int = Intent.FLAG_GRANT_READ_URI_PERMISSION or
          Intent.FLAG_GRANT_WRITE_URI_PERMISSION
      contentResolver.takePersistableUriPermission(uri, takeFlags)

      promise.resolve(result.toWritableMap())
    } catch (e: Exception) {
      promise.reject("document_generic", "Failed to handle document activity result.", e)
    }
  }

  private fun uriDisplayName(uri: Uri): String? {
    val cursor: Cursor? = contentResolver.query(
      uri,
      null,
      null,
      null,
      null,
      null
    )
    cursor?.use {
      if (it.moveToFirst()) {
        val index = it.getColumnIndex(OpenableColumns.DISPLAY_NAME)

        return it.getString(index)
      }
    }

    return null
  }
}
