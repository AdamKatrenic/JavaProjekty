package com.example.adamdev.zoznamzamestnancov.controller;

import com.example.adamdev.zoznamzamestnancov.dto.ZamestnanecObchodDTO;
import com.example.adamdev.zoznamzamestnancov.mapper.ZamestnanecObchodMapper;
import com.example.adamdev.zoznamzamestnancov.service.ZamestnanecObchodService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/v1/zamestnanci-obchodu")
public class ZamestnanecObchodController {

    private final ZamestnanecObchodService service;
    private final ZamestnanecObchodMapper mapper;

    public ZamestnanecObchodController(ZamestnanecObchodService service, ZamestnanecObchodMapper mapper) {
        this.service = service;
        this.mapper = mapper;
    }

    @GetMapping
    public List<ZamestnanecObchodDTO> getAll() {
        return service.getZamestnanecObchod().stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());
    }

    @GetMapping("{id}")
    public ZamestnanecObchodDTO getById(@PathVariable Integer id) {
        return mapper.toDto(service.getZamestnanecObchodById(id));
    }

    @PostMapping
    public ZamestnanecObchodDTO create(@RequestBody ZamestnanecObchodDTO dto) {
        var entity = mapper.toEntity(dto);
        var saved = service.insertZamestnanecObchod(entity);
        return mapper.toDto(saved);
    }

    @PutMapping("{id}")
    public ZamestnanecObchodDTO update(@PathVariable Integer id,
                                       @RequestBody ZamestnanecObchodDTO dto) {
        var entity = mapper.toEntity(dto);
        var updated = service.updateZamestnanecObchod(id, entity);
        return mapper.toDto(updated);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable Integer id) {
        service.deleteZamestnanecObchodById(id);
    }
}
