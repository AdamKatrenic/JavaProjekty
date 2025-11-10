package com.example.adamdev.zoznamzamestnancov.dto;

import com.example.adamdev.zoznamzamestnancov.model.ZamestnanecObchod;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

public class ZamestnanecObchodDTO {
    private Integer id;
    private String meno;
    private String pozicia;
    private String recommendation;

    // Gettery a Settery
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getMeno() { return meno; }
    public void setMeno(String meno) { this.meno = meno; }

    public String getPozicia() { return pozicia; }
    public void setPozicia(String pozicia) { this.pozicia = pozicia; }

    public String getRecommendation() { return recommendation; }
    public void setRecommendation(String recommendation) { this.recommendation = recommendation; }

}

