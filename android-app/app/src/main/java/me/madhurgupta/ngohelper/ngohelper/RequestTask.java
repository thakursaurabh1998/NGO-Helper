package me.madhurgupta.ngohelper.ngohelper;

import android.content.Context;
import android.os.AsyncTask;
import android.widget.Toast;

import java.io.IOException;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class RequestTask extends AsyncTask<Void, Void, String> {

    RequestBody requestBody;
    Context context;

    RequestTask(RequestBody requestBody, Context context) {
        this.context = context;
        this.requestBody = requestBody;
    }

    @Override
    protected String doInBackground(Void... params) {

        OkHttpClient client = new OkHttpClient();
        String data = null;

        Request request = new Request.Builder()
                .url("http://keralaflood-appreciative-panda.eu-gb.mybluemix.net/request")
                .post(requestBody)
                .build();
        try {
            Response response = client.newCall(request).execute();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return data;
    }
    @Override
    protected void onPostExecute(String data) {



//        if (data != null) {
        Toast.makeText(context, "Your Request is send", Toast.LENGTH_SHORT).show();
//        } else {
//            Toast.makeText(context, "Your Request is failed", Toast.LENGTH_SHORT).show();
//        }
    }
}
