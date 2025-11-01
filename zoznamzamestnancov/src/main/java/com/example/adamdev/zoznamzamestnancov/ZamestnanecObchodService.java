package com.example.adamdev.zoznamzamestnancov;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ZamestnanecObchodService {

    private final ZamestnanecObchodRepository ZamestnanecObchodRepository;
    private final AIService aIService;

    public ZamestnanecObchodService(ZamestnanecObchodRepository ZamestnanecObchodRepository, AIService aIService) {
        this.ZamestnanecObchodRepository = ZamestnanecObchodRepository;
        this.aIService = aIService;
    }

    public List<ZamestnanecObchod> getZamestnanecObchod() {
        return ZamestnanecObchodRepository.findAll();
    }

    public void insertZamestnanecObchod(ZamestnanecObchod zamestnanecObchod) {
        String prompt = """
                Based on the programming tech stack %s that %s has given
                Provide a full learning path and recommendations for this person
                """.formatted(zamestnanecObchod.getPozicia(), zamestnanecObchod.getMeno());

        String chatRes = aIService.chat(prompt);
        zamestnanecObchod.setRecommendation(chatRes);
        ZamestnanecObchodRepository.save(zamestnanecObchod);
    }

    public ZamestnanecObchod getZamestnanecObchodById(Integer id) {
        return ZamestnanecObchodRepository.findById(id).orElseThrow(() -> new IllegalStateException(
                id + " not found"));
    }

    public void deleteZamestnanecObchodById(Integer id) {
        boolean exists = ZamestnanecObchodRepository.existsById(id);
        if (!exists) {
            throw new IllegalStateException(id + " not found");
        }
        ZamestnanecObchodRepository.deleteById(id);
    }

    public void updateZamestnanecObchod(Integer id,ZamestnanecObchod update) {
        ZamestnanecObchod zamestnanecObchod = ZamestnanecObchodRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException(
                        id + " not found"));
        zamestnanecObchod.setMeno(update.getMeno());
        zamestnanecObchod.setPozicia(update.getPozicia());
        ZamestnanecObchodRepository.save(zamestnanecObchod);
    }
}
