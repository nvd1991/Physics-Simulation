const Letter = function () {
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
        'α', 'β', 'Γ', 'γ', 'Δ', 'δ', 'ε', 'ζ', 'η', 'θ', 'ι', 'Λ', 'λ', 'μ', 'Ξ', 'ξ', 'Π', 'π', 'ρ', 'Σ', 'σ', 'ς', 'τ', 'υ', 'Φ', 'φ', 'χ', 'Ψ', 'ψ', 'Ω', 'ω',
        'غ','ظ','ض','ذ','خ','ث','ت','ش','ر','ق','ص','ف','ع','س','ن','م','ل','ك','ي','ط','ح','ز','و','ه','د','ج','ب','أ',
        '照', '付', '田', '胸', '六', '最', '府', '創', '問', '移', '未', '直', '昨', '航', '改', '害', '回', '真', '今', '際', '道', '追', '湖', '観', '疑', '解', '梗', '報', '知', '裕', '改', '民', '被', '俊', '身', '近', '描',
    ];
    const size0 = 14, size1 = 9, size2 = 11, size3 = 8;
    const angleStep0 = 0.3, angleStep1 = 0.6, angleStep2 = 0.1, angleStep3 = 1.2;

    function Letter(x, y, moreInfo) {
        this.content = '';
        this.opacity = 200;
        this.angle = map(y * moreInfo.heightScale, 0, moreInfo.rows - 1, 0, QUARTER_PI);
        this.color = { r: 255, g: 255, b: 255 };
        switch (x % 4) {
            case 0:
                setup.apply(this, [size0, angleStep0, 1]);
                break;
            case 1:
                setup.apply(this, [size1, angleStep1, 2]);
                break;
            case 2:
                setup.apply(this, [size2, angleStep2, 3]);
                break;
            case 3:
                setup.apply(this, [size3, angleStep3, 4]);
                break;
            default:
                break;
        }

        function setup(customSize, customAngleStep, angleSeed) {
            // shift position down
            this.position = createVector(x * moreInfo.widthScale, y * moreInfo.heightScale + (customSize - 2));
            this.size = customSize;
            //y * seed (to scale accordingly), + x to adjust offset a little bit (I just do it randomly so it looks okay, no real math here)
            this.angle = map(y * moreInfo.heightScale * angleSeed + x * 10, 0, moreInfo.rows - 1, 0, QUARTER_PI);
            this.angleStep = customAngleStep + noise(x);
        }
    }

    Letter.prototype.draw = function () {
        update.apply(this);
        push();
        noStroke();
        fill(this.color.r, this.color.g, this.color.b, this.opacity);
        textSize(this.size);
        text(this.content, this.position.x, this.position.y + this.size);
        pop();
    }

    function update() {
        this.content = letters[ceil(random(0, letters.length - 1))];
        changeOpacity.apply(this);
        changeColor.apply(this);
    }

    function changeOpacity() {
        this.opacity = map(sin(this.angle), -1, 1, 0, 200);
        this.angle -= this.angleStep;
    }

    function changeColor() {
        if (this.opacity > 170) {
            this.color.r = 255;
            this.color.g = 255;
            this.color.b = 255;
        } else {
            this.color.r = 0;
            this.color.g = 204;
            this.color.b = 0;
        }
    }

    return Letter;
}();

