//https://dashboard.emailjs.com/admin
//https://chakra-ui.com/docs/components/form-control/usage

import React, { useRef, useState } from 'react';
import { Button, FormControl, FormLabel, Input} from '@chakra-ui/react'
import emailjs from '@emailjs/browser';
import { useFormik } from 'formik';
import * as Yup from 'yup';
// import * as emailjs from 'emailjs-com';

export const EmailInterface = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_1t5sfk8', 'template_7m8fg8n', form.current, 'sgk0lRe-Hctm-O0VB')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
    
    <form ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="user_name" />
      <label>Email</label>
      <input type="email" name="user_email" />
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" />
    </form>

    // <FormControl ref={form} onSubmit={sendEmail}>
    //     <FormLabel htmlFor="name">Name</FormLabel>
    //     <Input id="name" name="name" placeholder="Do Kwon" />
    //     <FormLabel htmlFor="email">Email</FormLabel>
    //     <Input id="email" name="email" placeholder="celsius@3ac.terra" />
    //     <FormLabel htmlFor="message">Message</FormLabel>
    //     <Input id="message" name="message" placeholder="Terra 2.0 will be even better..." />
    //     <Input type="submit" value="Send" />
    // </FormControl>
  );
};