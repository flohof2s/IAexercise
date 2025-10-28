package hbrs.ia.exercise.entities;

public class SocialPerformanceRecord {
    private int id;
    private int salesManId;
    private String date;
    private double score;

    public SocialPerformanceRecord(int id, int salesManId, String date, double score) {
        this.id = id;
        this.salesManId = salesManId;
        this.date = date;
        this.score = score;
    }

    public void setSalesManId(int salesManId) {
        this.salesManId = salesManId;
    }

    public int getId() {
        return this.id;
    }

    public int getSalesManId() {
        return this.salesManId;
    }

    public String getDate() {
        return this.date;
    }

    public double getScore() {
        return this.score;
    }
}
