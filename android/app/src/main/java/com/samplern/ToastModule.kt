// ToastModule.java

package com.samplern

import android.support.annotation.Nullable
import android.widget.Toast
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule

import java.util.HashMap

class ToastModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "ToastExample"
    }

    override fun getConstants(): Map<String, Any>? {
        val constants = HashMap<String, Any>()
        constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT)
        constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG)
        return constants
    }

    @ReactMethod
    fun show(message: String, duration: Int, successCallback: Callback) {
        Toast.makeText(reactApplicationContext, message, duration).show()
        successCallback.invoke("Callback $message popped")
        //alternative send an event if we don't want to use a callback
        val params = Arguments.createMap()
        params.putString("message","Hello from the otherside \uD83D\uDC7D")
        sendEvent(reactApplicationContext, "onToasterPop", params)
    }

    private fun sendEvent(reactContext: ReactContext, eventName: String, @Nullable params: WritableMap) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java).emit(eventName, params)
    }

    companion object {

        private val DURATION_SHORT_KEY = "SHORT"
        private val DURATION_LONG_KEY = "LONG"
    }

}