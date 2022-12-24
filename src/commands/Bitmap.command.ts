export function getBitmapCommand(): Function {
    return () => {
        const alias_Bitmap_initialize = Bitmap.prototype.initialize;
        Bitmap.prototype.initialize = function (width: number, height: number) {
            alias_Bitmap_initialize.call(this, width, height);
            this.fontBold = false;
            this.fontGradient = false;
            this.highlightTextColor = null;
        };

        Bitmap.prototype.setGradient = function (
            text,
            color1,
            color2,
            color3,
            tx,
            ty
        ) {
            const context = this._context;
            const tWidth = this.measureTextWidth(text);
            context.save();
            const gradient = context.createLinearGradient(
                tx,
                0,
                tx + tWidth,
                0
            );
            gradient.addColorStop(0, color1);
            gradient.addColorStop(0.6, color2);
            gradient.addColorStop(1, color3);
            context.restore();

            this._baseTexture.update();

            return gradient;
        };

        Bitmap.prototype.setGradientStyle = function (
            text,
            color1,
            color2,
            color3,
            tx,
            ty
        ) {
            const context = this._context;
            const width = this.measureTextWidth(text);
            const height = RS.MessageSystem.Params.lineHeight;
            let grd;

            context.save();

            const style = RS.MessageSystem.Params.gradientStyle;

            if (style !== "radial") {
                if (style.contains("horizontal")) {
                    grd = context.createLinearGradient(tx, 0, tx + width, 0);
                } else {
                    grd = context.createLinearGradient(tx, 0, 0, ty + height);
                }
            } else {
                const ws = width * 0.5;
                const hs = height * 0.5;
                grd = context.createRadialGradient(ws, hs, 0.0, ws, hs, ws);
            }

            if (style === "radial") {
                grd.addColorStop(0.0, color1);
                grd.addColorStop(1.0, color2);
            } else if (style.contains("axial")) {
                grd.addColorStop(0.0, color1);
                grd.addColorStop(0.5, color2);
                grd.addColorStop(1.0, color3);
            } else {
                grd.addColorStop(0.0, color1);
                grd.addColorStop(1.0, color2);
            }

            context.restore();

            this._baseTexture.update();

            return grd;
        };

        Bitmap.prototype._makeFontNameText = function () {
            return (
                (this.fontItalic ? "Italic " : "") +
                (this.fontBold ? "bold " : "") +
                this.fontSize +
                "px " +
                this.fontFace
            );
        };

        Bitmap.prototype._drawTextBody = function (text, tx, ty, maxWidth) {
            const context = this._context;
            context.save(); // 드로잉 상태 저장
            context.imageSmoothingEnabled =
                RS.MessageSystem.Params.fontSmoothingEnabled;

            if (this.fontGradient) {
                var gradient = this.setGradientStyle(
                    text,
                    RS.MessageSystem.Params.gradientColor1,
                    RS.MessageSystem.Params.gradientColor2,
                    RS.MessageSystem.Params.gradientColor3,
                    tx,
                    ty
                );
                context.fillStyle = gradient;
            } else {
                context.fillStyle = this.textColor;
            }
            context.fillText(text, tx, ty, maxWidth);
            context.fillStyle = this.textColor;
            context.restore();
        };
    };
}
