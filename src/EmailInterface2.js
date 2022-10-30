import { useFormik } from "formik";
import { Stack, Input, Button, Textarea, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import emailjs from '@emailjs/browser';

export const EmailInterface2 = (props) => {
	
	const [sentState, setSentState] = useState(false);
	const [isSending, setIsSending] = useState(false);

	const formik = useFormik({
		initialValues: {
			from_name: props.userAddress,
			message: '',
		},
		onSubmit: (values) => {
		  alert(JSON.stringify(values, null, 2))
		  sendEmail(values);
		  setIsSending(true);
		}
	})

	const sendEmail = (values) => {
		//e.preventDefault();
	
		emailjs.send('service_1t5sfk8', 'template_7m8fg8n', values, 'sgk0lRe-Hctm-O0VB')
		  .then((result) => {
			  console.log(result.text);
			  setIsSending(false);
			  setSentState(true);
		  }, (error) => {
			  console.log(error.text);
		  });
	};

	return (
		<Stack spacing={6} align={"center"}>
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
				<div>   				
					{!sentState ? <Button type='submit' value="Send">Submit</Button>	: <Button colorScheme={'green'}>Sent!</Button> }
					{isSending && <Spinner
								align='center'
								thickness='4px'
								speed='0.65s'
								emptyColor='gray.200'
								color='blue.500'
								size='lg'
							/>
					}
				</div>	

			</form>

		</Stack>
	)
};