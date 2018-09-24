package me.madhurgupta.ngohelper.ngohelper;

import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import com.squareup.picasso.Picasso;

import java.util.List;

import me.madhurgupta.ngohelper.ngohelper.model.Ad;

public class MyAdapter extends RecyclerView.Adapter<MyAdapter.MyViewHolder> {

    final private listItemClickListener onClickListener;
    private int numberItems;
    private List<Ad> ads;
    private Context context;

    MyAdapter(int numberOfItems, List<Ad> ads, listItemClickListener onClickListener, Context context) {
        this.numberItems = numberOfItems;
        this.context = context;
        this.ads = ads;
        this.onClickListener = onClickListener;
    }

    @Override
    public MyViewHolder onCreateViewHolder(ViewGroup viewGroup, int viewType) {
        Context context = viewGroup.getContext();
        int layoutIdForList = R.layout.grid_layout;
        LayoutInflater inflater = LayoutInflater.from(context);
        boolean shouldAttachToParentImmediately = false;

        View view = inflater.inflate(layoutIdForList, viewGroup, shouldAttachToParentImmediately);
        MyViewHolder viewHolder = new MyViewHolder(view);
        return viewHolder;
    }

    @Override
    public void onBindViewHolder(MyViewHolder holder, int position) {
        holder.bind(position);
    }

    @Override
    public int getItemCount() {
        return numberItems;
    }

    public interface listItemClickListener {
        void onListItemClick(int clickedItemIndex);
    }

    public class MyViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener {

        ImageView imageView;
        TextView textView;
        TextView usernameTextView;
        Button requestButton;

        MyViewHolder(final View itemView) {
            super(itemView);
            imageView = itemView.findViewById(R.id.iv);
            textView = itemView.findViewById(R.id.name);
            usernameTextView = itemView.findViewById(R.id.user);
            requestButton = itemView.findViewById(R.id.button);
            requestButton.setOnClickListener(this);
//            itemView.setOnClickListener(this);
        }

        void bind(int position) {
            if (ads != null) {
                textView.setText(ads.get(position).getItem());
                usernameTextView.setText("By " + ads.get(position).getInitiatedBy());
                Picasso.get()
                        .load(ads.get(position).getImgURL())
                        .into(imageView);
            } else {
                imageView.setImageResource(R.drawable.ic_launcher_background);
            }
        }

        @Override
        public void onClick(View view) {
            int clickedPosition = getAdapterPosition();
            onClickListener.onListItemClick(clickedPosition);
        }
    }
}
