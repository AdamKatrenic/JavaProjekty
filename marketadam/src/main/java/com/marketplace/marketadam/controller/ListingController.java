package com.marketplace.marketadam.controller;

import com.marketplace.marketadam.model.Listing;
import com.marketplace.marketadam.repository.ListingRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/listings")
@CrossOrigin(origins = "http://localhost:4200") //angular bez toho nepojde. nechytat! -adam
public class ListingController {

    private final ListingRepository listingRepository;

    public ListingController(ListingRepository listingRepository) {
        this.listingRepository = listingRepository;
    }

    //GET metoda - vypise vsetky inzeraty
    @GetMapping
    public List<Listing> findAllListings() {
        return listingRepository.findAll();
    }

    //GET metoda - vyhlada vsetky inzeraty podla ID
    @GetMapping("/{id}")
    public ResponseEntity<Listing> getListingById(@PathVariable Long id) {
        return listingRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    //POST metoda - vytvorenie inzeratu
    @PostMapping
    public Listing createListing(@RequestBody Listing listing) {
        return listingRepository.save(listing);
    }

    //PUT metoda - update informacii v inzerate
    @PutMapping("/{id}")
    public ResponseEntity<Listing> updateListing(@PathVariable Long id, @RequestBody Listing updatedListing) {
        return listingRepository.findById(id)
                //mapovanie vsetkych premennych na upravenie v inzerate
                .map(listing ->  {

                    listing.setTitle(updatedListing.getTitle());
                    listing.setDescription(updatedListing.getDescription());
                    listing.setPrice(updatedListing.getPrice());
                    listing.setCategory(updatedListing.getCategory());
                    listing.setImageURL(updatedListing.getImageURL());
                    listingRepository.save(listing);
                    return ResponseEntity.ok(listing);

                }).orElse(ResponseEntity.notFound().build());
    }

    //DELETE metoda - vymaze inzerat
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteListingById(@PathVariable Long id) {
        if (listingRepository.existsById(id)) {
            listingRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
