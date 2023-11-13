'use client'

import './note.scss';
import {Combine_API, Combine_Path, FormatString} from '@/utility/static_utility';
import {API} from '@/api_data';
import React, { useMemo, useEffect, useState } from 'react'
import {Database_Item} from '@/data_structure';
import { set_cookie, get_cookie} from "@/utility/dynamic_utility";


export function NoteFloatingBar() {


    return (<div className='note-floating-bar'>
        <section className='container'>
                <img className='note-create-btn' src= {Combine_Path("texture/platform/add-note.png")} ></img>

                <div className='note-items'></div>
        </section>
    </div>)
}
