package com.example.demo.model;

import com.example.demo.enums.Department;
import com.example.demo.enums.Gender;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Entity
@Table(name="personel")
@Getter
@Setter
public class Personel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(name="first_name")
    private String firstName;

    private String surname;

    private Double salary;

    @JsonProperty("isMarried")
    @Column(name="is_married")
    private boolean isMarried;

    @Enumerated(EnumType.STRING)
    private Department department;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Column(name="birth_date")
    //@JsonFormat(pattern="dd/MM/yyyy")
    //@DateTimeFormat(pattern="dd/MM/yyyy")
    private Date birthDate;


}
