package me.madhurgupta.ngohelper.ngohelper;

import android.app.Dialog;
import android.app.ProgressDialog;
import android.support.v7.widget.RecyclerView;

import android.content.Context;
import android.os.AsyncTask;
import android.support.v7.widget.GridLayoutManager;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import com.google.gson.Gson;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import me.madhurgupta.ngohelper.ngohelper.model.Ad;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class QueryTask extends AsyncTask<Void, Void, String> implements MyAdapter.listItemClickListener {

    private List<Ad> ads = new ArrayList<>();
    private Context context;
    private RecyclerView recyclerView;
    private MyAdapter.listItemClickListener listener;

    QueryTask(Context context, RecyclerView recyclerView) {
        this.context = context;
        this.recyclerView = recyclerView;
        this.listener = this;
    }


    @Override
    protected String doInBackground(Void... params) {

        OkHttpClient client = new OkHttpClient();
        Request request = new Request.Builder()
                .url("http://keralaflood-appreciative-panda.eu-gb.mybluemix.net/listitems")
                .build();

        String data = null;

        try {
            Response response = null;
            try {
                response = client.newCall(request).execute();
            } catch (IOException e) {
                e.printStackTrace();
            }

            data = response.body().string();

        } catch (IOException e) {
            e.printStackTrace();
        }

        return data;
    }

    @Override
    protected void onPostExecute(String data) {
        if (data != null) {

            try {
                JSONArray results = new JSONArray(data);

                for (int i = 0; i < results.length(); i++) {
                    Gson gson = new Gson();
                    Ad ad = gson.fromJson(String.valueOf(results.optJSONObject(i)), Ad.class);
                    if (!ad.getIsDistributed()) {
                        ads.add(ad);
                    }
                }

                GridLayoutManager gridLayoutManager = new GridLayoutManager(context, 1);
                recyclerView.setLayoutManager(gridLayoutManager);

                recyclerView.setHasFixedSize(true);

                MyAdapter myAdapter = new MyAdapter(ads.size(), ads, listener, context);

                recyclerView.setAdapter(myAdapter);


            } catch (JSONException e) {
                e.printStackTrace();
            }

        }
    }

    @Override
    public void onListItemClick(final int clickedItemIndex) {

        final Dialog dialog = new Dialog(context);
        dialog.setContentView(R.layout.info);
        dialog.setCancelable(false);
        Button submit = dialog.findViewById(R.id.submit);

        final EditText email = dialog.findViewById(R.id.input_email);
        final EditText name = dialog.findViewById(R.id.input_name);
        final EditText number = dialog.findViewById(R.id.input_number);
        dialog.show();

        submit.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v) {
                final MediaType MEDIA_TYPE = MediaType.parse("application/json");
                JSONObject postdata = new JSONObject();

                try {
                    postdata.put("email", email.getText().toString());
                    postdata.put("initiated_by", name.getText().toString());
                    postdata.put("contact", number.getText().toString());
                    postdata.put("index", ads.get(clickedItemIndex).getIndex());
                } catch(JSONException e){
                    e.printStackTrace();
                }
                dialog.dismiss();

                RequestBody requestBody = RequestBody.create(MEDIA_TYPE, postdata.toString());

                new RequestTask(requestBody, context).execute();
            }
        });
    }
}
