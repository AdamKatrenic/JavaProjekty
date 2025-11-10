package com.example.adamdev.zoznamzamestnancov.mapper;

import com.example.adamdev.zoznamzamestnancov.model.ZamestnanecObchod;
import com.example.adamdev.zoznamzamestnancov.dto.ZamestnanecObchodDTO;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface ZamestnanecObchodMapper {

    ZamestnanecObchodMapper INSTANCE = Mappers.getMapper(ZamestnanecObchodMapper.class);

    ZamestnanecObchodDTO toDto(ZamestnanecObchod entity);

    ZamestnanecObchod toEntity(ZamestnanecObchodDTO dto);

}