class RadialPiechart {
    static #rgb_alphabet_set = Set();
    #entries = [];
    
    static {
        #rgb_alphabet_set.add("0");
        #rgb_alphabet_set.add("1");
        #rgb_alphabet_set.add("2");
        #rgb_alphabet_set.add("3");
        #rgb_alphabet_set.add("4");
        #rgb_alphabet_set.add("5");
        #rgb_alphabet_set.add("6");
        #rgb_alphabet_set.add("7");
        #rgb_alphabet_set.add("8");
        #rgb_alphabet_set.add("9");
        #rgb_alphabet_set.add("a");
        #rgb_alphabet_set.add("b");
        #rgb_alphabet_set.add("c");
        #rgb_alphabet_set.add("d");
        #rgb_alphabet_set.add("e");
        #rgb_alphabet_set.add("f");
    }
    
    addEntry(value, color) {
        const entry = {
            "value": validateValue(value),
            "color": validateColor(color)§
        };
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
}