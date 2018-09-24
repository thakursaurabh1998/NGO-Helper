package me.madhurgupta.ngohelper.ngohelper;

import android.app.ProgressDialog;
import android.content.Context;
import android.os.AsyncTask;
import android.widget.ProgressBar;
import android.widget.Toast;

import java.io.IOException;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class SendTask extends AsyncTask<Void, Void, String> {

    RequestBody requestBody;
    Context context;
    ProgressDialog progressDialog;

    public SendTask(RequestBody requestBody, Context context, ProgressDialog progressDialog) {
        this.context = context;
        this.requestBody = requestBody;
        this.progressDialog = progressDialog;
    }

    @Override
    protected String doInBackground(Void... params) {

        OkHttpClient client = new OkHttpClient();
        String data = null;

        Request request = new Request.Builder()
                .url("http://keralaflood-appreciative-panda.eu-gb.mybluemix.net/donate")
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


//
//        if (data != null) {
        Toast.makeText(context, "Your Request is send", Toast.LENGTH_SHORT).show();
        progressDialog.dismiss();
//        } else {
//            Toast.makeText(context, "Your Request is failed", Toast.LENGTH_SHORT).show();
//        }
    }
}

