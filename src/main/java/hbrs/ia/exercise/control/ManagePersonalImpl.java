package hbrs.ia.exercise.control;

import hbrs.ia.exercise.persistence.*;

import hbrs.ia.exercise.entities.SalesMan;
import hbrs.ia.exercise.entities.SocialPerformanceRecord;

import java.util.ArrayList;
import java.util.List;

public class ManagePersonalImpl implements ManagePersonal {
    private MongoDBControllerInterface controller;

    public ManagePersonalImpl(MongoDBControllerInterface controller) {
        this.controller = controller;
    }

    @Override
    public void createSalesMan(SalesMan record) {
        this.controller.openConnection();

        try {
            this.controller.createSalesMan(record);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        this.controller.closeConnection();
    }

    @Override
    public void addSocialPerformanceRecord(SocialPerformanceRecord record, SalesMan salesMan) {
        this.controller.openConnection();

        record.setSalesManId(salesMan.getId());
        try {
            this.controller.createSocialPerformanceRecord(record);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        this.controller.closeConnection();
    }

    @Override
    public SalesMan readSalesMan(int sid) {
        this.controller.openConnection();
        SalesMan sm = null;

        try {
            sm = this.controller.getSalesManById(sid);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        this.controller.closeConnection();

        return sm;
    }

    @Override
    public List<SalesMan> readAllSalesMen() {
        this.controller.openConnection();
        List<SalesMan> sm = null;

        try {
            sm = this.controller.listSalesMan();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        this.controller.closeConnection();

        return sm;
    }

    @Override
    public List<SocialPerformanceRecord> readAllSocialPerformanceRecord() {
        this.controller.openConnection();
        List<SocialPerformanceRecord> srList = null;
        try{
            srList = this.controller.listSocialPerformanceRecord();
        }catch(Exception e){
            throw new RuntimeException(e);
        }

        this.controller.closeConnection();
        return srList;
    }

    @Override
    public void deleteSalesMan(SalesMan sm) {
        try{
            List<SocialPerformanceRecord> sprList = this.readSocialPerformanceRecord(sm);
            this.controller.openConnection();
            for(SocialPerformanceRecord spr : sprList){
                this.controller.deleteSocialPerformanceRecord(spr.getId());
            }
            this.controller.deleteSalesMan(sm.getId());
            this.controller.closeConnection();
        }catch(Exception e){
            throw new RuntimeException(e);
        }
    }

    @Override
    public void deleteSocialPerformanceRecord(SocialPerformanceRecord record) {
        this.controller.openConnection();

        try{
            this.controller.deleteSocialPerformanceRecord(record.getId());
        }catch( Exception e){
            throw new RuntimeException(e);
        }

        this.controller.closeConnection();
    }

    @Override
    public void deleteAllSalesMan(){
        List<SalesMan> smList = this.readAllSalesMen();

        for(SalesMan sm : smList){
            this.deleteSalesMan(sm);
        }
    }

    @Override
    public void deleteAllSocialPerformanceRecord(){
        List<SocialPerformanceRecord> sprList = this.readAllSocialPerformanceRecord();
        for(SocialPerformanceRecord spr : sprList){
            this.deleteSocialPerformanceRecord(spr);
        }
    }

    @Override
    public List<SocialPerformanceRecord> readSocialPerformanceRecord(SalesMan salesMan) {
        this.controller.openConnection();
        List<SocialPerformanceRecord> sprOfSm = new ArrayList<SocialPerformanceRecord>();

        try{
            List<SocialPerformanceRecord> sprList = controller.listSocialPerformanceRecord();

            for(SocialPerformanceRecord spr : sprList){
                if(spr.getSalesManId() == salesMan.getId()){
                    sprOfSm.add(spr);
                }
            }

        } catch (Exception e){
            throw new RuntimeException(e);
        }

        this.controller.closeConnection();

        return sprOfSm;
    }
}
