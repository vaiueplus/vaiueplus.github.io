import { AbstractMovable } from "@/app/ui/movable_view";
import { Vector2 } from "@/utility/VectorMath";
import { MouseEventHandler, useEffect, useMemo, useState } from "react";
import { EventID } from "@/static_data";
import { PointBoxSection } from "@/utility/static_utility";
import { FloatActionBarState } from "@/data_structure";

export class RenderSourcePanel extends AbstractMovable {
    _callback: ((id: string, link:string) => void) | null = null;
    private _block_id: string = "";

    constructor() {
        super();
        this.id = "float_source_panel";
    }

    show(is_show: boolean) {
        super.show(is_show);
    }

    setCallback(block_id: string, link_address: string, callback: (id: string, link:string) => void) {
        this._callback = callback;
        this.set_input_value(link_address);
        this._block_id = block_id;
    }

    private on_source_confirm_click() {
        let input_value = this.get_input_value();

        if (input_value == null) return;

        this._callback?.(this._block_id, input_value);
        this.show(false);
    }

    private get_input_value() {
        let input_dom = document.querySelector<HTMLInputElement>("#"+this.id +" input[type='text']");
        let input_value = input_dom?.value;

        return input_value;
    }

    private set_input_value(v: string) {
        let input_dom = document.querySelector<HTMLInputElement>("#"+this.id +" input[type='text']");
        let input_value = input_dom?.value;

        if (input_dom == null || input_value == null) return;

        input_dom.value = v;
    }

    render() {
        return(
            <div id={this.id}>
                <h2>AI Tool</h2>
                <section>
                    <label>Source</label>
                    <input type="text"></input>
                </section>
                <button className="button" onClick={this.on_source_confirm_click.bind(this)}>Set Link</button>
            </div>
        )
    }
}

export class RenderSideActionBar extends AbstractMovable {
    private _callback: ((block_id: string, state: FloatActionBarState) => void) | null = null;
    private _block_id: string = "";

    constructor() {
        super();
        this.id = "float_action_bar";
    }

    setCallback(block_id: string, callback: (block_id: string, state: FloatActionBarState) => void) {
        this._callback = callback;
        this._block_id = block_id;
    }

    show(is_show: boolean) {
        super.show(is_show);
    }

    render() {
        return(
            <div id={this.id}>
                <button onClick={() => this._callback?.(this._block_id, FloatActionBarState.Image)}>Image</button>
                <hr></hr>
                <button onClick={() => this._callback?.(this._block_id, FloatActionBarState.AI_Source)}>AI tool</button>
            </div>
        )
    }
}

export const MovePanelToPos = function(target: HTMLBaseElement, bound: DOMRect, x: number, y: number) {
    let body_width = document.body.clientWidth;
    let body_height = document.body.clientHeight;

    //No stick into right wall
    let offset_x = (x + bound.width) - body_width;
    if (offset_x > 0) x -= offset_x;

    //No stick into bottom wall
    let offset_y = (y + bound.height) - body_height;
    if (offset_y > 0) y -= offset_y;

    target.style.left = x + 'px';
    target.style.top = y + 'px';
}