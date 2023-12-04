import { AbstractMovable } from "@/app/ui/movable_view";
import { Vector2 } from "@/utility/VectorMath";
import { useEffect, useMemo, useState } from "react";
import { EventID } from "@/static_data";
import { PointBoxSection } from "@/utility/static_utility";

export class RenderSourcePanel extends AbstractMovable {

    constructor() {
        super();
        this.id = "float_source_panel";

    }
    show(is_show: boolean) {
        super.show(is_show);
    }

    render() {
        return(
            <div id={this.id}>
                <h2>AI Tool</h2>
                <section>
                    <label>Source</label>
                    <input type="text"></input>
                </section>
                <button className="button">Set Link</button>
            </div>
        )
    }
}

export class RenderSideActionBar extends AbstractMovable {
    
    constructor() {
        super();
        this.id = "float_action_bar";
    }

    show(is_show: boolean) {
        super.show(is_show);
    }

    render() {
        return(
            <div id={this.id}>
                <button>Image</button>
                <hr></hr>
                <button>AI tool</button>
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