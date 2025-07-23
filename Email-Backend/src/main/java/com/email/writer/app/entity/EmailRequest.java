package com.email.writer.app.entity;

import lombok.Data;

@Data
public class EmailRequest {
    private String emailContent;
    private String tone;
}
