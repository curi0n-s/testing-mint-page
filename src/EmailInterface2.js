import { useFormik } from "formik";
import { Input, Button, Textarea } from "@chakra-ui/react";
import emailjs from '@emailjs/browser';

export const EmailInterface2 = () => {
	const formik = useFormik({
		initialValues: {
			from_name: '0x8eaFB616e4519578195b32C2d5e07578F2E1cB87@gfc.io',
			message: '',
		},
		onSubmit: (values) => {
		  alert(JSON.stringify(values, null, 2))
		  sendEmail(values);
		}
	})

	const sendEmail = (values) => {
		//e.preventDefault();
	
		emailjs.send('service_1t5sfk8', 'template_7m8fg8n', values, 'sgk0lRe-Hctm-O0VB')
		  .then((result) => {
			  console.log(result.text);
		  }, (error) => {
			  console.log(error.text);
		  });
	};

	return (
		<form onSubmit={formik.handleSubmit}>
			<label htmlFor='from'>Sender</label>
			<Input
			id='from_name'
			name='from_name'
			type='email'
			onChange={formik.handleChange}
			value={formik.values.from_name}
			disabled={true}
			size='lg'
			/>
			<label htmlFor='message'>Order Message</label>
			<Textarea
			id='message'
			name='message'
			type='text'
			onChange={formik.handleChange}
			value={formik.values.message}
			size='lg'
			height='200px'
			padding={'20px'}
			/>
			<Button type='submit' value="Send">Submit</Button>
			
		</form>
	)
};