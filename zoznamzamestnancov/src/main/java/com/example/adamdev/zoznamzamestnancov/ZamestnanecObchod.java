package com.example.adamdev.zoznamzamestnancov;

import jakarta.persistence.*;

import java.util.Objects;

@Entity
public class ZamestnanecObchod {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String meno;
    private String pozicia;

    @Column(columnDefinition = "TEXT")
    private String recommendation;

    public ZamestnanecObchod() {
    }

    public ZamestnanecObchod(Integer id,
                             String meno,
                             String pozicia, String recommendation) {
        this.id = id;
        this.meno = meno;
        this.pozicia = pozicia;
        this.recommendation = recommendation;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getMeno() {
        return meno;
    }

    public void setMeno(String meno) {
        this.meno = meno;
    }

    public String getPozicia() {
        return pozicia;
    }

    public void setPozicia(String pozicia) {
        this.pozicia = pozicia;
    }

    public String getRecommendation() {
        return recommendation;
    }

    public void setRecommendation(String recommendation) {
        this.recommendation = recommendation;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        ZamestnanecObchod that = (ZamestnanecObchod) o;
        return Objects.equals(id, that.id) && Objects.equals(meno, that.meno) && Objects.equals(pozicia, that.pozicia) && Objects.equals(recommendation, that.recommendation);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, meno, pozicia, recommendation);
    }
}
