import { useFormik } from "formik";
import { Stack, Input, Button, Textarea, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import emailjs from '@emailjs/browser';
import { EMAILJS_TEMPLATE_ID, EMAILJS_SENDER_PUBLIC_KEY } from "./config"


export const EmailInterface = (props) => {
	
	const [sentState, setSentState] = useState(false);
	const [isSending, setIsSending] = useState(false);

	useEffect(()=>{
		window.alert = function(){return null;}; // disable alerts	
	},[])

	const handleBackFromEmail = (e) => {
		e.preventDefault();
		props.setEmailButtonIsClicked(false);
		props.setPartnerButtonWasClicked(false);


	}

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
	
		emailjs.send(props.emailJsId, EMAILJS_TEMPLATE_ID, values, EMAILJS_SENDER_PUBLIC_KEY)
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
					{!sentState ? 
						(isSending ? 
							<Button isLoading loadingText='Sending...' type='submit' value="Send"></Button>	
							: <Button type='submit' value="Send">Send</Button>
						)
						: <Button colorScheme={'green'}>Sent!</Button> 
					}

				</div>	

			</form>
			<Button onClick={handleBackFromEmail}>Back</Button>


		</Stack>
	)
};