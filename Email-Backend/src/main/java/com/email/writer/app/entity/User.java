package com.email.writer.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name = "users")
@Data
@Builder  // ✅ Needed for builder() method
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    private String id;

    private String email;

    private String username;
}
