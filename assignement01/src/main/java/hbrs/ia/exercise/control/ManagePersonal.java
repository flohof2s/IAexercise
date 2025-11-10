package hbrs.ia.exercise.control;

import hbrs.ia.exercise.entities.*;

import java.util.List;

/**
 * Code lines are commented for suppressing compile errors.
 * Are there any CRUD-operations missing?
 */
public interface ManagePersonal {

    // done
    public void createSalesMan(SalesMan record);

    // done
    public void addSocialPerformanceRecord(SocialPerformanceRecord record, SalesMan salesMan);

    // done
    public SalesMan readSalesMan(int sid);

    // done
    public List<SalesMan> readAllSalesMen();

    // done
    public List<SocialPerformanceRecord> readSocialPerformanceRecord(SalesMan salesMan);

    // done
    public List<SocialPerformanceRecord> readAllSocialPerformanceRecord();

    // done
    public void updateSalesMan(int id, SalesMan salesMan);

    // done
    public void updateSocialPerformanceRecord(int id, SocialPerformanceRecord record);

    // done
    public void deleteSalesMan(SalesMan salesMan);

    // done
    public void deleteAllSalesMan();

    // done
    public void deleteSocialPerformanceRecord(SocialPerformanceRecord record);

    // done
    public void deleteAllSocialPerformanceRecord();
}
