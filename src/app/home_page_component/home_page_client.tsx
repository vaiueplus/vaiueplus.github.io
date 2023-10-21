'use client';
import {useState, useEffect} from 'react';

export const HandleHeaderCompClickEvent = function() {
    useEffect(() => {
		document.querySelector<HTMLButtonElement>(".navbar-burger")?.addEventListener("click", (e) => {
            (e.target as HTMLButtonElement).classList.toggle("is-active");
            document.querySelector(".navbar-menu")?.classList.toggle("is-active");

        });
      }, []);
    
    return (
        <div></div>
    );
}