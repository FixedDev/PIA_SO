package me.fixeddev.pia;

import jakarta.persistence.*;

@Entity
@Table(name = "students")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    
    @Column(unique = true)
    private String rollNumber;
    
    private Double grade;

    public Student() {}

    public Student(String nombre, String matricula, Double grade) {
        this.name = nombre;
        this.rollNumber = matricula;
        this.grade = grade;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getRollNumber() { return rollNumber; }
    public void setRollNumber(String rollNumber) { this.rollNumber = rollNumber; }
    public Double getGrade() { return grade; }
    public void setGrade(Double grade) { this.grade = grade; }
}