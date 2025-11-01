package com.example.adamdev.zoznamzamestnancov;

import jakarta.servlet.http.HttpSession;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/zamestnanci-obchodu")
public class ZamestnanecObchodController {

    private final ZamestnanecObchodService zamestnanecObchodService;

    public ZamestnanecObchodController(ZamestnanecObchodService zamestnanecObchodService) {
        this.zamestnanecObchodService = zamestnanecObchodService;
    }

    @GetMapping
    public List<ZamestnanecObchod> getZamestnanecObchod(){
        return zamestnanecObchodService.getZamestnanecObchod();
    }

    @PostMapping
    public void addNewZamestnanec(
            @RequestBody ZamestnanecObchod zamestnanecObchod){
        zamestnanecObchodService.insertZamestnanecObchod(zamestnanecObchod);
    }

    @GetMapping("{id}")
    public ZamestnanecObchod getZamestnanecById(
            @PathVariable Integer id
    ){
        return zamestnanecObchodService.getZamestnanecObchodById(id);
    }

    @DeleteMapping("{id}")
    public void deleteZamestnanecObchodById(@PathVariable Integer id){
        zamestnanecObchodService.deleteZamestnanecObchodById(id);
    }

    @PutMapping("{id}")
    public void updateSoftwareEngineer(@PathVariable Integer id,
                                       @RequestBody ZamestnanecObchod zamestnanecObchod) {
        zamestnanecObchodService.updateZamestnanecObchod(id, zamestnanecObchod);
    }
}
