package me.madhurgupta.ngohelper.ngohelper;

import android.content.Context;
import android.content.Intent;
import android.support.design.widget.FloatingActionButton;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.RecyclerView;
import android.view.View;

public class AdActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_ad);
        RecyclerView recyclerView = findViewById(R.id.rv);
        new QueryTask(this, recyclerView).execute();
        Context context = AdActivity.this;

    }
}