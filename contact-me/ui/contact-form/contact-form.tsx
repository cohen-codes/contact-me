import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { TextField } from '@cohen-codes/design.inputs.text-field';
import { Button } from '@cohen-codes/design.inputs.button';

export type ContactFormProps = {
  onSubmit: (values: ContactFormType) => void | Promise<void>;
};

export type ContactFormType = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export function ContactForm({ onSubmit: onFormSubmit }: ContactFormProps) {
  const [buttonText, setButtonText] = React.useState('Let’s talk!');
  const contactForm = useFormik({
    initialValues: {
      name: '',
      email: '',
      message: '',
      subject: '',
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Name is required'),
      email: Yup.string()
        .email('Email is invalid')
        .required('Email is required'),
      message: Yup.string()
        .length(5)
        .required('At least say hello? (min 5 chars) :)'),
      subject: Yup.string()
        .length(10)
        .required('Please elaborate a bit more (min 10 chars)'),
    }),
    onSubmit: async (values) => {
      const { name, email, message, subject } = values;
      setButtonText('Sending...');
      await onFormSubmit({ name, email, message, subject });
      setButtonText("We'll be in touch!");
    },
  });

  return (
    <form onSubmit={contactForm.handleSubmit} noValidate>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '16px',
        }}
      >
        <TextField
          id="name"
          fullWidth
          name="name"
          label="Name"
          margin="dense"
          size="small"
          value={contactForm.values.name}
          onChange={contactForm.handleChange}
          onBlur={contactForm.handleBlur}
          helperText={contactForm.touched.name && contactForm.errors.name}
          error={Boolean(
            contactForm.touched.name && Boolean(contactForm.errors.name)
          )}
        />
        <TextField
          id="email"
          fullWidth
          name="email"
          label="Email"
          size="small"
          margin="dense"
          value={contactForm.values.email}
          onChange={contactForm.handleChange}
          onBlur={contactForm.handleBlur}
          helperText={contactForm.touched.email && contactForm.errors.email}
          error={Boolean(
            contactForm.touched.email && Boolean(contactForm.errors.email)
          )}
        />
        <TextField
          id="subject"
          fullWidth
          name="subject"
          label="Subject"
          size="small"
          margin="dense"
          value={contactForm.values.subject}
          onChange={contactForm.handleChange}
          onBlur={contactForm.handleBlur}
          helperText={contactForm.touched.subject && contactForm.errors.subject}
          error={Boolean(
            contactForm.touched.subject && Boolean(contactForm.errors.subject)
          )}
        />
        <TextField
          id="message"
          fullWidth
          name="message"
          label="Message"
          multiline
          rows={4}
          size="small"
          margin="dense"
          value={contactForm.values.message}
          onChange={contactForm.handleChange}
          onBlur={contactForm.handleBlur}
          helperText={contactForm.touched.message && contactForm.errors.message}
          error={Boolean(
            contactForm.touched.message && Boolean(contactForm.errors.message)
          )}
        />
        <div>
          <Button
            value={buttonText}
            type="submit"
            sx={{ width: '208px' }}
            size="large"
            variant="contained"
            disabled={
              contactForm.isSubmitting ||
              !contactForm.isValid ||
              !contactForm.dirty ||
              buttonText === "We'll be in touch!"
            }
            loading={contactForm.isSubmitting}
          />
        </div>
      </div>
    </form>
  );
}
