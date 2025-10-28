package hbrs.ia.exercise;

import hbrs.ia.exercise.control.ManagePersonal;
import hbrs.ia.exercise.control.ManagePersonalImpl;
import hbrs.ia.exercise.entities.SalesMan;
import hbrs.ia.exercise.entities.SocialPerformanceRecord;
import hbrs.ia.exercise.persistence.MongoDBControllerImpl;
import hbrs.ia.exercise.persistence.MongoDBControllerInterface;

/**
 * Hello world!
 */
public class App {
    public static void main(String[] args) {
        MongoDBControllerInterface mongoDBController = new MongoDBControllerImpl();
        ManagePersonal managePersonal = new ManagePersonalImpl(mongoDBController);

        SalesMan sm1 = new SalesMan(0,"Fabian Lohoff","fabian.lohoff@smail.inf.h-brs.de","017698765","11.07.2002");
        SalesMan sm2 = new SalesMan(1,"Kilian Müller","kilian.mueller@smail.inf.h-brs.de","01934567","31.12.2006");

        SocialPerformanceRecord spr1 = new SocialPerformanceRecord(0,0,"2023",9.5);
        SocialPerformanceRecord spr2 = new SocialPerformanceRecord(1,0,"2024",8.4);
        SocialPerformanceRecord spr3 = new SocialPerformanceRecord(2,0,"2025",9.7);

        SocialPerformanceRecord spr4 = new SocialPerformanceRecord(3,1,"2023",3.6);
        SocialPerformanceRecord spr5 = new SocialPerformanceRecord(4,1,"2024",7.8);
        SocialPerformanceRecord spr6 = new SocialPerformanceRecord(5,1,"2025",2.9);

        managePersonal.deleteAllSalesMan();

        managePersonal.createSalesMan(sm1);
        managePersonal.createSalesMan(sm2);

        managePersonal.addSocialPerformanceRecord(spr1,sm1);
        managePersonal.addSocialPerformanceRecord(spr2,sm1);
        managePersonal.addSocialPerformanceRecord(spr3,sm1);
        managePersonal.addSocialPerformanceRecord(spr4,sm2);
        managePersonal.addSocialPerformanceRecord(spr5,sm2);
        managePersonal.addSocialPerformanceRecord(spr6,sm2);

        System.out.println(managePersonal.readSalesMan(0).getName());
        System.out.println(managePersonal.readSalesMan(1).getName());
        System.out.println(managePersonal.readAllSalesMen().size());

        System.out.println(managePersonal.readSocialPerformanceRecord(managePersonal.readSalesMan(0)).get(0).getScore());
    }
}
