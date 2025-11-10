package com.marketplace.marketadam.repository;

import com.marketplace.marketadam.model.Listing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ListingRepository extends JpaRepository<Listing, Long> {
    //sem nahadzeme query metody -adam
}
