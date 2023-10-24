'use client';
import { Is_Email } from '@/utility/dynamic_utility';
import {useState, useEffect} from 'react';

const OnNotionEmailSubscription = async function () {
	let inputElement = document.querySelector<HTMLInputElement>(".home_page_subscription input");
	let input_value = inputElement?.value;

	if (input_value != null && Is_Email(input_value)) {
		console.log(input_value);

		await fetch("https://yuri-api.sytes.net/vaiue/email_subscription", {
			method: "POST",
			body: JSON.stringify({
				"email": input_value,
			}),
			headers: {
				"Content-type": "application/json; charset=UTF-8",
			}
		}).then((response) => {

			console.log(response);
			return response.json();

		}).then((x) => {
			console.log(x);
		});
	}

	// if (inputElement != null)
	// 	inputElement.value = "";
}

export const ProcessOnPageLoadedEvent = function() {
    useEffect(() => {

		//Header, Mobile menu btn click
        document.querySelector<HTMLButtonElement>(".navbar-burger")?.addEventListener("click", (e) => {
            (e.target as HTMLButtonElement).classList.toggle("is-active");
            document.querySelector(".navbar-menu")?.classList.toggle("is-active");

        });

		document.querySelector<HTMLButtonElement>(".home_page_subscription button")?.addEventListener("click", (e) => {
			OnNotionEmailSubscription();
		});


	}, []);


    return (
        <div></div>
    );
}