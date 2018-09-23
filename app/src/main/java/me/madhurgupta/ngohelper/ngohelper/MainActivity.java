package me.madhurgupta.ngohelper.ngohelper;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    public void getHelp(View view) {
        Intent intent = new Intent(this, AdActivity.class);
        startActivity(intent);
    }

    public void donate(View view) {
        Intent intent = new Intent(this, DonateActivity.class);
        startActivity(intent);
    }
}
