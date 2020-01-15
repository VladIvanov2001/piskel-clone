class AdjustmentTools{
    constructor(DOMcanvas) {
        this.DOMcanvas = DOMcanvas;
        this.init();
    }

    init() {
        this.adjustmentPanel = document.createElement('div');
        this.adjustmentPanel.className = 'adjustment_panel';

        this.resolutionPanel = document.createElement('div');
        this.resolutionPanel.className = 'adjustment_panel__res_panel';

        this.makeResolutionButton(1, '|');
        this.makeResolutionButton(2, '||');
        this.makeResolutionButton(3, '|||');
        this.makeResolutionButton(4, '||||');

        this.resLabel = document.createElement('span');
        this.resLabel.textContent = 'pencil size';




        this.cnvSizePanel = document.createElement('div');
        this.cnvSizePanel.className = 'adjustment_panel__cnv_panel';

        this.makeCnvButton(128, '32x32');
        this.makeCnvButton(256, '64x64');
        this.makeCnvButton(512, '128x128');

        this.cnvLabel = document.createElement('span');
        this.cnvLabel.textContent = 'canvas size';

        this.adjustmentPanel.appendChild(this.resolutionPanel);
        this.adjustmentPanel.appendChild(this.resLabel);
        this.adjustmentPanel.appendChild(this.cnvSizePanel);
        this.adjustmentPanel.appendChild(this.cnvLabel);

        const main = document.getElementsByTagName('main')[0];
        main.appendChild(this.adjustmentPanel);
    }

    makeResolutionButton(resCoeff, btnText) {
        const resBtn = document.createElement('button');

        resBtn.thisObject = this;
        resBtn.resCoeff = resCoeff;
        resBtn.className = 'adjustment_panel__res_panel__res_btn';
        resBtn.textContent = btnText;
        resBtn.onclick = function() {
            const resProportion = 32;
            this.thisObject.DOMcanvas.resolution = this.resCoeff * this.thisObject.DOMcanvas.width / resProportion;
        };

        this.resolutionPanel.appendChild(resBtn);
    }

    makeCnvButton(cnvWidth, btnText) {
        const cnvBtn = document.createElement('button');
        cnvBtn.thisObject = this;
        cnvBtn.cnvWidth = cnvWidth;
        cnvBtn.className = 'adjustment_panel__cnv_panel__cnv_btn';
        cnvBtn.textContent = btnText;
        cnvBtn.onclick = function() {
            const canvas = this.thisObject.DOMcanvas.canvas;

            const oldWidth = this.thisObject.DOMcanvas.width;
            const resCoeff = this.cnvWidth / oldWidth;
            this.thisObject.DOMcanvas.resolution *= resCoeff;

            this.thisObject.DOMcanvas.width = this.cnvWidth;
            this.thisObject.DOMcanvas.height = this.cnvWidth;

            canvas.setAttribute('height', this.cnvWidth);
            canvas.setAttribute('width', this.cnvWidth);

            this.thisObject.DOMcanvas.drawDefault();

            this.thisObject.DOMcanvas.changeTool('p');
        };

        this.cnvSizePanel.appendChild(cnvBtn);
    }
}

export default AdjustmentTools;
