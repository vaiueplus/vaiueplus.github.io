import { Vector2 } from "@/utility/VectorMath";
import { PointBoxSection } from "@/utility/static_utility";
import { MovePanelToPos } from "../platform/tools/floating_panel";

export class AbstractMovable {
    id : string = "";
    is_show: boolean = false;
    protected _dom: HTMLBaseElement | null = null;

    get_dom() {
        if (this.id == "") return null;

        if (this._dom == null)
            this._dom = document.querySelector("#"+this.id) as HTMLBaseElement;

        return this._dom;
    }

    show(is_show: boolean) {
        this.is_show = is_show;
        let dom = this.get_dom();

        if (dom == undefined) return;

        dom.style.display = (is_show) ? "flex" : "none";
    }

    get_bound() {
        let dom = this.get_dom();
        return dom?.getBoundingClientRect();
    }

    set_position(x: number, y: number) {
        let dom = this.get_dom();

        if (dom == undefined) return;

        let bound = dom?.getBoundingClientRect();

        MovePanelToPos(dom, bound, x, y);
    };
    
    mouse_down_event(position: Vector2) {
        let bound = this.get_bound();
        
        if (bound == undefined) return;

        let is_mouse_within = PointBoxSection(position.x, position.y, bound.left, bound.right, bound.top, bound.bottom);

        if (!is_mouse_within) this.show(false);
    }
}