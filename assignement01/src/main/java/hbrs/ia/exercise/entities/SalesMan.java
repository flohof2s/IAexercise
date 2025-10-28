package hbrs.ia.exercise.entities;

public class SalesMan {
    private int id;
    private String name;
    private String email;
    private String phone;
    private String birthday;

    public SalesMan(int id, String name, String email, String phone, String birthday) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.birthday = birthday;
    }

    public int getId(){
        return this.id;
    }

    public String getName() {
        return this.name;
    }

    public String getEmail() {
        return this.email;
    }

    public String getPhone() {
        return this.phone;
    }

    public String getBirthday() {
        return this.birthday;
    }
}
