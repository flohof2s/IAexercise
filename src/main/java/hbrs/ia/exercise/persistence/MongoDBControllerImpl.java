package hbrs.ia.exercise.persistence;

import com.mongodb.client.model.Filters;
import hbrs.ia.exercise.entities.SalesMan;
import hbrs.ia.exercise.entities.SocialPerformanceRecord;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import org.bson.Document;

import java.util.ArrayList;
import java.util.List;

public class MongoDBControllerImpl implements MongoDBControllerInterface{

    private static final String MONGODB_SM_COLLECTION = "SalesMan";
    private static final String MONGODB_SPR_COLLECTION = "SocialPerformanceRecord";
    private static final String MONGODB_HOST = "localhost";
    private static final int MONGODB_PORT = 27017;
    private static final String MONGODB_DATABASE = "IA-Exercise";
    private static final String MONGODB_USERNAME = "";
    private static final String MONGODB_PASSWORD = "";
    private static final String MONGODB_AUTH_DATABASE = MONGODB_DATABASE;

    private MongoClient mongoClient;
    private MongoDatabase mongoDatabase;
    private MongoCollection<Document> mongoSMCollection;
    private MongoCollection<Document> mongoSPRCollection;

    @Override
    public void openConnection() {
        if(this.mongoClient != null){
            throw new IllegalStateException("MongoDbController is already open");
        }

        String authString = "";
        if(!(MONGODB_USERNAME.trim().isEmpty())){
            authString = MONGODB_USERNAME + ":" + MONGODB_PASSWORD + "@";
        }

        String connectionString = "mongodb://" + authString + MONGODB_HOST + ":" + MONGODB_PORT + "/" + "?authSource=" + MONGODB_AUTH_DATABASE;
        this.mongoClient = MongoClients.create(connectionString);

        this.mongoDatabase = mongoClient.getDatabase(MONGODB_DATABASE);
        this.mongoSMCollection = this.mongoDatabase.getCollection(MONGODB_SM_COLLECTION);
        this.mongoSPRCollection = this.mongoDatabase.getCollection(MONGODB_SPR_COLLECTION);
    }

    @Override
    public void closeConnection() {
        if(this.mongoClient == null) return;
        this.mongoClient.close();
        this.mongoDatabase = null;
        this.mongoSMCollection = null;
        this.mongoSPRCollection = null;
        this.mongoClient = null;
    }

    @Override
    public void createSalesMan(SalesMan salesMan) {
        if(!this.checkIDofSalesMan(salesMan)){
            throw new IllegalStateException("Duplicate of ID: "+salesMan.getId()+" found in database");
        }

        this.mongoSMCollection.insertOne(this.objectToDocument(salesMan));
    }

    @Override
    public SalesMan getSalesManById(int id) {
        Document doc = this.mongoSMCollection.find(Filters.eq("id", id)).first();
        if (doc == null) return null;
        return documentToSalesMan(doc);
    }

    @Override
    public List<SalesMan> listSalesMan() {
        List<SalesMan> results = new ArrayList<SalesMan>();
        this.mongoSMCollection.find().map(this::documentToSalesMan).into(results);
        return results;
    }

    @Override
    public void updateSalesMan(int id, SalesMan salesMan) {
        this.mongoSMCollection.replaceOne(Filters.eq("id", id), this.objectToDocument(salesMan));
    }

    @Override
    public void deleteSalesMan(int id) {
        this.mongoSMCollection.deleteOne(Filters.eq("id", id));
    }

    @Override
    public void deleteAllSalesMan() {
        this.mongoSMCollection.deleteMany(Filters.exists("id"));
    }

    @Override
    public void createSocialPerformanceRecord(SocialPerformanceRecord socialPerformanceRecord) {
        if(!this.checkIDofSocialPerformanceRecord(socialPerformanceRecord)){
            throw new IllegalStateException("Duplicate of ID: "+socialPerformanceRecord.getId()+" found in database");
        }

        this.mongoSPRCollection.insertOne(this.objectToDocument(socialPerformanceRecord));
    }

    @Override
    public SocialPerformanceRecord getSocialPerformanceRecordById(int id) {
        Document doc = this.mongoSPRCollection.find(Filters.eq("id", id)).first();
        if (doc == null) return null;
        return documentToSocialPerformanceRecord(doc);
    }

    @Override
    public List<SocialPerformanceRecord> listSocialPerformanceRecord() {
        List<SocialPerformanceRecord> results = new ArrayList<SocialPerformanceRecord>();
        this.mongoSPRCollection.find().map(this::documentToSocialPerformanceRecord).into(results);
        return results;
    }

    @Override
    public void updateSocialPerformanceRecord(int id, SocialPerformanceRecord socialPerformanceRecord) {
        this.mongoSPRCollection.replaceOne(Filters.eq("id", id), this.objectToDocument(socialPerformanceRecord));
    }

    @Override
    public void deleteSocialPerformanceRecord(int id) {
        this.mongoSPRCollection.deleteOne(Filters.eq("id", id));
    }

    @Override
    public void deleteAllSocialPerformanceRecord() {
        this.mongoSPRCollection.deleteMany(Filters.exists("id"));
    }

    public boolean checkIDofSalesMan(SalesMan sm){
        List<SalesMan> storedSalesMan = this.listSalesMan();
        boolean duplicate = false;

        for(SalesMan compare:storedSalesMan){
            if(sm.getId()==compare.getId()){
                duplicate = true;
                break;
            }
        }


        return !duplicate;
    }

    public boolean checkIDofSocialPerformanceRecord(SocialPerformanceRecord spr){
        List<SocialPerformanceRecord> storedSPR = this.listSocialPerformanceRecord();
        boolean duplicate = false;

        for(SocialPerformanceRecord compare:storedSPR){
            if(spr.getId()==compare.getId()){
                duplicate = true;
                break;
            }
        }


        return !duplicate;
    }

    private Document objectToDocument(SalesMan salesMan) {
        Document doc = new Document();
        doc.append("id",salesMan.getId());
        doc.append("name",salesMan.getName());
        doc.append("email",salesMan.getEmail());
        doc.append("phone",salesMan.getPhone());
        doc.append("birthday",salesMan.getBirthday());
        return doc;
    }

    private Document objectToDocument(SocialPerformanceRecord spr) {
        Document doc = new Document();
        doc.append("id",spr.getId());
        doc.append("salesManId",spr.getSalesManId());
        doc.append("date",spr.getDate());
        doc.append("score",spr.getScore());
        return doc;
    }

    private SalesMan documentToSalesMan(Document doc) {
        SalesMan sm = new SalesMan(doc.getInteger("id"),doc.getString("name"),doc.getString("email"),doc.getString("phone"),doc.getString("birthday"));
        return sm;
    }

    private SocialPerformanceRecord documentToSocialPerformanceRecord(Document doc) {
        SocialPerformanceRecord spr = new SocialPerformanceRecord(doc.getInteger("id"),doc.getInteger("salesManId"),doc.getString("date"),doc.getDouble("score"));
        return spr;
    }
}
