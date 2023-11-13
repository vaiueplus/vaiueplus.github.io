'use client';
import { Is_Email, DoDelayAction } from '@/utility/static_utility';
import {useState, useEffect} from 'react';

const OnNotionEmailSubscription = async function () {
	let inputElement = document.querySelector<HTMLInputElement>(".home_page_subscription input");
	let indicationElement = document.querySelector<HTMLParagraphElement>(".home_page_subscription .email_indication");

	let input_value = inputElement?.value;

	DoDelayAction(3000, () => {
		if (indicationElement != null) indicationElement.innerHTML = "";
	});

	if (input_value != null && Is_Email(input_value) && indicationElement != null) {
		if (inputElement != null) inputElement.value = "";
		indicationElement.style.display = "block";
		indicationElement.style.color = "green";
		indicationElement.innerHTML = "傳送完成"

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
		
		return;
	}

	if (indicationElement != null) {
		indicationElement.innerHTML = "Email 規格錯誤"
		indicationElement.style.color = "red";
	}
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