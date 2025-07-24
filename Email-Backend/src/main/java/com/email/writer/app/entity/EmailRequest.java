package com.email.writer.app.entity;

import lombok.Data;

@Data // ✅ Add this annotation back
public class EmailRequest {
    private String emailContent;
    private String tone;
}
