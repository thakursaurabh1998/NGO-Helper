package me.madhurgupta.ngohelper.ngohelper;

import android.Manifest;
import android.app.ProgressDialog;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.net.Uri;
import android.provider.MediaStore;
import android.support.annotation.NonNull;
import android.support.design.widget.FloatingActionButton;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.Toast;

import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.firebase.storage.FirebaseStorage;
import com.google.firebase.storage.StorageReference;
import com.google.firebase.storage.UploadTask;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import okhttp3.MediaType;
import okhttp3.RequestBody;

public class DonateActivity extends AppCompatActivity {

    StorageReference mStorage;
    int REQUEST_IMAGE_CAPTURE = 71;
    Uri uri;
    EditText name;
    EditText address;
    EditText number;
    EditText email;
    Spinner cat;
    Button button;
    ProgressDialog progress;
    RequestBody requestBody;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_donate);
        progress = new ProgressDialog(DonateActivity.this);

        mStorage = FirebaseStorage.getInstance().getReference().child("Photos");
        cat = findViewById(R.id.category);

        button = findViewById(R.id.submit);

        name = findViewById(R.id.input_name);


        address = findViewById(R.id.input_address);


        number = findViewById(R.id.input_number);


        email = findViewById(R.id.input_email);

        progress.setTitle("Loading");
        progress.setMessage("Wait while loading...");
        progress.setCancelable(false);


        if (getIntent().hasExtra("name")) {

            name.setText(getIntent().getExtras().getString("name"));
            address.setText(getIntent().getExtras().getString("address"));
            number.setText(getIntent().getExtras().getString("number"));
            email.setText(getIntent().getExtras().getString("email"));


//            Toast.makeText(this, ""+getIntent().hasExtra("Bundle"), Toast.LENGTH_SHORT).show();


        }

        if (ContextCompat.checkSelfPermission(this, Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.CAMERA, Manifest.permission.WRITE_EXTERNAL_STORAGE}, 0);
        }
//
        List<String> catL = new ArrayList<String>();
        catL.add("Food");
        catL.add("Cloths");
//
        ArrayAdapter<String> catArrayList = new ArrayAdapter<String>(this, android.R.layout.simple_spinner_item, catL);
        catArrayList.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);

        button.setOnClickListener(new View.OnClickListener() {
                                      @Override
                                      public void onClick(View v) {
                                              progress.show();
                                              new SendTask(requestBody, DonateActivity.this, progress).execute();
//                                          Toast.makeText(DonateActivity.this, "Sent", Toast.LENGTH_SHORT).show();
                                      }
                                  }
        );

        cat.setAdapter(catArrayList);

        FloatingActionButton fab = findViewById(R.id.camera);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent i = new Intent(Intent.ACTION_PICK,android.provider.MediaStore.Images.Media.EXTERNAL_CONTENT_URI);
                startActivityForResult(i, REQUEST_IMAGE_CAPTURE);

            }
        });
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == REQUEST_IMAGE_CAPTURE && resultCode == RESULT_OK && null != data) {
            Uri selectedImage = data.getData();
            String[] filePathColumn = { MediaStore.Images.Media.DATA };
            Cursor cursor = getContentResolver().query(selectedImage,
                    filePathColumn, null, null, null);

            if (cursor == null || cursor.getCount() < 1) {
                return; // no cursor or no record. DO YOUR ERROR HANDLING
            }

            cursor.moveToFirst();
            int columnIndex = cursor.getColumnIndex(filePathColumn[0]);

            if(columnIndex < 0) // no column index
                return; // DO YOUR ERROR HANDLING

            final String picturePath = cursor.getString(columnIndex);

            cursor.close(); // close cursor
//            Toast.makeText(Donation.this, picturePath.toString(), Toast.LENGTH_SHORT).show();

            final Uri file = Uri.fromFile(new
                    File(picturePath));
            StorageReference riversRef = mStorage.child(file.getLastPathSegment());
            final UploadTask uploadTask = riversRef.putFile(file);
            uploadTask.addOnFailureListener(new OnFailureListener() {
                @Override
                public void onFailure(@NonNull Exception exception) {
                    // Handle unsuccessful uploads
                }
            }).addOnSuccessListener(new OnSuccessListener<UploadTask.TaskSnapshot>() {
                @Override
                public void onSuccess(UploadTask.TaskSnapshot taskSnapshot) {

                    mStorage.child(file.getLastPathSegment()).getDownloadUrl().addOnSuccessListener(new OnSuccessListener<Uri>() {
                        @Override
                        public void onSuccess(Uri u) {
                            uri = u;
                            Log.d("DOWNLOAD", "onSuccess: "+uri);


                            final MediaType MEDIA_TYPE = MediaType.parse("application/json");
                            JSONObject postdata = new JSONObject();

                            try {
                                postdata.put("email", email.getText().toString());
                                postdata.put("initiated_by", name.getText().toString());
                                postdata.put("address", address.getText().toString());
                                postdata.put("contact", number.getText().toString());
                                postdata.put("item", cat.getSelectedItem());
                                postdata.put("imgURL", uri);
                            } catch(JSONException e){
                                e.printStackTrace();
                            }

                            requestBody = RequestBody.create(MEDIA_TYPE, postdata.toString());
                            Log.d("BODY", "onSuccess: "+requestBody);


                        }
                    }).addOnFailureListener(new OnFailureListener() {
                        @Override
                        public void onFailure(@NonNull Exception exception) {
                        }
                    });
                }
            });
        }
    }
}