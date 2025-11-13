package com.marketplace.marketadam.user;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:4200") // pre Angular... nechytať -adam
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    //GET metoda pre admina aby si mohol zobraziť všetkých používateľov
    @GetMapping
    public List<MarketUser> getAllUsers() {
        List<MarketUser> users = userRepository.findAll();
        return users;
    }

    //GET metoda pre hľadanie používateľov podľa ID
    @GetMapping("/{id}")
    public ResponseEntity<MarketUser> findById(@PathVariable Long id) {
        return userRepository.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    //POST metoda pre registrovanie uživateľa (vratit sa k tomu)

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody MarketUser marketUser) {

        //ak sa niekto bude pokúšať prihlásiť pod rovnakým emailom
        if (userRepository.existsByEmail(marketUser.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Používateľ s týmto emailom už existuje! Zadajte iný enail");
        }

        //ak sa niekto bude pokúšať prihlásiť pod rovnakým telefónnym číslom
        if (userRepository.existsByPhoneNumber(marketUser.getPhoneNumber())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Používateľ s týmto telefónnym číslom už existuje! Zadajte iné telefónne číslo");
        }

        //uloženie používateľa ak má platné telefónne číslo a email
        MarketUser savedUser = userRepository.save(marketUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }

    // PUT metoda ktora aktualizuje uzivatelske data
    @PutMapping("/{id}")
    public ResponseEntity<MarketUser> updateUser(@PathVariable Long id, @Valid @RequestBody MarketUser updatedUser) {
        return userRepository.findById(id).map(user -> {
            user.setName(updatedUser.getName());
            user.setSurname(updatedUser.getSurname());
            user.setEmail(updatedUser.getEmail());
            user.setPhoneNumber(updatedUser.getPhoneNumber());
            user.setPassword(updatedUser.getPassword());
            userRepository.save(user);
            return ResponseEntity.ok(user);
        }).orElse(ResponseEntity.notFound().build());
    }

    //DELETE metoda
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
