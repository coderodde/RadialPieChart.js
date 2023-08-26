class RadialPiechart {
    
    static #rgb_alphabet_set = new Set();

    #canvas_id;
    #entries = [];
    #maximum_radius;
    #start_angle;
    #empty_pie_chart_color = "";
    #canvas_background_color = "";

    static {
        this.#rgb_alphabet_set.add("0");
        this.#rgb_alphabet_set.add("1");
        this.#rgb_alphabet_set.add("2");
        this.#rgb_alphabet_set.add("3");
        this.#rgb_alphabet_set.add("4");
        this.#rgb_alphabet_set.add("5");
        this.#rgb_alphabet_set.add("6");
        this.#rgb_alphabet_set.add("7");
        this.#rgb_alphabet_set.add("8");
        this.#rgb_alphabet_set.add("9");
        this.#rgb_alphabet_set.add("a");
        this.#rgb_alphabet_set.add("b");
        this.#rgb_alphabet_set.add("c");
        this.#rgb_alphabet_set.add("d");
        this.#rgb_alphabet_set.add("e");
        this.#rgb_alphabet_set.add("f");
    }

    constructor(canvas_id,
                maximum_radius = 100,
                start_angle = 0.0, 
                empty_pie_chart_color = "#000",
                canvas_background_color = "#fff") {

        this.#canvas_id = canvas_id;

        start_angle %= 360.0;

        if (start_angle < 0.0) {
            start_angle += 360.0;
        }

        this.#start_angle = start_angle;

        this.#empty_pie_chart_color = 
            this.#validateColor(empty_pie_chart_color);

        this.#canvas_background_color =
            this.#validateColor(canvas_background_color); 
    }
    
    addEntry(value, color) {
        const entry = {
            "value": this.#validateValue(value),
            "color": this.#validateColor(color)
        };

        this.#entries.push(entry);
    }

    getMaximumRadius() {
        return this.#maximum_radius;
    }

    getStartAngle() {
        return this.#start_angle;
    }

    getValueAt(index) {
        this.#checkIndex(index);
        return this.#entries[index]["value"];
    }

    getColorAt(index) {
        this.#checkIndex(index);
        return this.#entries[index]["color"];
    }

    setStartAngle(start_angle) {
        this.#start_angle = start_angle;
        this.#start_angle %= 360.0;

        if (this.#start_angle < 0.0) {
            this.#start_angle += 360.0;
        }
    }

    setMaximumRadius(new_maximum_radius) {
        this.#validateValue(new_maximum_radius);
        this.#maximum_radius = new_maximum_radius;
    }

    setValueAt(index, new_value) {
        this.#checkIndex(index);
        this.#entries[index]["value"] = this.#validateValue(new_value);
    }

    setColorAt(index, new_color) {
        this.#checkIndex(index);
        this.#entries[index]["color"] = this.#validateColor(new_color);
    }

    removeEntry(index) {
        if (this.#entries.length === 0) {
            throw "Removing from an empty list.";
        }

        this.#checkIndex(index);
        this.#entries.splice(index, 1);
    }

    render() {
        const canvas = document.getElementById(this.#canvas_id);
        const ctx = canvas.getContext("2d");

        ctx.canvas.width  = this.#maximum_radius * 2;
        ctx.canvas.height = this.#maximum_radius * 2;

        ctx.fillStyle = this.#canvas_background_color;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
    
    static #validateValue(value) {
        if (value < 0) {
            throw "Value (" + value + ") can not be negative.";
        }
        
        return value;
    }
    
    static #validateColor(color) {
        color = color.trim().toLowerCase();
        
        if (color.length != 4 && color.length != 7) {
            throw "Invalid color string. Color string of length "
                    + color.length
                    + ". Must be 4 or 7.";
        }
        
        if (color[0] !== "#") {
            throw "Invalid color string. The first character must be " + 
                  "the hash #.";
        }
        
        for (ch in color) {
            if (!this.#rgb_alphabet_set.has(ch)) {
                throw "Character " + ch + " is not allowed in RGB values.";
            }
        }
        
        return color;
    }

    #checkIndex(index) {
        if (this.#entries.length === 0) {
            throw "Indexing an empty list.";
        }

        if (index < 0) {
            throw "Index (" + index + ") cannot be negative.";
        }

        if (index >= this.#entries.length) {
            throw "Index (" + index + ") is too large. Must be at most "
                  + this.#entries.length + ".";
        }
    }
}