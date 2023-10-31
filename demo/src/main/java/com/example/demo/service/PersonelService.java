package com.example.demo.service;

import com.example.demo.model.Personel;
import com.example.demo.repository.PersonelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PersonelService {
    private final PersonelRepository personelRepository;

    public Personel savePersonel(Personel personel){
    return personelRepository.save(personel);
    }
    public List<Personel> getPersonelList(){
    return personelRepository.findAll();
    }
    public Personel getPersonelById(Long id){
        return personelRepository.findById(id)
        .orElseThrow(()->new RuntimeException("Bu kullanıcı yok."));
    }
    public void deletePersonelById(Long id){
        personelRepository.deleteById(id);
    }
    public Personel updatePersonelById(Personel personel){
        return personelRepository.save(personel);
    }

}
