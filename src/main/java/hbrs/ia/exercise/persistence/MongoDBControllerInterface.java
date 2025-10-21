package hbrs.ia.exercise.persistence;

import hbrs.ia.exercise.entities.SalesMan;
import hbrs.ia.exercise.entities.SocialPerformanceRecord;

import java.util.List;

public interface MongoDBControllerInterface {
    void openConnection();
    void closeConnection();

    void createSalesMan(SalesMan salesMan);
    SalesMan getSalesManById(int id);
    List<SalesMan> listSalesMan();
    void updateSalesMan(int id,SalesMan salesMan);
    void deleteSalesMan(int id);
    void deleteAllSalesMan();

    void createSocialPerformanceRecord(SocialPerformanceRecord socialPerformanceRecord);
    SocialPerformanceRecord getSocialPerformanceRecordById(int id);
    List<SocialPerformanceRecord> listSocialPerformanceRecord();
    void updateSocialPerformanceRecord(int id,SocialPerformanceRecord socialPerformanceRecord);
    void deleteSocialPerformanceRecord(int id);
    void deleteAllSocialPerformanceRecord();
}
