document.body.innerHTML = "";
var universalPixelSize = 20;

function Tool(name, click) {
	this.name = name;
	this.click = click;
}

function User() {
	this.selectedColor = "fff";
	this.toolbox = [];
	this.selectedTool = 0;
	this.click = function(event, user) {
		user.toolbox[user.selectedTool].click(event);
	}
}

function Pixel(x, y, size, color, postponeRendering) {
  if (arguments.length < 3) {
    var isNaN = Number.isNaN;
    var number = "number";
    if (x < 0 || y < 0 || size < 1 || typeof x !== number || typeof y !== number || typeof size !== number || isNaN(x) || isNaN(y) || isNaN(size)) {
      throw new TypeError("Cannot create Pixel object with specified properties");
    }
  } else {
  	Pixel._p[size] = Pixel._p[size] || [];
    if (Pixel._p[size].filter(pixel => (pixel.x + "_" + pixel.y) === (x + "_" + y)).length !== 0) {
      throw new TypeError("Pixels of the same size may not exist at the same location");
    } else {
      var rendered = false, px = "px";
      this.element = document.createElement("span");
      this.element.classList = "pixel";
      var element_style = this.element.style;
      element_style.width = size + px;
      element_style.height = size + px;
      element_style.position = "fixed";
      element_style.left = x * size + px;
      element_style.top = y * size + px;
      element_style.backgroundColor = '#' + color;
      this.remove = function () {
        this.element.remove();
        Pixel._p[size] = Pixel._p[size].filter(pixel => (pixel.x + "_" + pixel.y) !== (this.x + "_" + this.y));
      }
      Object.defineProperty(this, 'x', {
        get: function () {
          return element_style.left.match(/[0-9]+/g)[0] / element_style.width.match(/[0-9]+/g)[0];
        },
        set: function (value) {
          this.element.style.left = value * element_style.width.match(/[0-9]+/g)[0] + "px";
        }
      });
      Object.defineProperty(this, 'y', {
        get: function () {
          return element_style.top.match(/[0-9]+/g)[0] / element_style.height.match(/[0-9]+/g)[0];
        },
        set: function (value) {
          this.element.style.top = value * element_style.height.match(/[0-9]+/g)[0] + "px";
        }
      });
      Object.defineProperty(this, 'color', {
        get: function () {
          return element_style.backgroundColor;
        },
        set: function (value) {
		  console.log(value);
          this.element.style.backgroundColor = "#" + value;
        }
      });
      this.draw = function () {
        if (!rendered) {
          document.body.appendChild(this.element);
          rendered = true;
        }
      }
      if (!postponeRendering) {
        this.draw();
      }
      Pixel._p[size] = Pixel._p[size] || [];
      Pixel._p[size].push(this);
    }
  }
}
(objDefineProperty => {
  objDefineProperty(Pixel, "_p", {
    configurable: false,
    enumerable: false,
    value: [],
    writable: true
  });

  objDefineProperty(Pixel, "getPixel", {
    configurable: false,
    enumerable: false,
    value: function (x, y, size) {
      return Pixel._p[size].filter(pixel => (pixel.x + "_" + pixel.y) === (x + "_" + y))[0];
    },
    writable: false
  });

  objDefineProperty(Pixel, "getPixelsByColor", {
    configurable: false,
    enumerable: false,
    value: function (x, y, size, color) {
      var dummyElement = document.createElement("span");
      dummyElement.style.backgroundColor = color;
      Pixel._p[size] = Pixel._p[size] || [];
      return Pixel._p[size].filter(pixel => pixel.color === dummyElement.style.backgroundColor);
    },
    writable: false
  });
})(Object.defineProperty);

// testing
"g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-300204-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-300204-g-g-g-g-710a14-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-300204-710a14-g-g-g-g-710a14-710a14-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-710a14-52050d-g-g-g-g-710a14-951123-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-300204-a1141f-52050d-g-g-g-g-52050d-8b0f19-951123-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-300204-8b0f19-951123-300204-g-g-g-g-300204-8b0f19-951123-a1141f-300204-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-300204-a1141f-8b0f19-8b0f19-g-g-g-g-g-g-52050d-8b0f19-951123-b11729-52050d-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-710a14-b11729-8b0f19-8b0f19-300204-g-g-g-g-g-g-300204-52050d-8b0f19-8b0f19-b11729-951123-300204-g-g-g-g-g-g-g-g-g-g-g-g-52050d-a1141f-b11729-8b0f19-8b0f19-300204-300204-g-g-g-g-g-g-710a14-710a14-710a14-8b0f19-8b0f19-a1141f-cf1d34-a1141f-52050d-g-g-g-g-g-g-g-g-710a14-b11729-b11729-8b0f19-8b0f19-8b0f19-300204-710a14-52050d-g-g-g-g-g-g-300204-a1141f-8b0f19-52050d-710a14-8b0f19-8b0f19-951123-cf1d34-710a14-g-g-g-g-g-g-951123-cf1d34-8b0f19-8b0f19-8b0f19-710a14-52050d-8b0f19-951123-g-g-g-g-g-g-g-g-300204-8b0f19-8b0f19-710a14-710a14-8b0f19-8b0f19-8b0f19-cf1d34-300204-g-g-g-g-710a14-b11729-710a14-8b0f19-8b0f19-710a14-710a14-8b0f19-710a14-300204-g-g-g-g-g-g-g-g-g-300204-710a14-710a14-8b0f19-8b0f19-8b0f19-8b0f19-a1141f-8b0f19-g-710a14-52050d-g-b11729-8b0f19-8b0f19-8b0f19-8b0f19-8b0f19-710a14-52050d-300204-g-g-g-g-g-g-g-g-g-g-300204-710a14-710a14-710a14-8b0f19-8b0f19-8b0f19-8b0f19-a1141f-52050d-dd2039-cf1d34-300204-a1141f-8b0f19-8b0f19-8b0f19-8b0f19-710a14-710a14-710a14-g-g-g-g-g-g-g-g-g-g-g-g-300204-710a14-710a14-710a14-8b0f19-8b0f19-8b0f19-b11729-300204-cf1d34-951123-300204-951123-8b0f19-8b0f19-8b0f19-710a14-8b0f19-710a14-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-300204-710a14-8b0f19-8b0f19-8b0f19-cf1d34-52050d-300204-g-710a14-b11729-8b0f19-8b0f19-951123-710a14-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-300204-710a14-951123-951123-cf1d34-dd2039-300204-710a14-e4213c-b11729-8b0f19-8b0f19-52050d-300204-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-52050d-b11729-e4213c-dd2039-cf1d34-dd2039-a1141f-300204-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-52050d-e4213c-cf1d34-dd2039-cf1d34-300204-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-951123-e4213c-e4213c-710a14-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-52050d-e4213c-dd2039-300204-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-710a14-e4213c-e4213c-300204-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-b11729-dd2039-e4213c-8b0f19-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-52050d-e4213c-cf1d34-dd2039-dd2039-300204-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-cf1d34-dd2039-dd2039-dd2039-dd2039-b11729-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-300204-710a14-cf1d34-cf1d34-cf1d34-b11729-710a14-300204-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-710a14-b11729-710a14-710a14-951123-52050d-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-710a14-951123-300204-710a14-951123-52050d-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-300204-710a14-300204-52050d-710a14-300204-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-52050d-300204-52050d-300204-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g".replace(/g/g, '000000').split('-').map((x,i)=>new Pixel(i % 32, Math.floor(i/32), universalPixelSize, x));

var user = new User();

window.addEventListener("click", event=>user.click(event, user));
var colorSelector = document.createElement("input");
colorSelector.type = "color";
colorSelector.style.position = "fixed";
colorSelector.style.top = "640px";
colorSelector.addEventListener("change", function(event) {
	user.selectedColor = event.target.value.substring(1);
	console.log(user.selectedColor);
});
document.body.appendChild(colorSelector);

user.toolbox.push(
	new Tool("paintColor", function(event) {
		var x = Math.floor(event.x / universalPixelSize);
		var y = Math.floor(event.y / universalPixelSize);
		Pixel.getPixel(x, y, universalPixelSize).color = user.selectedColor;
	})
);
