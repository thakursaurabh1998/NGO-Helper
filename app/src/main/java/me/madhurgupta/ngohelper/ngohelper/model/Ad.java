package me.madhurgupta.ngohelper.ngohelper.model;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class Ad {

    @SerializedName("imgURL")
    @Expose
    private String imgURL;
    @SerializedName("is_distributed")
    @Expose
    private Boolean isDistributed;
    @SerializedName("_id")
    @Expose
    private String id;
    @SerializedName("initiated_by")
    @Expose
    private String initiatedBy;
    @SerializedName("item")
    @Expose
    private String item;
    @SerializedName("distributed_to")
    @Expose
    private String distributedTo;
    @SerializedName("index")
    @Expose
    private int index;

    public String getImgURL() {
        return imgURL;
    }

    public void setImgURL(String imgURL) {
        this.imgURL = imgURL;
    }

    public Boolean getIsDistributed() {
        return isDistributed;
    }

    public void setIsDistributed(Boolean isDistributed) {
        this.isDistributed = isDistributed;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getInitiatedBy() {
        return initiatedBy;
    }

    public void setInitiatedBy(String initiatedBy) {
        this.initiatedBy = initiatedBy;
    }

    public String getItem() {
        return item;
    }

    public void setItem(String item) {
        this.item = item;
    }

    public String getDistributedTo() {
        return distributedTo;
    }

    public void setDistributedTo(String distributedTo) {
        this.distributedTo = distributedTo;
    }

    public int getIndex() {
        return index;
    }

    public void setIndex(int index) {
        this.index = index;
    }
}
