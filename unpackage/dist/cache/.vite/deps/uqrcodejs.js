var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// C:/Users/Jia/Desktop/代码 (2)/project/node_modules/uqrcodejs/uqrcode.js
var require_uqrcode = __commonJS({
  "C:/Users/Jia/Desktop/代码 (2)/project/node_modules/uqrcodejs/uqrcode.js"(exports, module) {
    !function(o, e) {
      "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (o = "undefined" != typeof globalThis ? globalThis : o || self).UQRCode = e();
    }(typeof window !== "undefined" ? window : global, function() {
      function o(o2) {
        this.mode = r.MODE_8BIT_BYTE, this.data = o2;
      }
      function e(o2, e2) {
        this.typeNumber = o2, this.errorCorrectLevel = e2, this.modules = null, this.moduleCount = 0, this.dataCache = null, this.dataList = new Array();
      }
      o.prototype = { getLength: function(o2) {
        return this.data.length;
      }, write: function(o2) {
        for (var e2 = 0; e2 < this.data.length; e2++)
          o2.put(this.data.charCodeAt(e2), 8);
      } }, e.prototype = { addData: function(e2) {
        var r2 = new o(e2);
        this.dataList.push(r2), this.dataCache = null;
      }, isDark: function(o2, e2) {
        if (o2 < 0 || this.moduleCount <= o2 || e2 < 0 || this.moduleCount <= e2)
          throw new Error(o2 + "," + e2);
        return this.modules[o2][e2];
      }, getModuleCount: function() {
        return this.moduleCount;
      }, make: function() {
        if (this.typeNumber < 1) {
          var o2 = 1;
          for (o2 = 1; o2 < 40; o2++) {
            for (var e2 = v.getRSBlocks(o2, this.errorCorrectLevel), r2 = new p(), t2 = 0, i2 = 0; i2 < e2.length; i2++)
              t2 += e2[i2].dataCount;
            for (i2 = 0; i2 < this.dataList.length; i2++) {
              var n2 = this.dataList[i2];
              r2.put(n2.mode, 4), r2.put(n2.getLength(), h.getLengthInBits(n2.mode, o2)), n2.write(r2);
            }
            if (r2.getLengthInBits() <= 8 * t2)
              break;
          }
          this.typeNumber = o2;
        }
        this.makeImpl(false, this.getBestMaskPattern());
      }, makeImpl: function(o2, r2) {
        this.moduleCount = 4 * this.typeNumber + 17, this.modules = new Array(this.moduleCount);
        for (var t2 = 0; t2 < this.moduleCount; t2++) {
          this.modules[t2] = new Array(this.moduleCount);
          for (var i2 = 0; i2 < this.moduleCount; i2++)
            this.modules[t2][i2] = null;
        }
        this.setupPositionProbePattern(0, 0), this.setupPositionProbePattern(this.moduleCount - 7, 0), this.setupPositionProbePattern(0, this.moduleCount - 7), this.setupPositionAdjustPattern(), this.setupTimingPattern(), this.setupTypeInfo(o2, r2), this.typeNumber >= 7 && this.setupTypeNumber(o2), null == this.dataCache && (this.dataCache = e.createData(this.typeNumber, this.errorCorrectLevel, this.dataList)), this.mapData(this.dataCache, r2);
      }, setupPositionProbePattern: function(o2, e2) {
        for (var r2 = -1; r2 <= 7; r2++)
          if (!(o2 + r2 <= -1 || this.moduleCount <= o2 + r2))
            for (var t2 = -1; t2 <= 7; t2++)
              e2 + t2 <= -1 || this.moduleCount <= e2 + t2 || (this.modules[o2 + r2][e2 + t2] = 0 <= r2 && r2 <= 6 && (0 == t2 || 6 == t2) || 0 <= t2 && t2 <= 6 && (0 == r2 || 6 == r2) || 2 <= r2 && r2 <= 4 && 2 <= t2 && t2 <= 4);
      }, getBestMaskPattern: function() {
        for (var o2 = 0, e2 = 0, r2 = 0; r2 < 8; r2++) {
          this.makeImpl(true, r2);
          var t2 = h.getLostPoint(this);
          (0 == r2 || o2 > t2) && (o2 = t2, e2 = r2);
        }
        return e2;
      }, createMovieClip: function(o2, e2, r2) {
        var t2 = o2.createEmptyMovieClip(e2, r2);
        this.make();
        for (var i2 = 0; i2 < this.modules.length; i2++)
          for (var n2 = 1 * i2, a2 = 0; a2 < this.modules[i2].length; a2++) {
            var d2 = 1 * a2;
            this.modules[i2][a2] && (t2.beginFill(0, 100), t2.moveTo(d2, n2), t2.lineTo(d2 + 1, n2), t2.lineTo(d2 + 1, n2 + 1), t2.lineTo(d2, n2 + 1), t2.endFill());
          }
        return t2;
      }, setupTimingPattern: function() {
        for (var o2 = 8; o2 < this.moduleCount - 8; o2++)
          null == this.modules[o2][6] && (this.modules[o2][6] = o2 % 2 == 0);
        for (var e2 = 8; e2 < this.moduleCount - 8; e2++)
          null == this.modules[6][e2] && (this.modules[6][e2] = e2 % 2 == 0);
      }, setupPositionAdjustPattern: function() {
        for (var o2 = h.getPatternPosition(this.typeNumber), e2 = 0; e2 < o2.length; e2++)
          for (var r2 = 0; r2 < o2.length; r2++) {
            var t2 = o2[e2], i2 = o2[r2];
            if (null == this.modules[t2][i2])
              for (var n2 = -2; n2 <= 2; n2++)
                for (var a2 = -2; a2 <= 2; a2++)
                  this.modules[t2 + n2][i2 + a2] = -2 == n2 || 2 == n2 || -2 == a2 || 2 == a2 || 0 == n2 && 0 == a2;
          }
      }, setupTypeNumber: function(o2) {
        for (var e2 = h.getBCHTypeNumber(this.typeNumber), r2 = 0; r2 < 18; r2++) {
          var t2 = !o2 && 1 == (e2 >> r2 & 1);
          this.modules[Math.floor(r2 / 3)][r2 % 3 + this.moduleCount - 8 - 3] = t2;
        }
        for (r2 = 0; r2 < 18; r2++) {
          t2 = !o2 && 1 == (e2 >> r2 & 1);
          this.modules[r2 % 3 + this.moduleCount - 8 - 3][Math.floor(r2 / 3)] = t2;
        }
      }, setupTypeInfo: function(o2, e2) {
        for (var r2 = this.errorCorrectLevel << 3 | e2, t2 = h.getBCHTypeInfo(r2), i2 = 0; i2 < 15; i2++) {
          var n2 = !o2 && 1 == (t2 >> i2 & 1);
          i2 < 6 ? this.modules[i2][8] = n2 : i2 < 8 ? this.modules[i2 + 1][8] = n2 : this.modules[this.moduleCount - 15 + i2][8] = n2;
        }
        for (i2 = 0; i2 < 15; i2++) {
          n2 = !o2 && 1 == (t2 >> i2 & 1);
          i2 < 8 ? this.modules[8][this.moduleCount - i2 - 1] = n2 : i2 < 9 ? this.modules[8][15 - i2 - 1 + 1] = n2 : this.modules[8][15 - i2 - 1] = n2;
        }
        this.modules[this.moduleCount - 8][8] = !o2;
      }, mapData: function(o2, e2) {
        for (var r2 = -1, t2 = this.moduleCount - 1, i2 = 7, n2 = 0, a2 = this.moduleCount - 1; a2 > 0; a2 -= 2)
          for (6 == a2 && a2--; ; ) {
            for (var d2 = 0; d2 < 2; d2++)
              if (null == this.modules[t2][a2 - d2]) {
                var u2 = false;
                n2 < o2.length && (u2 = 1 == (o2[n2] >>> i2 & 1)), h.getMask(e2, t2, a2 - d2) && (u2 = !u2), this.modules[t2][a2 - d2] = u2, -1 == --i2 && (n2++, i2 = 7);
              }
            if ((t2 += r2) < 0 || this.moduleCount <= t2) {
              t2 -= r2, r2 = -r2;
              break;
            }
          }
      } }, e.PAD0 = 236, e.PAD1 = 17, e.createData = function(o2, r2, t2) {
        for (var i2 = v.getRSBlocks(o2, r2), n2 = new p(), a2 = 0; a2 < t2.length; a2++) {
          var d2 = t2[a2];
          n2.put(d2.mode, 4), n2.put(d2.getLength(), h.getLengthInBits(d2.mode, o2)), d2.write(n2);
        }
        var u2 = 0;
        for (a2 = 0; a2 < i2.length; a2++)
          u2 += i2[a2].dataCount;
        if (n2.getLengthInBits() > 8 * u2)
          throw new Error("code length overflow. (" + n2.getLengthInBits() + ">" + 8 * u2 + ")");
        for (n2.getLengthInBits() + 4 <= 8 * u2 && n2.put(0, 4); n2.getLengthInBits() % 8 != 0; )
          n2.putBit(false);
        for (; !(n2.getLengthInBits() >= 8 * u2 || (n2.put(e.PAD0, 8), n2.getLengthInBits() >= 8 * u2)); )
          n2.put(e.PAD1, 8);
        return e.createBytes(n2, i2);
      }, e.createBytes = function(o2, e2) {
        for (var r2 = 0, t2 = 0, i2 = 0, n2 = new Array(e2.length), a2 = new Array(e2.length), d2 = 0; d2 < e2.length; d2++) {
          var u2 = e2[d2].dataCount, s2 = e2[d2].totalCount - u2;
          t2 = Math.max(t2, u2), i2 = Math.max(i2, s2), n2[d2] = new Array(u2);
          for (var g2 = 0; g2 < n2[d2].length; g2++)
            n2[d2][g2] = 255 & o2.buffer[g2 + r2];
          r2 += u2;
          var l2 = h.getErrorCorrectPolynomial(s2), c2 = new f(n2[d2], l2.getLength() - 1).mod(l2);
          a2[d2] = new Array(l2.getLength() - 1);
          for (g2 = 0; g2 < a2[d2].length; g2++) {
            var m2 = g2 + c2.getLength() - a2[d2].length;
            a2[d2][g2] = m2 >= 0 ? c2.get(m2) : 0;
          }
        }
        var v2 = 0;
        for (g2 = 0; g2 < e2.length; g2++)
          v2 += e2[g2].totalCount;
        var p2 = new Array(v2), C2 = 0;
        for (g2 = 0; g2 < t2; g2++)
          for (d2 = 0; d2 < e2.length; d2++)
            g2 < n2[d2].length && (p2[C2++] = n2[d2][g2]);
        for (g2 = 0; g2 < i2; g2++)
          for (d2 = 0; d2 < e2.length; d2++)
            g2 < a2[d2].length && (p2[C2++] = a2[d2][g2]);
        return p2;
      };
      for (var r = { MODE_NUMBER: 1, MODE_ALPHA_NUM: 2, MODE_8BIT_BYTE: 4, MODE_KANJI: 8 }, t = { L: 1, M: 0, Q: 3, H: 2 }, i = 0, n = 1, a = 2, d = 3, u = 4, s = 5, g = 6, l = 7, h = { PATTERN_POSITION_TABLE: [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]], G15: 1335, G18: 7973, G15_MASK: 21522, getBCHTypeInfo: function(o2) {
        for (var e2 = o2 << 10; h.getBCHDigit(e2) - h.getBCHDigit(h.G15) >= 0; )
          e2 ^= h.G15 << h.getBCHDigit(e2) - h.getBCHDigit(h.G15);
        return (o2 << 10 | e2) ^ h.G15_MASK;
      }, getBCHTypeNumber: function(o2) {
        for (var e2 = o2 << 12; h.getBCHDigit(e2) - h.getBCHDigit(h.G18) >= 0; )
          e2 ^= h.G18 << h.getBCHDigit(e2) - h.getBCHDigit(h.G18);
        return o2 << 12 | e2;
      }, getBCHDigit: function(o2) {
        for (var e2 = 0; 0 != o2; )
          e2++, o2 >>>= 1;
        return e2;
      }, getPatternPosition: function(o2) {
        return h.PATTERN_POSITION_TABLE[o2 - 1];
      }, getMask: function(o2, e2, r2) {
        switch (o2) {
          case i:
            return (e2 + r2) % 2 == 0;
          case n:
            return e2 % 2 == 0;
          case a:
            return r2 % 3 == 0;
          case d:
            return (e2 + r2) % 3 == 0;
          case u:
            return (Math.floor(e2 / 2) + Math.floor(r2 / 3)) % 2 == 0;
          case s:
            return e2 * r2 % 2 + e2 * r2 % 3 == 0;
          case g:
            return (e2 * r2 % 2 + e2 * r2 % 3) % 2 == 0;
          case l:
            return (e2 * r2 % 3 + (e2 + r2) % 2) % 2 == 0;
          default:
            throw new Error("bad maskPattern:" + o2);
        }
      }, getErrorCorrectPolynomial: function(o2) {
        for (var e2 = new f([1], 0), r2 = 0; r2 < o2; r2++)
          e2 = e2.multiply(new f([1, c.gexp(r2)], 0));
        return e2;
      }, getLengthInBits: function(o2, e2) {
        if (1 <= e2 && e2 < 10)
          switch (o2) {
            case r.MODE_NUMBER:
              return 10;
            case r.MODE_ALPHA_NUM:
              return 9;
            case r.MODE_8BIT_BYTE:
            case r.MODE_KANJI:
              return 8;
            default:
              throw new Error("mode:" + o2);
          }
        else if (e2 < 27)
          switch (o2) {
            case r.MODE_NUMBER:
              return 12;
            case r.MODE_ALPHA_NUM:
              return 11;
            case r.MODE_8BIT_BYTE:
              return 16;
            case r.MODE_KANJI:
              return 10;
            default:
              throw new Error("mode:" + o2);
          }
        else {
          if (!(e2 < 41))
            throw new Error("type:" + e2);
          switch (o2) {
            case r.MODE_NUMBER:
              return 14;
            case r.MODE_ALPHA_NUM:
              return 13;
            case r.MODE_8BIT_BYTE:
              return 16;
            case r.MODE_KANJI:
              return 12;
            default:
              throw new Error("mode:" + o2);
          }
        }
      }, getLostPoint: function(o2) {
        for (var e2 = o2.getModuleCount(), r2 = 0, t2 = 0; t2 < e2; t2++)
          for (var i2 = 0; i2 < e2; i2++) {
            for (var n2 = 0, a2 = o2.isDark(t2, i2), d2 = -1; d2 <= 1; d2++)
              if (!(t2 + d2 < 0 || e2 <= t2 + d2))
                for (var u2 = -1; u2 <= 1; u2++)
                  i2 + u2 < 0 || e2 <= i2 + u2 || 0 == d2 && 0 == u2 || a2 == o2.isDark(t2 + d2, i2 + u2) && n2++;
            n2 > 5 && (r2 += 3 + n2 - 5);
          }
        for (t2 = 0; t2 < e2 - 1; t2++)
          for (i2 = 0; i2 < e2 - 1; i2++) {
            var s2 = 0;
            o2.isDark(t2, i2) && s2++, o2.isDark(t2 + 1, i2) && s2++, o2.isDark(t2, i2 + 1) && s2++, o2.isDark(t2 + 1, i2 + 1) && s2++, 0 != s2 && 4 != s2 || (r2 += 3);
          }
        for (t2 = 0; t2 < e2; t2++)
          for (i2 = 0; i2 < e2 - 6; i2++)
            o2.isDark(t2, i2) && !o2.isDark(t2, i2 + 1) && o2.isDark(t2, i2 + 2) && o2.isDark(t2, i2 + 3) && o2.isDark(t2, i2 + 4) && !o2.isDark(t2, i2 + 5) && o2.isDark(t2, i2 + 6) && (r2 += 40);
        for (i2 = 0; i2 < e2; i2++)
          for (t2 = 0; t2 < e2 - 6; t2++)
            o2.isDark(t2, i2) && !o2.isDark(t2 + 1, i2) && o2.isDark(t2 + 2, i2) && o2.isDark(t2 + 3, i2) && o2.isDark(t2 + 4, i2) && !o2.isDark(t2 + 5, i2) && o2.isDark(t2 + 6, i2) && (r2 += 40);
        var g2 = 0;
        for (i2 = 0; i2 < e2; i2++)
          for (t2 = 0; t2 < e2; t2++)
            o2.isDark(t2, i2) && g2++;
        return r2 += 10 * (Math.abs(100 * g2 / e2 / e2 - 50) / 5);
      } }, c = { glog: function(o2) {
        if (o2 < 1)
          throw new Error("glog(" + o2 + ")");
        return c.LOG_TABLE[o2];
      }, gexp: function(o2) {
        for (; o2 < 0; )
          o2 += 255;
        for (; o2 >= 256; )
          o2 -= 255;
        return c.EXP_TABLE[o2];
      }, EXP_TABLE: new Array(256), LOG_TABLE: new Array(256) }, m = 0; m < 8; m++)
        c.EXP_TABLE[m] = 1 << m;
      for (m = 8; m < 256; m++)
        c.EXP_TABLE[m] = c.EXP_TABLE[m - 4] ^ c.EXP_TABLE[m - 5] ^ c.EXP_TABLE[m - 6] ^ c.EXP_TABLE[m - 8];
      for (m = 0; m < 255; m++)
        c.LOG_TABLE[c.EXP_TABLE[m]] = m;
      function f(o2, e2) {
        if (null == o2.length)
          throw new Error(o2.length + "/" + e2);
        for (var r2 = 0; r2 < o2.length && 0 == o2[r2]; )
          r2++;
        this.num = new Array(o2.length - r2 + e2);
        for (var t2 = 0; t2 < o2.length - r2; t2++)
          this.num[t2] = o2[t2 + r2];
      }
      function v(o2, e2) {
        this.totalCount = o2, this.dataCount = e2;
      }
      function p() {
        this.buffer = new Array(), this.length = 0;
      }
      function C(o2) {
        return o2.setFillStyle = o2.setFillStyle || function(e2) {
          o2.fillStyle = e2;
        }, o2.setFontSize = o2.setFontSize || function(e2) {
          o2.font = `${e2}px`;
        }, o2.setTextAlign = o2.setTextAlign || function(e2) {
          o2.textAlign = e2;
        }, o2.setTextBaseline = o2.setTextBaseline || function(e2) {
          o2.textBaseline = e2;
        }, o2.setGlobalAlpha = o2.setGlobalAlpha || function(e2) {
          o2.globalAlpha = e2;
        }, o2.setStrokeStyle = o2.setStrokeStyle || function(e2) {
          o2.strokeStyle = e2;
        }, o2.setShadow = o2.setShadow || function(e2, r2, t2, i2) {
          o2.shadowOffsetX = e2, o2.shadowOffsetY = r2, o2.shadowBlur = t2, o2.shadowColor = i2;
        }, o2.draw = o2.draw || function(o3, e2) {
          e2 && e2();
        }, o2;
      }
      function b(o2, e2) {
        var r2 = this.data = "";
        this.dataEncode = true;
        var t2 = this.size = 200;
        this.useDynamicSize = false, this.dynamicSize = t2;
        var i2 = this.typeNumber = -1;
        this.errorCorrectLevel = b.errorCorrectLevel.H;
        var n2 = this.margin = 0;
        this.areaColor = "#FFFFFF", this.backgroundColor = "rgba(255,255,255,0)", this.backgroundImageSrc = void 0;
        var a2 = this.backgroundImageWidth = void 0, d2 = this.backgroundImageHeight = void 0, u2 = this.backgroundImageX = void 0, s2 = this.backgroundImageY = void 0;
        this.backgroundImageAlpha = 1, this.backgroundImageBorderRadius = 0;
        var g2 = this.backgroundPadding = 0;
        this.foregroundColor = "#000000", this.foregroundImageSrc = void 0;
        var l2 = this.foregroundImageWidth = void 0, h2 = this.foregroundImageHeight = void 0, c2 = this.foregroundImageX = void 0, m2 = this.foregroundImageY = void 0, f2 = this.foregroundImagePadding = 0;
        this.foregroundImageBackgroundColor = "#FFFFFF";
        var v2 = this.foregroundImageBorderRadius = 0, p2 = this.foregroundImageShadowOffsetX = 0, y = this.foregroundImageShadowOffsetY = 0, k = this.foregroundImageShadowBlur = 0;
        this.foregroundImageShadowColor = "#808080";
        var w = this.foregroundPadding = 0, I = this.positionProbeBackgroundColor = void 0, B = this.positionProbeForegroundColor = void 0, S = this.separatorColor = void 0, P = this.positionAdjustBackgroundColor = void 0, E = this.positionAdjustForegroundColor = void 0, L = this.timingBackgroundColor = void 0, D = this.timingForegroundColor = void 0, T = this.typeNumberBackgroundColor = void 0, A = this.typeNumberForegroundColor = void 0, N = this.darkBlockColor = void 0;
        this.base = void 0, this.modules = [], this.moduleCount = 0, this.drawModules = [];
        var M = this.canvasContext = void 0;
        this.loadImage, this.drawReserve = false, this.isMaked = false, Object.defineProperties(this, { data: { get() {
          if ("" === r2 || void 0 === r2)
            throw console.error("[uQRCode]: data must be set!"), new b.Error("data must be set!");
          return r2;
        }, set(o3) {
          r2 = String(o3);
        } }, size: { get: () => t2, set(o3) {
          t2 = Number(o3);
        } }, typeNumber: { get: () => i2, set(o3) {
          i2 = Number(o3);
        } }, margin: { get: () => n2, set(o3) {
          n2 = Number(o3);
        } }, backgroundImageWidth: { get() {
          return void 0 === a2 ? this.dynamicSize : this.useDynamicSize ? this.dynamicSize / this.size * a2 : a2;
        }, set(o3) {
          a2 = Number(o3);
        } }, backgroundImageHeight: { get() {
          return void 0 === d2 ? this.dynamicSize : this.useDynamicSize ? this.dynamicSize / this.size * d2 : d2;
        }, set(o3) {
          d2 = Number(o3);
        } }, backgroundImageX: { get() {
          return void 0 === u2 ? 0 : this.useDynamicSize ? this.dynamicSize / this.size * u2 : u2;
        }, set(o3) {
          u2 = Number(o3);
        } }, backgroundImageY: { get() {
          return void 0 === s2 ? 0 : this.useDynamicSize ? this.dynamicSize / this.size * s2 : s2;
        }, set(o3) {
          s2 = Number(o3);
        } }, backgroundPadding: { get: () => g2, set(o3) {
          g2 = o3 > 1 ? 1 : o3 < 0 ? 0 : o3;
        } }, foregroundImageWidth: { get() {
          return void 0 === l2 ? (this.dynamicSize - 2 * this.margin) / 4 : this.useDynamicSize ? this.dynamicSize / this.size * l2 : l2;
        }, set(o3) {
          l2 = Number(o3);
        } }, foregroundImageHeight: { get() {
          return void 0 === h2 ? (this.dynamicSize - 2 * this.margin) / 4 : this.useDynamicSize ? this.dynamicSize / this.size * h2 : h2;
        }, set(o3) {
          h2 = Number(o3);
        } }, foregroundImageX: { get() {
          return void 0 === c2 ? this.dynamicSize / 2 - this.foregroundImageWidth / 2 : this.useDynamicSize ? this.dynamicSize / this.size * c2 : c2;
        }, set(o3) {
          c2 = Number(o3);
        } }, foregroundImageY: { get() {
          return void 0 === m2 ? this.dynamicSize / 2 - this.foregroundImageHeight / 2 : this.useDynamicSize ? this.dynamicSize / this.size * m2 : m2;
        }, set(o3) {
          m2 = Number(o3);
        } }, foregroundImagePadding: { get() {
          return this.useDynamicSize ? this.dynamicSize / this.size * f2 : f2;
        }, set(o3) {
          f2 = Number(o3);
        } }, foregroundImageBorderRadius: { get() {
          return this.useDynamicSize ? this.dynamicSize / this.size * v2 : v2;
        }, set(o3) {
          v2 = Number(o3);
        } }, foregroundImageShadowOffsetX: { get() {
          return this.useDynamicSize ? this.dynamicSize / this.size * p2 : p2;
        }, set(o3) {
          p2 = Number(o3);
        } }, foregroundImageShadowOffsetY: { get() {
          return this.useDynamicSize ? this.dynamicSize / this.size * y : y;
        }, set(o3) {
          y = Number(o3);
        } }, foregroundImageShadowBlur: { get() {
          return this.useDynamicSize ? this.dynamicSize / this.size * k : k;
        }, set(o3) {
          k = Number(o3);
        } }, foregroundPadding: { get: () => w, set(o3) {
          w = o3 > 1 ? 1 : o3 < 0 ? 0 : o3;
        } }, positionProbeBackgroundColor: { get() {
          return I || this.backgroundColor;
        }, set(o3) {
          I = o3;
        } }, positionProbeForegroundColor: { get() {
          return B || this.foregroundColor;
        }, set(o3) {
          B = o3;
        } }, separatorColor: { get() {
          return S || this.backgroundColor;
        }, set(o3) {
          S = o3;
        } }, positionAdjustBackgroundColor: { get() {
          return P || this.backgroundColor;
        }, set(o3) {
          P = o3;
        } }, positionAdjustForegroundColor: { get() {
          return E || this.foregroundColor;
        }, set(o3) {
          E = o3;
        } }, timingBackgroundColor: { get() {
          return L || this.backgroundColor;
        }, set(o3) {
          L = o3;
        } }, timingForegroundColor: { get() {
          return D || this.foregroundColor;
        }, set(o3) {
          D = o3;
        } }, typeNumberBackgroundColor: { get() {
          return T || this.backgroundColor;
        }, set(o3) {
          T = o3;
        } }, typeNumberForegroundColor: { get() {
          return A || this.foregroundColor;
        }, set(o3) {
          A = o3;
        } }, darkBlockColor: { get() {
          return N || this.foregroundColor;
        }, set(o3) {
          N = o3;
        } }, canvasContext: { get() {
          if (void 0 === M)
            throw console.error("[uQRCode]: use drawCanvas, you need to set the canvasContext!"), new b.Error("use drawCanvas, you need to set the canvasContext!");
          return M;
        }, set(o3) {
          M = C(o3);
        } } }), b.plugins.forEach((o3) => o3(b, this, false)), o2 && this.setOptions(o2), e2 && (this.canvasContext = C(e2));
      }
      return f.prototype = { get: function(o2) {
        return this.num[o2];
      }, getLength: function() {
        return this.num.length;
      }, multiply: function(o2) {
        for (var e2 = new Array(this.getLength() + o2.getLength() - 1), r2 = 0; r2 < this.getLength(); r2++)
          for (var t2 = 0; t2 < o2.getLength(); t2++)
            e2[r2 + t2] ^= c.gexp(c.glog(this.get(r2)) + c.glog(o2.get(t2)));
        return new f(e2, 0);
      }, mod: function(o2) {
        if (this.getLength() - o2.getLength() < 0)
          return this;
        for (var e2 = c.glog(this.get(0)) - c.glog(o2.get(0)), r2 = new Array(this.getLength()), t2 = 0; t2 < this.getLength(); t2++)
          r2[t2] = this.get(t2);
        for (t2 = 0; t2 < o2.getLength(); t2++)
          r2[t2] ^= c.gexp(c.glog(o2.get(t2)) + e2);
        return new f(r2, 0).mod(o2);
      } }, v.RS_BLOCK_TABLE = [[1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9], [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16], [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13], [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9], [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12], [2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15], [2, 98, 78], [4, 49, 31], [2, 32, 14, 4, 33, 15], [4, 39, 13, 1, 40, 14], [2, 121, 97], [2, 60, 38, 2, 61, 39], [4, 40, 18, 2, 41, 19], [4, 40, 14, 2, 41, 15], [2, 146, 116], [3, 58, 36, 2, 59, 37], [4, 36, 16, 4, 37, 17], [4, 36, 12, 4, 37, 13], [2, 86, 68, 2, 87, 69], [4, 69, 43, 1, 70, 44], [6, 43, 19, 2, 44, 20], [6, 43, 15, 2, 44, 16], [4, 101, 81], [1, 80, 50, 4, 81, 51], [4, 50, 22, 4, 51, 23], [3, 36, 12, 8, 37, 13], [2, 116, 92, 2, 117, 93], [6, 58, 36, 2, 59, 37], [4, 46, 20, 6, 47, 21], [7, 42, 14, 4, 43, 15], [4, 133, 107], [8, 59, 37, 1, 60, 38], [8, 44, 20, 4, 45, 21], [12, 33, 11, 4, 34, 12], [3, 145, 115, 1, 146, 116], [4, 64, 40, 5, 65, 41], [11, 36, 16, 5, 37, 17], [11, 36, 12, 5, 37, 13], [5, 109, 87, 1, 110, 88], [5, 65, 41, 5, 66, 42], [5, 54, 24, 7, 55, 25], [11, 36, 12], [5, 122, 98, 1, 123, 99], [7, 73, 45, 3, 74, 46], [15, 43, 19, 2, 44, 20], [3, 45, 15, 13, 46, 16], [1, 135, 107, 5, 136, 108], [10, 74, 46, 1, 75, 47], [1, 50, 22, 15, 51, 23], [2, 42, 14, 17, 43, 15], [5, 150, 120, 1, 151, 121], [9, 69, 43, 4, 70, 44], [17, 50, 22, 1, 51, 23], [2, 42, 14, 19, 43, 15], [3, 141, 113, 4, 142, 114], [3, 70, 44, 11, 71, 45], [17, 47, 21, 4, 48, 22], [9, 39, 13, 16, 40, 14], [3, 135, 107, 5, 136, 108], [3, 67, 41, 13, 68, 42], [15, 54, 24, 5, 55, 25], [15, 43, 15, 10, 44, 16], [4, 144, 116, 4, 145, 117], [17, 68, 42], [17, 50, 22, 6, 51, 23], [19, 46, 16, 6, 47, 17], [2, 139, 111, 7, 140, 112], [17, 74, 46], [7, 54, 24, 16, 55, 25], [34, 37, 13], [4, 151, 121, 5, 152, 122], [4, 75, 47, 14, 76, 48], [11, 54, 24, 14, 55, 25], [16, 45, 15, 14, 46, 16], [6, 147, 117, 4, 148, 118], [6, 73, 45, 14, 74, 46], [11, 54, 24, 16, 55, 25], [30, 46, 16, 2, 47, 17], [8, 132, 106, 4, 133, 107], [8, 75, 47, 13, 76, 48], [7, 54, 24, 22, 55, 25], [22, 45, 15, 13, 46, 16], [10, 142, 114, 2, 143, 115], [19, 74, 46, 4, 75, 47], [28, 50, 22, 6, 51, 23], [33, 46, 16, 4, 47, 17], [8, 152, 122, 4, 153, 123], [22, 73, 45, 3, 74, 46], [8, 53, 23, 26, 54, 24], [12, 45, 15, 28, 46, 16], [3, 147, 117, 10, 148, 118], [3, 73, 45, 23, 74, 46], [4, 54, 24, 31, 55, 25], [11, 45, 15, 31, 46, 16], [7, 146, 116, 7, 147, 117], [21, 73, 45, 7, 74, 46], [1, 53, 23, 37, 54, 24], [19, 45, 15, 26, 46, 16], [5, 145, 115, 10, 146, 116], [19, 75, 47, 10, 76, 48], [15, 54, 24, 25, 55, 25], [23, 45, 15, 25, 46, 16], [13, 145, 115, 3, 146, 116], [2, 74, 46, 29, 75, 47], [42, 54, 24, 1, 55, 25], [23, 45, 15, 28, 46, 16], [17, 145, 115], [10, 74, 46, 23, 75, 47], [10, 54, 24, 35, 55, 25], [19, 45, 15, 35, 46, 16], [17, 145, 115, 1, 146, 116], [14, 74, 46, 21, 75, 47], [29, 54, 24, 19, 55, 25], [11, 45, 15, 46, 46, 16], [13, 145, 115, 6, 146, 116], [14, 74, 46, 23, 75, 47], [44, 54, 24, 7, 55, 25], [59, 46, 16, 1, 47, 17], [12, 151, 121, 7, 152, 122], [12, 75, 47, 26, 76, 48], [39, 54, 24, 14, 55, 25], [22, 45, 15, 41, 46, 16], [6, 151, 121, 14, 152, 122], [6, 75, 47, 34, 76, 48], [46, 54, 24, 10, 55, 25], [2, 45, 15, 64, 46, 16], [17, 152, 122, 4, 153, 123], [29, 74, 46, 14, 75, 47], [49, 54, 24, 10, 55, 25], [24, 45, 15, 46, 46, 16], [4, 152, 122, 18, 153, 123], [13, 74, 46, 32, 75, 47], [48, 54, 24, 14, 55, 25], [42, 45, 15, 32, 46, 16], [20, 147, 117, 4, 148, 118], [40, 75, 47, 7, 76, 48], [43, 54, 24, 22, 55, 25], [10, 45, 15, 67, 46, 16], [19, 148, 118, 6, 149, 119], [18, 75, 47, 31, 76, 48], [34, 54, 24, 34, 55, 25], [20, 45, 15, 61, 46, 16]], v.getRSBlocks = function(o2, e2) {
        var r2 = v.getRsBlockTable(o2, e2);
        if (null == r2)
          throw new Error("bad rs block @ typeNumber:" + o2 + "/errorCorrectLevel:" + e2);
        for (var t2 = r2.length / 3, i2 = new Array(), n2 = 0; n2 < t2; n2++)
          for (var a2 = r2[3 * n2 + 0], d2 = r2[3 * n2 + 1], u2 = r2[3 * n2 + 2], s2 = 0; s2 < a2; s2++)
            i2.push(new v(d2, u2));
        return i2;
      }, v.getRsBlockTable = function(o2, e2) {
        switch (e2) {
          case t.L:
            return v.RS_BLOCK_TABLE[4 * (o2 - 1) + 0];
          case t.M:
            return v.RS_BLOCK_TABLE[4 * (o2 - 1) + 1];
          case t.Q:
            return v.RS_BLOCK_TABLE[4 * (o2 - 1) + 2];
          case t.H:
            return v.RS_BLOCK_TABLE[4 * (o2 - 1) + 3];
          default:
            return;
        }
      }, p.prototype = { get: function(o2) {
        var e2 = Math.floor(o2 / 8);
        return 1 == (this.buffer[e2] >>> 7 - o2 % 8 & 1);
      }, put: function(o2, e2) {
        for (var r2 = 0; r2 < e2; r2++)
          this.putBit(1 == (o2 >>> e2 - r2 - 1 & 1));
      }, getLengthInBits: function() {
        return this.length;
      }, putBit: function(o2) {
        var e2 = Math.floor(this.length / 8);
        this.buffer.length <= e2 && this.buffer.push(0), o2 && (this.buffer[e2] |= 128 >>> this.length % 8), this.length++;
      } }, e.errorCorrectLevel = t, b.errorCorrectLevel = e.errorCorrectLevel, b.Error = function(o2) {
        this.errMsg = "[uQRCode]: " + o2;
      }, b.plugins = [], b.use = function(o2) {
        "function" == typeof o2 && b.plugins.push(o2);
      }, b.prototype.loadImage = function(o2) {
        return Promise.resolve(o2);
      }, b.prototype.setOptions = function(o2) {
        var e2, r2, t2, i2, n2, a2, d2, u2, s2, g2, l2, h2, c2, m2, f2, v2, p2, C2, b2, y, k, w, I, B, S, P, E, L, D, T, A, N, M, z, _, O, R, x, F, H, X, Y, j, W, G, K, Q, U, $, J, q, V, Z, oo, eo, ro;
        o2 && (Object.keys(o2).forEach((e3) => {
          this[e3] = o2[e3];
        }), function(o3 = {}, e3 = {}, r3 = false) {
          let t3;
          for (var i3 in t3 = r3 ? o3 : { ...o3 }, e3) {
            var n3 = e3[i3];
            null != n3 && (n3.constructor == Object ? t3[i3] = this.deepReplace(t3[i3], n3) : n3.constructor != String || n3 ? t3[i3] = n3 : t3[i3] = t3[i3]);
          }
        }(this, { data: o2.data || o2.text, dataEncode: o2.dataEncode, size: o2.size, useDynamicSize: o2.useDynamicSize, typeNumber: o2.typeNumber, errorCorrectLevel: o2.errorCorrectLevel, margin: o2.margin, areaColor: o2.areaColor, backgroundColor: o2.backgroundColor || (null === (e2 = o2.background) || void 0 === e2 ? void 0 : e2.color), backgroundImageSrc: o2.backgroundImageSrc || (null === (r2 = o2.background) || void 0 === r2 || null === (t2 = r2.image) || void 0 === t2 ? void 0 : t2.src), backgroundImageWidth: o2.backgroundImageWidth || (null === (i2 = o2.background) || void 0 === i2 || null === (n2 = i2.image) || void 0 === n2 ? void 0 : n2.width), backgroundImageHeight: o2.backgroundImageHeight || (null === (a2 = o2.background) || void 0 === a2 || null === (d2 = a2.image) || void 0 === d2 ? void 0 : d2.height), backgroundImageX: o2.backgroundImageX || (null === (u2 = o2.background) || void 0 === u2 || null === (s2 = u2.image) || void 0 === s2 ? void 0 : s2.x), backgroundImageY: o2.backgroundImageY || (null === (g2 = o2.background) || void 0 === g2 || null === (l2 = g2.image) || void 0 === l2 ? void 0 : l2.y), backgroundImageAlpha: o2.backgroundImageAlpha || (null === (h2 = o2.background) || void 0 === h2 || null === (c2 = h2.image) || void 0 === c2 ? void 0 : c2.alpha), backgroundImageBorderRadius: o2.backgroundImageBorderRadius || (null === (m2 = o2.background) || void 0 === m2 || null === (f2 = m2.image) || void 0 === f2 ? void 0 : f2.borderRadius), backgroundPadding: o2.backgroundPadding, foregroundColor: o2.foregroundColor || (null === (v2 = o2.foreground) || void 0 === v2 ? void 0 : v2.color), foregroundImageSrc: o2.foregroundImageSrc || (null === (p2 = o2.foreground) || void 0 === p2 || null === (C2 = p2.image) || void 0 === C2 ? void 0 : C2.src), foregroundImageWidth: o2.foregroundImageWidth || (null === (b2 = o2.foreground) || void 0 === b2 || null === (y = b2.image) || void 0 === y ? void 0 : y.width), foregroundImageHeight: o2.foregroundImageHeight || (null === (k = o2.foreground) || void 0 === k || null === (w = k.image) || void 0 === w ? void 0 : w.height), foregroundImageX: o2.foregroundImageX || (null === (I = o2.foreground) || void 0 === I || null === (B = I.image) || void 0 === B ? void 0 : B.x), foregroundImageY: o2.foregroundImageY || (null === (S = o2.foreground) || void 0 === S || null === (P = S.image) || void 0 === P ? void 0 : P.y), foregroundImagePadding: o2.foregroundImagePadding || (null === (E = o2.foreground) || void 0 === E || null === (L = E.image) || void 0 === L ? void 0 : L.padding), foregroundImageBackgroundColor: o2.foregroundImageBackgroundColor || (null === (D = o2.foreground) || void 0 === D || null === (T = D.image) || void 0 === T ? void 0 : T.backgroundColor), foregroundImageBorderRadius: o2.foregroundImageBorderRadius || (null === (A = o2.foreground) || void 0 === A || null === (N = A.image) || void 0 === N ? void 0 : N.borderRadius), foregroundImageShadowOffsetX: o2.foregroundImageShadowOffsetX || (null === (M = o2.foreground) || void 0 === M || null === (z = M.image) || void 0 === z ? void 0 : z.shadowOffsetX), foregroundImageShadowOffsetY: o2.foregroundImageShadowOffsetY || (null === (_ = o2.foreground) || void 0 === _ || null === (O = _.image) || void 0 === O ? void 0 : O.shadowOffsetY), foregroundImageShadowBlur: o2.foregroundImageShadowBlur || (null === (R = o2.foreground) || void 0 === R || null === (x = R.image) || void 0 === x ? void 0 : x.shadowBlur), foregroundImageShadowColor: o2.foregroundImageShadowColor || (null === (F = o2.foreground) || void 0 === F || null === (H = F.image) || void 0 === H ? void 0 : H.shadowColor), foregroundPadding: o2.foregroundPadding, positionProbeBackgroundColor: o2.positionProbeBackgroundColor || (null === (X = o2.positionProbe) || void 0 === X ? void 0 : X.backgroundColor) || (null === (Y = o2.positionDetection) || void 0 === Y ? void 0 : Y.backgroundColor), positionProbeForegroundColor: o2.positionProbeForegroundColor || (null === (j = o2.positionProbe) || void 0 === j ? void 0 : j.foregroundColor) || (null === (W = o2.positionDetection) || void 0 === W ? void 0 : W.foregroundColor), separatorColor: o2.separatorColor || (null === (G = o2.separator) || void 0 === G ? void 0 : G.color), positionAdjustBackgroundColor: o2.positionAdjustBackgroundColor || (null === (K = o2.positionAdjust) || void 0 === K ? void 0 : K.backgroundColor) || (null === (Q = o2.alignment) || void 0 === Q ? void 0 : Q.backgroundColor), positionAdjustForegroundColor: o2.positionAdjustForegroundColor || (null === (U = o2.positionAdjust) || void 0 === U ? void 0 : U.foregroundColor) || (null === ($ = o2.alignment) || void 0 === $ ? void 0 : $.foregroundColor), timingBackgroundColor: o2.timingBackgroundColor || (null === (J = o2.timing) || void 0 === J ? void 0 : J.backgroundColor), timingForegroundColor: o2.timingForegroundColor || (null === (q = o2.timing) || void 0 === q ? void 0 : q.foregroundColor), typeNumberBackgroundColor: o2.typeNumberBackgroundColor || (null === (V = o2.typeNumber) || void 0 === V ? void 0 : V.backgroundColor) || (null === (Z = o2.versionInformation) || void 0 === Z ? void 0 : Z.backgroundColor), typeNumberForegroundColor: o2.typeNumberForegroundColor || (null === (oo = o2.typeNumber) || void 0 === oo ? void 0 : oo.foregroundColor) || (null === (eo = o2.versionInformation) || void 0 === eo ? void 0 : eo.foregroundColor), darkBlockColor: o2.darkBlockColor || (null === (ro = o2.darkBlock) || void 0 === ro ? void 0 : ro.color) }, true));
      }, b.prototype.make = function() {
        let { foregroundColor: o2, backgroundColor: r2, typeNumber: t2, errorCorrectLevel: i2, data: n2, dataEncode: a2, size: d2, margin: u2, useDynamicSize: s2 } = this;
        if (o2 === r2)
          throw console.error("[uQRCode]: foregroundColor and backgroundColor cannot be the same!"), new b.Error("foregroundColor and backgroundColor cannot be the same!");
        a2 && (n2 = function(o3) {
          o3 = o3.toString();
          for (var e2, r3 = "", t3 = 0; t3 < o3.length; t3++)
            (e2 = o3.charCodeAt(t3)) >= 1 && e2 <= 127 ? r3 += o3.charAt(t3) : e2 > 2047 ? (r3 += String.fromCharCode(224 | e2 >> 12 & 15), r3 += String.fromCharCode(128 | e2 >> 6 & 63), r3 += String.fromCharCode(128 | e2 >> 0 & 63)) : (r3 += String.fromCharCode(192 | e2 >> 6 & 31), r3 += String.fromCharCode(128 | e2 >> 0 & 63));
          return r3;
        }(n2));
        var g2 = new e(t2, i2);
        g2.addData(n2), g2.make(), this.base = g2, this.typeNumber = g2.typeNumber, this.modules = g2.modules, this.moduleCount = g2.moduleCount, this.dynamicSize = s2 ? Math.ceil((d2 - 2 * u2) / g2.moduleCount) * g2.moduleCount + 2 * u2 : d2, function(o3) {
          let { dynamicSize: e2, margin: r3, backgroundColor: t3, backgroundPadding: i3, foregroundColor: n3, foregroundPadding: a3, modules: d3, moduleCount: u3 } = o3;
          var s3 = (e2 - 2 * r3) / u3, g3 = s3, l2 = 0;
          i3 > 0 && (g3 -= 2 * (l2 = g3 * i3 / 2));
          var h2 = s3, c2 = 0;
          a3 > 0 && (h2 -= 2 * (c2 = h2 * a3 / 2));
          for (var m2 = 0; m2 < u3; m2++)
            for (var f2 = 0; f2 < u3; f2++) {
              var v2 = f2 * s3 + r3, p2 = m2 * s3 + r3;
              if (d3[m2][f2]) {
                var C2 = c2, b2 = v2 + c2, y = p2 + c2, k = h2, w = h2;
                d3[m2][f2] = { type: ["foreground"], color: n3, isBlack: true, isDrawn: false, destX: v2, destY: p2, destWidth: s3, destHeight: s3, x: b2, y, width: k, height: w, paddingTop: C2, paddingRight: C2, paddingBottom: C2, paddingLeft: C2 };
              } else
                C2 = l2, b2 = v2 + l2, y = p2 + l2, k = g3, w = g3, d3[m2][f2] = { type: ["background"], color: t3, isBlack: false, isDrawn: false, destX: v2, destY: p2, destWidth: s3, destHeight: s3, x: b2, y, width: k, height: w, paddingTop: C2, paddingRight: C2, paddingBottom: C2, paddingLeft: C2 };
            }
        }(this), function(o3) {
          let { modules: e2, moduleCount: r3, positionProbeBackgroundColor: t3, positionProbeForegroundColor: i3 } = o3;
          var n3 = r3 - 7;
          [[0, 0, 1], [1, 0, 1], [2, 0, 1], [3, 0, 1], [4, 0, 1], [5, 0, 1], [6, 0, 1], [0, 1, 1], [1, 1, 0], [2, 1, 0], [3, 1, 0], [4, 1, 0], [5, 1, 0], [6, 1, 1], [0, 2, 1], [1, 2, 0], [2, 2, 1], [3, 2, 1], [4, 2, 1], [5, 2, 0], [6, 2, 1], [0, 3, 1], [1, 3, 0], [2, 3, 1], [3, 3, 1], [4, 3, 1], [5, 3, 0], [6, 3, 1], [0, 4, 1], [1, 4, 0], [2, 4, 1], [3, 4, 1], [4, 4, 1], [5, 4, 0], [6, 4, 1], [0, 5, 1], [1, 5, 0], [2, 5, 0], [3, 5, 0], [4, 5, 0], [5, 5, 0], [6, 5, 1], [0, 6, 1], [1, 6, 1], [2, 6, 1], [3, 6, 1], [4, 6, 1], [5, 6, 1], [6, 6, 1]].forEach((o4) => {
            var r4 = e2[o4[0]][o4[1]], a3 = e2[o4[0] + n3][o4[1]], d3 = e2[o4[0]][o4[1] + n3];
            d3.type.push("positionProbe"), a3.type.push("positionProbe"), r4.type.push("positionProbe"), r4.color = 1 == o4[2] ? i3 : t3, a3.color = 1 == o4[2] ? i3 : t3, d3.color = 1 == o4[2] ? i3 : t3;
          });
        }(this), function(o3) {
          let { modules: e2, moduleCount: r3, separatorColor: t3 } = o3;
          [[7, 0], [7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6], [7, 7], [0, 7], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7]].forEach((o4) => {
            var i3 = e2[o4[0]][o4[1]], n3 = e2[r3 - o4[0] - 1][o4[1]], a3 = e2[o4[0]][r3 - o4[1] - 1];
            a3.type.push("separator"), n3.type.push("separator"), i3.type.push("separator"), i3.color = t3, n3.color = t3, a3.color = t3;
          });
        }(this), function(o3) {
          let { typeNumber: e2, modules: r3, moduleCount: t3, foregroundColor: i3, backgroundColor: n3, positionAdjustForegroundColor: a3, positionAdjustBackgroundColor: d3, timingForegroundColor: u3, timingBackgroundColor: s3 } = o3;
          var g3 = [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]][e2 - 1];
          if (g3)
            for (var l2 = [[-2, -2, 1], [-1, -2, 1], [0, -2, 1], [1, -2, 1], [2, -2, 1], [-2, -1, 1], [-1, -1, 0], [0, -1, 0], [1, -1, 0], [2, -1, 1], [-2, 0, 1], [-1, 0, 0], [0, 0, 1], [1, 0, 0], [2, 0, 1], [-2, 1, 1], [-1, 1, 0], [0, 1, 0], [1, 1, 0], [2, 1, 1], [-2, 2, 1], [-1, 2, 1], [0, 2, 1], [1, 2, 1], [2, 2, 1]], h2 = g3.length, c2 = 0; c2 < h2; c2++)
              for (var m2 = 0; m2 < h2; m2++) {
                var { x: f2, y: v2 } = { x: g3[c2], y: g3[m2] };
                f2 < 9 && v2 < 9 || f2 > t3 - 9 - 1 && v2 < 9 || v2 > t3 - 9 - 1 && f2 < 9 || l2.forEach((o4) => {
                  var e3 = r3[f2 + o4[0]][v2 + o4[1]];
                  e3.type.push("positionAdjust"), e3.type.includes("timing") ? 1 == o4[2] ? e3.color = a3 == i3 ? u3 : a3 : e3.color = a3 == i3 && d3 == n3 ? s3 : d3 : e3.color = 1 == o4[2] ? a3 : d3;
                });
              }
        }(this), function(o3) {
          let { modules: e2, moduleCount: r3, timingForegroundColor: t3, timingBackgroundColor: i3 } = o3;
          for (var n3 = r3 - 16, a3 = 0; a3 < n3; a3++) {
            var d3 = e2[6][8 + a3], u3 = e2[8 + a3][6];
            d3.type.push("timing"), u3.type.push("timing"), d3.color = 1 & a3 ^ 1 ? t3 : i3, u3.color = 1 & a3 ^ 1 ? t3 : i3;
          }
        }(this), function(o3) {
          let { modules: e2, moduleCount: r3, darkBlockColor: t3 } = o3;
          var i3 = e2[r3 - 7 - 1][8];
          i3.type.push("darkBlock"), i3.color = t3;
        }(this), function(o3) {
          let { typeNumber: e2, modules: r3, moduleCount: t3, typeNumberBackgroundColor: i3, typeNumberForegroundColor: n3 } = o3;
          if (e2 < 7)
            return r3;
          var a3 = [0, 0, 0, 0, 0, 0, 0, "000111110010010100", "001000010110111100", "001001101010011001", "001010010011010011", "001011101111110110", "001100011101100010", "001101100001000111", "001110011000001101", "001111100100101000", "010000101101111000", "010001010001011101", "010010101000010111", "010011010100110010", "010100100110100110", "010101011010000011", "010110100011001001", "010111011111101100", "011000111011000100", "011001000111100001", "011010111110101011", "011011000010001110", "011100110000011010", "011101001100111111", "011110110101110101", "011111001001010000", "100000100111010101", "100001011011110000", "100010100010111010", "100011011110011111", "100100101100001011", "100101010000101110", "100110101001100100", "100111010101000001", "101000110001101001"], d3 = a3[e2] + a3[e2], u3 = [t3 - 11, t3 - 10, t3 - 9];
          [[5, u3[2]], [5, u3[1]], [5, u3[0]], [4, u3[2]], [4, u3[1]], [4, u3[0]], [3, u3[2]], [3, u3[1]], [3, u3[0]], [2, u3[2]], [2, u3[1]], [2, u3[0]], [1, u3[2]], [1, u3[1]], [1, u3[0]], [0, u3[2]], [0, u3[1]], [0, u3[0]], [u3[2], 5], [u3[1], 5], [u3[0], 5], [u3[2], 4], [u3[1], 4], [u3[0], 4], [u3[2], 3], [u3[1], 3], [u3[0], 3], [u3[2], 2], [u3[1], 2], [u3[0], 2], [u3[2], 1], [u3[1], 1], [u3[0], 1], [u3[2], 0], [u3[1], 0], [u3[0], 0]].forEach((o4, e3) => {
            var t4 = r3[o4[0]][o4[1]];
            t4.type.push("typeNumber"), t4.color = "1" == d3[e3] ? n3 : i3;
          });
        }(this), this.isMaked = true, this.drawModules = [];
      }, b.prototype.getDrawModules = function() {
        if (this.drawModules && this.drawModules.length > 0)
          return this.drawModules;
        let o2 = this.drawModules = [], { modules: e2, moduleCount: r2, dynamicSize: t2, areaColor: i2, backgroundImageSrc: n2, backgroundImageX: a2, backgroundImageY: d2, backgroundImageWidth: u2, backgroundImageHeight: s2, backgroundImageAlpha: g2, backgroundImageBorderRadius: l2, foregroundImageSrc: h2, foregroundImageX: c2, foregroundImageY: m2, foregroundImageWidth: f2, foregroundImageHeight: v2, foregroundImagePadding: p2, foregroundImageBackgroundColor: C2, foregroundImageBorderRadius: b2, foregroundImageShadowOffsetX: y, foregroundImageShadowOffsetY: k, foregroundImageShadowBlur: w, foregroundImageShadowColor: I } = this;
        i2 && o2.push({ name: "area", type: "area", color: i2, x: 0, y: 0, width: t2, height: t2 }), n2 && o2.push({ name: "backgroundImage", type: "image", imageSrc: n2, mappingName: "backgroundImageSrc", x: a2, y: d2, width: u2, height: s2, alpha: g2, borderRadius: l2 });
        for (var B = 0; B < r2; B++)
          for (var S = 0; S < r2; S++) {
            var P = e2[B][S];
            P.isDrawn || (P.type.includes("foreground") ? o2.push({ name: "foreground", type: "tile", color: P.color, destX: P.destX, destY: P.destY, destWidth: P.destWidth, destHeight: P.destHeight, x: P.x, y: P.y, width: P.width, height: P.height, paddingTop: P.paddingTop, paddingRight: P.paddingRight, paddingBottom: P.paddingBottom, paddingLeft: P.paddingLeft, rowIndex: B, colIndex: S }) : o2.push({ name: "background", type: "tile", color: P.color, destX: P.destX, destY: P.destY, destWidth: P.destWidth, destHeight: P.destHeight, x: P.x, y: P.y, width: P.width, height: P.height, paddingTop: P.paddingTop, paddingRight: P.paddingRight, paddingBottom: P.paddingBottom, paddingLeft: P.paddingLeft, rowIndex: B, colIndex: S }), P.isDrawn = true);
          }
        return h2 && o2.push({ name: "foregroundImage", type: "image", imageSrc: h2, mappingName: "foregroundImageSrc", x: c2, y: m2, width: f2, height: v2, padding: p2, backgroundColor: C2, borderRadius: b2, shadowOffsetX: y, shadowOffsetY: k, shadowBlur: w, shadowColor: I }), o2;
      }, b.prototype.isBlack = function(o2, e2) {
        var r2 = this.moduleCount;
        return !(0 > o2 || 0 > e2 || o2 >= r2 || e2 >= r2) && this.modules[o2][e2].isBlack;
      }, b.prototype.drawCanvas = function(o2) {
        let { isMaked: e2, canvasContext: r2, useDynamicSize: t2, dynamicSize: i2, foregroundColor: n2, foregroundPadding: a2, backgroundColor: d2, backgroundPadding: u2, drawReserve: s2, margin: g2 } = this;
        if (!e2)
          return console.error("[uQRCode]: please execute the make method first!"), Promise.reject(new b.Error("please execute the make method first!"));
        let l2 = this.getDrawModules(), h2 = async (e3, t3) => {
          try {
            r2.draw(o2);
            for (var i3 = 0; i3 < l2.length; i3++) {
              var n3 = l2[i3];
              switch (r2.save(), n3.type) {
                case "area":
                  r2.setFillStyle(n3.color), r2.fillRect(n3.x, n3.y, n3.width, n3.height);
                  break;
                case "tile":
                  var a3 = n3.x, d3 = n3.y, u3 = n3.width, g3 = n3.height;
                  r2.setFillStyle(n3.color), r2.fillRect(a3, d3, u3, g3);
                  break;
                case "image":
                  if ("backgroundImage" === n3.name) {
                    a3 = Math.round(n3.x), d3 = Math.round(n3.y), u3 = Math.round(n3.width), g3 = Math.round(n3.height);
                    u3 < 2 * (c2 = Math.round(n3.borderRadius)) && (c2 = u3 / 2), g3 < 2 * c2 && (c2 = g3 / 2), r2.setGlobalAlpha(n3.alpha), c2 > 0 && (r2.beginPath(), r2.moveTo(a3 + c2, d3), r2.arcTo(a3 + u3, d3, a3 + u3, d3 + g3, c2), r2.arcTo(a3 + u3, d3 + g3, a3, d3 + g3, c2), r2.arcTo(a3, d3 + g3, a3, d3, c2), r2.arcTo(a3, d3, a3 + u3, d3, c2), r2.closePath(), r2.setStrokeStyle("rgba(0,0,0,0)"), r2.stroke(), r2.clip());
                    try {
                      var h3 = await this.loadImage(n3.imageSrc);
                      r2.drawImage(h3, a3, d3, u3, g3);
                    } catch (o3) {
                      throw console.error(`[uQRCode]: ${n3.mappingName} invalid!`), new b.Error(`${n3.mappingName} invalid!`);
                    }
                  } else if ("foregroundImage" === n3.name) {
                    a3 = Math.round(n3.x), d3 = Math.round(n3.y), u3 = Math.round(n3.width), g3 = Math.round(n3.height);
                    var c2, m2 = Math.round(n3.padding);
                    u3 < 2 * (c2 = Math.round(n3.borderRadius)) && (c2 = u3 / 2), g3 < 2 * c2 && (c2 = g3 / 2);
                    var f2 = a3 - m2, v2 = d3 - m2, p2 = u3 + 2 * m2, C2 = g3 + 2 * m2, y = Math.round(p2 / u3 * c2);
                    p2 < 2 * y && (y = p2 / 2), C2 < 2 * y && (y = C2 / 2), r2.save(), r2.setShadow(n3.shadowOffsetX, n3.shadowOffsetY, n3.shadowBlur, n3.shadowColor), y > 0 ? (r2.beginPath(), r2.moveTo(f2 + y, v2), r2.arcTo(f2 + p2, v2, f2 + p2, v2 + C2, y), r2.arcTo(f2 + p2, v2 + C2, f2, v2 + C2, y), r2.arcTo(f2, v2 + C2, f2, v2, y), r2.arcTo(f2, v2, f2 + p2, v2, y), r2.closePath(), r2.setFillStyle(n3.backgroundColor), r2.fill()) : (r2.setFillStyle(n3.backgroundColor), r2.fillRect(f2, v2, p2, C2)), r2.restore(), r2.save(), y > 0 ? (r2.beginPath(), r2.moveTo(f2 + y, v2), r2.arcTo(f2 + p2, v2, f2 + p2, v2 + C2, y), r2.arcTo(f2 + p2, v2 + C2, f2, v2 + C2, y), r2.arcTo(f2, v2 + C2, f2, v2, y), r2.arcTo(f2, v2, f2 + p2, v2, y), r2.closePath(), r2.setFillStyle(m2 > 0 ? n3.backgroundColor : "rgba(0,0,0,0)"), r2.fill()) : (r2.setFillStyle(m2 > 0 ? n3.backgroundColor : "rgba(0,0,0,0)"), r2.fillRect(f2, v2, p2, C2)), r2.restore(), c2 > 0 && (r2.beginPath(), r2.moveTo(a3 + c2, d3), r2.arcTo(a3 + u3, d3, a3 + u3, d3 + g3, c2), r2.arcTo(a3 + u3, d3 + g3, a3, d3 + g3, c2), r2.arcTo(a3, d3 + g3, a3, d3, c2), r2.arcTo(a3, d3, a3 + u3, d3, c2), r2.closePath(), r2.setStrokeStyle("rgba(0,0,0,0)"), r2.stroke(), r2.clip());
                    try {
                      h3 = await this.loadImage(n3.imageSrc);
                      r2.drawImage(h3, a3, d3, u3, g3);
                    } catch (o3) {
                      throw console.error(`[uQRCode]: ${n3.mappingName} invalid!`), new b.Error(`${n3.mappingName} invalid!`);
                    }
                  }
              }
              s2 && r2.draw(true), r2.restore();
            }
            r2.draw(true), setTimeout(e3, 150);
          } catch (o3) {
            t3(o3);
          }
        };
        return new Promise((o3, e3) => {
          h2(o3, e3);
        });
      }, b.prototype.draw = function(o2) {
        return this.drawCanvas(o2);
      }, b.prototype.register = function(o2) {
        o2 && o2(b, this, true);
      }, b;
    });
  }
});
export default require_uqrcode();
//# sourceMappingURL=uqrcodejs.js.map
