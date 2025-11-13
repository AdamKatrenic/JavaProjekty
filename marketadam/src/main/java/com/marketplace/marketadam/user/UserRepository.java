package com.marketplace.marketadam.user;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<MarketUser, Long> {

    //premenné používateľa
    MarketUser findById(long id);
    MarketUser findByName(String name);
    MarketUser findBySurname(String surname);

    MarketUser findByEmail(String email);
    boolean existsByEmail(String email);

    MarketUser findByPhoneNumber(String phoneNumber);
    boolean existsByPhoneNumber(String phoneNumber);

}
