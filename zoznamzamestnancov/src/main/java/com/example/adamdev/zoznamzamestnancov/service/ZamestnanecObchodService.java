package com.example.adamdev.zoznamzamestnancov.service;

import com.example.adamdev.zoznamzamestnancov.AIService;
import com.example.adamdev.zoznamzamestnancov.model.ZamestnanecObchod;
import com.example.adamdev.zoznamzamestnancov.repository.ZamestnanecObchodRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ZamestnanecObchodService {

    private final ZamestnanecObchodRepository repository;
    private final AIService aiService;

    public ZamestnanecObchodService(ZamestnanecObchodRepository repository, AIService aiService) {
        this.repository = repository;
        this.aiService = aiService;
    }

    public List<ZamestnanecObchod> getZamestnanecObchod() {
        return repository.findAll();
    }

    public ZamestnanecObchod getZamestnanecObchodById(Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Zamestnanec s ID " + id + " neexistuje"));
    }

    public ZamestnanecObchod insertZamestnanecObchod(ZamestnanecObchod zamestnanecObchod) {
        String prompt = String.format(
                "Based on the programming tech stack %s that %s has given, provide a full learning path and recommendations",
                zamestnanecObchod.getPozicia(), zamestnanecObchod.getMeno()
        );
        String recommendation = aiService.chat(prompt);
        zamestnanecObchod.setRecommendation(recommendation);
        return repository.save(zamestnanecObchod);
    }

    public ZamestnanecObchod updateZamestnanecObchod(Integer id, ZamestnanecObchod update) {
        ZamestnanecObchod existing = repository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Zamestnanec s ID " + id + " neexistuje"));
        existing.setMeno(update.getMeno());
        existing.setPozicia(update.getPozicia());
        existing.setRecommendation(update.getRecommendation());
        return repository.save(existing);
    }

    public void deleteZamestnanecObchodById(Integer id) {
        boolean exists = repository.existsById(id);
        if (!exists) throw new IllegalStateException("Zamestnanec s ID " + id + " neexistuje");
        repository.deleteById(id);
    }
}
