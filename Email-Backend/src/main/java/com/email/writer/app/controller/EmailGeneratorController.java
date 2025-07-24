        package com.email.writer.app.controller;

        import com.email.writer.app.entity.EmailRequest;
        import com.email.writer.app.service.EmailGeneratorService;
        import lombok.AllArgsConstructor;
        import org.springframework.http.ResponseEntity;
        import org.springframework.web.bind.annotation.*;

        @RestController
        @AllArgsConstructor
        @CrossOrigin(origins = "https://email-assistant-omega.vercel.app")
        public class EmailGeneratorController {

            private final EmailGeneratorService emailGeneratorService;

            // ✅ Main endpoint
            @PostMapping("/api/email/generate")
            public ResponseEntity<String> generateEmail(@RequestBody EmailRequest emailRequest) {
                String response = emailGeneratorService.generateEmailReply(emailRequest);
                return ResponseEntity.ok(response);
            }

            // ✅ Default endpoint (acts like generateEmail with a default EmailRequest)
            @GetMapping("/")
            public ResponseEntity<String> defaultGenerate() {
                EmailRequest defaultRequest = new EmailRequest();
                defaultRequest.setEmailContent("Can you confirm the meeting schedule?");
                defaultRequest.setTone("professional");

                String response = emailGeneratorService.generateEmailReply(defaultRequest);
                return ResponseEntity.ok("✅ Email generated using default input:\n\n" + response);
            }
        }
