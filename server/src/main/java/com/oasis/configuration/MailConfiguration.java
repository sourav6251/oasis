package com.oasis.configuration;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

@Configuration
public class MailConfiguration {
    @Value("${mail.host}")
    private String emailHost;
    @Value("${mail.port}")
    private String  emailPort;
    @Value("${mail.id}")
    private String emailID;
    @Value("${mail.password}")
    private String emailPassword;
    @Value("${mail.auth}")
    private String auth;
    @Value("${mail.ssl}")
    private String ssl;
    @Value("${mail.starttls}")
    private String starttls;
    @Value("${email.transport.protocol}")
    private String transportProtocol;

    @Bean
    public JavaMailSender mailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost(emailHost);
        mailSender.setPort(Integer.parseInt(emailPort));

        mailSender.setUsername(emailID);
        mailSender.setPassword(emailPassword);

        Properties props = mailSender.getJavaMailProperties();
//        props.put("mail.smtp.auth", "true");
//        props.put("mail.smtp.ssl.enable", "true");
//        props.put("mail.smtp.starttls.enable", "true");
//        props.put("mail.transport.protocol", "smtp");
//        props.put("mail.debug", "true");
        props.put("mail.smtp.ssl.trust", emailHost);
        props.put("mail.smtp.from", emailID);
        props.put("mail.smtp.auth", auth);
        props.put("mail.smtp.ssl.enable", ssl);
        props.put("mail.smtp.starttls.enable", starttls);
        props.put("mail.transport.protocol", transportProtocol);
        return mailSender;
    }
}